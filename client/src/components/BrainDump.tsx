import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Send, Loader2, Mic, MicOff, ChevronRight, Activity, Zap, Wind } from 'lucide-react';
import { useStore, BrainDumpResponse } from '../store/useStore';

export const BrainDump = () => {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState<BrainDumpResponse | null>(null);
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
    const data = await addBrainDump(text);
    if (data) {
      setAiResponse(data);
    }
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
      <div className="py-6 sm:py-8 px-5 sm:px-8 border-b border-white/5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-vanguard-teal/10 rounded-2xl text-vanguard-teal shadow-[0_0_20px_rgba(45,212,191,0.15)] flex-shrink-0 mt-1">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{aiResponse ? 'Synthesis Complete' : 'Cognitive Offload'}</h2>
            <p className="text-sm text-slate-400 font-light mt-2 leading-relaxed">
              {aiResponse 
                ? 'Your thoughts have been structured into a calm, prioritized action plan.' 
                : 'Dump everything on your mind—anxious thoughts, conflicting tasks, worries. The AI will parse the chaos and turn it into organized nodes you can tackle one at a time.'}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!aiResponse ? (
          <motion.form 
            key="input-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="p-5 sm:p-8"
          >
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
                
                <AnimatePresence>
                  {(isListening || isProcessing) && (
                    <motion.div
                      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                      className={`absolute inset-0 flex items-center justify-center text-sm font-semibold tracking-widest uppercase gap-3 rounded-2xl border ${
                        isProcessing
                          ? 'bg-vanguard-ice/15 border-vanguard-ice/30 text-vanguard-ice shadow-[inset_0_0_60px_rgba(167,139,250,0.15)]'
                          : 'bg-vanguard-teal/15 border-vanguard-teal/30 text-vanguard-teal shadow-[inset_0_0_60px_rgba(45,212,191,0.15)]'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Synthesizing Data...
                        </>
                      ) : (
                        <>
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vanguard-teal opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-vanguard-teal shadow-[0_0_10px_rgba(45,212,191,1)]"></span>
                          </span>
                          Active Listening...
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
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
                  className="sm:ml-auto w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 bg-vanguard-teal/15 hover:bg-vanguard-teal/25 disabled:bg-white/5 disabled:text-white/30 text-vanguard-teal font-semibold text-sm tracking-wide uppercase rounded-2xl border border-vanguard-teal/30 hover:border-vanguard-teal/50 transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(45,212,191,0.1)] disabled:shadow-none"
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
          </motion.form>
        ) : (
          <motion.div 
            key="response-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-8 space-y-6 sm:space-y-8"
          >
            {/* Empathy */}
            <div className="p-6 rounded-2xl bg-vanguard-teal/5 border border-vanguard-teal/20 shadow-[inset_0_0_20px_rgba(45,212,191,0.05)]">
              <p className="text-lg text-white font-medium leading-relaxed">{aiResponse.supportive_response}</p>
            </div>

            {/* Emotional State */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Detected State</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-rose-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Stress</p>
                    <p className="text-sm font-medium text-white capitalize">{aiResponse.emotion.stress_level}</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <Wind className="w-5 h-5 text-sky-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Overwhelm</p>
                    <p className="text-sm font-medium text-white capitalize">{aiResponse.emotion.overwhelm_level}</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Energy</p>
                    <p className="text-sm font-medium text-white capitalize">{aiResponse.emotion.energy_level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Plan */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Recommended Action Plan</h3>
              <div className="space-y-3">
                {aiResponse.recommended_plan.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/30 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] hover:-translate-y-1 transition-all duration-500 ease-out cursor-default">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-vanguard-teal/20 text-vanguard-teal flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Recommendation */}
            <div className="bg-[#19232F]/80 p-6 rounded-2xl border border-vanguard-ice/20">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-vanguard-ice/80 mb-2">Primary Focus</h3>
              <p className="text-white font-medium text-lg flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-vanguard-ice" />
                {aiResponse.focus_recommendation}
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={() => setAiResponse(null)}
                className="px-6 py-3 rounded-2xl font-semibold text-sm tracking-wide uppercase transition-all border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
              >
                Clear & Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
