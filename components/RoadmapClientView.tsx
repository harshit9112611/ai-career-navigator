"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { RoadmapData } from "@/lib/roadmapData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  roadmap: RoadmapData;
}

export function RoadmapClientView({ roadmap }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  // Load progress from local storage
  useEffect(() => {
    const saved = localStorage.getItem(`roadmap_progress_${roadmap.slug}`);
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, [roadmap.slug]);

  const toggleStep = (weekIndex: number) => {
    const newProgress = { ...completedSteps, [weekIndex]: !completedSteps[weekIndex] };
    setCompletedSteps(newProgress);
    localStorage.setItem(`roadmap_progress_${roadmap.slug}`, JSON.stringify(newProgress));
  };

  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;
    setIsDownloading(true);

    try {
      // Small delay to ensure renders are stable
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: '#0a0a0a',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${roadmap.slug}-roadmap.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderIcon = (iconName: string, className?: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.BookOpen;
    return <Icon className={className || "w-5 h-5"} />;
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / roadmap.weeklyPlan.length) * 100) || 0;

  return (
    <div className="w-full relative">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        {/* Progress Bar */}
        <div className="w-full sm:w-1/2 glass-card p-4 flex items-center gap-4 border-cyan-500/20">
          <div className="w-12 h-12 rounded-full border-4 border-black/40 flex items-center justify-center shrink-0 relative overflow-hidden bg-black/20">
            <svg viewBox="0 0 36 36" className="w-full h-full absolute inset-0 -rotate-90">
              <path
                className="text-white/5"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-cyan-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${progressPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
            <span className="text-xs font-bold relative z-10">{progressPercentage}%</span>
          </div>
          <div>
            <h4 className="font-bold text-sm">Your Progress</h4>
            <p className="text-xs text-[var(--text-secondary)]">{completedCount} of {roadmap.weeklyPlan.length} steps completed</p>
          </div>
        </div>

        {/* Download Button */}
        <button 
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="btn-secondary whitespace-nowrap shrink-0 flex items-center gap-2 max-sm:w-full max-sm:justify-center"
        >
          {isDownloading ? <LucideIcons.Loader2 className="w-4 h-4 animate-spin" /> : <LucideIcons.Download className="w-4 h-4" />}
          {isDownloading ? "Generating PDF..." : "Save as PDF"}
        </button>
      </div>

      <div ref={contentRef} className="bg-[var(--bg-primary)] p-0 sm:p-2 rounded-2xl relative z-10">
        {/* Header Section */}
        <header className="mb-16 text-center space-y-6 pt-4">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl glass-card mb-4">
            {renderIcon(roadmap.icon, "w-12 h-12 text-[var(--accent-cyan)]")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">{roadmap.domain}</span> Roadmap
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            {roadmap.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8 pb-4">
            <div className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center gap-2">
              <LucideIcons.Activity className="w-4 h-4" />
              {roadmap.difficulty}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center gap-2">
              <LucideIcons.Clock className="w-4 h-4" />
              {roadmap.timeToLearn} To Master
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pathway */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <LucideIcons.Map className="w-6 h-6 text-[var(--accent-violet)]" />
                Step-by-Step Learning Path
              </h2>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--accent-violet)] before:to-[var(--accent-cyan)]">
                {roadmap.weeklyPlan.map((week, index) => {
                  const isCompleted = completedSteps[index];
                  
                  return (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
                      
                      <div 
                        onClick={() => toggleStep(index)}
                        className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all ${
                          isCompleted 
                            ? "bg-emerald-500 border-[var(--bg-primary)] text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                            : "bg-[var(--bg-card)] border-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-violet)] hover:text-white"
                        }`}
                      >
                        {isCompleted ? <LucideIcons.Check className="w-5 h-5" /> : <span className="font-bold text-sm">{week.week}</span>}
                      </div>

                      <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 transition-all relative ${isCompleted ? 'border-emerald-500/30 bg-emerald-500/5 opacity-80' : 'hover:border-[var(--accent-violet)]'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`text-xl font-bold ${isCompleted ? 'text-emerald-400' : ''}`}>{week.title}</h3>
                          <button 
                            onClick={() => toggleStep(index)}
                            className="text-xs font-semibold px-2 py-1 rounded bg-black/40 border border-white/5 hover:bg-white/10 transition-colors"
                          >
                            {isCompleted ? 'Completed' : 'Mark Done'}
                          </button>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2 font-semibold">Key Topics</h4>
                          <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                            {week.topics.map((t, i) => <li key={i} className={isCompleted ? 'opacity-70' : ''}>{t}</li>)}
                          </ul>
                        </div>

                        <div className="mb-4 bg-black/30 p-4 rounded-xl border border-[var(--border-subtle)]">
                          <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <LucideIcons.Code className="w-4 h-4 text-[var(--accent-cyan)]" /> Project Idea
                          </h4>
                          <p className="text-sm text-[#e2e8f0] font-medium">{week.project}</p>
                        </div>

                        <div>
                          <h4 className="text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2 font-semibold">Resources</h4>
                          <div className="flex flex-col gap-2">
                            {week.resources.map((res, i) => (
                              <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--accent-violet)] transition-colors">
                                {res.type === 'video' ? <LucideIcons.Video className="w-4 h-4" /> : 
                                 res.type === 'course' ? <LucideIcons.GraduationCap className="w-4 h-4" /> :
                                 <LucideIcons.FileText className="w-4 h-4" />}
                                {res.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <LucideIcons.CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Prerequisites
              </h3>
              <ul className="space-y-3 relative before:absolute before:inset-0 before:ml-[0.6rem] before:h-full before:w-[2px] before:bg-[var(--border-subtle)]">
                {roadmap.prerequisites.map((req, i) => (
                  <li key={i} className="relative flex items-start gap-4">
                    <div className="w-5 h-5 mt-0.5 rounded-full bg-[var(--bg-primary)] border-2 border-emerald-400 z-10" />
                    <span className="text-[var(--text-secondary)]">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 relative overflow-hidden bg-gradient-to-b from-transparent to-cyan-500/5">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <LucideIcons.DollarSign className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <LucideIcons.TrendingUp className="w-5 h-5 text-cyan-400" />
                Salary Expectations
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)]">Entry Level</span>
                    <span className="font-bold text-cyan-400">{roadmap.careerOutcomes.avgSalary.entry}</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 w-[30%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)]">Mid Level</span>
                    <span className="font-bold text-violet-400">{roadmap.careerOutcomes.avgSalary.mid}</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden"><div className="h-full bg-violet-400 w-[60%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)]">Senior Level</span>
                    <span className="font-bold text-fuchsia-400">{roadmap.careerOutcomes.avgSalary.senior}</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden"><div className="h-full bg-fuchsia-400 w-[90%]" /></div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] relative z-10">
                <h4 className="text-sm text-[var(--text-muted)] font-semibold mb-3">Top Companies Hiring</h4>
                <div className="flex flex-wrap gap-2">
                  {roadmap.careerOutcomes.topCompanies.map((c, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-md border border-[var(--border-subtle)]">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <LucideIcons.Wrench className="w-5 h-5 text-white" />
                Essential Tools
              </h3>
              <div className="space-y-3">
                {roadmap.essentialTools.map((tool, i) => (
                  <div key={i} className="flex flex-row items-center gap-4 bg-white/5 p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-violet)] transition-colors">
                    <div className="p-2 bg-[var(--bg-primary)] rounded-lg">
                      {renderIcon(tool.icon, "w-5 h-5 text-[var(--accent-violet)]")}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{tool.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{tool.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {roadmap.certifications.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <LucideIcons.Award className="w-5 h-5 text-fuchsia-400" />
                  Top Certifications
                </h3>
                <div className="space-y-4">
                  {roadmap.certifications.map((cert, i) => (
                    <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/40 transition-colors">
                      <p className="font-semibold text-sm leading-tight mb-1">{cert.name}</p>
                      <div className="flex items-center justify-between text-xs text-fuchsia-300">
                        <span>{cert.provider}</span>
                        <span className="text-white font-medium px-2 py-0.5 rounded bg-black/40">{cert.value} Value</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
