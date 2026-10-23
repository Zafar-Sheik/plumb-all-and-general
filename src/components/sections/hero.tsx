"use client";

import { useRef } from "react";
import { ArrowDownRight, Factory, MapPin, Phone, Siren } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site, telHref } from "@/lib/site";
import { Spotlight } from "@/components/ui/spotlight";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { ThreeDCard } from "@/components/ui/three-d-card";
import { Magnetic } from "@/components/magnetic";

const pipes = [
  "M-20 180 H360 V420 H620",
  "M1460 120 H1120 V300 H900 V520",
  "M-20 760 H240 V620 H520 V880",
  "M1460 700 H1180 V560 H980",
  "M720 -20 V140 H980",
  "M620 420 H900 V520",
];

const joints = [
  [360, 180],
  [360, 420],
  [620, 420],
  [1120, 120],
  [1120, 300],
  [900, 300],
  [900, 520],
  [240, 760],
  [240, 620],
  [520, 620],
  [1180, 700],
  [1180, 560],
  [720, 140],
];

const highlights = [
  { icon: Factory, label: "Industrial & commercial only" },
  { icon: Siren, label: "Breakdown call-outs" },
  { icon: MapPin, label: "Durban, KwaZulu-Natal" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-title", { type: "lines,words", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-pipe", { drawSVG: "0%", duration: 2.2, stagger: 0.12, ease: "power2.inOut" }, 0)
          .from(".hero-flow", { opacity: 0, duration: 1.2, stagger: 0.1 }, 1.4)
          .from(".hero-joint", { scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.05, ease: "back.out(3)" }, 0.6)
          .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, 0.2)
          .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.3)
          .from(".hero-copy", { y: 24, opacity: 0, duration: 0.9 }, 0.9)
          .from(".hero-cta > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.0)
          .from(".hero-chip", { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, 1.2)
          .from(".hero-panel", { y: 60, opacity: 0, rotateX: 18, duration: 1.4 }, 0.7)
          .fromTo(
            ".gauge-needle",
            { rotation: -120 },
            { rotation: 38, duration: 2.2, ease: "elastic.out(1, 0.4)", svgOrigin: "100 100" },
            1.2,
          )
          .from(".gauge-arc", { drawSVG: "0%", duration: 1.6, ease: "power2.out" }, 1.1);

        // Readout counters
        gsap.utils.toArray<HTMLElement>(".hero-counter").forEach((el) => {
          const target = Number(el.dataset.value);
          const decimals = Number(el.dataset.decimals ?? 0);
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: target,
              duration: 2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = obj.v.toFixed(decimals);
              },
            },
            1.3,
          );
        });

        // Needle idles like a live gauge
        gsap.to(".gauge-needle", {
          rotation: "+=6",
          svgOrigin: "100 100",
          duration: 1.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 3.6,
        });

        // Water droplets travelling the pipe network
        gsap.utils.toArray<SVGCircleElement>(".hero-drop").forEach((drop, i) => {
          gsap.to(drop, {
            motionPath: { path: `#hero-pipe-${i % pipes.length}`, align: `#hero-pipe-${i % pipes.length}`, alignOrigin: [0.5, 0.5] },
            duration: 5 + (i % 3) * 1.5,
            repeat: -1,
            ease: "none",
            delay: 2 + i * 0.6,
          });
        });

        // Parallax out on scroll
        gsap.to(".hero-content", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-network", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-steel-950 pb-20 pt-32"
    >
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#ff6a1a" />
      <Spotlight className="-top-10 left-full h-[80vh] w-[50vw] opacity-40" fill="#23d5ff" />

      {/* Pipe network */}
      <svg
        className="hero-network pointer-events-none absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden
      >
        {pipes.map((d, i) => (
          <g key={d}>
            <path className="hero-pipe" d={d} stroke="#1c2530" strokeWidth="14" strokeLinejoin="round" />
            <path
              id={`hero-pipe-${i}`}
              className="hero-flow animate-flow"
              d={d}
              stroke="url(#hero-flow)"
              strokeWidth="2"
              strokeDasharray="6 18"
              strokeLinecap="round"
            />
          </g>
        ))}
        {joints.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} className="hero-joint">
            <circle cx={cx} cy={cy} r="13" fill="#11161d" stroke="#2c3744" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="4" fill="#ff6a1a" />
          </g>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} className="hero-drop" r="4" fill="#23d5ff" opacity="0.9" />
        ))}
        <defs>
          <linearGradient id="hero-flow" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#23d5ff" />
            <stop offset="1" stopColor="#ff6a1a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-steel-950/40 via-steel-950/60 to-steel-950" />

      <div className="hero-content relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-flame" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flame" />
            </span>
            Industrial plumbing contractor · {site.city}
          </p>

          <h1 className="hero-title font-display mt-7 text-[clamp(2.75rem,7.4vw,6.4rem)] font-semibold leading-[0.95] text-white">
            Pressure&#8209;tested plumbing <span className="text-gradient-flame">for industry.</span>
          </h1>

          <p className="hero-copy mt-7 max-w-xl text-lg leading-relaxed text-steel-300">
            {site.name} builds, maintains and repairs the plumbing that keeps plants, factories, warehouses and
            facilities running. Industrial work only &mdash; planned around your production, delivered to spec.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <MovingBorderButton href={telHref} className="text-base">
                <Phone className="h-4 w-4 text-flame" />
                Call {site.phoneDisplay}
              </MovingBorderButton>
            </Magnetic>
            <a
              href="#services"
              className="group inline-flex h-14 items-center gap-2 rounded-full px-6 text-sm font-medium text-steel-300 transition-colors hover:text-white"
            >
              Explore services
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="hero-chip flex items-center gap-2 rounded-full border border-white/[0.08] bg-steel-900/60 px-4 py-2 text-sm text-steel-300 backdrop-blur"
              >
                <Icon className="h-4 w-4 text-aqua" strokeWidth={1.7} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-panel hidden lg:block">
          <ThreeDCard>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-steel-900/80 p-7 shadow-[0_40px_120px_-30px_rgba(255,106,26,0.35)] backdrop-blur-xl">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">
                <span>System check</span>
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                </span>
              </div>

              <svg viewBox="0 0 200 130" className="mx-auto mt-6 w-full max-w-[280px]" aria-hidden>
                <path d="M20 100 A80 80 0 0 1 180 100" stroke="#1f2833" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path
                  className="gauge-arc"
                  d="M20 100 A80 80 0 0 1 180 100"
                  stroke="url(#gauge-grad)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                />
                {Array.from({ length: 11 }).map((_, i) => {
                  const a = Math.PI + (i / 10) * Math.PI;
                  return (
                    <line
                      key={i}
                      x1={100 + Math.cos(a) * 62}
                      y1={100 + Math.sin(a) * 62}
                      x2={100 + Math.cos(a) * (i % 5 === 0 ? 52 : 56)}
                      y2={100 + Math.sin(a) * (i % 5 === 0 ? 52 : 56)}
                      stroke="#5b6878"
                      strokeWidth="1.5"
                    />
                  );
                })}
                <g className="gauge-needle">
                  <line x1="100" y1="100" x2="100" y2="42" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                </g>
                <circle cx="100" cy="100" r="8" fill="#ff6a1a" />
                <circle cx="100" cy="100" r="3" fill="#07090c" />
                <defs>
                  <linearGradient id="gauge-grad" x1="20" x2="180" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#23d5ff" />
                    <stop offset="0.6" stopColor="#ff9354" />
                    <stop offset="1" stopColor="#ff3d00" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Readout label="Line pressure" value={6.4} decimals={1} unit="bar" />
                <Readout label="Flow rate" value={480} unit="L/min" />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel-300">Pressure test</span>
                <span className="font-mono text-xs font-semibold text-emerald-400">PASSED</span>
              </div>
            </div>
          </ThreeDCard>
        </div>
      </div>

    </section>
  );
}

function Readout({ label, value, unit, decimals = 0 }: { label: string; value: number; unit: string; decimals?: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-steel-950/60 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">{label}</p>
      <p className="font-display mt-1 text-2xl font-semibold text-white">
        <span className="hero-counter" data-value={value} data-decimals={decimals}>
          {value.toFixed(decimals)}
        </span>{" "}
        <span className="text-sm font-normal text-steel-500">{unit}</span>
      </p>
    </div>
  );
}
