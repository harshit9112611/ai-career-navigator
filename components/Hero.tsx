"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Zap, value: "50+", label: "Career Paths", color: "#8B5CF6" },
  { icon: Users, value: "AI", label: "Powered by Gemini", color: "#06B6D4" },
  { icon: TrendingUp, value: "98%", label: "Accuracy Rate", color: "#D946EF" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto px-6 py-20 text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[var(--text-secondary)]">
              Powered by Google Gemini AI
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Discover Your
          <br />
          <span className="gradient-text">Perfect Career Path</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl max-w-2xl mx-auto text-[var(--text-secondary)] leading-relaxed mb-10"
        >
          AI-powered career analysis that maps your skills, interests, and
          strengths to find the career paths where you&apos;ll thrive. Get
          personalized recommendations in minutes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/assessment" className="btn-primary inline-flex items-center gap-2 text-lg">
            Start Free Assessment
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="btn-secondary inline-flex items-center gap-2">
            How It Works
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card flex items-center justify-center gap-3 py-5 px-6"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <div className="text-left">
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-[var(--border-subtle)] flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
