import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { BADGES, Badge } from './PersonalGrowthArchive';
import clsx from 'clsx';
import { Sparkles, Award } from 'lucide-react';
import { AIOrb } from './AIOrb';

export const BadgeCelebrationManager: React.FC = () => {
  const activeCelebration = useStore(state => state.activeCelebration);
  const triggerCelebration = useStore(state => state.triggerCelebration);

  if (!activeCelebration) return null;

  const currentBadge = activeCelebration;
  const Icon = currentBadge.icon;

  const handleContinue = () => {
    triggerCelebration(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        key={currentBadge.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B0E14]/90 backdrop-blur-2xl"
      >
        {/* MomentumOS Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-10 left-12 flex items-center gap-6 pointer-events-none"
        >
          <div className="scale-75 origin-left">
            <AIOrb />
          </div>
          <span className="tracking-[0.4em] uppercase text-xs text-white/80 font-light flex items-center gap-3">
            MomentumOS <span className="w-1 h-1 rounded-full bg-white/20"></span> <Award className="w-3 h-3 text-white/40" /> Achievement System
          </span>
        </motion.div>

        {/* Dynamic Glow Aura */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={clsx(
            "absolute inset-0 m-auto w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none",
            `bg-${currentBadge.color}`
          )}
        />

        <motion.div
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
          className="relative max-w-xl w-full flex flex-col items-center text-center z-10"
        >
          {/* Badge Icon */}
          <div className="relative mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.5 }}
              className={clsx(
                "w-40 h-40 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 border",
                `bg-${currentBadge.color}/10 text-${currentBadge.color} border-${currentBadge.color}/40`
              )}
            >
              <Icon className="w-20 h-20 drop-shadow-[0_0_15px_currentColor]" />
            </motion.div>
            
            {/* Sparkles around icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 pointer-events-none"
            >
              <Sparkles className={clsx("absolute top-0 right-4 w-6 h-6", `text-${currentBadge.color}/60`)} />
              <Sparkles className={clsx("absolute bottom-4 left-0 w-8 h-8", `text-${currentBadge.color}/40`)} />
              <Sparkles className={clsx("absolute top-12 -left-6 w-5 h-5", `text-${currentBadge.color}/80`)} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-3">Achievement Unlocked</p>
            <h2 className="text-5xl font-bold text-white mb-8 tracking-wide drop-shadow-lg">{currentBadge.title}</h2>
            
            <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md mb-12 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]">
              <p className={clsx("text-lg italic leading-relaxed", `text-${currentBadge.color}`)}>
                "{currentBadge.description}"
              </p>
            </div>

            <button
              onClick={handleContinue}
              className={clsx(
                "px-12 py-4 rounded-xl font-semibold tracking-widest uppercase text-xs transition-all duration-300",
                `bg-${currentBadge.color}/10 text-${currentBadge.color} border border-${currentBadge.color}/30`,
                `hover:bg-${currentBadge.color}/20 hover:border-${currentBadge.color}/60 hover:shadow-[0_0_30px_currentColor]`
              )}
            >
              Continue Journey
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
