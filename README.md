# Plumb All and General: website

Marketing site for **Plumb All and General**, an industrial plumbing contractor based in Durban, KwaZulu-Natal.
The company works on industrial and commercial sites only, with no domestic work.

- **Phone:** 082 708 4648
- **Location:** Durban, KwaZulu-Natal, South Africa

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript, static export-ready)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) with ScrollTrigger, SplitText, DrawSVG and MotionPath, via `@gsap/react`
- [Aceternity UI](https://ui.aceternity.com)-style components (Spotlight, Moving Border, Card Hover Effect,
  Card Spotlight, Background Beams, 3D Card, floating navbar) built on `motion`
- `lucide-react` icons

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/
  app/                 layout (SEO metadata + LocalBusiness JSON-LD), page, global theme
  lib/site.ts          company details: name, phone, WhatsApp, location (edit here)
  lib/gsap.ts          GSAP plugin registration
  components/ui/       Aceternity-style primitives
  components/sections/ hero, sectors, manifesto, services, process, why-us, coverage, contact, footer
```

## Interactions

- Hero: GSAP-drawn pipe network with water droplets travelling the lines, split-text headline reveal,
  a live pressure gauge in a 3D tilt card, and a magnetic moving-border call button
- Sectors: infinite marquee (pauses on hover)
- "Industrial only" manifesto: scroll-scrubbed word reveal and a hazard stripe
- Services: Aceternity hover-effect grid
- Process: pinned horizontal scroll with a filling pipe progress bar (vertical timeline on mobile)
- Coverage: animated map of Durban's industrial nodes, with hover-linked routes
- Contact: the quote form opens WhatsApp with the enquiry pre-filled, plus tap-to-call everywhere
  and a sticky call bar on mobile

All motion is gated behind `prefers-reduced-motion: no-preference`.

## Content notes

No existing online listing for the company could be found, so the copy is built from the brief
(industrial only, Durban, phone number). Before launch, review and adjust:

- The service list and material types in `components/sections/services.tsx`
- The areas served in `components/sections/coverage.tsx`
- Add an email address, physical address, registration or accreditation details and real project
  photos when available
