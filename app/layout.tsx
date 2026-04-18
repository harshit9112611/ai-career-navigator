import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { CareerProvider } from "@/store/CareerContext";
import { AiMentorFab } from "@/components/AiMentorFab";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "One By AI — Discover Your Ideal Career Path",
  description:
    "Use AI-powered analysis to discover personalized career paths based on your skills, interests, and strengths. Built with Google Gemini.",
  keywords: ["AI", "career", "navigator", "skills", "Gemini", "career path"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen font-sans antialiased text-[var(--text-primary)] selection:bg-violet-500/30 selection:text-white">
        <CareerProvider>
          {children}
          <AiMentorFab />
        </CareerProvider>
      </body>
    </html>
  );
}
