import { Anchor, Beaker, Building2, Car, Cog, Package, Shirt, Stethoscope, UtensilsCrossed, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";

const sectors = [
  { icon: Cog, label: "Manufacturing plants" },
  { icon: UtensilsCrossed, label: "Food & beverage processing" },
  { icon: Warehouse, label: "Warehousing & distribution" },
  { icon: Anchor, label: "Port & logistics facilities" },
  { icon: Beaker, label: "Chemical & process plants" },
  { icon: Car, label: "Automotive & components" },
  { icon: Package, label: "Packaging & paper" },
  { icon: Shirt, label: "Textiles & clothing" },
  { icon: Building2, label: "Office parks & retail centres" },
  { icon: Stethoscope, label: "Institutions & healthcare facilities" },
];

// Aceternity-style infinite moving strip, pure CSS so it never blocks the main thread.
function Row({ reverse, duration }: { reverse?: boolean; duration: string }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul
        className={cn(
          "flex w-max shrink-0 gap-6 animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[...sectors, ...sectors].map(({ icon: Icon, label }, i) => (
          <li
            key={`${label}-${i}`}
            aria-hidden={i >= sectors.length}
            className="flex items-center gap-3 rounded-full border border-white/[0.07] bg-steel-900 px-6 py-3.5 text-steel-300 transition-colors hover:border-flame/40 hover:text-white"
          >
            <Icon className="h-4 w-4 text-flame" strokeWidth={1.7} />
            <span className="whitespace-nowrap text-sm font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sectors() {
  return (
    <section id="sectors" className="relative scroll-mt-24 border-y border-white/[0.06] bg-steel-950 py-16">
      <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-steel-500">
        Built for the sectors that keep KwaZulu&#8209;Natal working
      </p>
      <div className="flex flex-col gap-5">
        <Row duration="55s" />
        <Row duration="65s" reverse />
      </div>
    </section>
  );
}
