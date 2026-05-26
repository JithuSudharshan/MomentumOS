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
}

interface AppState {
  tasks: Task[];
  stats: UserStats;
  isOverwhelmed: boolean;
  setOverwhelmed: (val: boolean) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  completeTask: (id: string) => void;
  failTask: (id: string) => void;
  recoverTask: (id: string) => void;
  addBrainDump: (text: string) => Promise<void>;
  initializeStore: () => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  tasks: [
    { id: '1', title: 'Finish Math Assignment', category: 'Intellect', energyRequired: 'high', status: 'pending', xpReward: 50 },
    { id: '2', title: 'Do Laundry', category: 'Vitality', energyRequired: 'low', status: 'pending', xpReward: 10 },
    { id: '3', title: 'Drink Water', category: 'Vitality', energyRequired: 'low', status: 'pending', xpReward: 5 },
  ],
  stats: {
    level: 5,
    xp: 450,
    streak: 12,
    shieldActive: true,
    intellect: 120,
    vitality: 80,
    creativity: 40,
  },
  isOverwhelmed: false,
  setOverwhelmed: (val) => set({ isOverwhelmed: val }),

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

  failTask: async (id) => {
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/api/data/tasks/${id}/fail`, { method: 'PATCH' });
      if (res.ok) {
        const { stats } = await res.json();
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'recovering' } : t),
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
      set((state) => ({ tasks: [...data.tasks, ...state.tasks] })); // Put new tasks at the top
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
  }
}));
