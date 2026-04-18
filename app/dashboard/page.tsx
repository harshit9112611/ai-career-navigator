"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Bookmark, TrendingUp, Flame, Award, BookOpen, Clock, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCareer } from "@/store/CareerContext";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const ALL_BADGES = [
  { id: "Explorer", name: "Career Explorer", icon: "🗺️", description: "Took the assessment for the first time.", unlocked: true },
  { id: "Skill Master", name: "Skill Master", icon: "⚔️", description: "Added more than 10 skills.", unlocked: false },
  { id: "Planner", name: "Future Planner", icon: "🔮", description: "Saved a career path to your dashboard.", unlocked: false },
  { id: "Networker", name: "Networker", icon: "🤝", description: "Shared a result or visited community.", unlocked: false }
];

export default function DashboardPage() {
  const { savedCareers, streak, achievements, assessment, removeSavedCareer } = useCareer();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for localStorage data
  useEffect(() => {
    setMounted(true);
  }, []);

  const progress = 35; // Mock learning progress

  if (!mounted) return null;

  const earnedBadges = ALL_BADGES.map(b => ({
    ...b,
    unlocked: b.unlocked || achievements.includes(b.id) || (b.id === "Planner" && savedCareers.length > 0) || (b.id === "Skill Master" && assessment.skills.length > 10)
  }));

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-1">
              <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, <span className="gradient-text">Seeker</span></h1>
              <p className="text-[var(--text-secondary)]">Your personal career command center.</p>
            </div>
          </motion.div>

          {/* Streak Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card px-6 py-4 flex items-center gap-4 border-orange-500/20"
          >
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider">Current Streak</p>
              <h2 className="text-2xl font-bold text-white">{streak} Day{streak !== 1 ? 's' : ''}</h2>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Learning Progress
                </h2>
                <span className="text-emerald-400 font-bold">{progress}% completed</span>
              </div>

              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" style={{ width: `${progress}%` }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="text-xs text-[var(--text-muted)] font-bold mb-1">In Progress</div>
                  <h4 className="font-semibold text-white mb-2">React Hooks Masterclass</h4>
                  <p className="text-xs text-[var(--text-secondary)] mb-4">You have 4 lessons left. Keep going!</p>
                  <Link href="/learn" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    Continue <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 opacity-60">
                  <div className="text-xs text-[var(--text-muted)] font-bold mb-1">Up Next</div>
                  <h4 className="font-semibold text-white mb-2">Advanced Tailwind CSS</h4>
                  <p className="text-xs text-[var(--text-secondary)] mb-4">Locked. Complete React first.</p>
                </div>
              </div>
            </motion.div>

            {/* Saved Careers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 md:p-8"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-violet-400" />
                Saved Career Paths
              </h2>

              {savedCareers.length === 0 ? (
                <div className="text-center py-8 bg-black/20 rounded-xl border border-white/5 border-dashed">
                  <p className="text-[var(--text-secondary)] mb-4">You haven't saved any careers yet.</p>
                  <Link href="/assessment" className="btn-secondary text-sm">Find Your Match</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedCareers.map((career, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5 group">
                      <div>
                        <h4 className="font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{career.title}</h4>
                        <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                          <span>{career.salaryRange}</span>
                          <span>•</span>
                          <span>{career.growthOutlook} Growth</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        <Link href="/learn" className="btn-primary py-1.5 px-3 text-xs">Learn More</Link>
                        <button
                          onClick={() => removeSavedCareer(career.title)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-fuchsia-400" />
                Achievements
              </h2>
              <div className="space-y-4">
                {earnedBadges.map((badge, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${badge.unlocked ? 'bg-fuchsia-500/10 border-fuchsia-500/20' : 'bg-black/40 border-white/5 opacity-50 grayscale'}`}>
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{badge.name}</h4>
                      <p className="text-[10px] text-[var(--text-secondary)]">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Assessment History */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </h2>
              <div className="relative border-l border-white/10 ml-3 space-y-6">

                {assessment.skills.length > 0 && (
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-1.5 top-1 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                    <p className="text-xs text-[var(--text-muted)] mb-1">Today</p>
                    <p className="text-sm font-medium">Completed Career Assessment</p>
                  </div>
                )}

                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-1.5 top-1" />
                  <p className="text-xs text-[var(--text-muted)] mb-1">Yesterday</p>
                  <p className="text-sm font-medium">Earned "Explorer" Badge</p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-1.5 top-1" />
                  <p className="text-xs text-[var(--text-muted)] mb-1">Last Week</p>
                  <p className="text-sm font-medium">Joined One By AI</p>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
