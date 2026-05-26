import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export const AIOrb = () => {
  const isOverwhelmed = useStore((state) => state.isOverwhelmed);
  const tasks = useStore((state) => state.tasks);
  const recoveringTask = tasks.find((t) => t.status === 'recovering');
  const allCaughtUp = tasks.filter((t) => t.status !== 'completed').length === 0;

  let state: 'focused' | 'overwhelmed' | 'recovering' | 'momentum' = 'focused';
  if (isOverwhelmed) state = 'overwhelmed';
  else if (recoveringTask) state = 'recovering';
  else if (allCaughtUp && tasks.length > 0) state = 'momentum';

  const glowMap = {
    focused: 'rgba(45, 212, 191, 0.3)',
    overwhelmed: 'rgba(239, 68, 68, 0.22)',
    recovering: 'rgba(167, 139, 250, 0.28)',
    momentum: 'rgba(167, 139, 250, 0.32)',
  };

  return (
    <div className="relative flex justify-center items-center w-56 h-56">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-vanguard-ice/10"
      />

      <motion.div
        animate={{ boxShadow: `0 0 90px 22px ${glowMap[state]}` }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-8 rounded-full bg-vanguard-ice/15"
      />

      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-vanguard-ice/20 via-vanguard-teal/10 to-vanguard-ember/10 shadow-orb"
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-10 rounded-full bg-white/15 blur-xl" />
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-vanguard-ice/75 shadow-[0_0_30px_rgba(167,139,250,0.35)]" />
          <div className="absolute inset-x-16 top-8 h-2 rounded-full bg-vanguard-teal/70 blur-sm" />
          <div className="absolute inset-x-16 bottom-8 h-2 rounded-full bg-vanguard-ember/60 blur-sm" />
        </div>
      </motion.div>
    </div>
  );
};
