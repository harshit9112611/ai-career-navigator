"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, CheckCircle2, ChevronRight, Calculator, HelpCircle, X } from "lucide-react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip, Legend
} from "recharts";
import { careersData } from "@/lib/careerData";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Generate mock radar data for each career
const radarMetrics: Record<string, any> = {
  "Frontend Developer": { technical: 90, creative: 85, analytical: 70, leadership: 40, communication: 60 },
  "Backend Developer": { technical: 95, creative: 40, analytical: 85, leadership: 50, communication: 55 },
  "Data Scientist": { technical: 85, creative: 30, analytical: 95, leadership: 40, communication: 70 },
  "Product Manager": { technical: 60, creative: 70, analytical: 80, leadership: 95, communication: 95 },
  "UX Designer": { technical: 40, creative: 95, analytical: 75, leadership: 50, communication: 80 },
  "DevOps Engineer": { technical: 90, creative: 30, analytical: 85, leadership: 60, communication: 65 },
  "default": { technical: 70, creative: 70, analytical: 70, leadership: 70, communication: 70 }
};

const formatRadarData = (c1: any, c2: any) => {
  const m1 = radarMetrics[c1.title] || radarMetrics["default"];
  const m2 = c2 ? (radarMetrics[c2.title] || radarMetrics["default"]) : null;
  
  const subjects = ["technical", "creative", "analytical", "leadership", "communication"];
  
  return subjects.map(subject => {
    const dataRow: any = { subject: subject.charAt(0).toUpperCase() + subject.slice(1) };
    dataRow[c1.title] = m1[subject];
    if (c2) {
      dataRow[c2.title] = m2[subject];
    }
    return dataRow;
  });
};

const MOCK_QUIZ = [
  { q: "What drives you most at work?", options: ["Solving complex logical puzzles", "Designing things people see and love", "Organizing teams and strategy", "Finding patterns in large numbers"] },
  { q: "How do you prefer to work?", options: ["Heads down, minimal interruptions", "Collaborating with users and testing designs", "In constant meetings, aligning stakeholders", "Building experiments and testing hypotheses"] },
  { q: "What's your ideal impact?", options: ["Systems that never crash", "Beautiful, intuitive interfaces at scale", "Delivering a product that hits business goals", "Predicting future trends automatically"] }
];

export default function ComparePage() {
  const [selectedCareers, setSelectedCareers] = useState<string[]>([careersData[0].id, careersData[3].id]);
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  const toggleCareer = (id: string) => {
    if (selectedCareers.includes(id)) {
      if (selectedCareers.length > 1) {
        setSelectedCareers(prev => prev.filter(c => c !== id));
      }
    } else {
      if (selectedCareers.length < 2) { // Restrict to 2 for best UI layout
        setSelectedCareers(prev => [...prev, id]);
      } else {
        setSelectedCareers([selectedCareers[1], id]); // Shift out the oldest
      }
    }
  };

  const selectedData = selectedCareers.map(id => careersData.find(c => c.id === id)!).filter(Boolean);
  const radarData = selectedData.length > 0 ? formatRadarData(selectedData[0], selectedData[1]) : [];

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-sm text-orange-400 mb-4">
            <Scale className="w-4 h-4" />
            V/S Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compare <span className="gradient-text">Career Paths</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-8">
            Analyze roles side-by-side to understand trade-offs in salary, work-life balance, and required skillsets.
          </p>

          {!quizActive && (
            <button onClick={() => setQuizActive(true)} className="btn-secondary glow-hover flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Not sure what to pick? Take the Match Quiz
            </button>
          )}
        </motion.div>

        {/* Quick Quiz Overlay/Section */}
        <AnimatePresence>
          {quizActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="glass-card p-8 border border-orange-500/30 relative">
                <button onClick={() => setQuizActive(false)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10">
                  <X className="w-4 h-4" />
                </button>
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] font-bold tracking-widest uppercase mb-4">
                    <span>Question {quizStep + 1} of {MOCK_QUIZ.length}</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full mb-8">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full transition-all duration-300" style={{ width: `${((quizStep + 1) / MOCK_QUIZ.length) * 100}%` }} />
                  </div>
                  
                  {quizStep < MOCK_QUIZ.length ? (
                    <>
                      <h3 className="text-2xl font-bold mb-6">{MOCK_QUIZ[quizStep].q}</h3>
                      <div className="space-y-3">
                        {MOCK_QUIZ[quizStep].options.map((opt, i) => (
                          <button 
                            key={i} 
                            onClick={() => {
                              if (quizStep < MOCK_QUIZ.length - 1) setQuizStep(prev => prev + 1);
                              else {
                                setQuizStep(prev => prev + 1);
                                setTimeout(() => {
                                  setSelectedCareers([careersData[0].id, careersData[1].id]);
                                  setQuizActive(false);
                                  setQuizStep(0);
                                }, 3000);
                              }
                            }}
                            className="w-full text-left p-4 rounded-xl glass-card hover:bg-white/10 hover:border-orange-500/50 transition-all font-medium"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Scale className="w-12 h-12 text-orange-400 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-2xl font-bold mb-2">Analyzing your personality...</h3>
                      <p className="text-[var(--text-secondary)]">Finding the perfect match to compare.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar selector */}
          <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="font-bold text-[var(--text-secondary)] sticky top-0 bg-[var(--bg-primary)]/80 backdrop-blur-md pb-2 pt-1 z-10 border-b border-white/5">
              Select 2 Careers
            </h3>
            {careersData.slice(0, 10).map((career) => {
              const isSelected = selectedCareers.includes(career.id);
              return (
                <div 
                  key={career.id}
                  onClick={() => toggleCareer(career.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                    isSelected 
                    ? 'bg-violet-500/15 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                    : 'bg-black/20 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{career.icon}</span>
                    <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                      {career.title}
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-violet-400" />}
                </div>
              );
            })}
          </div>

          {/* Comparison View */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Cards */}
            <div className={`grid grid-cols-1 gap-6 ${selectedData.length === 2 ? 'md:grid-cols-2' : ''}`}>
              {selectedData.map((career, idx) => (
                <motion.div 
                  key={career.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`glass-card p-6 border-t-2 ${idx === 0 ? 'border-t-[#8B5CF6]' : 'border-t-[#06B6D4]'}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-black/30 border border-white/10`}>
                      {career.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{career.title}</h2>
                      <p className="text-sm text-emerald-400 font-medium">Avg Salary: {career.avgSalary.us}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-6 h-10">{career.description}</p>
                  
                  {/* Linear Progress breakdowns */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        <span>Work-Life Balance</span>
                        <span className="text-white">{career.workLifeBalance}/10</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${idx === 0 ? 'bg-[#8B5CF6]' : 'bg-[#06B6D4]'}`} style={{ width: `${career.workLifeBalance * 10}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        <span>Remote Friendliness</span>
                        <span className="text-white">{career.remoteFriendly}/10</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${idx === 0 ? 'bg-[#8B5CF6]' : 'bg-[#06B6D4]'}`} style={{ width: `${career.remoteFriendly * 10}%` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Radar Chart */}
            {selectedData.length === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold mb-6 text-center">Skill Alignment Comparison</h3>
                <div className="w-full h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={selectedData[0].title}
                        dataKey={selectedData[0].title}
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.4}
                      />
                      <Radar
                        name={selectedData[1].title}
                        dataKey={selectedData[1].title}
                        stroke="#06B6D4"
                        fill="#06B6D4"
                        fillOpacity={0.4}
                      />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* Pros and Cons or specific lists */}
            <div className={`grid grid-cols-1 gap-6 ${selectedData.length === 2 ? 'md:grid-cols-2' : ''}`}>
              {selectedData.map((career, idx) => (
                <div key={`${career.id}-skills`} className="glass-card p-6">
                  <h4 className="font-bold mb-4 flex items-center justify-between">
                    Top Skills Needed
                    <span className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-[#8B5CF6]' : 'bg-[#06B6D4]'}`} />
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.topSkills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-black/30 border border-white/5 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
