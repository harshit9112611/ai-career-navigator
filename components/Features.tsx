"use client";

import { motion } from "framer-motion";
import { Brain, Target, Route, Sparkles, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Google Gemini analyzes your unique skill set and identifies career paths with the highest success potential.",
    color: "#8B5CF6",
    gradient: "from-violet-500/20 to-violet-500/0",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Advanced algorithms match your interests and strengths with careers where you'll find both success and fulfillment.",
    color: "#06B6D4",
    gradient: "from-cyan-500/20 to-cyan-500/0",
  },
  {
    icon: Route,
    title: "Growth Roadmap",
    description:
      "Get actionable step-by-step guidance with salary insights, growth outlook, and skills to develop.",
    color: "#D946EF",
    gradient: "from-fuchsia-500/20 to-fuchsia-500/0",
  },
  {
    icon: Sparkles,
    title: "Personalized Results",
    description:
      "Every recommendation is tailored specifically to you — no generic career advice.",
    color: "#10B981",
    gradient: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    icon: Shield,
    title: "Data Privacy First",
    description:
      "Your assessment data is processed in real-time and never stored. Your privacy is our priority.",
    color: "#F59E0B",
    gradient: "from-amber-500/20 to-amber-500/0",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Real-world salary ranges and industry growth data to help you make informed decisions.",
    color: "#EF4444",
    gradient: "from-red-500/20 to-red-500/0",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How{" "}
            <span className="gradient-text">One By AI</span>
            {" "}Works
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Three simple steps to discover career paths perfectly aligned with
            who you are and where you want to go.
          </p>
        </motion.div>

        {/* Step indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {["Share Your Skills", "AI Analyzes", "Get Results"].map(
            (step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)] hidden sm:inline">
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <div className="w-12 h-px bg-gradient-to-r from-violet-500/50 to-transparent" />
                )}
              </div>
            )
          )}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="glass-card p-7 group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  <feature.icon
                    className="w-6 h-6"
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
