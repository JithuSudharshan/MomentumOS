import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SoftLanding = ({ onClose }: { onClose: () => void }) => {
    const tasks = useStore((s) => s.tasks);
    const recoveringTasks = tasks.filter(t => t.status === 'recovering' && t.isMicroStep);
    const recoverTask = useStore((s) => s.recoverTask);

    // Get the first recovery task (Phoenix Quest)
    const phoenixQuest = recoveringTasks[0];

    if (!phoenixQuest) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-background-panel/95 shadow-glass"
            >
                <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] p-8 sm:p-10">
                    <section className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
                                <div className="h-2.5 w-2.5 rounded-full bg-vanguard-ember" />
                                <span>Phoenix Quest</span>
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-4xl font-semibold tracking-tight text-white">Recover gently, stay in flow.</h2>
                                <p className="max-w-2xl text-base leading-8 text-slate-300">
                                    MomentumOS surfaces a single, low-friction recovery step when your shield breaks. This page helps you move forward with clarity, not pressure.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current recovery task</p>
                                    <h3 className="mt-3 text-2xl font-semibold text-white">{phoenixQuest.title}</h3>
                                </div>
                                <div className="rounded-3xl bg-vanguard-teal/10 px-4 py-2 text-sm font-semibold text-vanguard-teal">
                                    Low friction
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl bg-background-panel2/90 border border-white/10 p-4 text-sm text-slate-300">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Energy</p>
                                    <p className="mt-2 text-lg font-medium text-white">{phoenixQuest.energyRequired}</p>
                                </div>
                                <div className="rounded-3xl bg-background-panel2/90 border border-white/10 p-4 text-sm text-slate-300">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Reward</p>
                                    <p className="mt-2 text-lg font-medium text-white">+{phoenixQuest.xpReward} XP</p>
                                </div>
                                <div className="rounded-3xl bg-background-panel2/90 border border-white/10 p-4 text-sm text-slate-300">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Purpose</p>
                                    <p className="mt-2 leading-6 text-slate-300">Repair shield and recover momentum with an achievable win.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-400 leading-relaxed">
                                This is your safe rebuild step. Completing it restores your shield and honors your progress without restarting from zero.
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <button
                                    onClick={onClose}
                                    className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                                >
                                    Pause for a moment
                                </button>
                                <button
                                    onClick={() => {
                                        recoverTask(phoenixQuest.id);
                                        onClose();
                                    }}
                                    className="rounded-3xl bg-vanguard-teal px-6 py-4 text-sm font-semibold text-slate-950 shadow-[0_20px_50px_rgba(45,212,191,0.2)] transition hover:bg-vanguard-teal/90"
                                >
                                    Begin Phoenix Recovery
                                </button>
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-2xl bg-vanguard-ember/10 p-3 text-vanguard-ember">
                                <Flame className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Shield status</p>
                                <p className="mt-2 text-lg font-semibold text-white">Breach detected</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-slate-300">
                            <div className="rounded-3xl bg-background-panel2/90 border border-white/10 p-4">
                                <p className="font-semibold text-white">Soft Landing</p>
                                <p className="mt-2 text-slate-400">A calm re-entry path for your focus so you can start again without friction.</p>
                            </div>
                            <div className="rounded-3xl bg-background-panel2/90 border border-white/10 p-4">
                                <p className="font-semibold text-white">Recovery summary</p>
                                <p className="mt-2 text-slate-400">Micro-step is designed to be actionable, clear, and reassuring.</p>
                            </div>
                            <div className="rounded-3xl bg-background-panel2/90 border border-white/10 p-4">
                                <p className="font-semibold text-white">Momentum lens</p>
                                <p className="mt-2 text-slate-400">One small, meaningful action restores your confidence and keeps progress alive.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </motion.div>
        </motion.div>
    );
};
