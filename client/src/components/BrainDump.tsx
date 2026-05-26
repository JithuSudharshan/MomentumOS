import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Send, Loader2, Mic, MicOff } from 'lucide-react';
import { useStore } from '../store/useStore';

export const BrainDump = () => {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const addBrainDump = useStore((state) => state.addBrainDump);

  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API. Try Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setText((prev) => prev + (prev.endsWith(' ') ? '' : ' ') + currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    await addBrainDump(text);
    setText('');
    setIsProcessing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white/5 rounded-2xl text-aurora-cyan shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h2 className="text-xl font-medium text-white/90 tracking-wide">Cognitive Offload</h2>
          <p className="text-sm text-slate-400 font-light">Empty your mind. I'll organize the rest.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I'm feeling burnt out... I need to finish the math project by Friday, but I also have laundry piling up..."
          className="glass-input min-h-[140px]"
          disabled={isProcessing}
        />
        
        {/* Glow behind the button */}
        <div className="absolute bottom-5 right-5 w-10 h-10 bg-aurora-cyan/30 rounded-full blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
        
        <div className="absolute bottom-5 right-20 w-10 h-10 bg-aurora-purple/30 rounded-full blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
        <button
          type="button"
          onClick={toggleListen}
          disabled={isProcessing}
          className={`absolute bottom-5 right-20 p-3 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center justify-center ${
            isListening 
              ? 'bg-aurora-purple/20 text-aurora-purple shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-pulse' 
              : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
          }`}
          title="Voice Dump"
        >
          {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        
        <button
          type="submit"
          disabled={isProcessing || !text.trim()}
          className="absolute bottom-5 right-5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/20 text-white p-3 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center justify-center"
        >
          {isProcessing ? <Loader2 className="w-5 h-5 animate-spin text-aurora-cyan" /> : <Send className="w-5 h-5" />}
        </button>

        {isListening && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute -bottom-8 left-0 text-xs text-aurora-purple/80 tracking-widest uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-aurora-purple rounded-full animate-ping" />
            Listening to your thoughts...
          </motion.div>
        )}

        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute -bottom-8 left-0 text-xs text-aurora-cyan/80 tracking-widest uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-aurora-cyan rounded-full animate-ping" />
            Synthesizing thoughts...
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};
