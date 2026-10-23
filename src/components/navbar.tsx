"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { navLinks, site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

// Aceternity-style floating navbar: hides on scroll down, returns on scroll up.
export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 40);
    setHidden(current > previous && current > 320 && !open);
  });

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-flame via-flame-soft to-aqua"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 pl-4 transition-all duration-500",
            scrolled
              ? "border-white/10 bg-steel-900/75 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" aria-label={`${site.name} home`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-steel-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-steel-950 transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-steel-900/95 p-3 backdrop-blur-xl md:hidden"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.04 * i } }}
                  className="font-display block rounded-2xl px-4 py-3 text-lg text-white hover:bg-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={telHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-flame px-4 py-3.5 font-semibold text-steel-950"
              >
                <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
