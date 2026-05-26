import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export const AIOrb = () => {
  const isOverwhelmed = useStore((state) => state.isOverwhelmed);
  const tasks = useStore((state) => state.tasks);
  
  const recoveringTask = tasks.find(t => t.status === 'recovering');
  const allCaughtUp = tasks.filter(t => t.status !== 'completed').length === 0;

  // Determine state
  let state: 'focused' | 'overwhelmed' | 'recovering' | 'momentum' = 'focused';
  
  if (isOverwhelmed) state = 'overwhelmed';
  else if (recoveringTask) state = 'recovering';
  else if (allCaughtUp && tasks.length > 0) state = 'momentum';

  // State-based visuals
  const orbVariants = {
    focused: {
      scale: [1, 1.05, 1],
      boxShadow: ['0 0 40px 10px rgba(34, 211, 238, 0.3)', '0 0 60px 15px rgba(34, 211, 238, 0.4)', '0 0 40px 10px rgba(34, 211, 238, 0.3)'],
      backgroundColor: 'rgba(34, 211, 238, 0.8)',
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    overwhelmed: {
      scale: [1, 0.95, 1],
      boxShadow: ['0 0 20px 5px rgba(253, 186, 116, 0.1)', '0 0 30px 10px rgba(253, 186, 116, 0.2)', '0 0 20px 5px rgba(253, 186, 116, 0.1)'],
      backgroundColor: 'rgba(253, 186, 116, 0.6)',
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } // Slower breathing
    },
    recovering: {
      scale: [1, 1.1, 1],
      boxShadow: ['0 0 30px 10px rgba(52, 211, 153, 0.2)', '0 0 50px 15px rgba(139, 92, 246, 0.3)', '0 0 30px 10px rgba(52, 211, 153, 0.2)'],
      backgroundColor: 'rgba(52, 211, 153, 0.7)',
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    },
    momentum: {
      scale: [1, 1.1, 1],
      boxShadow: ['0 0 50px 20px rgba(34, 211, 238, 0.5)', '0 0 80px 30px rgba(139, 92, 246, 0.6)', '0 0 50px 20px rgba(34, 211, 238, 0.5)'],
      backgroundColor: 'rgba(139, 92, 246, 0.9)',
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative flex justify-center items-center w-48 h-48">
      {/* Ambient core */}
      <motion.div
        animate={state}
        variants={orbVariants}
        className="w-24 h-24 rounded-full blur-[2px] z-10"
      />
      
      {/* Inner bright core */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-12 h-12 bg-white/80 blur-[8px] rounded-full z-20"
      />

      {/* Orbiting particles for momentum state */}
      <AnimatePresence>
        {state === 'momentum' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-aurora-cyan rounded-full blur-[1px] shadow-[0_0_10px_#22D3EE]" />
            <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-aurora-purple rounded-full blur-[2px] shadow-[0_0_15px_#8B5CF6]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
