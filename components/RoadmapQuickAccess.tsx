"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, X, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function RoadmapQuickAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Don't show the FAB if we are already on a roadmap page or assessment
  if (pathname?.includes("/roadmap") || pathname?.includes("/assessment")) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 left-0 mb-4 w-72 glass-card p-4 rounded-2xl shadow-2xl border-cyan-500/20"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Compass className="w-4 h-4" /> Quick Explore
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors text-[var(--text-muted)] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                Looking for step-by-step career guides? Discover 20+ specialized roadmaps to guide your learning journey.
              </p>
              
              <Link 
                href="/roadmaps"
                onClick={() => setIsOpen(false)}
                className="w-full btn-secondary text-xs flex items-center justify-center gap-2 border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-400"
              >
                Browse Roadmaps
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all ${
            isOpen 
              ? "bg-cyan-500 text-black border border-cyan-400" 
              : "bg-black/60 border border-cyan-500/30 text-cyan-400 backdrop-blur-md hover:bg-cyan-500/10"
          }`}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Map className="w-5 h-5" />}
          {!isOpen && <span className="hidden sm:inline">Learning Paths</span>}
        </motion.button>
      </div>
    </>
  );
}
