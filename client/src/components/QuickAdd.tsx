import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useStore, EnergyLevel } from '../store/useStore';

export const QuickAdd = () => {
  const [title, setTitle] = useState('');
  const [energy, setEnergy] = useState<EnergyLevel>('low');
  const addTask = useStore(state => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      category: 'work', // default category
      energyRequired: energy,
      xpReward: energy === 'high' ? 50 : energy === 'medium' ? 25 : 10
    });
    
    setTitle('');
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card p-3 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 relative overflow-hidden mt-6"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-aurora-cyan/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center gap-2 relative z-10 w-full sm:w-auto flex-1">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quick add a simple task..."
          className="bg-transparent border-none text-white/90 placeholder:text-white/30 focus:outline-none flex-1 px-2 sm:px-4 py-2 sm:py-3 font-light tracking-wide w-full min-w-0"
        />
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 relative z-10 w-full sm:w-auto border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0">
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as EnergyLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setEnergy(level)}
              className={`px-3 py-1.5 rounded-md text-xs tracking-wider capitalize transition-all ${
                energy === level 
                  ? 'bg-white/10 text-white border border-white/20' 
                  : 'text-white/40 hover:text-white/70 border border-transparent'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <button 
          type="submit"
          disabled={!title.trim()}
          className="bg-aurora-cyan/20 text-aurora-cyan p-2 sm:p-3 rounded-xl hover:bg-aurora-cyan/30 disabled:opacity-30 transition-all flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );
};
