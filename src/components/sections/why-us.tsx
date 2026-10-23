"use client";

import { useRef } from "react";
import { CalendarClock, Handshake, HardHat, MapPinned, Ruler } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { site } from "@/lib/site";

export function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bento-item", {
          y: 70,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".bento", start: "top 80%" },
        });
        gsap.to(".uptime-bar", {
          scaleY: (i: number) => [0.55, 0.8, 0.65, 0.95, 0.75, 1, 0.85, 0.9][i % 8],
          duration: 1.2,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".bento", start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-steel-950 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">Why industry calls us</p>
        <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] text-white">
          Plumbing that respects your production line.
        </h2>

        <div className="bento mt-16 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
          <CardSpotlight className="bento-item md:col-span-4 md:row-span-2">
            <div className="flex h-full flex-col justify-between p-8 sm:p-10">
              <div>
                <CalendarClock className="h-7 w-7 text-flame" strokeWidth={1.5} />
                <h3 className="font-display mt-6 text-3xl font-semibold text-white sm:text-4xl">Built around uptime</h3>
                <p className="mt-4 max-w-lg text-steel-300">
                  Every job is planned to keep your plant producing. We work to your shutdown windows, after hours and
                  over weekends, and isolate only what&rsquo;s needed.
                </p>
              </div>
              <div className="mt-10 flex h-32 items-end gap-2 sm:gap-3" aria-hidden>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="relative h-full flex-1 overflow-hidden rounded-md bg-white/[0.03]">
                    <div className="uptime-bar absolute inset-0 origin-bottom scale-y-[0.08] rounded-md bg-gradient-to-t from-flame/70 to-flame-soft/30" />
                  </div>
                ))}
              </div>
            </div>
          </CardSpotlight>

          <CardSpotlight className="bento-item md:col-span-2" color="rgba(35,213,255,0.14)">
            <div className="p-8">
              <HardHat className="h-7 w-7 text-aqua" strokeWidth={1.5} />
              <h3 className="font-display mt-6 text-2xl font-semibold text-white">Site-safety first</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                PPE, permits to work, isolation and lock-out procedures. We follow your site rules from the gate in.
              </p>
            </div>
          </CardSpotlight>

          <CardSpotlight className="bento-item md:col-span-2" color="rgba(35,213,255,0.14)">
            <div className="p-8">
              <Ruler className="h-7 w-7 text-aqua" strokeWidth={1.5} />
              <h3 className="font-display mt-6 text-2xl font-semibold text-white">Built to spec</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                Correct materials for the medium, pressure and temperature, tested before handover.
              </p>
            </div>
          </CardSpotlight>

          <CardSpotlight className="bento-item md:col-span-3">
            <div className="p-8">
              <Handshake className="h-7 w-7 text-flame" strokeWidth={1.5} />
              <h3 className="font-display mt-6 text-2xl font-semibold text-white">One contractor, end to end</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                Plumbing plus the general building works around it. No juggling trades, one number to call.
              </p>
            </div>
          </CardSpotlight>

          <CardSpotlight className="bento-item md:col-span-3">
            <div className="p-8">
              <MapPinned className="h-7 w-7 text-flame" strokeWidth={1.5} />
              <h3 className="font-display mt-6 text-2xl font-semibold text-white">Local to {site.city}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-300">
                Based in {site.city}, close to the industrial hubs we serve, so we can get to your site quickly when
                it matters.
              </p>
            </div>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
