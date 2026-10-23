"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type HoverItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
};

// Aceternity UI "Card Hover Effect": a shared highlight that glides between cards.
export function HoverEffect({ items, className }: { items: HoverItem[]; className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-gradient-to-br from-flame/25 via-flame/5 to-aqua/15"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-flame transition-colors duration-300 group-hover:border-flame/40 group-hover:bg-flame/10">
                <item.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="font-mono text-xs text-steel-500">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display mt-8 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-steel-300">{item.description}</p>
            {item.tags && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-steel-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-20 h-full w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-steel-900 p-7 transition-colors duration-300 group-hover:border-white/15">
      {children}
    </div>
  );
}
