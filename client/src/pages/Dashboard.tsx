import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrainDump } from '../components/BrainDump';
import { QuickAdd } from '../components/QuickAdd';
import { TaskList } from '../components/TaskList';
import { Sidebar } from '../components/Sidebar';
import { AIOrb } from '../components/AIOrb';
import { PersonalGrowthArchive } from '../components/PersonalGrowthArchive';
import { BadgeCelebrationManager } from '../components/BadgeCelebrationManager';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-16">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-6 group text-left hover:opacity-90 transition-opacity"
          >
            <div className="scale-50 -ml-12 -my-12 group-hover:scale-[0.55] transition-transform duration-500">
              {/* Mini Orb for header */}
              <AIOrb />
            </div>
            <h1 className="text-2xl font-light tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">MomentumOS</h1>
          </button>

          <button
            onClick={() => navigate('/reset')}
            className="relative flex items-center gap-2 text-sm text-white/80 hover:text-white bg-white/5 backdrop-blur-md px-6 py-3 rounded-full transition-all group overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          >
            <div className="absolute inset-0 rounded-full border border-aurora-cyan/30 group-hover:border-aurora-cyan/60 animate-pulse" />
            <Eye className="w-4 h-4 text-aurora-cyan group-hover:scale-110 transition-transform" />
            <span className="tracking-widest uppercase text-xs font-medium">Breathe & Reset</span>
          </button>
        </header>

        {/* Spatial Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-12"
          >
            <BrainDump />
            <QuickAdd />
            <TaskList />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <Sidebar onOpenArchive={() => setIsArchiveOpen(true)} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isArchiveOpen && (
          <PersonalGrowthArchive onClose={() => setIsArchiveOpen(false)} />
        )}
      </AnimatePresence>

      <BadgeCelebrationManager />
    </div>
  );
};
