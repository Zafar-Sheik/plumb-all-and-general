"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Aceternity UI "3D Card": tilts toward the cursor with perspective depth.
export function ThreeDCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  return (
    <div className="[perspective:1200px]">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          const x = (e.clientX - rect.left - rect.width / 2) / 28;
          const y = (e.clientY - rect.top - rect.height / 2) / 28;
          setTransform(`rotateY(${x}deg) rotateX(${-y}deg)`);
        }}
        onMouseLeave={() => setTransform("rotateX(0deg) rotateY(0deg)")}
        style={{ transform, transformStyle: "preserve-3d" }}
        className={cn("transition-transform duration-200 ease-out", className)}
      >
        {children}
      </div>
    </div>
  );
}
