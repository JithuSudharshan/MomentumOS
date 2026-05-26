import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Award, ShieldCheck } from 'lucide-react';
import { AIOrb } from './AIOrb';
import { HowItWorks } from './HowItWorks';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-background-panel2/80 border border-white/10 shadow-orb">
            <div className="h-6 w-6 rounded-md bg-vanguard-ice/80" />
          </div>
          <div>
            <div className="text-sm font-semibold text-vanguard-slate">MOMENTUMOS</div>
            <div className="text-xs text-slate-500">Sanctuary OS</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a className="hover:text-white transition" href="#features">Features</a>
          <a className="hover:text-white transition" href="#how">How it works</a>
          <a className="hover:text-white transition" href="#pricing">Pricing</a>
          <button onClick={onStart} className="ml-4 rounded-full bg-vanguard-teal/15 text-vanguard-teal px-4 py-2 uppercase text-xs tracking-widest">ESTABLISH CONSOLIDATION</button>
        </nav>
      </header>

      <main className="min-h-[72vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-vanguard-slate leading-tight">
              Reframe failure. Reclaim momentum. Build a sanctuary for your focus.
            </motion.h1>

            <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12, duration: 0.9 }} className="mt-6 text-lg text-slate-300 max-w-2xl">
              MomentumOS turns tasks into an adaptive RPG-like system — missed steps become recovery quests, progress flows into a physical Resonance Collector, and every small win restores your shield.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button whileTap={{ scale: 0.98 }} onClick={onStart} className="inline-flex items-center gap-3 rounded-[1.25rem] bg-vanguard-teal/15 text-vanguard-teal px-5 py-3 font-semibold shadow-[0_20px_60px_rgba(45,212,191,0.06)]">
                <Sparkles className="w-5 h-5" />
                ESTABLISH CONSOLIDATION
              </motion.button>

              <a href="#how" className="inline-flex items-center gap-3 rounded-[1.25rem] bg-white/5 text-slate-300 px-5 py-3 border border-white/10">See the Demo</a>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/8"><Users className="w-5 h-5 text-vanguard-ice" /></div>
                <div>
                  <div className="text-sm font-semibold text-white">Recovery-first</div>
                  <div className="text-xs text-slate-400">No punishments — guided rebuilds.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/8"><Award className="w-5 h-5 text-vanguard-teal" /></div>
                <div>
                  <div className="text-sm font-semibold text-white">Progress you feel</div>
                  <div className="text-xs text-slate-400">XP, resonance, and tangible rewards.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/8"><ShieldCheck className="w-5 h-5 text-vanguard-verdant" /></div>
                <div>
                  <div className="text-sm font-semibold text-white">Shielded momentum</div>
                  <div className="text-xs text-slate-400">Recovery paths to repair your shield.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="console-panel p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-[0.35em]">Character</div>
                    <div className="text-xl font-semibold text-white mt-2">Level 5 • Momentum Master</div>
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <AIOrb />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs text-slate-400 flex justify-between"><span>Resonance</span><span className="text-vanguard-teal font-semibold">450 / 1000</span></div>
                  <div className="h-2 bg-white/5 rounded-full mt-2 overflow-hidden"><div className="h-full bg-gradient-to-r from-vanguard-teal to-vanguard-ice" style={{ width: '45%' }} /></div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div className="text-sm text-slate-300">Active Nodes</div>
                  <div className="bg-white/5 rounded-lg p-3 text-sm text-slate-200">Finish Math Assignment • High energy • +50 XP</div>
                  <div className="bg-white/5 rounded-lg p-3 text-sm text-slate-200">Do Laundry • Low energy • +10 XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <HowItWorks />

      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="glass-card p-8">
            <h4 className="text-lg font-semibold text-white">Adaptive Recovery</h4>
            <p className="text-slate-400 mt-2">When life shifts the field, our system compresses missed tasks into approachable quests.</p>
          </div>
          <div className="glass-card p-8">
            <h4 className="text-lg font-semibold text-white">Skillful Progress</h4>
            <p className="text-slate-400 mt-2">Track intellect, vitality and creativity as meaningful stats that grow with your momentum.</p>
          </div>
          <div className="glass-card p-8">
            <h4 className="text-lg font-semibold text-white">Calm Automation</h4>
            <p className="text-slate-400 mt-2">AI triage and prioritized micro-steps that reduce friction and restore flow.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} MomentumOS — Built for repair-first productivity.</div>
          <div className="flex gap-4"><a href="#">Terms</a><a href="#">Privacy</a></div>
        </div>
      </footer>
    </div>
  );
};
