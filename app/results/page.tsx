"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Sparkles,
  MapPin,
  ChevronRight,
  Clock,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { useCareer } from "@/store/CareerContext";
import type { CareerMatch } from "@/types/career";

function MatchRing({ percentage }: { percentage: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Color based on percentage
  const color =
    percentage >= 85
      ? "#10B981"
      : percentage >= 70
        ? "#8B5CF6"
        : percentage >= 55
          ? "#06B6D4"
          : "#F59E0B";

  return (
    <div className="match-ring">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle className="match-ring-bg" cx="40" cy="40" r={radius} />
        <circle
          className="match-ring-fill"
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="match-ring-text" style={{ color }}>
        {percentage}%
      </div>
    </div>
  );
}

function CareerCard({
  career,
  index,
}: {
  career: CareerMatch;
  index: number;
}) {
  const outlookColors: Record<string, string> = {
    "Very High": "#10B981",
    High: "#8B5CF6",
    Moderate: "#F59E0B",
    Stable: "#06B6D4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="glass-card p-6 sm:p-8 group"
    >
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Match ring */}
        <div className="flex-shrink-0">
          <MatchRing percentage={career.matchPercentage} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title + badges */}
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h3 className="text-xl font-bold">{career.title}</h3>
            {index === 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/25 text-emerald-400">
                <Sparkles className="w-3 h-3" />
                Best Match
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {career.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-5 text-sm">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[var(--accent-emerald)]" />
              <span className="text-[var(--text-secondary)]">
                {career.salaryRange}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp
                className="w-4 h-4"
                style={{
                  color:
                    outlookColors[career.growthOutlook] || "#8B5CF6",
                }}
              />
              <span className="text-[var(--text-secondary)]">
                {career.growthOutlook} Growth
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Key Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {career.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
              <MapPin className="w-3 h-3 inline mr-1" />
              Career Roadmap
            </p>
            <div className="space-y-2">
              {career.roadmap.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-violet-400">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const { results, isLoading, error, assessment, reset, retryAfter, generateCareer } = useCareer();
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for rate-limit retry
  useEffect(() => {
    if (retryAfter > 0) {
      setCountdown(retryAfter);
    }
  }, [retryAfter]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Redirect if no results and not loading
  useEffect(() => {
    if (
      !isLoading &&
      results.length === 0 &&
      !error &&
      assessment.skills.length === 0
    ) {
      router.push("/assessment");
    }
  }, [isLoading, results, error, assessment.skills.length, router]);

  const handleRetake = () => {
    reset();
    router.push("/assessment");
  };

  const handleRetry = async () => {
    setCountdown(0);
    await generateCareer();
  };

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)]">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Loading state */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              AI is analyzing your profile...
            </h2>
            <p className="text-[var(--text-secondary)]">
              Matching your skills to career opportunities
            </p>
            <div className="mt-8 max-w-xs mx-auto">
              <div className="progress-bar">
                <div className="progress-bar-fill animate-gradient" style={{ width: "80%" }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="glass-card max-w-md mx-auto p-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                {retryAfter > 0 ? (
                  <Clock className="w-7 h-7 text-amber-400" />
                ) : (
                  <span className="text-2xl">⚠️</span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">
                {retryAfter > 0 ? "Rate Limit Reached" : "Something Went Wrong"}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {error}
              </p>
              {countdown > 0 && (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Try again in {countdown}s
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center gap-3">
                <button onClick={handleRetake} className="btn-secondary text-sm">
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Back to Assessment
                </button>
                <button
                  onClick={handleRetry}
                  disabled={countdown > 0}
                  className="btn-primary text-sm"
                >
                  <RefreshCw className={`w-4 h-4 inline mr-1 ${countdown > 0 ? '' : ''}`} />
                  {countdown > 0 ? `Wait ${countdown}s` : "Retry"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {!isLoading && !error && results.length > 0 && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-400 mb-4">
                <Sparkles className="w-4 h-4" />
                Analysis Complete
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                Your <span className="gradient-text">Career Matches</span>
              </h1>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Based on {assessment.skills.length} skills,{" "}
                {assessment.interests.length} interests, and{" "}
                {assessment.strengths.length} strengths you shared.
              </p>
            </motion.div>

            {/* Career cards */}
            <div className="space-y-5 mb-12">
              {results.map((career, index) => (
                <CareerCard
                  key={career.title}
                  career={career}
                  index={index}
                />
              ))}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleRetake}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Assessment
              </button>
              <Link
                href="/"
                className="btn-primary flex items-center gap-2"
              >
                Back to Home
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        )}

        {/* Empty state (no results, not loading, no error, but has assessment data) */}
        {!isLoading &&
          !error &&
          results.length === 0 &&
          assessment.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold mb-4">No Results Yet</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Complete the assessment to get your AI-powered career matches.
              </p>
              <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
                Go to Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
      </div>
    </main>
  );
}
