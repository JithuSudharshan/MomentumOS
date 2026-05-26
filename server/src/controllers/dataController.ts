import { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';

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
    const tasks = await Task.find({ status: { $ne: 'completed' } }).sort({ createdAt: -1 });
    
    // Map _id to id for the frontend
    const mappedTasks = tasks.map(t => {
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
    
    // Level up logic (every 1000 XP)
    if (user.xp >= user.level * 1000) {
      user.level += 1;
      user.xp = 0;
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
    const task = await Task.findByIdAndUpdate(id, { status: 'recovering' }, { new: true });
    
    const user = await getUser();
    user.shieldActive = false;
    user.streak = 0;
    await user.save();

    res.json({ task: { ...task?.toObject(), id: task?._id?.toString() }, stats: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fail task' });
  }
};

export const recoverTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
    
    const user = await getUser();
    user.shieldActive = true;
    user.streak += 1;
    await user.save();

    res.json({ task: { ...task?.toObject(), id: task?._id?.toString() }, stats: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recover task' });
  }
};
