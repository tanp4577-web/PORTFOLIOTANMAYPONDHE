# PLAN.md — Build Checklist

Work top to bottom. Tick each box when done. Run `npm run build` after each phase.

## Phase 0 — Setup
- [x] Create app: `npx create-next-app@14 portfolio_app` (TS, Tailwind, App Router)
- [x] Install: `npm i gsap @gsap/react lenis`
- [x] Add fonts (Plus Jakarta Sans, JetBrains Mono) in `layout.tsx` via `next/font/google`
- [x] Add color variables + grid overlay + float keyframes to `globals.css`; extend `tailwind.config.ts`
- [x] Add SEO metadata in `layout.tsx`
- [x] Create `public/images/` and drop in placeholder images (see ASSETS.md)

## Phase 1 — Foundation
- [x] `components/lenis-scroll.tsx` (Lenis + GSAP sync) and mount in `layout.tsx`
- [x] `components/header.tsx`: glass pill (desktop) + always-mounted mobile drawer
- [x] `app/page.tsx` renders `<GlassHero/>` with empty section shells and correct ids

## Phase 2 — Hero
- [x] `components/cursor-mask.tsx`: dual-layer images + radial mask, mouse + touch
- [x] Headline "Building Beyond Possible." with clamp sizing + line-up entrance animation
- [x] Test on mobile width

## Phase 3 — Content sections
- [x] `#sec-identity`: portrait card + bio + 4-metric grid
- [x] `lib/projects.ts` with projects; `project-card.tsx` with tilt + glare + "View project →"
- [x] `#sec-showcase`: responsive grid (1 / 3 / 12-col layouts)
- [x] `#sec-skills`: illustration box with 6 floating badges + categorized checklists
- [x] `#sec-services`: 4 service cards with bullets and tags

## Phase 4 — Footer
- [x] `#sec-cta-footer`: dark bg, "Get In Touch" mailto button, GitHub/LinkedIn SVG pills
- [x] 4-column footer grid (Bio, Navigation, Social, Copyright)

## Phase 5 — Motion & polish
- [x] Scroll-triggered reveals on all sections (`top 80%`)
- [x] `prefers-reduced-motion` support
- [x] Check cleanup: no duplicate ScrollTriggers, no memory leaks
- [x] Responsive pass at 375 / 768 / 1440 px
- [x] Accessibility pass (alt text, focus states, contrast)

## Phase 6 — Ship
- [x] `npm run build` passes with no errors
- [ ] Push to GitHub
- [ ] Deploy on Vercel
- [ ] Test live URL on a real phone

## Owner inputs provided
- [x] Real bio text: Integrated M.Tech Software Engineering student at VIT Vellore
- [x] 2 Projects: Refactor Guard & PlacementPrep
- [x] Social URLs: GitHub & LinkedIn
- [x] Email: tanmaypondhe7777@gmail.com

## Notes
- Initialized Next.js 14 in root folder directly (`./`).
- Generated clean SVG placeholders in `public/images/` matching all specified paths.
- Setup always-mounted mobile drawer using CSS opacity/pointer-events transitions to avoid hydration mismatches.
- Updated `lib/projects.ts` with Tanmay Pondhe's real information, bio, metrics, and exact 2 projects.
- Phase 2 complete with liquid cursor radial mask & GSAP line-by-line entrance animation.
- Phase 3, 4, and 5 complete with 3D tilt cards, light sheen overlays, levitating floating badges, categorized skill checklists, services, cinematic dark footer, and GSAP ScrollTrigger reveals with prefers-reduced-motion support.
