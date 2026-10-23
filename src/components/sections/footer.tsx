"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Logo } from "@/components/logo";
import { navLinks, site, telHref } from "@/lib/site";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-word span", {
          yPercent: 100,
          duration: 1.2,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: { trigger: ".footer-word", start: "top 95%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-white/[0.06] bg-steel-950 pb-28 pt-20 sm:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-steel-500">
              Industrial plumbing and general works contractor based in {site.city}, {site.region}. Industrial and
              commercial clients only.
            </p>
          </div>
          <div className="flex gap-16 text-sm">
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-steel-300 transition-colors hover:text-flame">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              <li className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">Call</li>
              <li>
                <a href={telHref} className="text-white transition-colors hover:text-flame">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">Location</li>
              <li className="text-white">{site.city}, ZA</li>
            </ul>
          </div>
        </div>

        <p
          className="footer-word font-display mt-20 flex select-none overflow-hidden text-[clamp(3.5rem,15vw,14rem)] font-bold leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]"
          aria-hidden
        >
          {"PLUMB ALL".split("").map((c, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {c}
            </span>
          ))}
        </p>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-steel-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Industrial plumbing &middot; {site.city}, {site.country}</p>
        </div>
      </div>
    </footer>
  );
}
