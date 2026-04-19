"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, Map, Compass, ChevronDown, Rocket } from "lucide-react";
import Link from "next/link";
import { getAllRoadmaps, RoadmapData } from "@/lib/roadmapData";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import * as LucideIcons from "lucide-react";

type FilterType = "All" | "Tech" | "Non-Tech" | "Beginner" | "Intermediate" | "Advanced";
type SortOption = "difficulty" | "time";

const renderIcon = (iconName: string, className?: string) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Map;
  return <Icon className={className || "w-5 h-5"} />;
};

export default function RoadmapsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [sortBy, setSortBy] = useState<SortOption>("difficulty");
  const [showFilters, setShowFilters] = useState(false);

  const roadmaps = useMemo(() => getAllRoadmaps(), []);

  const filteredAndSorted = useMemo(() => {
    let result = roadmaps;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => 
        r.domain.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "All") {
      if (["Beginner", "Intermediate", "Advanced"].includes(activeFilter)) {
        result = result.filter(r => r.difficulty === activeFilter);
      } else {
        // Tech vs Non tech approximation based on roles
        const nonTechDomains = ["product-management", "ui-ux-design", "digital-marketing", "content-creation", "business-analysis", "sales-engineering", "technical-writing"];
        result = result.filter(r => {
          const isNonTech = nonTechDomains.includes(r.slug);
          return activeFilter === "Non-Tech" ? isNonTech : !isNonTech;
        });
      }
    }

    result.sort((a, b) => {
      if (sortBy === "difficulty") {
        const d: Record<string, number> = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
        return d[a.difficulty] - d[b.difficulty];
      } else {
        // Sort by time: naive approach parsing months
        const timeA = parseInt(a.timeToLearn) || 0;
        const timeB = parseInt(b.timeToLearn) || 0;
        return timeA - timeB;
      }
    });

    return result;
  }, [roadmaps, search, activeFilter, sortBy]);

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-sm text-violet-400 mb-4">
            <Map className="w-4 h-4" />
            Learning Paths
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Your Next <span className="gradient-text">Career Domain</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Step-by-step guides crafted by industry experts telling you exactly what to learn, week by week.
          </p>
        </motion.div>

        {/* Quiz Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 mb-10 border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
            <Compass className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex flex-shrink-0 items-center justify-center">
              <Compass className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">Not sure where to start?</h2>
              <p className="text-[var(--text-secondary)]">Take a 30-second quiz to find the perfect roadmap for your skills.</p>
            </div>
          </div>
          <Link href="/assessment" className="btn-primary flex items-center gap-2 relative z-10 shrink-0">
            Take the Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search learning paths..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/20 border border-[var(--border-subtle)] rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="relative flex-shrink-0">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-black/20 border border-[var(--border-subtle)] rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="difficulty">Sort by Difficulty</option>
                <option value="time">Sort by Time to Learn</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors flex-shrink-0 ${
                showFilters || activeFilter !== 'All'
                  ? 'bg-violet-500/20 border-violet-500/30 text-violet-300' 
                  : 'bg-black/20 border-[var(--border-subtle)] hover:bg-white/5'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters {activeFilter !== 'All' && <span className="w-2 h-2 rounded-full bg-violet-400 ml-1" />}
            </button>
          </div>
        </motion.div>

        {/* Filter Chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="glass-card p-6">
                <div className="flex flex-wrap gap-2">
                  {(["All", "Tech", "Non-Tech", "Beginner", "Intermediate", "Advanced"] as FilterType[]).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                        activeFilter === filter 
                          ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 font-semibold' 
                          : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-white/20'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20 bg-black/20 rounded-2xl border border-white/5 border-dashed">
            <h3 className="text-xl font-bold mb-2">No roadmaps found</h3>
            <p className="text-[var(--text-secondary)] mb-6">Try adjusting your filters.</p>
            <button onClick={() => { setSearch(""); setActiveFilter("All"); }} className="btn-secondary text-sm">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((roadmap, i) => (
              <motion.div
                key={roadmap.domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="glass-card p-6 flex flex-col group hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform group-hover:bg-cyan-500/10 text-cyan-400">
                    {renderIcon(roadmap.icon, "w-6 h-6")}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                      roadmap.difficulty === "Beginner" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                      roadmap.difficulty === "Intermediate" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                      "bg-rose-500/10 border-rose-500/20 text-rose-400"
                    }`}>
                      {roadmap.difficulty}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-black/40 border border-white/5 text-[var(--text-secondary)] rounded flex items-center gap-1">
                      <Rocket className="w-3 h-3" /> {roadmap.timeToLearn}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {roadmap.domain}
                </h3>
                
                <div className="mt-4 mb-6 flex-grow">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">First Topics Covered:</p>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                    {roadmap.weeklyPlan[0]?.topics.slice(0, 3).map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span> {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-white/5">
                  <Link 
                    href={`/roadmap/${roadmap.slug}`} 
                    className="flex items-center justify-between font-bold text-violet-400 hover:text-white transition-colors group/btn"
                  >
                    View Full Roadmap
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
