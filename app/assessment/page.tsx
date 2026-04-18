"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { useCareer } from "@/store/CareerContext";
import { SKILL_CATEGORIES, INTERESTS, STRENGTHS } from "@/lib/constants";

const STEPS = [
  { id: 0, title: "Skills", subtitle: "What can you do?" },
  { id: 1, title: "Interests", subtitle: "What excites you?" },
  { id: 2, title: "Strengths", subtitle: "What makes you unique?" },
];

export default function AssessmentPage() {
  const router = useRouter();
  const {
    assessment,
    setSkills,
    setInterests,
    setStrengths,
    generateCareer,
    isLoading,
    error,
  } = useCareer();

  const [step, setStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all skills for step 0
  const allSkills = useMemo(
    () => Object.values(SKILL_CATEGORIES).flat(),
    []
  );

  // Filtered items based on search
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (step === 0) {
      return query
        ? allSkills.filter((s) => s.toLowerCase().includes(query))
        : allSkills;
    }
    if (step === 1) {
      return query
        ? INTERESTS.filter((i) => i.toLowerCase().includes(query))
        : [...INTERESTS];
    }
    return query
      ? STRENGTHS.filter((s) => s.toLowerCase().includes(query))
      : [...STRENGTHS];
  }, [step, searchQuery, allSkills]);

  // Current selections
  const currentSelections =
    step === 0
      ? assessment.skills
      : step === 1
        ? assessment.interests
        : assessment.strengths;

  const setCurrentSelections =
    step === 0 ? setSkills : step === 1 ? setInterests : setStrengths;

  const toggleItem = (item: string) => {
    const current = currentSelections;
    if (current.includes(item)) {
      setCurrentSelections(current.filter((s) => s !== item));
    } else {
      setCurrentSelections([...current, item]);
    }
  };

  const canProceed = currentSelections.length >= 2;

  const handleNext = async () => {
    if (step < 2) {
      setStep(step + 1);
      setSearchQuery("");
    } else {
      // Final step: generate careers
      await generateCareer();
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSearchQuery("");
    }
  };

  // Skill categories for step 0 organized view
  const groupedDisplay = step === 0 && !searchQuery;

  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)]">
      <AnimatedBackground />
      <Navigation />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i <= step
                      ? "text-white shadow-lg shadow-violet-500/25"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  }`}
                  style={
                    i <= step
                      ? { background: "var(--gradient-primary)" }
                      : undefined
                  }
                >
                  {i < step ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <div className="hidden sm:block">
                  <div
                    className={`text-sm font-medium ${
                      i <= step
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {s.title}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {s.subtitle}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    className={`hidden sm:block w-16 lg:w-24 h-px mx-2 transition-colors ${
                      i < step
                        ? "bg-[var(--accent-violet)]"
                        : "bg-[var(--border-subtle)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {STEPS[step].title === "Skills" && (
                  <>
                    Select Your{" "}
                    <span className="gradient-text">Skills</span>
                  </>
                )}
                {STEPS[step].title === "Interests" && (
                  <>
                    Choose Your{" "}
                    <span className="gradient-text">Interests</span>
                  </>
                )}
                {STEPS[step].title === "Strengths" && (
                  <>
                    Pick Your{" "}
                    <span className="gradient-text">Strengths</span>
                  </>
                )}
              </h1>
              <p className="text-[var(--text-secondary)]">
                Select at least 2 items that best describe you.{" "}
                <span className="text-[var(--accent-violet)] font-medium">
                  {currentSelections.length} selected
                </span>
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder={`Search ${STEPS[step].title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] transition-all"
              />
            </div>

            {/* Tags */}
            <div className="glass-card p-6 mb-8 max-h-[400px] overflow-y-auto">
              {groupedDisplay ? (
                // Grouped by category for skills
                Object.entries(SKILL_CATEGORIES).map(
                  ([category, skills]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => toggleItem(skill)}
                            className={`tag ${
                              currentSelections.includes(skill)
                                ? "selected"
                                : ""
                            }`}
                          >
                            {currentSelections.includes(skill) && (
                              <Check className="w-3.5 h-3.5" />
                            )}
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                // Flat list for interests/strengths or when searching
                <div className="flex flex-wrap gap-2">
                  {filteredItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`tag ${
                        currentSelections.includes(item)
                          ? "selected"
                          : ""
                      }`}
                    >
                      {currentSelections.includes(item) && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      {item}
                    </button>
                  ))}
                  {filteredItems.length === 0 && (
                    <p className="text-[var(--text-muted)] text-sm py-4 w-full text-center">
                      No results found for &ldquo;{searchQuery}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Selected items summary */}
            {currentSelections.length > 0 && (
              <div className="mb-8">
                <p className="text-sm text-[var(--text-muted)] mb-2">
                  Selected ({currentSelections.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentSelections.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-violet-500/15 border border-violet-500/25 text-violet-300 cursor-pointer hover:bg-violet-500/25 transition-colors"
                      onClick={() => toggleItem(item)}
                    >
                      {item}
                      <span className="text-violet-400">×</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="btn-secondary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed || isLoading}
                className="btn-primary flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : step === 2 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Careers
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
