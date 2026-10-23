"use client";

import { useRef } from "react";
import { Ban, Check } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const weDo = ["Factories & production plants", "Warehouses & depots", "Commercial & institutional facilities", "Plant shutdowns & projects"];
const weDont = ["Household call-outs", "Residential renovations", "Domestic geysers & taps"];

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".manifesto-text", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ".manifesto-text", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from(".manifesto-list li", {
          x: -24,
          opacity: 0,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto-list", start: "top 85%" },
        });
        gsap.fromTo(
          ".manifesto-stripe",
          { backgroundPositionX: "0px" },
          {
            backgroundPositionX: "400px",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-steel-950 py-28 sm:py-36">
      <div className="manifesto-stripe hazard-stripe absolute inset-x-0 top-0 h-2 opacity-80" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">Industrial only</p>
        <p className="manifesto-text font-display mt-8 text-[clamp(1.9rem,4.6vw,3.9rem)] font-medium leading-[1.08] text-white">
          We don&rsquo;t do domestic. Every line we run, every pump we commission and every drain we clear is for
          industry &mdash; where downtime costs money, safety is non&#8209;negotiable and the job has to be right the
          first time.
        </p>

        <div className="manifesto-list mt-16 grid gap-10 border-t border-white/[0.07] pt-12 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-steel-500">What we take on</h3>
            <ul className="mt-6 space-y-4">
              {weDo.map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-flame/15 text-flame">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-steel-500">What we don&rsquo;t</h3>
            <ul className="mt-6 space-y-4">
              {weDont.map((item) => (
                <li key={item} className="flex items-center gap-4 text-lg text-steel-500 line-through decoration-steel-700">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-steel-500">
                    <Ban className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
