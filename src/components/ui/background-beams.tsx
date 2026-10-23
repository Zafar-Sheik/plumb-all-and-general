"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const paths = Array.from({ length: 18 }, (_, i) => {
  const o = i * 7;
  return `M${-380 + o} ${-189 - o * 1.2}C${-380 + o} ${-189 - o * 1.2} ${-312 + o} ${216 - o} ${152 + o} ${343 - o}C${616 + o} ${470 - o} ${684 + o} ${875 - o} ${684 + o} ${875 - o}`;
});

// Aceternity UI "Background Beams": gradient light travelling along curved paths.
export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center", className)}>
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {paths.map((d, i) => (
          <path key={`base-${i}`} d={d} stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
        ))}
        {paths.map((d, i) => (
          <motion.path
            key={`beam-${i}`}
            d={d}
            stroke={`url(#beam-gradient-${i})`}
            strokeOpacity="0.5"
            strokeWidth="0.8"
          />
        ))}
        <defs>
          {paths.map((_, i) => (
            <motion.linearGradient
              id={`beam-gradient-${i}`}
              key={`gradient-${i}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{ x1: ["0%", "100%"], x2: ["0%", "95%"], y1: ["0%", "100%"], y2: ["0%", `${93 + (i % 8)}%`] }}
              transition={{
                duration: 8 + (i % 6) * 1.7,
                ease: "easeInOut",
                repeat: Infinity,
                delay: (i % 5) * 1.3,
              }}
            >
              <stop stopColor="#ff6a1a" stopOpacity="0" />
              <stop stopColor="#ff6a1a" />
              <stop offset="32.5%" stopColor="#23d5ff" />
              <stop offset="100%" stopColor="#0b7ea3" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
