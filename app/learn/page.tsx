"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, Search, Code, Book, Rocket, Star, ExternalLink, Calendar } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Mock Data
const COURSES = [
  { title: "CS50: Introduction to Computer Science", platform: "Harvard / edX", type: "Free", icon: BookOpen },
  { title: "Meta Front-End Developer Professional Certificate", platform: "Coursera", type: "Certificate", icon: Book },
  { title: "Machine Learning Specialization", platform: "Stanford / DeepLearning.AI", type: "Certificate", icon: Rocket },
  { title: "Full Stack Open", platform: "University of Helsinki", type: "Free", icon: Code },
  { title: "React Crash Course 2024", platform: "YouTube / Traversy Media", type: "Free Video", icon: Video },
  { title: "AWS Cloud Practitioner Essentials", platform: "AWS Training", type: "Free", icon: Search },
];

const PROJECTS = [
  { title: "Personal Portfolio Website", difficulty: "Beginner", tags: ["HTML", "CSS", "JS"], category: "Frontend" },
  { title: "Weather App with API", difficulty: "Beginner", tags: ["React", "API"], category: "Frontend" },
  { title: "Task Management API", difficulty: "Intermediate", tags: ["Node.js", "Express", "MongoDB"], category: "Backend" },
  { title: "Real-time Chat Application", difficulty: "Advanced", tags: ["WebSockets", "React", "Node"], category: "Fullstack" },
  { title: "E-Commerce Microservices", difficulty: "Advanced", tags: ["Docker", "Kubernetes", "Next.js"], category: "DevOps" },
];

const SKILL_OF_DAY = {
  name: "TypeScript",
  description: "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Essential for modern frontend and backend development.",
  difficulty: "Intermediate",
  timeToLearn: "2-4 weeks"
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)]">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-sm text-violet-400 mb-4">
            <BookOpen className="w-4 h-4" />
            Learning Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master the <span className="gradient-text">Skills of Tomorrow</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Curated resources, roadmaps, and project ideas to help you level up your career. No matter your path, we have the resources to guide you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Curated Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Curated Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COURSES.map((course, i) => (
                  <div key={i} className="glass-card p-5 group hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                        <course.icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-violet-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mb-2">{course.platform}</p>
                        <span className="inline-block px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 text-cyan-400">
                          {course.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project Ideas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                Practice Projects
              </h2>
              <div className="space-y-4">
                {PROJECTS.map((project, i) => (
                  <div key={i} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <div className="flex gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs text-[var(--text-muted)]">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.difficulty === 'Beginner' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        project.difficulty === 'Intermediate' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                          'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        {project.difficulty}
                      </span>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            {/* Skill of the Day Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
              style={{ background: "linear-gradient(145deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)" }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">
                <Calendar className="w-4 h-4" />
                Skill of the Day
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-3">
                {SKILL_OF_DAY.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                {SKILL_OF_DAY.description}
              </p>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-black/20 border border-white/5">
                <div>
                  <span className="text-[var(--text-muted)] block mb-1">Difficulty</span>
                  <span className="font-semibold text-amber-400">{SKILL_OF_DAY.difficulty}</span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--text-muted)] block mb-1">Time to learn</span>
                  <span className="font-semibold text-white">{SKILL_OF_DAY.timeToLearn}</span>
                </div>
              </div>
              <button className="w-full mt-4 btn-primary py-2 text-sm">
                Start Learning
              </button>
            </motion.div>

            {/* Quick Links / Books */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Book className="w-4 h-4 text-fuchsia-400" />
                Must-Read Books
              </h3>
              <ul className="space-y-3">
                {[
                  "Clean Code by Robert C. Martin",
                  "Designing Data-Intensive Applications",
                  "The Pragmatic Programmer",
                  "Cracking the Coding Interview"
                ].map((book, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-fuchsia-500 mt-1">•</span>
                    <span className="text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer">{book}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
