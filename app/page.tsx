"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FeaturedCareers } from "@/components/FeaturedCareers";
import { PopularRoadmaps } from "@/components/PopularRoadmaps";
import { SuccessStories } from "@/components/SuccessStories";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <Features />
      <FeaturedCareers />
      <PopularRoadmaps />
      <SuccessStories />
      <Footer />
    </main>
  );
}
