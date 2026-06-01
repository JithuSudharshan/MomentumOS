import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Wind, Sparkles, Flame, Pause, X, Loader2 } from 'lucide-react';
import { useStore, Task } from '../store/useStore';
import { StardustOverlay } from './StardustOverlay';

const EnergyGlow = ({ level }: { level: Task['energyRequired'] }) => {
  switch (level) {
    case 'low': return <div className="w-2 h-2 rounded-full bg-vanguard-verdant shadow-[0_0_8px_#4ADE80]" />;
    case 'medium': return <div className="w-2 h-2 rounded-full bg-vanguard-teal shadow-[0_0_8px_#2DD4BF]" />;
    case 'high': return <div className="w-2 h-2 rounded-full bg-vanguard-ice shadow-[0_0_8px_#A78BFA]" />;
  }
};

export const TaskList = () => {
  const allTasks = useStore((state) => state.tasks);
  const regularTasks = allTasks.filter(t => t.status === 'pending' && !t.isMicroStep);
  const recoveryTasks = allTasks.filter(t => t.status === 'recovering' && t.isMicroStep);

  const completeTask = useStore((state) => state.completeTask);
  const failTask = useStore((state) => state.failTask);
  const recoverTask = useStore((state) => state.recoverTask);

  const [pausingTaskId, setPausingTaskId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [burst, setBurst] = useState<{id: number, x: number, y: number} | null>(null);

  const handlePause = async (taskId: string, reason: string) => {
    setIsProcessing(true);
    await failTask(taskId, reason);
    setPausingTaskId(null);
    setIsProcessing(false);
  };

  const tasks = regularTasks;
  const hasRecovery = recoveryTasks.length > 0;

  if (tasks.length === 0 && !hasRecovery) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="text-center p-8 sm:p-16 console-panel"
      >
        <div className="flex justify-center mb-4">
          <Sparkles className="w-10 h-10 text-vanguard-teal opacity-70" />
        </div>
        <h3 className="text-2xl font-semibold text-white/90 mb-3 tracking-tight">Sanctuary Clear</h3>
        <p className="text-slate-400 font-light">Your field is stable. Rest easy — your recovery systems are online.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recovery Tasks (Phoenix Quest) */}
      {hasRecovery && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-vanguard-ember animate-pulse" />
              <h3 className="text-sm font-light text-vanguard-ember tracking-[0.2em] uppercase">Phoenix Quests</h3>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-vanguard-ember/30 to-transparent" />
          </div>

          <AnimatePresence>
            {recoveryTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.35 } }}
                className="glass-card p-5 sm:p-6 flex flex-col gap-4 overflow-hidden border-2 border-vanguard-ember/30 bg-gradient-to-br from-vanguard-ember/5 to-vanguard-breach/5 relative"
              >
                {/* Animated glow background */}
                <motion.div
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-vanguard-ember/10 via-transparent to-transparent mix-blend-screen"
                />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={(e) => {
                        setBurst({ id: Date.now(), x: e.clientX, y: e.clientY });
                        recoverTask(task.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex h-12 w-12 items-center justify-center rounded-3xl border-2 border-vanguard-ember text-vanguard-ember bg-vanguard-ember/10 hover:bg-vanguard-ember/20 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300"
                    >
                      <motion.div animate={{ y: [0, -2, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Flame className="w-6 h-6" />
                      </motion.div>
                    </motion.button>

                    <div>
                      <h4 className="text-xl font-semibold tracking-tight text-vanguard-ember">
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-light text-slate-400 mt-2">
                        <span className="rounded-full border border-vanguard-ember/20 bg-vanguard-ember/5 px-3 py-1 uppercase tracking-[0.25em]">{task.category}</span>
                        <span className="flex items-center gap-2">
                          <EnergyGlow level={task.energyRequired} />
                          <span className="capitalize">{task.energyRequired} energy</span>
                        </span>
                        <span className="font-semibold text-vanguard-teal">+{task.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-right sm:text-left sm:flex-row sm:items-center">
                    <div className="rounded-full border border-vanguard-ember/30 bg-vanguard-ember/10 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-vanguard-ember shadow-[0_0_20px_rgba(239,68,68,0.08)]">
                      Recovery in progress
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-vanguard-ember/20 bg-vanguard-ember/5 p-4 text-sm text-vanguard-ember/90">
                  <p className="font-medium">Shield restoration active</p>
                  <p className="mt-2 text-vanguard-ember/70 text-xs leading-relaxed">Complete this recovery quest to rebuild your momentum and restore your protective barrier. No judgment—just progress.</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Regular Tasks */}
      {tasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <h3 className="text-sm font-light text-slate-400 tracking-[0.2em] uppercase">Active Nodes</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.35 } }}
                className="glass-card p-5 sm:p-6 flex flex-col gap-4 overflow-hidden border border-white/10 relative"
              >
                {/* Modal Overlay for Pausing */}
                <AnimatePresence>
                  {pausingTaskId === task.id && (
                    <motion.div
                      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
                      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#10151D]/80 border border-vanguard-ice/30 p-6 rounded-[2rem]"
                    >
                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-4 py-4">
                          <Loader2 className="w-8 h-8 text-vanguard-ice animate-spin" />
                          <p className="text-vanguard-ice/80 text-xs uppercase tracking-[0.2em] animate-pulse">Synthesizing Recovery Protocol...</p>
                        </div>
                      ) : (
                        <>
                          <h5 className="text-vanguard-ice font-semibold tracking-[0.1em] mb-5 text-center text-sm uppercase">Why are we pausing?</h5>
                          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
                            <button onClick={() => handlePause(task.id, 'Too Complex')} className="flex-1 min-w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-300 transition-all hover:bg-vanguard-ice/20 hover:text-white hover:border-vanguard-ice/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] hover:scale-105 active:scale-95">🧩 Too Complex</button>
                            <button onClick={() => handlePause(task.id, 'Low Energy')} className="flex-1 min-w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-300 transition-all hover:bg-vanguard-ice/20 hover:text-white hover:border-vanguard-ice/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] hover:scale-105 active:scale-95">🔋 Low Energy</button>
                            <button onClick={() => handlePause(task.id, 'No Time')} className="flex-1 min-w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-300 transition-all hover:bg-vanguard-ice/20 hover:text-white hover:border-vanguard-ice/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] hover:scale-105 active:scale-95">⏳ No Time</button>
                          </div>
                          <button onClick={() => setPausingTaskId(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        setBurst({ id: Date.now(), x: e.clientX, y: e.clientY });
                        completeTask(task.id);
                      }}
                      className="relative flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-200 hover:bg-vanguard-teal/10 hover:text-vanguard-teal hover:border-vanguard-teal/50 hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] transition-all duration-300 group"
                    >
                      <Circle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </button>

                    <div>
                      <h4 className="text-xl font-semibold tracking-tight text-white">
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-light text-slate-400 mt-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.25em]">{task.category}</span>
                        <span className="flex items-center gap-2">
                          <EnergyGlow level={task.energyRequired} />
                          <span className="capitalize">{task.energyRequired} energy</span>
                        </span>
                        <span className="font-semibold text-vanguard-ice">+{task.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-right sm:text-left sm:flex-row sm:items-center sm:justify-end">
                    <button
                      onClick={() => setPausingTaskId(task.id)}
                      className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:bg-vanguard-ice/10 hover:text-vanguard-ice hover:border-vanguard-ice/30"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      Pause & Simplify
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {burst && (
        <StardustOverlay 
          key={burst.id}
          x={burst.x} 
          y={burst.y} 
          onComplete={() => setBurst(null)} 
        />
      )}
    </div>
  );
};
