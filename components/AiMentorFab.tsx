"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, X, Send } from "lucide-react";

export function AiMentorFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    // In a real implementation this would ping the Gemini API
    console.log("Query sent to mentor:", query);
    setQuery("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 glass-card border border-violet-500/30 shadow-[0_10px_40px_rgba(139,92,246,0.3)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-600/50 to-cyan-600/50 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AI Mentor</h3>
                  <p className="text-[10px] text-white/70">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Body Mock */}
            <div className="p-4 h-64 overflow-y-auto flex text-sm flex-col gap-3 bg-black/40 relative pattern-dots w-full relative z-0">
               <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] z-10" />
               <div className="relative z-20 flex flex-col gap-3">
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                    <p className="text-[var(--text-secondary)]">Hi there! I'm your AI Career Mentor. I can help you analyze your resume, prepare for interviews, or answer any career-related questions.</p>
                  </div>
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-3 max-w-[85%] mt-1">
                    <p className="text-[var(--text-secondary)]">What would you like to explore today?</p>
                  </div>
               </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-black/60 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your mentor anything..." 
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-violet-500/50 text-white placeholder:text-white/30"
              />
              <button 
                type="submit"
                disabled={!query}
                className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-600 transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-white -ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center z-50 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-shadow border border-white/20"
      >
        <MessageSquare className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`} />
        <X className={`w-6 h-6 absolute transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-0'}`} />
      </motion.button>
    </>
  );
}
