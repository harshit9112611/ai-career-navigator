"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Link from "next/link";

const STORIES = [
  {
    name: "Alex Rivera",
    role: "Frontend Developer",
    prevRole: "Customer Support",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    quote: "The personalized learning roadmap completely changed my approach. I transitioned from support to engineering in just 8 months."
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist",
    prevRole: "Marketing Analyst",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    quote: "I didn't realize my marketing analytics background was a stepping stone to Data Science. One By AI showed me exactly which Python skills I was missing."
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    prevRole: "Software Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    quote: "The skills gap analyzer helped me identify that I needed to focus on user empathy and business strategy rather than just coding."
  }
];

export function SuccessStories() {
  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Real People. <span className="gradient-text">Real Transitions.</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            See how our platform has helped thousands discover and transition into their dream careers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 relative overflow-hidden group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 transform group-hover:scale-110 transition-transform" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-14 h-14 rounded-full bg-black/20 border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-white">{story.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)]">From {story.prevRole}</p>
                  <p className="text-xs font-bold text-emerald-400">→ {story.role}</p>
                </div>
              </div>
              
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed relative z-10 italic">
                &quot;{story.quote}&quot;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/community" className="btn-secondary inline-flex items-center gap-2">
            See All Success Stories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
