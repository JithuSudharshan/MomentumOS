import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, ShieldCheck, Focus } from 'lucide-react';
import { AIOrb } from './AIOrb';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 w-full overflow-x-hidden pb-32">
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 relative"
        >
          {/* Subtle glow behind Orb */}
          <div className="absolute inset-0 bg-aurora-cyan/20 blur-[100px] rounded-full scale-150 pointer-events-none" />
          <AIOrb />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-aurora-cyan to-aurora-purple max-w-4xl"
        >
          Productivity shouldn't feel like a punishment.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-slate-400 font-light max-w-2xl leading-relaxed mb-12"
        >
          A calming, AI-powered operating system that protects your momentum, organizes your chaos, and forgives you when you fall behind.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          onClick={onStart}
          className="group relative px-10 py-4 bg-white/5 border border-white/10 rounded-full overflow-hidden backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.1)] hover:shadow-[0_0_60px_rgba(139,92,246,0.3)] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-aurora-cyan/20 to-aurora-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-3 text-white font-medium tracking-wide">
            <Sparkles className="w-5 h-5 text-aurora-cyan group-hover:rotate-12 transition-transform" />
            Initialize Sanctuary
          </span>
        </motion.button>
      </section>

      {/* 2. The Problem Section */}
      <section className="py-32 px-8 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="glass-card p-12 md:p-20 relative overflow-hidden"
        >
          {/* Faint red warning glow transitioning to calm blue */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-rose-500/10 blur-[80px]" />
          
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
            You aren't broken. <span className="text-slate-500 line-through">Your tools are.</span>
          </h2>
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            Most productivity apps overwhelm you with endless lists, punish you with rigid streak systems, and make you feel guilty when life happens. You don't need another drill sergeant. You need a sanctuary.
          </p>
        </motion.div>
      </section>

      {/* 3. Core Pillars Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card p-10 relative group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-aurora-cyan/10 border border-aurora-cyan/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <BrainCircuit className="w-7 h-7 text-aurora-cyan" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 tracking-wide">Chaotic Input,<br/>Ordered Output</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Dump your messy, anxious thoughts into the system. Our AI instantly parses the chaos, categorizing and assigning energy costs to actionable tasks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-10 relative group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-aurora-orange/10 border border-aurora-orange/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(253,186,116,0.2)]">
              <ShieldCheck className="w-7 h-7 text-aurora-orange" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 tracking-wide">Momentum,<br/>Not Streaks</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              When you fall behind, we don't punish you with a big red X. We trigger a "Recovery Protocol" to help you rebuild momentum and reactivate your shield.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-card p-10 relative group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-aurora-purple/10 border border-aurora-purple/20 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Focus className="w-7 h-7 text-aurora-purple" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 tracking-wide">Absolute<br/>Focus</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Overwhelmed by everything you have to do? Activate Sanctuary Mode to blur out the noise and focus on the single easiest task you have energy for.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-32 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-light text-white mb-10 tracking-widest uppercase">Ready to reclaim your momentum?</h2>
          <button
            onClick={onStart}
            className="px-12 py-5 bg-white text-[#050816] hover:bg-slate-200 rounded-full font-semibold tracking-wider uppercase transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Enter MomentumOS
          </button>
        </motion.div>
      </section>
    </div>
  );
};
