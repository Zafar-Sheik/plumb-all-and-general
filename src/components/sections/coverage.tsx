"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const base = { x: 392, y: 330 };

const nodes = [
  { name: "Cornubia & Umhlanga", x: 452, y: 140 },
  { name: "Phoenix Industrial", x: 372, y: 168 },
  { name: "Riverhorse Valley", x: 350, y: 238 },
  { name: "New Germany", x: 248, y: 262 },
  { name: "Pinetown & Westmead", x: 236, y: 318 },
  { name: "Hammarsdale", x: 92, y: 340 },
  { name: "Durban Harbour", x: 418, y: 376 },
  { name: "Mobeni & Jacobs", x: 356, y: 414 },
  { name: "Prospecton", x: 334, y: 456 },
  { name: "Isipingo", x: 312, y: 502 },
];

function routePath(x: number, y: number) {
  const mx = (base.x + x) / 2;
  const my = Math.min(base.y, y) - 40;
  return `M${base.x} ${base.y} Q${mx} ${my} ${x} ${y}`;
}

export function Coverage() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".coverage-map", start: "top 75%" } });
        tl.from(".coast", { drawSVG: "0%", duration: 2, ease: "power2.inOut" })
          .from(".route", { drawSVG: "0%", duration: 1.1, stagger: 0.08, ease: "power2.out" }, 0.4)
          .from(".node", { scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.08, ease: "back.out(3)" }, 0.8)
          .from(".area-item", { x: 30, opacity: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section id="coverage" ref={root} className="relative scroll-mt-24 overflow-hidden bg-steel-900 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="coverage-map relative aspect-square w-full max-w-[600px] justify-self-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_55%,rgba(35,213,255,0.12),transparent_60%)]" />
          <svg viewBox="0 0 600 600" className="relative h-full w-full [mask-image:radial-gradient(circle_at_center,black_55%,transparent_80%)]" fill="none" aria-label={`Map of industrial areas around ${site.city}`}>
            {/* Ocean */}
            <path
              d="M520 0 C500 90 470 150 455 230 C440 300 430 340 438 362 C448 372 470 380 462 398 C430 450 380 520 330 600 L600 600 L600 0 Z"
              fill="rgba(35,213,255,0.05)"
            />
            <path
              className="coast"
              d="M520 0 C500 90 470 150 455 230 C440 300 430 340 438 362 C448 372 470 380 462 398 C430 450 380 520 330 600"
              stroke="#23d5ff"
              strokeOpacity="0.55"
              strokeWidth="2"
            />
            <text x="472" y="270" fill="#23d5ff" fillOpacity="0.4" fontSize="11" letterSpacing="4" className="font-mono">
              INDIAN OCEAN
            </text>

            {nodes.map((n, i) => (
              <path
                key={`route-${n.name}`}
                className="route"
                d={routePath(n.x, n.y)}
                stroke={active === i ? "#ff6a1a" : "rgba(169,180,194,0.22)"}
                strokeWidth={active === i ? 2 : 1.2}
                style={{ transition: "stroke 0.3s" }}
              />
            ))}

            {nodes.map((n, i) => (
              <g
                key={n.name}
                className="node cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <circle cx={n.x} cy={n.y} r="14" fill="transparent" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={active === i ? 8 : 5}
                  fill={active === i ? "#ff6a1a" : "#a9b4c2"}
                  style={{ transition: "all 0.3s" }}
                />
                {active === i && (
                  <text x={n.x + 14} y={n.y + 4} fill="#ffffff" fontSize="13" fontWeight="600">
                    {n.name}
                  </text>
                )}
              </g>
            ))}

            {/* Base */}
            <circle cx={base.x} cy={base.y} r="22" fill="#ff6a1a" fillOpacity="0.18">
              <animate attributeName="r" values="14;34;14" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.35;0;0.35" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle cx={base.x} cy={base.y} r="9" fill="#ff6a1a" stroke="#07090c" strokeWidth="3" />
            <text x={base.x - 96} y={base.y + 34} fill="#ffffff" fontSize="14" fontWeight="700">
              {site.city} base
            </text>
          </svg>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-aqua">Coverage</p>
          <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] text-white">
            Rooted in {site.city}. <span className="text-steel-500">Ready across eThekwini.</span>
          </h2>
          <p className="mt-6 max-w-lg text-steel-300">
            We&rsquo;re based in {site.city} and work across the city&rsquo;s industrial nodes, from the harbour and
            the South Durban basin to the inland and northern parks. Sites further afield in {site.region} by
            arrangement.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {nodes.map((n, i) => (
              <li key={n.name} className="area-item">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-300",
                    active === i
                      ? "border-flame/50 bg-flame/10 text-white"
                      : "border-white/[0.07] bg-steel-950/50 text-steel-300 hover:text-white",
                  )}
                >
                  {n.name}
                  <span className={cn("h-1.5 w-1.5 rounded-full", active === i ? "bg-flame" : "bg-steel-700")} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
