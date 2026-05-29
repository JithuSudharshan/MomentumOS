import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  x: number;
  y: number;
  onComplete: () => void;
}

export const StardustOverlay: React.FC<Props> = ({ x, y, onComplete }) => {
  const [burstParticles, setBurstParticles] = useState<any[]>([]);
  const [globalParticles, setGlobalParticles] = useState<any[]>([]);

  useEffect(() => {
    // 1. Localized Burst at cursor (x,y)
    const newBurst = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 30 + Math.random() * 120; // Explosion radius
      const size = 2 + Math.random() * 4;
      return {
        id: `burst-${i}`,
        size,
        targetX: Math.cos(angle) * velocity,
        targetY: Math.sin(angle) * velocity,
        duration: 1.2 + Math.random() * 1.5,
        color: ['#2DD4BF', '#A78BFA', '#ffffff'][Math.floor(Math.random() * 3)],
      };
    });

    // 2. Global Wash drifting upwards
    const newGlobal = Array.from({ length: 160 }).map((_, i) => ({
      id: `global-${i}`,
      startX: Math.random() * window.innerWidth,
      startY: window.innerHeight + 100 + Math.random() * 200, // Start below screen
      targetX: (Math.random() - 0.5) * 300, // Drift slightly horizontally
      targetY: -(window.innerHeight + 400), // Float all the way up and off screen
      size: 1 + Math.random() * 4,
      duration: 2.0 + Math.random() * 3.0,
      delay: Math.random() * 0.4, // Slight delay stagger
      color: ['#2DD4BF', '#A78BFA', '#4ADE80', '#FBBF24', '#ffffff'][Math.floor(Math.random() * 5)]
    }));

    setBurstParticles(newBurst);
    setGlobalParticles(newGlobal);

    // Auto cleanup after the longest animation finishes (4s max)
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array prevents reset on parent re-renders

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {/* Render Local Burst */}
        {burstParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x, y }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1.2, 0],
              x: x + p.targetX,
              y: y + p.targetY,
            }}
            transition={{ duration: p.duration, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
          />
        ))}

        {/* Render Global Wash */}
        {globalParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0, x: p.startX, y: p.startY }}
            animate={{
              opacity: [0, 0.8, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: p.startX + p.targetX,
              y: p.targetY,
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
            className="absolute rounded-full blur-[0.5px]"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
