import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { BrainDump } from './BrainDump';
import { QuickAdd } from './QuickAdd';
import { TaskList } from './TaskList';
import { Sidebar } from './Sidebar';
import { OverwhelmMode } from './OverwhelmMode';
import { AIOrb } from './AIOrb';
import { SoftLanding } from './SoftLanding';
import { useStore } from '../store/useStore';

export const Dashboard = () => {
  const isOverwhelmed = useStore((state) => state.isOverwhelmed);
  const setOverwhelmed = useStore((state) => state.setOverwhelmed);
  const stats = useStore((state) => state.stats);
  const [showSoftLanding, setShowSoftLanding] = React.useState(false);

  React.useEffect(() => {
    const tasks = useStore.getState().tasks;
    const hasRecoveryTasks = tasks.some(t => t.status === 'recovering' && t.isMicroStep);
    if (isOverwhelmed && !stats.shieldActive && hasRecoveryTasks) {
      setShowSoftLanding(true);
    } else {
      setShowSoftLanding(false);
    }
  }, [isOverwhelmed, stats.shieldActive, useStore((s) => s.tasks)]);

  return (
    <div className="min-h-screen text-slate-50 relative z-10">
      <AnimatePresence>
        {isOverwhelmed && (showSoftLanding ? <SoftLanding onClose={() => setOverwhelmed(false)} /> : <OverwhelmMode />)}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6">
            <div className="scale-50 -ml-12 -my-12">
              {/* Mini Orb for header */}
              <AIOrb />
            </div>
            <h1 className="text-2xl font-light tracking-widest uppercase text-white/80">MomentumOS</h1>
          </div>

          <button
            onClick={() => setOverwhelmed(true)}
            className="relative flex items-center gap-2 text-sm text-white/80 hover:text-white bg-white/5 backdrop-blur-md px-6 py-3 rounded-full transition-all group overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            <div className="absolute inset-0 rounded-full border border-aurora-cyan/30 group-hover:border-aurora-cyan/60 animate-pulse" />
            <Eye className="w-4 h-4 text-aurora-cyan group-hover:scale-110 transition-transform" />
            <span className="tracking-widest uppercase text-xs font-medium">Activate Sanctuary</span>
          </button>
        </header>

        {/* Spatial Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-12"
          >
            <BrainDump />
            <QuickAdd />
            <TaskList />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <Sidebar />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
