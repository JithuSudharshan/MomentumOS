import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { BackgroundAurora } from './components/BackgroundAurora';
import { Landing } from './components/Landing';
import { Sanctuary } from './pages/Sanctuary';
import { useStore } from './store/useStore';

function App() {
  const initializeStore = useStore((state) => state.initializeStore);

  React.useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <Router>
      <BackgroundAurora />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset" element={<Sanctuary />} />
      </Routes>
    </Router>
  );
}

export default App;
