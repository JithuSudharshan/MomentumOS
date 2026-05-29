import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

export const OverwhelmMode = () => {
  const navigate = useNavigate();
  const [ventText, setVentText] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked', e));
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ventText.trim()) return;

    setIsSynthesizing(true);
    try {
      const base = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${base}/api/sanctuary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ventText })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error(error);
      setAiResponse("I'm here for you. Take all the time you need to just breathe.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a1014] overflow-hidden"
    >
      {/* Background ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,212,191,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(167,139,250,0.05),transparent_40%)] pointer-events-none" />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-and-strings-10711.mp3"
      />

      {/* Top Bar */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Dashboard
        </button>
        <button
          onClick={toggleMute}
          className="p-3 rounded-full border border-white/5 bg-white/5 text-slate-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Breathing Orb */}
      <div className="relative flex flex-col items-center justify-center mb-16 z-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1.5, 1],
              opacity: [0.2, 0.5, 0.5, 0.2]
            }}
            transition={{ 
              duration: 10,
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-vanguard-teal/20 blur-[2rem]"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.25, 1.25, 1],
            }}
            transition={{ 
              duration: 10,
              times: [0, 0.4, 0.6, 1],
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-32 h-32 rounded-full border border-vanguard-teal/30 bg-gradient-to-tr from-vanguard-teal/10 to-transparent shadow-[0_0_40px_rgba(45,212,191,0.2)] flex items-center justify-center backdrop-blur-md"
          >
            <motion.p
              animate={{ opacity: [1, 0, 0, 1] }}
              transition={{ duration: 10, times: [0, 0.4, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
              className="absolute text-[10px] uppercase tracking-[0.4em] text-vanguard-teal font-medium"
            >
              Inhale
            </motion.p>
            <motion.p
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 10, times: [0, 0.4, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
              className="absolute text-[10px] uppercase tracking-[0.4em] text-vanguard-teal font-medium"
            >
              Exhale
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Venting Node */}
      <div className="w-full max-w-2xl px-8 z-10">
        <AnimatePresence mode="wait">
          {aiResponse ? (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <Sparkles className="w-8 h-8 text-vanguard-teal mx-auto opacity-70" />
              <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
                "{aiResponse}"
              </p>
              <button 
                onClick={() => { setAiResponse(null); setVentText(''); }}
                className="mt-8 text-[10px] uppercase tracking-[0.3em] text-vanguard-teal/60 hover:text-vanguard-teal border-b border-transparent hover:border-vanguard-teal/40 transition-all pb-1"
              >
                Clear Thoughts
              </button>
            </motion.div>
          ) : isSynthesizing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-5 py-12"
            >
              <Loader2 className="w-8 h-8 text-vanguard-teal/60 animate-spin" />
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] animate-pulse">Holding space for you...</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleVentSubmit}
              className="flex flex-col gap-6"
            >
              <div className="text-center mb-2">
                <h3 className="text-2xl font-semibold text-white/90 tracking-tight">The Sanctuary</h3>
                <p className="text-slate-400 mt-2 font-light text-sm">Everything is paused. What's on your mind right now?</p>
              </div>
              <textarea
                value={ventText}
                onChange={(e) => setVentText(e.target.value)}
                placeholder="Type here to vent..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-vanguard-teal/50 focus:ring-1 focus:ring-vanguard-teal/50 focus:bg-white/[0.05] transition-all resize-none min-h-[140px] text-lg font-light leading-relaxed"
              />
              <button
                type="submit"
                disabled={!ventText.trim()}
                className="self-center px-10 py-3.5 rounded-full bg-vanguard-teal/10 text-vanguard-teal border border-vanguard-teal/20 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-vanguard-teal/20 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-[0_0_20px_rgba(45,212,191,0.05)]"
              >
                Release
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
