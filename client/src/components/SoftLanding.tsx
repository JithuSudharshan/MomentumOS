import { motion } from 'framer-motion';
import { Flame, CheckCircle2, X } from 'lucide-react';
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10"
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/50"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-full sm:max-w-2xl rounded-3xl bg-gradient-to-br from-background-panel to-background-panel/80 border border-vanguard-teal/20 p-8 sm:p-12 shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
            >
                {/* Phoenix Icon Glow */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-6 right-6 w-16 h-16 bg-vanguard-ember/10 rounded-full blur-2xl"
                />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                >
                    <X className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-3 bg-vanguard-ember/20 rounded-2xl text-vanguard-ember"
                        >
                            <Flame className="w-8 h-8" />
                        </motion.div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-vanguard-ember/70 mb-1">Phoenix Quest</p>
                            <h3 className="text-3xl font-bold text-white">Rise from the ashes</h3>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-8 space-y-3">
                        <p className="text-lg text-slate-100 font-light leading-relaxed">
                            Your momentum faltered, but your shield isn't gone. Let's rebuild—one micro-step at a time.
                        </p>
                        <p className="text-sm text-slate-400">
                            Complete this recovery quest to restore your Resonance and regain your protective barrier.
                        </p>
                    </div>

                    {/* Recovery Task Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/3 border border-vanguard-teal/30 backdrop-blur-sm"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h4 className="text-xl font-semibold text-white mb-3">
                                    {phoenixQuest.title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase tracking-wider">
                                        {phoenixQuest.energyRequired} energy
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-vanguard-teal/10 border border-vanguard-teal/30 text-vanguard-teal uppercase tracking-wider font-semibold">
                                        +{phoenixQuest.xpReward} XP
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-vanguard-ice/10 border border-vanguard-ice/30 text-vanguard-ice uppercase tracking-wider">
                                        +Resonance
                                    </span>
                                </div>
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-vanguard-teal opacity-70"
                            >
                                <Flame className="w-6 h-6" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all font-medium uppercase tracking-wider text-sm"
                        >
                            Take a moment
                        </button>
                        <motion.button
                            onClick={() => {
                                recoverTask(phoenixQuest.id);
                                onClose();
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-vanguard-teal/20 to-vanguard-teal/10 hover:from-vanguard-teal/30 hover:to-vanguard-teal/20 text-vanguard-teal border border-vanguard-teal/50 rounded-2xl font-semibold uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(45,212,191,0.15)] hover:shadow-[0_0_40px_rgba(45,212,191,0.25)] transition-all"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Begin Recovery
                        </motion.button>
                    </div>

                    {/* Help Text */}
                    <p className="mt-6 text-xs text-slate-500 text-center">
                        Recovering task: {phoenixQuest.isMicroStep ? 'Guided micro-step to rebuild your shield' : 'Recovery in progress'}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};
