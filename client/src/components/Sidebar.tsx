import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Zap, Brain, Flame, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export const Sidebar = () => {
  const stats = useStore((state) => state.stats);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-8 sticky top-12"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-light tracking-wide text-white">
            Level <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-aurora-purple">{stats.level}</span>
          </h2>
          <p className="text-slate-400 text-sm tracking-widest uppercase mt-1">Momentum Master</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-purple opacity-80" />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between text-xs tracking-widest uppercase mb-3 text-slate-400">
          <span>Resonance</span>
          <span className="text-aurora-cyan">{stats.xp} / 1000</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-aurora-cyan/20 blur-sm" />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(stats.xp / 1000) * 100}%` }}
            className="h-full bg-aurora-cyan shadow-[0_0_10px_#22D3EE] relative z-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-10">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -inset-4 bg-aurora-orange/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-aurora-orange" />
              <span className="text-white/60 text-xs tracking-widest uppercase">Streak</span>
            </div>
            <p className="text-3xl font-light text-white">{stats.streak} <span className="text-sm text-slate-400">days</span></p>
          </div>
        </div>
        
        <div className={clsx(
          "p-5 rounded-2xl border relative overflow-hidden transition-all duration-500",
          stats.shieldActive 
            ? "bg-aurora-green/5 border-aurora-green/20" 
            : "bg-rose-500/5 border-rose-500/20"
        )}>
          {stats.shieldActive && <div className="absolute -inset-4 bg-aurora-green/10 blur-xl animate-pulse" />}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              {stats.shieldActive ? (
                <Shield className="w-4 h-4 text-aurora-green" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              )}
              <span className="text-white/60 text-xs tracking-widest uppercase">Shield</span>
            </div>
            <p className={clsx(
              "text-sm font-medium tracking-wide",
              stats.shieldActive ? "text-aurora-green" : "text-rose-500"
            )}>
              {stats.shieldActive ? 'Active & Safe' : 'Breached'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-light text-slate-400 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
          Neural Pathways
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </h3>
        <div className="space-y-5">
          <SkillBar icon={<Brain className="w-4 h-4" />} label="Intellect" value={stats.intellect} color="bg-aurora-purple" shadowColor="shadow-[0_0_10px_#8B5CF6]" />
          <SkillBar icon={<Activity className="w-4 h-4" />} label="Vitality" value={stats.vitality} color="bg-aurora-green" shadowColor="shadow-[0_0_10px_#34D399]" />
          <SkillBar icon={<Zap className="w-4 h-4" />} label="Creativity" value={stats.creativity} color="bg-aurora-cyan" shadowColor="shadow-[0_0_10px_#22D3EE]" />
        </div>
      </div>
    </motion.div>
  );
};

const SkillBar = ({ icon, label, value, color, shadowColor }: { icon: React.ReactNode, label: string, value: number, color: string, shadowColor: string }) => (
  <div>
    <div className="flex justify-between text-xs tracking-wider mb-2 font-light">
      <span className="flex items-center gap-2 text-white/70">{icon} {label}</span>
      <span className="text-slate-400">{value}</span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / 200) * 100, 100)}%` }}
        className={clsx("h-full absolute inset-y-0 left-0", color, shadowColor)}
      />
    </div>
  </div>
);
