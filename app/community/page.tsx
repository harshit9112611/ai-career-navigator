"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Trophy, MessageSquare, Video, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Mock Data
const LEADERBOARD = [
  { rank: 1, name: "David K.", points: 1250, badge: "Grandmaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
  { rank: 2, name: "Sarah L.", points: 1120, badge: "Expert", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
  { rank: 3, name: "Maria V.", points: 980, badge: "Pro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" },
  { rank: 4, name: "James T.", points: 840, badge: "Advanced", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
  { rank: 5, name: "You", points: 210, badge: "Novice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You" },
];

const EVENTS = [
  { date: "Tomorrow, 2:00 PM EST", title: "Landing Your First Frontend Role", host: "Google Developer Group", type: "Webinar" },
  { date: "Friday, 11:00 AM EST", title: "Live Portfolio Review Session", host: "One By AI Team", type: "Workshop" },
  { date: "Oct 15, 6:00 PM EST", title: "Data Science Ask Me Anything", host: "Sarah Chen (Data Scientist)", type: "Q&A" },
];

const DISCUSSIONS = [
  { title: "Should I learn Next.js before React?", replies: 34, author: "NewbieCoder", time: "2h ago" },
  { title: "How I transitioned from Retail to Product Management", replies: 128, author: "MarcusJ", time: "5h ago" },
  { title: "Mock Interview Partner needed (Backend/Node)", replies: 5, author: "BackendBro", time: "1d ago" },
];

export default function CommunityPage() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-sm text-sky-400 mb-4">
            <Users className="w-4 h-4" />
            Global Community
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn Together, <span className="gradient-text">Grow Together</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Join thousands of professionals transitioning into tech. Share your journey, attend events, and find mentorship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area: Discussions & Stories */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Discussions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-sky-400" />
                  Trending Discussions
                </h2>
                <button className="btn-primary text-xs py-1.5">New Post</button>
              </div>
              <div className="space-y-4">
                {DISCUSSIONS.map((post, i) => (
                  <div key={i} className="group p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-sky-400 transition-colors">{post.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <span>Posted by <span className="text-[var(--text-secondary)]">{post.author}</span></span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full text-xs text-[var(--text-secondary)]">
                      <MessageSquare className="w-3 h-3" />
                      {post.replies}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Video Success Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" />
                Day in the Life
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mock Video Embeds */}
                <div className="glass-card overflow-hidden group cursor-pointer relative">
                  <div className="aspect-video bg-black/40 relative flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400&h=225" alt="Thumbnail" className="absolute inset-0 object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                    <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm">Day in the life of a Google SWE</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">102K views</p>
                  </div>
                </div>
                
                <div className="glass-card overflow-hidden group cursor-pointer relative">
                  <div className="aspect-video bg-black/40 relative flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400&h=225" alt="Thumbnail" className="absolute inset-0 object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                    <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                       <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm">From Bootcamp to Data Analyst</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">45K views</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Top Learners
              </h2>
              <div className="space-y-4">
                {LEADERBOARD.map((user, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${user.name === "You" ? 'bg-amber-500/10 border border-amber-500/20' : ''}`}>
                    <div className="w-6 text-center font-bold text-sm text-[var(--text-muted)]">
                      #{user.rank}
                    </div>
                    <img src={user.avatar} className="w-8 h-8 rounded-full bg-black/20" alt={user.name} />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold truncate ${user.name === "You" ? 'text-amber-400' : 'text-white'}`}>{user.name}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">{user.badge}</p>
                    </div>
                    <div className="text-sm font-bold text-emerald-400">
                      {user.points} <span className="text-[10px] text-[var(--text-muted)]">pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-400" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {EVENTS.map((evt, i) => (
                  <div key={i} className="border-l-2 border-violet-500 pl-3 py-1">
                    <p className="text-xs text-violet-400 font-bold mb-1">{evt.date}</p>
                    <h4 className="text-sm font-semibold mb-1 leading-snug">{evt.title}</h4>
                    <p className="text-[10px] text-[var(--text-muted)]">Host: {evt.host}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 btn-secondary py-2 text-xs flex justify-center items-center gap-2">
                View Full Calendar <ArrowUpRight className="w-3 h-3" />
              </button>
            </motion.div>
            
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
