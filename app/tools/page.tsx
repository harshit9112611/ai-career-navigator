"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, FileText, Layers, RefreshCcw, DollarSign, BrainCircuit, FlipHorizontal } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const FLASHCARDS = [
  { q: "What is the virtual DOM in React?", a: "A lightweight copy of the actual DOM that allows React to do computations within the memory and only push the minimal necessary changes to the real DOM." },
  { q: "Explain the difference between SQL and NoSQL.", a: "SQL databases are relational and table-based with a predefined schema. NoSQL databases are non-relational, document, key-value, or graph-based with dynamic schemas." },
  { q: "What is an API?", a: "Application Programming Interface - a set of rules and protocols ensuring different software components can communicate with each other." }
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("salary");
  
  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Resume state
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handleScoreResume = () => {
    setCalculating(true);
    setResumeScore(null);
    setTimeout(() => {
      setResumeScore(Math.floor(Math.random() * (95 - 65 + 1) + 65));
      setCalculating(false);
    }, 1500);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 150);
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] h-auto overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 mt-4 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/10 text-sm text-pink-400 mb-4">
            <Layers className="w-4 h-4" />
            Interactive Toolkit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career <span className="gradient-text">Power Tools</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Everything you need to benchmark your worth, prep for interviews, and optimize your hiring potential.
          </p>
        </motion.div>

        {/* Tool Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "salary", label: "Salary Calculator", icon: Calculator },
            { id: "resume", label: "Resume Scorer", icon: FileText },
            { id: "flashcards", label: "Prep Flashcards", icon: BrainCircuit }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id 
                ? 'bg-white text-black shadow-lg shadow-white/10' 
                : 'glass-card text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="glass-card min-h-[400px] p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* SALARY TAB */}
            {activeTab === "salary" && (
              <motion.div
                key="salary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-3xl"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  Estimated Salary Calculator
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-2">Role</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500/50">
                      <option>Software Engineer</option>
                      <option>Data Scientist</option>
                      <option>Product Manager</option>
                      <option>UX Designer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-2">Experience</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500/50">
                      <option>Entry Level (0-2 yrs)</option>
                      <option>Mid Level (3-5 yrs)</option>
                      <option>Senior (5+ yrs)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-2">Location</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500/50">
                      <option>Remote (Global)</option>
                      <option>US (High COL)</option>
                      <option>India / SEA</option>
                      <option>Europe</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center">
                  <p className="text-sm text-emerald-400 font-bold tracking-widest uppercase mb-2">Estimated Range</p>
                  <h3 className="text-5xl font-bold text-white mb-2">$85,000 - $115,000</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Based on real-time market data for your configuration</p>
                </div>
              </motion.div>
            )}

            {/* RESUME TAB */}
            {activeTab === "resume" && (
              <motion.div
                key="resume"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-violet-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">AI Resume Scorer</h2>
                <p className="text-[var(--text-secondary)] mb-8">Paste your resume text below to get an instant ATS compatibility score and AI-driven improvement tips.</p>
                
                <textarea 
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-violet-500/50 mb-6 resize-none placeholder:text-white/20"
                  placeholder="John Doe&#10;Software Engineer&#10;&#10;Experience:&#10;- Built React applications...&#10;- Optimized database queries..."
                ></textarea>

                {!resumeScore && !calculating && (
                  <button onClick={handleScoreResume} className="btn-primary flex items-center justify-center gap-2 w-full max-w-xs mx-auto">
                    <BrainCircuit className="w-4 h-4" /> Analyze Resume
                  </button>
                )}

                {calculating && (
                  <div className="py-4">
                    <RefreshCcw className="w-8 h-8 text-violet-400 mx-auto animate-spin mb-4" />
                    <p className="text-violet-400 font-semibold animate-pulse">Running Deep Analysis...</p>
                  </div>
                )}

                {resumeScore && !calculating && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4">
                    <div className="inline-block p-6 rounded-full border-4 border-violet-500/50 bg-violet-500/10 mb-4">
                      <span className="text-4xl font-bold text-white">{resumeScore}</span><span className="text-xl text-[var(--text-muted)]">/100</span>
                    </div>
                    <div className="flex flex-col gap-2 max-w-sm mx-auto text-left">
                      <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-sm">
                        <span className="text-emerald-400 font-bold mr-2">✓ Action:</span> Replace weak verbs with strong action words (e.g. "Spearheaded").
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-sm">
                        <span className="text-amber-400 font-bold mr-2">! Missing:</span> Quantify your achievements (add % increases or revenue impacts).
                      </div>
                    </div>
                    <button onClick={() => setResumeScore(null)} className="mt-6 text-sm text-[var(--text-muted)] hover:text-white underline">
                      Analyze another resume
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* FLASHCARDS TAB */}
            {activeTab === "flashcards" && (
              <motion.div
                key="flashcards"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-2xl mx-auto flex flex-col items-center justify-center h-full pt-4"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Technical Interview Prep</h2>
                  <p className="text-[var(--text-secondary)]">Question {cardIndex + 1} of {FLASHCARDS.length}</p>
                </div>

                <div 
                  className="w-full h-64 cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div 
                    className="w-full h-full relative transition-transform duration-500"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div 
                      className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/30"
                      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <span className="absolute top-4 right-4 text-xs font-bold text-indigo-400 px-2 py-1 rounded bg-indigo-500/10">QUESTION</span>
                      <h3 className="text-xl md:text-2xl font-semibold leading-relaxed">{FLASHCARDS[cardIndex].q}</h3>
                      <p className="absolute bottom-4 text-xs text-[var(--text-muted)] flex items-center gap-1"><FlipHorizontal className="w-3 h-3" /> Click to flip</p>
                    </div>

                    {/* Back */}
                    <div 
                      className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center bg-gradient-to-bl from-teal-500/10 to-transparent border border-teal-500/30"
                      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                      <span className="absolute top-4 right-4 text-xs font-bold text-teal-400 px-2 py-1 rounded bg-teal-500/10">ANSWER</span>
                      <p className="text-base md:text-lg leading-relaxed text-[var(--text-primary)]">{FLASHCARDS[cardIndex].a}</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={nextCard} className="btn-secondary">Next Question</button>
                  <button onClick={() => setIsFlipped(false)} className="btn-primary">Reset Card</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}
