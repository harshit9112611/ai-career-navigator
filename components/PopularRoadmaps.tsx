"use client";

import { motion } from "framer-motion";
import { ArrowRight, Map, Rocket } from "lucide-react";
import Link from "next/link";
import { getAllRoadmaps } from "@/lib/roadmapData";
import * as LucideIcons from "lucide-react";

export function PopularRoadmaps() {
  const roadmaps = getAllRoadmaps().slice(0, 3); // Get top 3

  const renderIcon = (iconName: string, className?: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Map;
    return <Icon className={className || "w-5 h-5"} />;
  };

  return (
    <section className="relative py-24 px-6 z-10 border-t border-white/5 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-sm text-violet-400 mb-4">
              <Map className="w-4 h-4" />
              Step-by-Step Guides
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Popular <span className="gradient-text">Learning Roadmaps</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/roadmaps" className="text-sm font-medium text-[var(--placeholder)] hover:text-white transition-colors flex items-center gap-1 group">
              Browse All Roadmaps 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, i) => (
            <motion.div
              key={roadmap.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 group hover:border-violet-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform group-hover:bg-violet-500/10 text-violet-400">
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
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                {roadmap.domain}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 flex-grow line-clamp-2">
                {roadmap.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1">
                  <Rocket className="w-3 h-3" /> {roadmap.timeToLearn}
                </span>
                <Link 
                  href={`/roadmap/${roadmap.slug}`} 
                  className="flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-white transition-colors"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/roadmaps" className="btn-secondary w-full">
            Browse All Roadmaps
          </Link>
        </div>
      </div>
    </section>
  );
}
