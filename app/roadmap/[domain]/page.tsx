import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRoadmapBySlug } from '@/lib/roadmapData';
import * as LucideIcons from 'lucide-react';
import { RoadmapClientView } from '@/components/RoadmapClientView';

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const roadmap = getRoadmapBySlug(resolvedParams.domain);
  if (!roadmap) {
    return { title: 'Roadmap Not Found - AI Career Navigator' };
  }
  return {
    title: `${roadmap.domain} Learning Roadmap - AI Career Navigator`,
    description: roadmap.description,
  };
}

export default async function RoadmapPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const roadmap = getRoadmapBySlug(resolvedParams.domain);
  
  if (!roadmap) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Navigation Bar */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LucideIcons.Brain className="w-8 h-8 text-[var(--accent-violet)]" />
          <span className="text-xl font-bold gradient-text">One By AI</span>
        </div>
        <Link href="/" className="btn-secondary px-4 py-2 text-sm">
          <LucideIcons.ArrowLeft className="w-4 h-4 inline-block mr-2" />
          Back to Hub
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <RoadmapClientView roadmap={roadmap} />
      </main>
    </div>
  );
}
