import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Flame, Heart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
    const [open, setOpen] = useState<number | null>(0);

    const cards = [
        {
            id: 0,
            title: 'The Brain Dump',
            icon: Mic,
            blurb:
                'Speak your chaos. Gemini AI analyzes your overwhelm and synthesizes it into prioritized, structured tasks based on emotional weight and urgency.',
        },
        {
            id: 1,
            title: 'Pause & Simplify',
            icon: Flame,
            blurb:
                'Stuck? Don\'t delete. Hit "Pause & Simplify" to let AI generate an ultra-easy "Phoenix Quest" or self-care step to rebuild momentum without guilt.',
        },
        {
            id: 2,
            title: 'Sensory Reset Room',
            icon: Heart,
            blurb:
                'When the noise is too much, enter The Sanctuary. Follow the bio-feedback breathing orb and vent to a purely empathetic, task-free AI friend.',
        },
    ];

    return (
        <section id="how" className="max-w-7xl mx-auto px-6 py-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">The MomentumOS Engine</h3>
                <p className="mt-3 text-slate-400">An interactive system powered by Emotionally Intelligent AI to rebuild your focus.</p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {cards.map((c) => {
                    const Icon = c.icon as any;
                    return (
                        <div
                            key={c.id}
                            className="glass-card p-6 text-left flex flex-col items-start gap-4 hover:scale-[1.02] hover:border-white/10 transition-all border border-white/5 bg-white/[0.02] rounded-[1.5rem]"
                        >
                            <div className="flex items-center gap-4 w-full">
                                <div className="p-3 rounded-xl bg-vanguard-teal/10 border border-vanguard-teal/20"><Icon className="w-6 h-6 text-vanguard-teal" /></div>
                                <div className="flex-1">
                                    <div className="font-semibold text-white text-lg tracking-tight">{c.title}</div>
                                </div>
                            </div>

                            <div className="text-sm text-slate-300 leading-relaxed font-light mt-2">
                                {c.blurb}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HowItWorks;
