import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AIOrb } from './AIOrb';

const MESSAGES = [
  "Hell yeah, I knew you could do it!",
  "One step at a time. Proud of you.",
  "See? That wasn't so bad.",
  "You're doing great. Keep breathing.",
  "Massive win. Let's keep the momentum going."
];

export const OverwhelmMode = () => {
  const [motivationMsg, setMotivationMsg] = useState<string | null>(null);
  const setOverwhelmed = useStore((state) => state.setOverwhelmed);
  const tasks = useStore((state) => state.tasks.filter(t => t.status !== 'completed'));
  const completeTask = useStore((state) => state.completeTask);

  const easiestTask = [...tasks].sort((a, b) => {
    const energyScore = { low: 1, medium: 2, high: 3 };
    return energyScore[a.energyRequired] - energyScore[b.energyRequired];
  })[0];

  return (
    <motion.div 
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050816]/60"
    >
      {/* Immersive radial gradient overlay to focus attention */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_100%)] pointer-events-none opacity-80" />

      <div className="max-w-xl w-full relative z-10 flex flex-col items-center">
        <button 
          onClick={() => setOverwhelmed(false)}
          className="absolute -top-20 text-white/30 hover:text-white/80 text-xs font-light tracking-[0.3em] uppercase transition-colors"
        >
          Return to Sanctuary
        </button>
        
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-center w-full"
        >
          <div className="mb-12 flex justify-center scale-150">
            {/* The Orb becomes the centerpiece */}
            <AIOrb />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
          >
            <h2 className="text-3xl font-light text-white/90 mb-3 tracking-wide">Breathe. We just do one thing.</h2>
            <p className="text-aurora-orange/80 text-sm font-light mb-16 tracking-widest uppercase">The noise is gone.</p>
            
            <AnimatePresence mode="wait">
              {motivationMsg ? (
                <motion.div
                  key="motivation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-16 flex flex-col items-center justify-center text-center"
                >
                  <Heart className="w-10 h-10 text-aurora-orange mb-6 animate-pulse shadow-[0_0_20px_rgba(253,186,116,0.5)] rounded-full" />
                  <h3 className="text-3xl font-light text-white tracking-wide">{motivationMsg}</h3>
                </motion.div>
              ) : easiestTask ? (
                <motion.div key="task" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-aurora-orange/0 via-aurora-orange/20 to-aurora-orange/0 rounded-3xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000" />
                  <div className="glass-card p-10 relative">
                    <h3 className="text-2xl font-medium text-white mb-10">{easiestTask.title}</h3>
                    <button 
                      onClick={() => {
                        const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
                        setMotivationMsg(randomMsg);
                        setTimeout(() => {
                          completeTask(easiestTask.id);
                          setMotivationMsg(null);
                          if (tasks.length <= 1) {
                            setOverwhelmed(false);
                          }
                        }, 2500);
                      }}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-light tracking-wide transition-all shadow-[0_0_20px_rgba(253,186,116,0.1)] hover:shadow-[0_0_30px_rgba(253,186,116,0.3)] flex items-center justify-center gap-3 w-full backdrop-blur-md"
                    >
                      <CheckCircle2 className="w-5 h-5 text-aurora-orange" />
                      I finished this step.
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-10">
                  <h3 className="text-xl font-light text-white/80">You are completely at peace. No tasks remain.</h3>
                  <button 
                    onClick={() => setOverwhelmed(false)}
                    className="mt-8 text-aurora-cyan font-light tracking-widest uppercase hover:text-white transition-colors"
                  >
                    Wake Up
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
