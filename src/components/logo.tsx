import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="39" height="39" rx="11" fill="#11161d" stroke="rgba(255,255,255,0.12)" />
      <path
        d="M12 31V14a5 5 0 0 1 5-5h6.5a6.5 6.5 0 0 1 0 13H17"
        stroke="url(#logo-pipe)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="22" r="2.2" fill="#23d5ff" />
      <rect x="9" y="29" width="6" height="3.5" rx="1" fill="#ff6a1a" />
      <defs>
        <linearGradient id="logo-pipe" x1="12" y1="31" x2="30" y2="9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6a1a" />
          <stop offset="1" stopColor="#ffb07a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-tight text-white">Plumb All</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-steel-500">
          and General
        </span>
      </span>
    </span>
  );
}
