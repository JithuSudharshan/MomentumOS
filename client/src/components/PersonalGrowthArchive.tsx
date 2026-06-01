import React from 'react';
import { motion } from 'framer-motion';
import { X, Sprout, Wind, Flame, Waves, Shield, Brain, Star, Rocket } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export interface Badge {
  id: string;
  title: string;
  icon: any;
  requirement: string;
  description: string;
  color: string;
  checkUnlocked: (stats: any) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'First Step',
    icon: Sprout,
    requirement: 'First brain dump completed',
    description: 'Every journey starts with a single thought.',
    color: 'vanguard-verdant',
    checkUnlocked: (stats) => stats.brainDumpsCompleted >= 1
  },
  {
    id: 'momentum_builder',
    title: 'Momentum Builder',
    icon: Flame,
    requirement: 'Completed first AI-generated action plan',
    description: 'Action creates momentum.',
    color: 'vanguard-ember',
    checkUnlocked: (stats) => stats.actionPlansCompleted >= 1
  },
  {
    id: 'self_aware',
    title: 'Self-Aware',
    icon: Brain,
    requirement: '10 emotional reflections logged',
    description: 'Understanding yourself is progress too.',
    color: 'vanguard-teal',
    checkUnlocked: (stats) => stats.emotionalReflections >= 10
  },
  {
    id: 'clarity_seeker',
    title: 'Clarity Seeker',
    icon: Star,
    requirement: '50 tasks extracted from brain dumps',
    description: 'Master of organizing thoughts.',
    color: 'vanguard-ice',
    checkUnlocked: (stats) => stats.tasksExtracted >= 50
  },
  {
    id: 'graceful_reset',
    title: 'Graceful Reset',
    icon: Wind,
    requirement: 'Used the Sanctuary to vent and process emotions',
    description: 'You didn\'t quit; you just took a breath.',
    color: 'vanguard-ice',
    checkUnlocked: (stats) => stats.emotionalReflections >= 1
  },
  {
    id: 'the_phoenix',
    title: 'The Phoenix',
    icon: Flame,
    requirement: 'Completed a recovery micro-step after failing a task',
    description: 'Falling down is an accident. Staying down is a choice.',
    color: 'vanguard-ember',
    checkUnlocked: (stats) => stats.recoveryStepsCompleted >= 1
  },
  {
    id: 'micro_mover',
    title: 'Micro-Mover',
    icon: Waves,
    requirement: 'Completed 5 recovery micro-steps total',
    description: 'Slow motion is better than no motion.',
    color: 'vanguard-teal',
    checkUnlocked: (stats) => stats.recoveryStepsCompleted >= 5
  },
  {
    id: 'bounce_back',
    title: 'Bounce Back',
    icon: Shield,
    requirement: 'Returned after 7+ inactive days',
    description: 'Most apps punish absence. MomentumOS celebrates returning.',
    color: 'vanguard-ice',
    checkUnlocked: (stats) => stats.hasBouncedBack
  }
];

export const PersonalGrowthArchive = ({ onClose }: { onClose: () => void }) => {
  const stats = useStore(state => state.stats);
  const claimBadge = useStore(state => state.claimBadge);
  const triggerCelebration = useStore(state => state.triggerCelebration);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#10151D]/80 p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-5xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto console-panel p-6 sm:p-8 md:p-12 relative border border-white/10 shadow-[0_0_50px_rgba(45,212,191,0.1)]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-8 right-4 sm:right-8 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">Personal Growth Archive</h2>
          <p className="text-slate-400 text-sm">Your journey of momentum, celebrated without pressure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            const isEligible = badge.checkUnlocked(stats);
            const isClaimed = stats.claimedBadges?.includes(badge.id);
            const unlocked = isEligible || isClaimed;
            
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={clsx(
                  "relative p-6 rounded-[2rem] border overflow-hidden group transition-all duration-500 flex flex-col h-[280px]",
                  unlocked 
                    ? "bg-white/5 border-white/10 hover:bg-[#FDE047]/10 hover:border-[#FDE047]/40 hover:shadow-[0_0_30px_rgba(253,224,71,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]" 
                    : "bg-white/[0.02] border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:border-[#FDE047]/20"
                )}
              >
                {unlocked && (
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${badge.color}/10 rounded-full blur-3xl`} />
                )}

                {isEligible && !isClaimed && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      claimBadge(badge.id);
                      triggerCelebration(badge);
                    }} 
                    className="absolute top-5 right-5 bg-[#FDE047] text-black px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase animate-pulse z-20 hover:scale-105 transition-transform hover:shadow-[0_0_15px_rgba(253,224,71,0.5)]"
                  >
                    Claim
                  </button>
                )}
                
                <div className={clsx(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0",
                  unlocked ? `bg-${badge.color}/20 text-${badge.color}` : "bg-white/10 text-slate-500"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-semibold tracking-wide text-white mb-1">{badge.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  {isClaimed ? 'Unlocked' : (isEligible ? 'Ready to Claim' : 'Locked')}
                </p>
                
                <div className="mt-auto relative h-[72px]">
                  <div className="absolute top-0 left-0 right-0 group-hover:-translate-y-4 transition-transform duration-500">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Requirement</p>
                    <p className="text-xs text-slate-300 line-clamp-2">{badge.requirement}</p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 pt-3 border-t border-white/5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className={clsx("text-[11px] italic leading-tight drop-shadow-md", unlocked ? `text-[#FDE047]` : "text-slate-400")}>
                      "{badge.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
