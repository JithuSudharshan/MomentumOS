import { motion } from 'framer-motion';

export const BackgroundAurora = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          x: [0, 80, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[15%] -left-[15%] h-[65vw] w-[65vw] rounded-full bg-vanguard-ice/10 blur-[140px]"
      />

      <motion.div
        animate={{
          opacity: [0.18, 0.4, 0.18],
          x: [0, -90, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[35%] right-[-10%] h-[55vw] w-[55vw] rounded-full bg-vanguard-teal/10 blur-[140px]"
      />

      <motion.div
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-[-15%] left-[20%] h-[80vw] w-[45vw] rounded-full bg-vanguard-ember/8 blur-[170px]"
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 18%), radial-gradient(circle at 80% 10%, rgba(167,139,250,0.14), transparent 20%), radial-gradient(circle at 50% 80%, rgba(45,212,191,0.08), transparent 22%), linear-gradient(135deg, rgba(255,255,255,0.02), transparent)',
          backgroundBlendMode: 'screen',
        }}
      />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 80C40 100 80 60 100 80C120 100 160 60 180 80%22 stroke=%22rgba(167,139,250,0.08)%22 stroke-width=%223%22 fill=%22none%22/%3E%3Cpath d=%22M10 140C50 120 90 180 130 160C170 140 190 170 190 170%22 stroke=%22rgba(45,212,191,0.06)%22 stroke-width=%223%22 fill=%22none%22/%3E%3C/svg%3E')] opacity-60 mix-blend-overlay" />
    </div>
  );
};
