import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight">
            <span className="gradient-text">One By</span>{" "}
            <span className="text-[var(--text-muted)]">AI</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
          <Link
            href="/assessment"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Assessment
          </Link>
          <Link
            href="/results"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Results
          </Link>
        </div>

        {/* Attribution */}
        <p className="text-xs text-[var(--text-muted)]">
          Built for Hack2Skill Hackathon · Powered by Google Gemini
        </p>
      </div>
    </footer>
  );
}
