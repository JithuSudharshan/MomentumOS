import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { BackgroundAurora } from './components/BackgroundAurora';
import { Landing } from './components/Landing';
import { useStore } from './store/useStore';

function App() {
  const [started, setStarted] = useState(false);
  const initializeStore = useStore((state) => state.initializeStore);

  React.useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (started) {
    return (
      <>
        <BackgroundAurora />
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <BackgroundAurora />
      <Landing onStart={() => setStarted(true)} />
    </>
  );
}

export default App;
