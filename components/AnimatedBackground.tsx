"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  const orbs = [
    {
      size: 500,
      color: "rgba(139, 92, 246, 0.15)",
      x: "10%",
      y: "20%",
      delay: 0,
      duration: 20,
    },
    {
      size: 400,
      color: "rgba(6, 182, 212, 0.12)",
      x: "70%",
      y: "10%",
      delay: 2,
      duration: 25,
    },
    {
      size: 350,
      color: "rgba(217, 70, 239, 0.1)",
      x: "50%",
      y: "60%",
      delay: 4,
      duration: 22,
    },
    {
      size: 300,
      color: "rgba(16, 185, 129, 0.08)",
      x: "85%",
      y: "70%",
      delay: 1,
      duration: 18,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.x,
            top: orb.y,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top radial fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
        }}
      />

      {/* Bottom radial fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
