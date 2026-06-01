import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Flame, Heart, ShieldCheck, Gamepad2, Layers } from 'lucide-react';
import { AIOrb } from '../components/AIOrb';
import { HowItWorks } from '../components/HowItWorks';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-background-panel2/80 border border-white/10 shadow-orb">
            <div className="h-6 w-6 rounded-md bg-vanguard-ice/80" />
          </div>
          <div>
            <div className="text-sm font-semibold text-vanguard-slate">MOMENTUMOS</div>
            <div className="text-xs text-slate-500">Sanctuary OS</div>
          </div>
        </div>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm text-slate-300">
          <div className="hidden md:flex items-center gap-6">
            <a className="hover:text-white transition" href="#how">The Engine</a>
            <a className="hover:text-white transition" href="#features">Philosophy</a>
            <a className="hover:text-white transition" href="https://github.com/JithuSudharshan/MomentumOS" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <button onClick={() => navigate('/dashboard')} className="rounded-full bg-vanguard-teal/15 text-vanguard-teal px-4 sm:px-4 py-2 uppercase text-[10px] sm:text-xs tracking-widest hover:bg-vanguard-teal/25 transition-colors">ENTER SYSTEM</button>
        </nav>
      </header>

      <main className="min-h-[72vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 z-10">
            <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              An Emotionally Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vanguard-teal via-vanguard-ice to-vanguard-ember">Productivity Engine.</span>
            </motion.h1>

            <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12, duration: 0.9 }} className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Traditional task managers assume you operate at 100% capacity all the time. MomentumOS is different. Powered by AI, it adapts to your mental state, simplifies overwhelming tasks, and turns your productivity into a guilt-free, gamified experience.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button whileTap={{ scale: 0.98 }} onClick={() => navigate('/dashboard')} className="inline-flex items-center justify-center gap-3 rounded-full bg-vanguard-teal text-background-obsidian px-6 sm:px-8 py-3 sm:py-4 font-semibold shadow-[0_0_40px_rgba(45,212,191,0.3)] hover:scale-105 transition-all text-xs sm:text-sm uppercase tracking-[0.2em]">
                <Sparkles className="w-5 h-5" />
                Initialize System
              </motion.button>

              <a href="#how" className="inline-flex items-center justify-center gap-3 rounded-full bg-white/5 text-slate-300 px-6 sm:px-8 py-3 sm:py-4 border border-white/10 hover:bg-white/10 transition-colors text-xs sm:text-sm uppercase tracking-[0.2em]">View Features</a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[350px] sm:h-[500px] flex items-center justify-center perspective-1000 mt-4 lg:mt-0 scale-[0.8] sm:scale-100 origin-center">
            {/* Ambient background glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.1),transparent_50%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125">
              <AIOrb />
            </div>

            {/* Floating Glass Cards representing features */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-0 w-64 glass-card p-4 border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-vanguard-ice" />
                <span className="text-xs uppercase tracking-widest text-slate-400">Brain Dump</span>
              </div>
              <p className="text-sm text-white font-medium">Synthesizing audio into structured tasks...</p>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[45%] -right-[10%] md:-right-[5%] w-72 glass-card p-4 border border-vanguard-ember/30 bg-vanguard-ember/10 shadow-[0_0_30px_rgba(239,68,68,0.15)] backdrop-blur-xl rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-vanguard-ember" />
                <span className="text-xs uppercase tracking-widest text-vanguard-ember">Phoenix Quest</span>
              </div>
              <p className="text-sm text-white font-medium">Drink a glass of water and rest your eyes.</p>
              <div className="mt-2 text-xs text-vanguard-teal">+50 XP</div>
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] left-[10%] w-60 glass-card p-4 border border-vanguard-verdant/30 bg-vanguard-verdant/10 shadow-[0_0_30px_rgba(74,222,128,0.1)] backdrop-blur-xl rounded-2xl flex items-center gap-4"
            >
              <ShieldCheck className="w-8 h-8 text-vanguard-verdant" />
              <div>
                <p className="text-sm font-semibold text-white">Shield Restored</p>
                <p className="text-xs text-slate-400">Momentum regained</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <HowItWorks />

      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Built for the Modern Mind</h2>
          <p className="mt-4 text-slate-400 text-lg">A completely new approach to productivity.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="glass-card p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/5 rounded-[2rem]">
            <Heart className="w-8 h-8 text-vanguard-ember mb-6" />
            <h4 className="text-lg font-semibold text-white">Zero-Guilt Architecture</h4>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">No overdue red text. No punishing notifications. When you slip up, the system guides your repair.</p>
          </div>
          <div className="glass-card p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/5 rounded-[2rem]">
            <Gamepad2 className="w-8 h-8 text-vanguard-verdant mb-6" />
            <h4 className="text-lg font-semibold text-white">Gamified RPG Elements</h4>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">Level up your Intellect, Vitality, and Creativity. Maintain streaks to keep your protective Shield active.</p>
          </div>
          <div className="glass-card p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/5 rounded-[2rem]">
            <Brain className="w-8 h-8 text-vanguard-ice mb-6" />
            <h4 className="text-lg font-semibold text-white">Emotion-Aware AI</h4>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">Gemini AI analyzes your inputs to detect stress, adjusting task priorities and offering empathetic support.</p>
          </div>
          <div className="glass-card p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/5 rounded-[2rem]">
            <Layers className="w-8 h-8 text-vanguard-teal mb-6" />
            <h4 className="text-lg font-semibold text-white">Vanguard Aesthetics</h4>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">A distraction-free, deeply atmospheric dark mode utilizing premium glassmorphism and subtle animations.</p>
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
