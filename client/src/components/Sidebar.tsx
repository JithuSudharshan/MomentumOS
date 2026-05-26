import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Zap, Brain, Flame, Activity, Sparkles, Key, Wand } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export const Sidebar = () => {
  const stats = useStore((state) => state.stats);

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
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mt-2">Momentum Master</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(167,139,250,0.18)]">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-vanguard-ice to-vanguard-teal shadow-orb" />
        </div>
      </div>

      <div className="mb-10 rounded-[2rem] border border-white/10 bg-[#181E27]/90 p-5 shadow-[inset_0_0_20px_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400 mb-4">
          <span>Resonance Collector</span>
          <span className="text-vanguard-teal font-semibold">{stats.xp} / 1000</span>
        </div>
        <div className="h-20 rounded-full border border-white/10 bg-white/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.15),transparent_35%)]" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((stats.xp / 1000) * 100, 100)}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-vanguard-teal via-vanguard-ice to-vanguard-ice/80 shadow-[0_0_30px_rgba(45,212,191,0.25)]"
          />
          <div className="absolute right-2 top-1/2 h-14 w-1.5 -translate-y-1/2 rounded-full bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.15)]" />
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
          <span>Inventory & Quests</span>
          <span className="text-slate-500">Equipped</span>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-200">
            <Sparkles className="w-5 h-5 text-vanguard-ice" />
            <div>
              <p className="text-sm font-semibold">Grace Rune</p>
              <p className="text-xs text-slate-500">Equipped</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-200">
            <Wand className="w-5 h-5 text-vanguard-teal" />
            <div>
              <p className="text-sm font-semibold">Resolve Catalyst</p>
              <p className="text-xs text-slate-500">Ready</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-200">
            <Key className="w-5 h-5 text-vanguard-ember" />
            <div>
              <p className="text-sm font-semibold">Phoenix Key</p>
              <p className="text-xs text-slate-500">Quest slot</p>
            </div>
          </div>
        </div>
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
