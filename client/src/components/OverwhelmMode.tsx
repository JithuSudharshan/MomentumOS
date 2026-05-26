import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AIOrb } from './AIOrb';

const MESSAGES = [
  'No penalties. No pressure. One micro-step at a time.',
  'The field shifted, not failed. You are still in control.',
  'Recovery is the objective. Let the momentum return.',
  'Welcome back, Vanguard. The console is ready.'
];

export const OverwhelmMode = () => {
  const [motivationMsg, setMotivationMsg] = useState<string | null>(null);
  const setOverwhelmed = useStore((state) => state.setOverwhelmed);
  const tasks = useStore((state) => state.tasks.filter(t => t.status !== 'completed'));
  const completeTask = useStore((state) => state.completeTask);

  const sorted = [...tasks].sort((a, b) => {
    const energyScore = { low: 1, medium: 2, high: 3 };
    return energyScore[a.energyRequired] - energyScore[b.energyRequired];
  });
  const easiestTask = sorted[0];

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(28px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background-moss/95 px-6 py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,12,16,0.95)_70%)]" />

      <div className="relative z-10 w-full max-w-3xl">
        <button
          onClick={() => setOverwhelmed(false)}
          className="mb-6 text-sm uppercase tracking-[0.35em] text-slate-300/70 hover:text-white transition"
        >
          Return to Sanctuary
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="console-panel overflow-hidden border-vanguard-teal/15 p-8"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-vanguard-slate/70 mb-4">Welcome back, Vanguard</p>
              <h2 className="text-4xl font-semibold text-white tracking-tight leading-tight">The field may have shifted, but the objective remains.</h2>
              <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">Ready for Consolation? No penalties. No pressure. We start with one micro-step and dust off the rest together.</p>
            </div>
            <div className="mx-auto lg:mx-0">
              <AIOrb />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-background-panel/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 mb-5">
                <span>Phoenix Quest</span>
                <span className="text-vanguard-teal">Low friction</span>
              </div>
              <p className="text-2xl font-semibold text-white">{easiestTask ? easiestTask.title : 'Standby'}</p>
              <p className="mt-4 text-slate-400 leading-relaxed">{easiestTask ? 'One small, calming step to bring your shield and focus back online.' : 'No active recovery tasks remain.'}</p>
              {easiestTask && (
                <button
                  onClick={() => {
                    const choice = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
                    setMotivationMsg(choice);
                    setTimeout(() => {
                      completeTask(easiestTask.id);
                      setMotivationMsg(null);
                      if (tasks.length <= 1) setOverwhelmed(false);
                    }, 2500);
                  }}
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-[1.5rem] bg-vanguard-teal/15 px-6 py-4 text-sm uppercase tracking-[0.35em] text-vanguard-teal shadow-[0_0_30px_rgba(45,212,191,0.18)] transition hover:bg-vanguard-teal/25"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Begin micro-step
                </button>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#162020]/90 p-8 shadow-[inset_0_0_30px_rgba(255,255,255,0.04)]">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">Recovery Summary</p>
              <div className="space-y-4 text-slate-300 text-sm">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="font-semibold text-white">Phoenix Target</p>
                  <p className="mt-2 text-slate-400">A single gentle task to reconnect your system.</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="font-semibold text-white">Shield status</p>
                  <p className="mt-2 text-slate-400">Breached, but repairable through steady momentum.</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="font-semibold text-white">Soft Landing</p>
                  <p className="mt-2 text-slate-400">No guilt. Only rebuilding with a single achievable win.</p>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {motivationMsg && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-10 rounded-[2rem] border border-vanguard-ice/15 bg-[#19232F]/90 p-8"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-vanguard-slate/70 mb-4">Console Feedback</p>
                <p className="text-2xl font-semibold text-white">{motivationMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
