"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, MapPin, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { careersData, CareerData } from "@/lib/careerData";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

type Category = "All" | "Tech" | "Non-Tech";
type Difficulty = "All" | "Beginner" | "Intermediate" | "Advanced";
type SortOption = "name" | "salary-high";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  const [sortBy, setSortBy] = useState<SortOption>("salary-high");
  const [showFilters, setShowFilters] = useState(false);

  // Extend data with derived category and difficulty for the UI
  const extendedCareers = useMemo(() => {
    return careersData.map(c => {
      // Derive Technical vs Non-Technical (Rough approximation)
      const nonTechIds = ["product-manager", "ux-designer", "technical-writer", "scrum-master", "marketing-analyst"];
      const cat: Category = nonTechIds.includes(c.id) ? "Non-Tech" : "Tech";
      
      // Derive Difficulty based on salary scale for demo purposes
      let diff: Difficulty = "Intermediate";
      const salaryBase = parseInt(c.avgSalary.us.replace(/[^0-9]/g, ''));
      if (salaryBase < 100) diff = "Beginner";
      else if (salaryBase > 135) diff = "Advanced";

      return {
        ...c,
        category: cat,
        difficulty: diff,
         numericSalary: salaryBase * 1000
      };
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = extendedCareers;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.topSkills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(c => c.category === category);
    }

    // Difficulty
    if (difficulty !== "All") {
      result = result.filter(c => c.difficulty === difficulty);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      } else {
        return b.numericSalary - a.numericSalary;
      }
    });

    return result;
  }, [extendedCareers, search, category, difficulty, sortBy]);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="gradient-text">20+ Career Paths</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Discover the highest paying, fastest growing, and most in-demand careers in tech. Find your perfect match.
          </p>
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
              placeholder="Search careers, skills, or roles..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/20 border border-[var(--border-subtle)] rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-black/20 border border-[var(--border-subtle)] rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="salary-high">Sort by Salary</option>
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors flex-shrink-0 ${
                showFilters || category !== 'All' || difficulty !== 'All' 
                  ? 'bg-violet-500/20 border-violet-500/30 text-violet-300' 
                  : 'bg-black/20 border-[var(--border-subtle)] hover:bg-white/5'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters {(category !== 'All' || difficulty !== 'All') && <span className="w-2 h-2 rounded-full bg-violet-400 ml-1" />}
            </button>
          </div>
        </motion.div>

        {/* Extended Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {(["All", "Tech", "Non-Tech"] as Category[]).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                          category === cat 
                            ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-semibold' 
                            : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-white/20'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">Difficulty Level</h4>
                  <div className="flex flex-wrap gap-2">
                    {(["All", "Beginner", "Intermediate", "Advanced"] as Difficulty[]).map(diff => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                          difficulty === diff 
                            ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 font-semibold' 
                            : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-white/20'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20 bg-black/20 rounded-2xl border border-white/5 border-dashed">
            <h3 className="text-xl font-bold mb-2">No careers found</h3>
            <p className="text-[var(--text-secondary)] mb-6">Try adjusting your search or filters to find more results.</p>
            <button 
              onClick={() => { setSearch(""); setCategory("All"); setDifficulty("All"); }}
              className="btn-secondary text-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="glass-card p-6 flex flex-col group hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl bg-black/20 p-3 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                    {career.icon}
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {career.avgSalary.us}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                      career.category === "Tech" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400"
                    }`}>
                      {career.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                  {career.title}
                </h3>
                
                <p className="text-sm text-[var(--text-secondary)] mb-6 flex-grow">
                  {career.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <Link 
                    href={`/roadmap/${career.id}`} 
                    className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-cyan-400 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    View Roadmap
                  </Link>
                  <Link 
                    href={`/learn`} // Stand-in for individual career page or redirect to learn
                    className="flex items-center gap-1 text-sm font-bold text-violet-400 hover:text-white transition-colors"
                  >
                    Details <ArrowRight className="w-4 h-4" />
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
