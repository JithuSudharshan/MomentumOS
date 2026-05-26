import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
    const [open, setOpen] = useState<number | null>(0);

    const cards = [
        {
            id: 0,
            title: 'AI Triage & Micro-steps',
            icon: Sparkles,
            blurb:
                'Drop in everything that’s on your mind. The AI triages, groups related tasks, and surfaces tiny, actionable micro-steps so starting feels effortless.',
        },
        {
            id: 1,
            title: 'Momentum → Resonance',
            icon: Award,
            blurb:
                'Small completions generate Resonance (XP). Resonance fills your collector and unlocks gentle helpful boosts — visual, meaningful progress without guilt.',
        },
        {
            id: 2,
            title: 'Shield & Recovery Quests',
            icon: ShieldCheck,
            blurb:
                'When you miss tasks your shield weakens. Instead of shame, you get Recovery Quests: guided repairs that rebuild capability and confidence.',
        },
    ];

    return (
        <section id="how" className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold text-white">How MomentumOS Works</h3>
                <p className="mt-3 text-slate-400">An interactive system that turns to-do lists into a compassionate RPG for habit and focus.</p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {cards.map((c) => {
                    const Icon = c.icon as any;
                    const isOpen = open === c.id;
                    return (
                        <motion.button
                            key={c.id}
                            onClick={() => setOpen(isOpen ? null : c.id)}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: c.id * 0.06 }}
                            className="glass-card p-6 text-left flex flex-col items-start gap-3 hover:scale-[1.01] transition"
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/8"><Icon className="w-5 h-5 text-vanguard-ice" /></div>
                                <div className="flex-1">
                                    <div className="font-semibold text-white">{c.title}</div>
                                    <div className="text-sm text-slate-400">{c.blurb.substring(0, 90)}{c.blurb.length > 90 ? '…' : ''}</div>
                                </div>
                                <div className="text-xs text-vanguard-teal">{isOpen ? 'Close' : 'Learn'}</div>
                            </div>

                            {isOpen && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-slate-300">
                                    {c.blurb}
                                    <div className="mt-3 text-xs text-slate-400">Try it: click a node in the Dashboard to see triage + micro-step suggestions.</div>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-8 text-center text-sm text-slate-400">
                Tip: MomentumOS reframes failure as a system signal — the UI guides repair, not shame.
            </div>
        </section>
    );
};

export default HowItWorks;
