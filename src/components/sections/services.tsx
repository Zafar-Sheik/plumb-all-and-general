"use client";

import { useRef } from "react";
import { Bath, Cog, Droplets, Flame, Gauge, HardHat, Siren, Waves, Workflow } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { HoverEffect, type HoverItem } from "@/components/ui/hover-effect";

const services: HoverItem[] = [
  {
    icon: Workflow,
    title: "Process & industrial piping",
    description:
      "Design-to-install pipework for process water, compressed air, chilled water and condensate return. New lines, modifications and tie-ins on live plants.",
    tags: ["Steel", "Stainless", "HDPE", "PPR", "uPVC"],
  },
  {
    icon: Cog,
    title: "Planned plant maintenance",
    description:
      "Scheduled inspections and maintenance programmes that catch leaks, corrosion and wear before they become a shutdown.",
    tags: ["Maintenance contracts", "Shutdowns"],
  },
  {
    icon: Waves,
    title: "Industrial drainage & effluent",
    description:
      "Trade-effluent lines, sumps, interceptors and grease traps installed, cleared and maintained. High-pressure jetting for stubborn blockages.",
    tags: ["Effluent", "Jetting", "Sumps"],
  },
  {
    icon: Gauge,
    title: "Pumps & booster systems",
    description:
      "Supply, installation and servicing of booster sets, transfer and sump pumps, keeping pressure steady across your site.",
    tags: ["Booster sets", "Transfer pumps"],
  },
  {
    icon: Droplets,
    title: "Bulk water supply & storage",
    description:
      "Bulk water mains, storage tanks, backflow prevention and leak detection to protect supply and cut water losses.",
    tags: ["Tanks", "Backflow", "Leak detection"],
  },
  {
    icon: Flame,
    title: "Hot water & heating systems",
    description:
      "Commercial-scale hot water plant: bulk geysers, calorifiers, heat pumps and circulation loops for wash-down and staff facilities.",
    tags: ["Calorifiers", "Heat pumps"],
  },
  {
    icon: Bath,
    title: "Ablution & change-room blocks",
    description:
      "Heavy-duty ablutions, wash troughs and change rooms built and refurbished for high-traffic industrial workforces.",
    tags: ["New builds", "Refurbishment"],
  },
  {
    icon: HardHat,
    title: "General building works",
    description:
      "The “General” in our name: trenching, chasing, concrete plinths, making good and associated works, so you deal with one contractor.",
    tags: ["Civils", "Making good"],
  },
  {
    icon: Siren,
    title: "Breakdown response",
    description:
      "Burst main, failed pump or flooded floor? Call us directly and we mobilise to isolate, repair and get your site back to work.",
    tags: ["Call-outs", "Isolation", "Repairs"],
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".services-title", { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".services-title", start: "top 85%" },
        });
        gsap.from(".services-grid > div", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: { each: 0.07, grid: "auto", from: "start" },
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section id="services" ref={root} className="relative scroll-mt-24 bg-steel-950 py-28 sm:py-36">
      <div className="bg-dots absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">Services</p>
            <h2 className="services-title font-display mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] text-white">
              Everything that flows through your facility.
            </h2>
          </div>
          <p className="max-w-md text-steel-300">
            From a single tie-in to a full plant reticulation, we handle the plumbing and the general works around it
            &mdash; one team, one point of contact.
          </p>
        </div>
        <HoverEffect items={services} className="services-grid mt-16 -mx-2" />
      </div>
    </section>
  );
}
