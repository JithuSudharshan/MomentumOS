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

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setText((prev) => prev + (prev.endsWith(' ') ? '' : ' ') + currentTranscript);
    };

    recognition.onerror = (event: any) => {
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
      className="console-panel"
    >
      {/* Header Section */}
      <div className="py-8 px-8 border-b border-white/5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-vanguard-teal/10 rounded-2xl text-vanguard-teal shadow-[0_0_20px_rgba(45,212,191,0.15)] flex-shrink-0 mt-1">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Cognitive Offload</h2>
            <p className="text-sm text-slate-400 font-light mt-2 leading-relaxed">Dump everything on your mind—anxious thoughts, conflicting tasks, worries. The AI will parse the chaos and turn it into organized nodes you can tackle one at a time.</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="space-y-6">
          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I'm feeling burnt out... I need to finish the math project by Friday, but I also have laundry piling up..."
              className="w-full min-h-[180px] bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-vanguard-teal/50 focus:bg-white/8 focus:ring-1 focus:ring-vanguard-teal/30 transition resize-none font-light leading-relaxed"
              disabled={isProcessing}
            />
            {isListening && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 text-xs text-vanguard-teal/80 tracking-widest uppercase flex items-center gap-2 bg-vanguard-teal/10 px-3 py-2 rounded-lg backdrop-blur-sm border border-vanguard-teal/20"
              >
                <span className="w-1.5 h-1.5 bg-vanguard-teal rounded-full animate-pulse" />
                Listening...
              </motion.div>
            )}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 text-xs text-vanguard-ice/80 tracking-widest uppercase flex items-center gap-2 bg-vanguard-ice/10 px-3 py-2 rounded-lg backdrop-blur-sm border border-vanguard-ice/20"
              >
                <span className="w-1.5 h-1.5 bg-vanguard-ice rounded-full animate-spin" />
                Synthesizing...
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 justify-between sm:justify-start">
            <motion.button
              type="button"
              onClick={toggleListen}
              disabled={isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-sm tracking-wide uppercase transition-all border backdrop-blur-sm ${isListening
                  ? 'bg-vanguard-teal/15 text-vanguard-teal border-vanguard-teal/30 shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Voice Dump"
            >
              {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>{isListening ? 'Listening' : 'Voice Dump'}</span>
            </motion.button>

            <motion.button
              type="submit"
              disabled={isProcessing || !text.trim()}
              whileHover={{ scale: !isProcessing && text.trim() ? 1.05 : 1 }}
              whileTap={{ scale: !isProcessing && text.trim() ? 0.95 : 1 }}
              className="ml-auto inline-flex items-center gap-3 px-6 py-3 bg-vanguard-teal/15 hover:bg-vanguard-teal/25 disabled:bg-white/5 disabled:text-white/30 text-vanguard-teal font-semibold text-sm tracking-wide uppercase rounded-2xl border border-vanguard-teal/30 hover:border-vanguard-teal/50 transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(45,212,191,0.1)] disabled:shadow-none"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Synthesize</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Helper text */}
          <p className="text-xs text-slate-500 font-light mt-4">
            💡 <span className="text-slate-400">Tip:</span> Be as messy or detailed as you need. The AI will extract actionable nodes and assign energy levels automatically.
          </p>
        </div>
      </form>
    </motion.div>
  );
};
