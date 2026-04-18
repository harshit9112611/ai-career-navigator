"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Building2, MapPin, Briefcase, Globe, PieChart } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Mock Data
const TRENDING_SKILLS = [
  { name: "React", demand: 95 },
  { name: "Python", demand: 88 },
  { name: "AWS", demand: 82 },
  { name: "TypeScript", demand: 79 },
  { name: "SQL", demand: 75 },
  { name: "Node.js", demand: 70 },
  { name: "Generative AI", demand: 98 },
];

const SALARY_TRENDS = {
  US: [
    { year: "2020", salary: 95000 },
    { year: "2021", salary: 105000 },
    { year: "2022", salary: 115000 },
    { year: "2023", salary: 120000 },
    { year: "2024", salary: 130000 },
  ],
  India: [
    { year: "2020", salary: 12000 }, // Converted roughly to USD for chart scale sync or keep local numbers. Let's keep abstract scale.
    { year: "2021", salary: 14000 },
    { year: "2022", salary: 18000 },
    { year: "2023", salary: 21000 },
    { year: "2024", salary: 25000 },
  ],
  Remote: [
    { year: "2020", salary: 85000 },
    { year: "2021", salary: 95000 },
    { year: "2022", salary: 102000 },
    { year: "2023", salary: 115000 },
    { year: "2024", salary: 122000 },
  ]
};

const HOT_JOBS = [
  { title: "Senior AI Engineer", company: "OpenAI", location: "Remote", type: "Full-time", salary: "$180k - $250k" },
  { title: "Frontend Lead (React)", company: "Vercel", location: "Remote", type: "Full-time", salary: "$140k - $190k" },
  { title: "Data Scientist", company: "Spotify", location: "Hybrid / NY", type: "Full-time", salary: "$130k - $170k" },
  { title: "DevOps Architect", company: "Stripe", location: "Remote", type: "Contract", salary: "$120/hr" },
];

export default function MarketPage() {
  const [location, setLocation] = useState<"US" | "India" | "Remote">("Remote");

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-400 mb-4">
            <TrendingUp className="w-4 h-4" />
            Market Insights
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tech Job <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Market Trends</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Real-time insights on what skills are paying the most, which companies are hiring, and where the industry is heading.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Trending Skills Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-400" />
                Most Demanded Skills
              </h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TRENDING_SKILLS} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                    <RechartsTooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#10B981' }}
                    />
                    <Bar dataKey="demand" fill="#10B981" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Salary Trends */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Salary Growth (5 Years)
                </h2>
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 w-fit">
                  {["US", "India", "Remote"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc as any)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${location === loc ? 'bg-cyan-500/20 text-cyan-400' : 'text-[var(--text-muted)] hover:text-white'}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SALARY_TRENDS[location]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#9ca3af' }} 
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#06B6D4' }}
                      formatter={(value: any) => [`$${value.toLocaleString()}`, "Avg Salary"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="salary" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6, stroke: '#000' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Top Hiring Companies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-violet-400" />
                Who's Hiring Most?
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Google", roles: 420 },
                  { name: "Microsoft", roles: 385 },
                  { name: "Amazon", roles: 310 },
                  { name: "Meta", roles: 156 },
                  { name: "Stripe", roles: 89 },
                ].map((company, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="font-medium text-[var(--text-secondary)] group-hover:text-white transition-colors">
                      {i+1}. {company.name}
                    </span>
                    <span className="text-xs px-2 py-1 bg-violet-500/10 text-violet-400 rounded-full font-semibold">
                      {company.roles} open roles
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Work Model Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                Work Model Breakdown
              </h3>
              <div className="space-y-3">
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-secondary)]">Remote</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-secondary)]">Hybrid</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400/60 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--text-secondary)]">Office</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400/30 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hot Jobs List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-rose-400" />
                Hot Jobs Right Now
              </h3>
              <div className="space-y-3">
                {HOT_JOBS.map((job, i) => (
                  <div key={i} className="p-3 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 cursor-pointer transition-colors">
                    <h4 className="text-sm font-bold text-rose-300 mb-1">{job.title}</h4>
                    <p className="text-xs text-white mb-2">{job.company}</p>
                    <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
