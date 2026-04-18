"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { careersData } from "@/lib/careerData";

export function FeaturedCareers() {
  // Display only top 6 careers
  const featured = careersData.slice(0, 6);

  return (
    <section className="relative py-24 px-6 z-10 border-t border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-sm text-cyan-400 mb-4">
              <TrendingUp className="w-4 h-4" />
              Trending Now
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Featured <span className="gradient-text">Career Paths</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/explore" className="text-sm font-medium text-[var(--placeholder)] hover:text-white transition-colors flex items-center gap-1 group">
              View all 20+ careers 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 group hover:border-violet-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{career.icon}</span>
                <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 text-[var(--placeholder)] border border-white/10">
                  {career.avgSalary.us}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                {career.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                {career.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {career.topSkills.slice(0, 3).map(skill => (
                  <span key={skill} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-black/40 text-cyan-500">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
