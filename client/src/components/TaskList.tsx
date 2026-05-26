import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, ShieldAlert, Sparkles, Wind } from 'lucide-react';
import { useStore, Task } from '../store/useStore';
import clsx from 'clsx';

const EnergyGlow = ({ level }: { level: Task['energyRequired'] }) => {
  switch (level) {
    case 'low': return <div className="w-2 h-2 rounded-full bg-aurora-green shadow-[0_0_8px_#34D399]" />;
    case 'medium': return <div className="w-2 h-2 rounded-full bg-aurora-cyan shadow-[0_0_8px_#22D3EE]" />;
    case 'high': return <div className="w-2 h-2 rounded-full bg-aurora-orange shadow-[0_0_8px_#FDBA74]" />;
  }
};

export const TaskList = () => {
  const tasks = useStore((state) => state.tasks.filter(t => t.status !== 'completed'));
  const completeTask = useStore((state) => state.completeTask);
  const failTask = useStore((state) => state.failTask);
  const recoverTask = useStore((state) => state.recoverTask);

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-center p-16 glass-card"
      >
        <div className="flex justify-center mb-4">
          <Sparkles className="w-8 h-8 text-aurora-cyan opacity-50" />
        </div>
        <h3 className="text-xl font-light text-white/80 mb-2 tracking-wide">Sanctuary Clear</h3>
        <p className="text-slate-400 font-light">You have recovered your momentum. Rest now.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <h3 className="text-sm font-light text-slate-400 tracking-[0.2em] uppercase">Active Nodes</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(10px)",
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            className={clsx(
              "glass-card p-6 flex items-center justify-between group relative overflow-hidden transition-all duration-500",
              task.status === 'recovering' ? "shadow-[inset_0_0_40px_rgba(253,186,116,0.15)] border-aurora-orange/40" : "border-white/5"
            )}
          >
            {/* Hover Glow Effect inside card */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Intense Recovery Pulse */}
            {task.status === 'recovering' && (
              <div className="absolute inset-0 bg-aurora-orange/5 animate-pulse pointer-events-none" />
            )}

            <div className="flex items-center gap-5 relative z-10">
              <button
                onClick={() => task.status === 'recovering' ? recoverTask(task.id) : completeTask(task.id)}
                className="relative text-white/20 hover:text-white/80 transition-colors focus:outline-none"
              >
                {task.status === 'recovering' ? (
                  <ShieldAlert className="w-7 h-7 text-aurora-orange animate-pulse" />
                ) : (
                  <Circle className="w-7 h-7" />
                )}
                {/* Glow behind checkmark on hover */}
                <div className="absolute inset-0 bg-aurora-cyan/40 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <div>
                <h4 className={clsx(
                  "font-medium text-lg tracking-wide mb-1.5",
                  task.status === 'recovering' ? "text-aurora-orange" : "text-white/90"
                )}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-4 text-xs font-light text-slate-400">
                  <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md tracking-wider">
                    {task.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <EnergyGlow level={task.energyRequired} />
                    <span className="capitalize tracking-wider">{task.energyRequired} Energy</span>
                  </span>
                  <span className="text-aurora-purple font-medium tracking-wider">+{task.xpReward} XP</span>
                </div>
              </div>
            </div>

            {task.status === 'recovering' ? (
              <div className="relative z-10 flex items-center gap-2 text-[10px] sm:text-xs text-aurora-orange bg-aurora-orange/10 border border-aurora-orange/30 px-4 py-1.5 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(253,186,116,0.2)]">
                <ShieldAlert className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                Urgent: Momentum Breached
              </div>
            ) : (
              <button
                onClick={() => failTask(task.id)}
                className="relative z-10 opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-aurora-orange transition-all focus:outline-none"
                title="Shatter Task"
              >
                <Wind className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
