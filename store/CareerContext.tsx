"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { CareerMatch, AssessmentData } from "@/types/career";

interface CareerContextType {
  assessment: AssessmentData;
  results: CareerMatch[];
  isLoading: boolean;
  error: string | null;
  retryAfter: number;
  setSkills: (skills: string[]) => void;
  setInterests: (interests: string[]) => void;
  setStrengths: (strengths: string[]) => void;
  setResults: (results: CareerMatch[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  generateCareer: () => Promise<void>;
  // New features for Dashboard
  savedCareers: CareerMatch[];
  streak: number;
  achievements: string[];
  saveCareer: (career: CareerMatch) => void;
  removeSavedCareer: (title: string) => void;
}

const defaultAssessment: AssessmentData = {
  skills: [],
  interests: [],
  strengths: [],
};

const CareerContext = createContext<CareerContextType | null>(null);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [assessment, setAssessment] =
    useState<AssessmentData>(defaultAssessment);
  const [results, setResults] = useState<CareerMatch[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryAfter, setRetryAfter] = useState(0);

  // Dashboard Stats
  const [savedCareers, setSavedCareers] = useState<CareerMatch[]>([]);
  const [streak, setStreak] = useState(1);
  const [achievements, setAchievements] = useState<string[]>(["Explorer"]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("onebyai_saved_careers");
      if (saved) setSavedCareers(JSON.parse(saved));

      const savedStreak = localStorage.getItem("onebyai_streak");
      if (savedStreak) setStreak(Number(savedStreak));
      
      const savedBadges = localStorage.getItem("onebyai_achievements");
      if (savedBadges) setAchievements(JSON.parse(savedBadges));
    } catch (e) {
      console.warn("Could not load from localStorage");
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("onebyai_saved_careers", JSON.stringify(savedCareers));
  }, [savedCareers]);

  const saveCareer = useCallback((career: CareerMatch) => {
    setSavedCareers(prev => {
      if (prev.find(c => c.title === career.title)) return prev;
      return [...prev, career];
    });
  }, []);

  const removeSavedCareer = useCallback((title: string) => {
    setSavedCareers(prev => prev.filter(c => c.title !== title));
  }, []);

  const setSkills = useCallback(
    (skills: string[]) =>
      setAssessment((prev) => ({ ...prev, skills })),
    []
  );

  const setInterests = useCallback(
    (interests: string[]) =>
      setAssessment((prev) => ({ ...prev, interests })),
    []
  );

  const setStrengths = useCallback(
    (strengths: string[]) =>
      setAssessment((prev) => ({ ...prev, strengths })),
    []
  );

  const generateCareer = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRetryAfter(0);

    try {
      const res = await fetch("/api/generate-career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessment),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Handle rate limiting with retry countdown
        if (res.status === 429 && data.retryAfter) {
          setRetryAfter(data.retryAfter);
        }
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setResults(data.careers || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [assessment]);

  const reset = useCallback(() => {
    setAssessment(defaultAssessment);
    setResults([]);
    setError(null);
    setLoading(false);
    setRetryAfter(0);
  }, []);

  return (
    <CareerContext.Provider
      value={{
        assessment,
        results,
        isLoading,
        error,
        retryAfter,
        setSkills,
        setInterests,
        setStrengths,
        setResults,
        setLoading,
        setError,
        generateCareer,
        reset,
        savedCareers,
        streak,
        achievements,
        saveCareer,
        removeSavedCareer,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used within a CareerProvider");
  }
  return context;
}
