import { create } from 'zustand';

export type EnergyLevel = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed' | 'failed' | 'recovering';

export interface Task {
  id: string;
  title: string;
  category: string;
  energyRequired: EnergyLevel;
  status: TaskStatus;
  xpReward: number;
  isMicroStep?: boolean;
  recoveryOf?: string;
  description?: string;
}

export interface UserStats {
  level: number;
  xp: number;
  streak: number;
  shieldActive: boolean;
  intellect: number;
  vitality: number;
  creativity: number;
  brainDumpsCompleted: number;
  tasksExtracted: number;
  actionPlansCompleted: number;
  emotionalReflections: number;
  recoveryStepsCompleted: number;
  lastActiveDate: string;
  activeDaysCount: number;
  hasBouncedBack: boolean;
  claimedBadges: string[];
}

export interface BrainDumpResponse {
  emotion: {
    stress_level: string;
    overwhelm_level: string;
    energy_level: string;
    mental_load_percentage: number;
    dominant_emotion: string;
  };
  summary: string;
  recommended_plan: string[];
  focus_recommendation: string;
  supportive_response: string;
}

interface AppState {
  tasks: Task[];
  stats: UserStats;
  isOverwhelmed: boolean;
  setOverwhelmed: (val: boolean) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  completeTask: (id: string) => void;
  failTask: (id: string, reason?: string) => Promise<void>;
  recoverTask: (id: string) => void;
  addBrainDump: (text: string) => Promise<BrainDumpResponse | void>;
  initializeStore: () => Promise<void>;
  claimBadge: (id: string) => Promise<void>;
  activeCelebration: any | null;
  triggerCelebration: (badge: any | null) => void;
}

export const useStore = create<AppState>((set) => ({
  tasks: [],
  stats: {
    level: 1,
    xp: 0,
    streak: 0,
    shieldActive: true,
    intellect: 0,
    vitality: 0,
    creativity: 0,
    brainDumpsCompleted: 0,
    tasksExtracted: 0,
    actionPlansCompleted: 0,
    emotionalReflections: 0,
    recoveryStepsCompleted: 0,
    lastActiveDate: new Date().toISOString(),
    activeDaysCount: 1,
    hasBouncedBack: false,
    claimedBadges: [],
  },
  isOverwhelmed: false,
  setOverwhelmed: (val) => set({ isOverwhelmed: val }),
  activeCelebration: null,
  triggerCelebration: (badge) => set({ activeCelebration: badge }),

  addTask: async (task) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${base}/api/data/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: 'pending' })
      });
      if (response.ok) {
        const newTask = await response.json();
        set((state) => ({ tasks: [newTask, ...state.tasks] }));
      }
    } catch (error) {
      console.error(error);
    }
  },
  completeTask: async (id) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/api/data/tasks/${id}/complete`, { method: 'PATCH' });
      if (res.ok) {
        const { stats } = await res.json();
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t),
          stats: stats
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },

  failTask: async (id, reason) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/api/data/tasks/${id}/fail`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      if (res.ok) {
        const { task, microStep, stats } = await res.json();
        set((state) => ({
          tasks: [microStep, ...state.tasks.map(t => t.id === id ? task : t)],
          stats: stats
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },

  recoverTask: async (id) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/api/data/tasks/${id}/recover`, { method: 'PATCH' });
      if (res.ok) {
        const { stats } = await res.json();
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t),
          stats: stats
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },

  addBrainDump: async (text) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${base}/api/braindump`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error('Failed to parse brain dump');

      const data = await response.json();
      set((state) => ({ 
        tasks: [...data.tasks, ...state.tasks],
        stats: data.stats || state.stats
      })); 
      return data;
    } catch (error) {
      console.error(error);
      alert('Failed to process Brain Dump. Ensure the backend is running and has a valid GEMINI_API_KEY.');
    }
  },

  initializeStore: async () => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${base}/api/data`);
      if (response.ok) {
        const data = await response.json();
        set({ tasks: data.tasks, stats: data.stats });
      }
    } catch (error) {
      console.error('Failed to initialize store from MongoDB', error);
    }
  },

  claimBadge: async (id) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${base}/api/data/badges/${id}/claim`, { method: 'POST' });
      if (response.ok) {
        const { stats } = await response.json();
        set({ stats });
      }
    } catch (error) {
      console.error('Failed to claim badge', error);
    }
  }
}));
