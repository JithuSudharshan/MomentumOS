import { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';
import { generateTaskMicroStep } from './aiController';

// Helper to get or create the single MVP user
const getUser = async () => {
  let user = await User.findOne();
  if (!user) {
    user = await User.create({});
  }
  return user;
};



export const fetchInitialData = async (req: Request, res: Response) => {
  try {
    const user = await getUser();

    const today = new Date();
    const todayStr = today.toDateString();
    const lastActiveStr = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : '';

    if (todayStr !== lastActiveStr) {
      if (user.lastActiveDate) {
        const diffMs = today.getTime() - new Date(user.lastActiveDate).getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays >= 7) {
          user.hasBouncedBack = true;
        }
      }
      user.activeDaysCount += 1;
      user.lastActiveDate = today;
      await user.save();
    }

    const tasks = await Task.find({ status: { $ne: 'completed' }, isMicroStep: { $ne: true } }).sort({ createdAt: -1 });
    const recoveringTasks = await Task.find({ status: 'recovering', isMicroStep: true }).sort({ createdAt: -1 });

    // Map _id to id for the frontend
    const mappedTasks = [...tasks, ...recoveringTasks].map(t => {
      const taskObj = t.toObject();
      return { ...taskObj, id: taskObj._id.toString() };
    });

    res.json({ stats: user, tasks: mappedTasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    const taskObj = task.toObject();
    res.json({ ...taskObj, id: taskObj._id.toString() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = 'completed';
    await task.save();

    const user = await getUser();
    user.xp += task.xpReward;

    // Level up logic (1000 XP per level)
    if (user.xp >= 1000) {
      user.level += Math.floor(user.xp / 1000);
      user.xp = user.xp % 1000;
    }

    const categoryStr = task.category.toLowerCase();
    if (categoryStr.includes('intellect') || categoryStr.includes('work') || categoryStr.includes('learning')) user.intellect += task.xpReward;
    else if (categoryStr.includes('vitality') || categoryStr.includes('health')) user.vitality += task.xpReward;
    else user.creativity += task.xpReward;

    await user.save();

    res.json({ task: { ...task.toObject(), id: task._id.toString() }, stats: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete task' });
  }
};

export const failTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = 'failed';
    await task.save();

    const { reason } = req.body;
    
    // Generate recovery micro-step
    let microStepData;
    try {
      microStepData = await generateTaskMicroStep(task.title, task.category, reason);
    } catch (e) {
      console.error('Failed to generate AI microstep, falling back to static:', e);
      const energyMap = { high: 'medium', medium: 'low', low: 'low' };
      const xpMap = { 50: 15, 30: 10, 25: 8, 20: 5, 15: 5, 10: 3 };
      microStepData = {
        title: `${task.title.split('?')[0]} (micro-step)`,
        energyRequired: energyMap[task.energyRequired as keyof typeof energyMap] || 'low',
        xpReward: (xpMap as any)[task.xpReward] || Math.max(5, Math.floor(task.xpReward / 3)),
      };
    }

    const microStep = await Task.create({
      ...microStepData,
      category: task.category,
      status: 'recovering',
      isMicroStep: true,
      recoveryOf: task._id,
    });

    const user = await getUser();
    user.shieldActive = false;
    user.streak = 0;
    await user.save();

    res.json({
      task: { ...task.toObject(), id: task._id.toString() },
      microStep: { ...microStep.toObject(), id: microStep._id.toString() },
      stats: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fail task' });
  }
};

export const recoverTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const microStepTask = await Task.findById(id);
    if (!microStepTask) return res.status(404).json({ error: 'Task not found' });

    microStepTask.status = 'completed';
    await microStepTask.save();

    // Mark the original failed task as recovered
    if (microStepTask.recoveryOf) {
      const originalTask = await Task.findById(microStepTask.recoveryOf);
      if (originalTask) {
        originalTask.status = 'completed';
        await originalTask.save();
      }
    }

    const user = await getUser();
    user.shieldActive = true;
    user.streak += 1;
    user.recoveryStepsCompleted += 1;

    // Award bonus XP for recovery
    user.xp += Math.max(5, Math.floor(microStepTask.xpReward * 0.5));

    // Level up logic (1000 XP per level)
    if (user.xp >= 1000) {
      user.level += Math.floor(user.xp / 1000);
      user.xp = user.xp % 1000;
    }

    const categoryStr = microStepTask.category.toLowerCase();
    if (categoryStr.includes('intellect') || categoryStr.includes('work') || categoryStr.includes('learning')) user.intellect += microStepTask.xpReward;
    else if (categoryStr.includes('vitality') || categoryStr.includes('health')) user.vitality += microStepTask.xpReward;
    else user.creativity += microStepTask.xpReward;

    await user.save();

    res.json({
      task: { ...microStepTask.toObject(), id: microStepTask._id.toString() },
      stats: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recover task' });
  }
};

export const claimBadge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUser();
    if (!user.claimedBadges.includes(id)) {
      user.claimedBadges.push(id);
      await user.save();
    }
    res.json({ stats: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to claim badge' });
  }
};
