import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Zap, Brain, Flame, Activity, Sparkles, Key, Wand, Award } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BADGES } from './PersonalGrowthArchive';
import clsx from 'clsx';

const getOSTitle = (level: number) => {
  if (level === 1) return 'Explorer';
  if (level === 2) return 'Navigator';
  if (level === 3) return 'Architect';
  if (level === 4) return 'Operator';
  if (level === 5) return 'Commander';
  return 'Momentum Master';
};

export const Sidebar = ({ onOpenArchive }: { onOpenArchive?: () => void }) => {
  const stats = useStore((state) => state.stats);
  const [xpDiff, setXpDiff] = React.useState(0);
  const [isSparking, setIsSparking] = React.useState(false);
  const prevXpRef = React.useRef(stats.xp);
  const isInitialMount = React.useRef(true);

  const hasUnclaimedEligible = BADGES.some(b => b.checkUnlocked(stats) && !stats.claimedBadges?.includes(b.id));

  React.useEffect(() => {
    const timer = setTimeout(() => {
      isInitialMount.current = false;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isInitialMount.current && stats.xp > prevXpRef.current) {
      setXpDiff(stats.xp - prevXpRef.current);
      setIsSparking(true);
      const t = setTimeout(() => setIsSparking(false), 2000);
      prevXpRef.current = stats.xp;
      return () => clearTimeout(t);
    }
    prevXpRef.current = stats.xp;
  }, [stats.xp]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="console-panel p-8 sticky top-10"
    >
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-vanguard-slate/70 mb-3">Character Status</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Level <span className="text-vanguard-ice">{stats.level}</span>
          </h2>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mt-2">{getOSTitle(stats.level)}</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(167,139,250,0.18)]">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vanguard-ice to-vanguard-teal shadow-orb" />
        </div>
      </div>

      <div className="mb-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#181E27]/90 to-[#10151D]/90 p-8 shadow-[inset_0_0_30px_rgba(255,255,255,0.02),0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,212,191,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="flex items-end justify-between text-xs uppercase tracking-[0.35em] text-slate-400 mb-6 relative z-10">
          <span className="font-medium tracking-[0.4em] text-white/50">Resonance</span>
          <div className="relative flex items-baseline">
            <span className="text-vanguard-ice font-light text-2xl tracking-wider drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">{stats.xp}</span>
            <span className="text-slate-500 font-light ml-2 tracking-widest text-xs">/ 1000</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="h-14 rounded-full border border-white/10 bg-black/40 overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] z-10">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] opacity-50" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((stats.xp / 1000) * 100, 100)}%` }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], type: 'spring', bounce: 0.3 }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-vanguard-teal/80 via-vanguard-ice to-white shadow-[0_0_30px_rgba(45,212,191,0.5)] flex items-center justify-end pr-2"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 2, filter: 'blur(8px)' }}
                animate={
                  isSparking 
                    ? { opacity: [0, 1, 0], scale: [1, 2.5, 1], filter: ['blur(4px)', 'blur(10px)', 'blur(4px)'] } 
                    : { opacity: 0, scale: 1, filter: 'blur(4px)' }
                }
                transition={{ duration: isSparking ? 0.8 : 1.5, ease: "easeOut" }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-20 bg-white/60 mix-blend-overlay"
              />
              <div className="h-2/3 w-1.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)] relative z-10" />
            </motion.div>
          </div>

          <div className="absolute inset-0 pointer-events-none z-20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((stats.xp / 1000) * 100, 100)}%` }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], type: 'spring', bounce: 0.3 }}
              className="absolute inset-y-0 left-0 flex items-center justify-end pr-2"
            >
              <AnimatePresence>
                {isSparking && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -45, scale: 1.3 }}
                    exit={{ opacity: 0, y: -65, scale: 0.8 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute right-0 -top-4 text-white font-bold text-xl drop-shadow-[0_0_15px_rgba(45,212,191,1)] z-30 pointer-events-none whitespace-nowrap"
                  >
                    +{xpDiff} XP
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 mb-10 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_0_18px_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-2 mb-3 text-slate-400 uppercase tracking-[0.3em] text-[11px]">
            <Flame className="w-4 h-4 text-vanguard-ember" />
            Streak
          </div>
          <p className="text-3xl font-semibold text-white">{stats.streak}<span className="text-slate-400 text-xs ml-2">days</span></p>
        </div>

        <div className={clsx(
          'rounded-3xl p-5 shadow-[inset_0_0_18px_rgba(255,255,255,0.04)] border',
          stats.shieldActive ? 'border-vanguard-verdant/20 bg-vanguard-verdant/10' : 'border-vanguard-breach/20 bg-vanguard-breach/10'
        )}>
          <div className="flex items-center gap-2 mb-3 text-slate-400 uppercase tracking-[0.3em] text-[11px]">
            {stats.shieldActive ? <Shield className="w-4 h-4 text-vanguard-verdant" /> : <ShieldAlert className="w-4 h-4 text-vanguard-breach" />}
            Shield
          </div>
          <p className={clsx('text-sm font-semibold tracking-wide', stats.shieldActive ? 'text-vanguard-verdant' : 'text-vanguard-breach')}>
            {stats.shieldActive ? 'Engaged' : 'Breached'}
          </p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5 text-xs uppercase tracking-[0.3em] text-slate-400">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          Neural Pathways
        </div>
        <div className="space-y-5">
          <SkillBar icon={<Brain className="w-4 h-4" />} label="Intellect" value={stats.intellect} color="vanguard-ice" />
          <SkillBar icon={<Activity className="w-4 h-4" />} label="Vitality" value={stats.vitality} color="vanguard-verdant" />
          <SkillBar icon={<Zap className="w-4 h-4" />} label="Creativity" value={stats.creativity} color="vanguard-teal" />
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[#181E27]/90 p-6">
        <div className="flex items-center justify-between mb-5 text-xs uppercase tracking-[0.35em] text-slate-400">
          <span>Recent Achievements</span>
        </div>
        <div className="grid gap-4">
          {BADGES.filter(b => stats.claimedBadges?.includes(b.id)).slice(0, 3).map(badge => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-200 hover:bg-white/10 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${badge.color}/20 text-${badge.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide">{badge.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Unlocked</p>
                </div>
              </div>
            );
          })}
          
          {BADGES.filter(b => stats.claimedBadges?.includes(b.id)).length === 0 && (
            <div className="text-center py-6 text-slate-500 text-sm italic">
              Your journey begins here.
            </div>
          )}
        </div>

        <button 
          onClick={onOpenArchive} 
          className={clsx(
            "mt-6 w-full py-4 rounded-xl border text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-500 group flex items-center justify-center gap-3",
            hasUnclaimedEligible 
              ? "bg-[#FDE047] text-black border-[#FDE047] shadow-[0_0_20px_rgba(253,224,71,0.6)] animate-pulse hover:bg-white hover:border-white" 
              : "border-vanguard-teal/30 bg-vanguard-teal/10 shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:bg-[#FDE047]/15 hover:border-[#FDE047]/50 hover:shadow-[0_0_25px_rgba(253,224,71,0.2)] text-vanguard-teal hover:text-[#FDE047]"
          )}
        >
          <Award className={clsx("w-4 h-4 group-hover:scale-110 transition-transform duration-500", hasUnclaimedEligible ? "text-black" : "text-vanguard-teal group-hover:text-[#FDE047]")} />
          {hasUnclaimedEligible ? "Claim New Badges!" : "Personal Growth Archive"}
        </button>
      </div>
    </motion.div>
  );
};

const SkillBar = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <div>
    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
      <span className="flex items-center gap-2 uppercase tracking-[0.25em] font-light text-white/70">{icon} {label}</span>
      <span className="text-slate-300">{value}</span>
    </div>
    <div className="h-2 rounded-full bg-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_65%)]" />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / 200) * 100, 100)}%` }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className={`h-full rounded-full bg-gradient-to-r from-${color} to-${color}/70 shadow-[0_0_20px_rgba(255,255,255,0.08)]`}
      />
    </div>
  </div>
);
