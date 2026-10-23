"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site, telHref, whatsappHref } from "@/lib/site";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Magnetic } from "@/components/magnetic";

const jobTypes = [
  "Breakdown / emergency",
  "Process & industrial piping",
  "Planned maintenance",
  "Drainage & effluent",
  "Pumps & boosters",
  "Bulk water & storage",
  "Hot water systems",
  "Ablution blocks",
  "General building works",
  "Other",
];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", company: "", site: "", job: jobTypes[0], details: "" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".contact-title", { type: "chars,words" });
        gsap.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          rotate: 8,
          duration: 0.9,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 85%" },
        });
        gsap.from(".contact-phone", {
          scale: 0.85,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".contact-phone", start: "top 90%" },
        });
        gsap.from(".contact-form > *", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hi ${site.name}, I'd like a quote / call-out.`,
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      form.site && `Site location: ${form.site}`,
      `Job type: ${form.job}`,
      form.details && `Details: ${form.details}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-2xl border border-white/10 bg-steel-950/70 px-4 py-3.5 text-sm text-white placeholder:text-steel-500 outline-none transition focus:border-flame/60 focus:ring-4 focus:ring-flame/10";

  return (
    <section id="contact" ref={root} className="relative scroll-mt-24 overflow-hidden bg-steel-950 py-28 sm:py-36">
      <BackgroundBeams />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-flame">Contact</p>
          <h2 className="contact-title font-display mt-5 text-[clamp(2.6rem,6.5vw,5.6rem)] font-semibold leading-[0.95] text-white">
            Line down? Plant waiting? Call us.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-steel-300">
            Speak directly to the team for breakdowns, quotes and planned work on industrial and commercial sites in
            and around {site.city}.
          </p>

          <div className="contact-phone mt-12">
            <Magnetic strength={0.2}>
              <a
                href={telHref}
                className="group inline-flex flex-col rounded-[2rem] border border-white/10 bg-steel-900/80 p-7 pr-10 backdrop-blur-xl transition-colors hover:border-flame/50"
              >
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-steel-500">
                  <Phone className="h-3.5 w-3.5 text-flame" /> Tap to call
                </span>
                <span className="font-display mt-3 flex items-center gap-4 text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-none text-white">
                  <span className="text-gradient-flame">{site.phoneDisplay}</span>
                  <ArrowUpRight className="h-8 w-8 text-steel-500 transition-all duration-300 group-hover:rotate-45 group-hover:text-flame" />
                </span>
              </a>
            </Magnetic>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-white/[0.07] pt-8 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">Based in</dt>
              <dd className="mt-2 text-white">
                {site.city}, {site.region}
                <br />
                {site.country}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500">Work type</dt>
              <dd className="mt-2 text-white">
                Industrial &amp; commercial only
                <br />
                <span className="text-steel-500">No domestic work</span>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="contact-form relative flex flex-col gap-4 self-start rounded-[2rem] border border-white/10 bg-steel-900/70 p-6 shadow-[0_40px_120px_-40px_rgba(35,213,255,0.25)] backdrop-blur-xl sm:p-8"
        >
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">Request a quote</h3>
            <p className="mt-1 text-sm text-steel-500">Sends your details to us on WhatsApp.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs text-steel-300">Your name</span>
              <input required value={form.name} onChange={update("name")} className={field} placeholder="Full name" autoComplete="name" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs text-steel-300">Company</span>
              <input value={form.company} onChange={update("company")} className={field} placeholder="Company / facility" autoComplete="organization" />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs text-steel-300">Site location</span>
            <input value={form.site} onChange={update("site")} className={field} placeholder="e.g. Prospecton, Durban" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs text-steel-300">Type of work</span>
            <select value={form.job} onChange={update("job")} className={field}>
              {jobTypes.map((t) => (
                <option key={t} value={t} className="bg-steel-900">
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs text-steel-300">Details</span>
            <textarea
              value={form.details}
              onChange={update("details")}
              rows={4}
              className={`${field} resize-none`}
              placeholder="What's the problem or project? Pipe sizes, urgency, access times…"
            />
          </label>
          <button
            type="submit"
            className="group mt-2 flex h-14 items-center justify-center gap-2 rounded-2xl bg-flame font-semibold text-steel-950 transition-[background-color,box-shadow] hover:bg-flame-soft hover:shadow-[0_0_40px_-5px_rgba(255,106,26,0.7)]"
          >
            <MessageCircle className="h-5 w-5" />
            Send via WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </button>
        </form>
      </div>
    </section>
  );
}
