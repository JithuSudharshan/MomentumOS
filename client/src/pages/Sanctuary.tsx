
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { SoftLanding } from '../components/SoftLanding';
import { OverwhelmMode } from '../components/OverwhelmMode';

export const Sanctuary = () => {
  const navigate = useNavigate();
  const stats = useStore((state) => state.stats);
  const tasks = useStore((state) => state.tasks);

  const hasRecoveryTasks = tasks.some(t => t.status === 'recovering' && t.isMicroStep);
  const showSoftLanding = !stats.shieldActive && hasRecoveryTasks;

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen text-slate-50 relative z-50">
      <AnimatePresence mode="wait">
        {showSoftLanding ? <SoftLanding onClose={handleClose} /> : <OverwhelmMode />}
      </AnimatePresence>
    </div>
  );
};
