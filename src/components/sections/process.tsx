"use client";

import { useRef } from "react";
import { ClipboardCheck, FileText, PhoneCall, ScanSearch, ShieldCheck, Wrench } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    icon: PhoneCall,
    title: "Call & brief",
    body: "Phone us directly. Tell us what's failing or what you're planning, and we'll ask the right questions up front.",
  },
  {
    icon: ScanSearch,
    title: "Site assessment",
    body: "We walk the site, trace the lines, check access, isolation points and safety requirements before any work is priced.",
  },
  {
    icon: FileText,
    title: "Scope & quote",
    body: "A clear, itemised scope with materials, timelines and any shutdown windows needed. No surprises later.",
  },
  {
    icon: Wrench,
    title: "Planned execution",
    body: "Work is scheduled around your production: after-hours, weekend or shutdown windows to keep downtime low.",
  },
  {
    icon: ShieldCheck,
    title: "Test & commission",
    body: "New and repaired lines are pressure tested and commissioned before your team puts them back into service.",
  },
  {
    icon: ClipboardCheck,
    title: "Handover & aftercare",
    body: "We hand over a clean site and stay on call for follow-up maintenance, so the system keeps performing.",
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth + 64;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".process-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          ".process-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-pin",
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        const cards = gsap.utils.toArray<HTMLElement>(".process-card");
        // Cards already on screen when the section pins reveal as it arrives.
        const onScreen = cards.filter((card) => card.offsetLeft < window.innerWidth * 0.85);
        gsap.from(onScreen.flatMap((card) => [...card.querySelectorAll(".process-anim")]), {
          y: 40,
          opacity: 0,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".process-pin", start: "top 65%" },
        });
        // The rest reveal as the horizontal track slides them in.
        cards.filter((card) => !onScreen.includes(card)).forEach((card) => {
          gsap.from(card.querySelectorAll(".process-anim"), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 85%",
            },
          });
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".process-vfill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="process" ref={root} className="relative scroll-mt-24 bg-steel-900">
      <div className="process-pin relative flex min-h-screen flex-col justify-center overflow-hidden py-24 lg:h-screen lg:py-0">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-aqua">How we work</p>
          <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] text-white">
            From first call to <span className="text-gradient-aqua">commissioned.</span>
          </h2>
        </div>

        {/* Horizontal pipe progress (desktop) */}
        <div className="relative mx-auto mt-14 hidden w-full max-w-7xl px-8 lg:block">
          <div className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-steel-950">
            <div className="process-fill absolute inset-0 origin-left bg-gradient-to-r from-aqua via-aqua-deep to-flame" />
          </div>
        </div>

        <div
          ref={track}
          className="relative mt-12 flex flex-col gap-6 px-5 sm:px-8 lg:mt-14 lg:w-max lg:flex-row lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-8"
        >
          {/* Vertical pipe progress (mobile) */}
          <div className="absolute bottom-0 left-[2.6rem] top-0 w-[3px] overflow-hidden rounded-full bg-white/10 sm:left-[3.1rem] lg:hidden">
            <div className="process-vfill absolute inset-0 origin-top bg-gradient-to-b from-aqua to-flame" />
          </div>

          {steps.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className="process-card relative flex gap-5 pl-0 lg:block lg:w-[380px] lg:shrink-0"
            >
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-steel-950 font-mono text-xs text-aqua lg:hidden">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="group relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-steel-950/80 p-7 backdrop-blur transition-colors duration-300 hover:border-aqua/40 lg:h-[340px] lg:p-9">
                <span className="process-anim pointer-events-none absolute -right-4 -top-8 font-display text-[9rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-aqua/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="process-anim relative flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua/10 text-aqua">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="process-anim font-display relative mt-8 text-2xl font-semibold text-white">{title}</h3>
                <p className="process-anim relative mt-4 leading-relaxed text-steel-300">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
