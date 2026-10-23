"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

type MovingBorderButtonProps = {
  children: React.ReactNode;
  href: string;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  target?: string;
  rel?: string;
};

// Aceternity UI "Moving Border": a glowing dot that travels around the button's edge.
export function MovingBorderButton({
  children,
  href,
  duration = 3000,
  className,
  containerClassName,
  borderClassName,
  ...rest
}: MovingBorderButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative inline-flex h-14 overflow-hidden rounded-full bg-transparent p-[1.5px]",
        containerClassName,
      )}
      {...rest}
    >
      <div className="absolute inset-0 rounded-full">
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(var(--color-flame)_40%,transparent_60%)] opacity-90",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-steel-900/90 px-7 text-sm font-medium text-white backdrop-blur-xl",
          className,
        )}
      >
        {children}
      </div>
    </a>
  );
}

function MovingBorder({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.div>
    </>
  );
}
