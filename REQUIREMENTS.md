# REQUIREMENTS.md — Portfolio Website

**Owner:** Devender Gopagoni — Full-Stack Web Developer & UI/UX Product Builder
**Contact:** devendhargopagoni@gmail.com
**Reference repo:** github.com/devendharoff/devendhar-glass-portfolio
**Reference live site:** https://devendhar-portfolio-cinematic.vercel.app/
**Headline:** "Building Beyond Possible."

## Goal
A cinematic, high-performance single-page portfolio with a "liquid cursor" hero, smooth scrolling, animated project cards, and a dark cinematic footer. Deployed free on Vercel.

## Page structure (single page, in this order)
1. Header
2. Hero (`#sec-hero`)
3. 01 / THE APPROACH — Identity (`#sec-identity`)
4. 02 / SELECTED WORK — Showcase (`#sec-showcase`)
5. 03 / TECH STACK & ECOSYSTEM — Skills (`#sec-skills`)
6. 04 / SERVICES — Services (`#sec-services`)
7. Cinematic footer / CTA (`#sec-cta-footer`)

## 1. Fixed header + mobile drawer
- Desktop: floating glass pill header (`hidden md:flex`) with nav links to each section.
- Mobile: hamburger button (`md:hidden`).
- Mobile menu overlay: `fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden`.
- **CRITICAL:** keep the drawer ALWAYS mounted. Toggle only with classes:
  `opacity-100 pointer-events-auto` (open) vs `opacity-0 pointer-events-none` (closed).
  Never conditionally render it (`{open && <Drawer/>}`) — it causes React `insertBefore` hydration errors.

## 2. Hero — liquid cursor mask (`#sec-hero`)
- Two stacked full-size images:
  - Bottom: `/images/Base_image_desktop.png` (dark/monochrome portrait)
  - Top: `/images/Reveal_image_desktop.png` (vibrant color portrait), shown only through a circular mask following the cursor.
- Mask CSS: `mask-image: radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)` (also set `-webkit-mask-image`).
- Handle `onPointerMove` (mouse) AND `onTouchMove` (finger drag, use `e.touches[0]`).
- Update CSS variables via `requestAnimationFrame` (not React state) for performance.
- Headline "Building Beyond Possible." with `text-[clamp(2.8rem,10vw,6.8rem)]` and line-by-line slide-up entrance animation.
- Leave ~30% left side as clean space for the headline (portrait sits on the right).

## 3. Section 01 — Identity & philosophy (`#sec-identity`)
- 2 columns: developer portrait card (`aspect-[4/5]`) + personal bio.
- Below/next to bio: 4-column key-metrics grid (e.g. projects shipped, years, technologies, clients — owner fills real numbers).

## 4. Section 02 — Selected work (`#sec-showcase`)
- 6 project cards. Layout: `grid-cols-1 md:grid-cols-3` and `lg:grid-cols-12` (mixed card sizes on large screens).
- Each card: thumbnail (1200×800), title, short description, tech tags, "View project →" pill button linking to the live URL (opens in new tab, `rel="noopener noreferrer"`).
- Motion: 3D mouse tilt (`rotateX`, `rotateY`), lift `translateY(-8px)` on hover, light-sheen glare sweep. Disable tilt on touch devices.
- Keep project data in one array in `lib/projects.ts`.

## 5. Section 03 — Tech stack & ecosystem (`#sec-skills`)
- **Left column:** illustration box, `min-h-[380px] sm:min-h-[480px]`, slate grid lines, centered `/images/tech-developer-illustration-transparent.png`, plus 6 floating badges that levitate with infinite CSS keyframes: Node.js, HTML5, Google Cloud, React, Supabase, TypeScript.
- **Right column:** categorized checklists — Frontend, Backend, CMS & Platforms, AI & Automation, Other Capabilities.

## 6. Section 04 — Services (`#sec-services`)
4 cards, each with deliverable bullets and tech-stack tags:
1. SaaS Platforms
2. Full-Stack Applications
3. Business Portals
4. Landing Pages

## 7. Footer (`#sec-cta-footer`)
- Background `#050507`.
- Primary button "Get In Touch" → `mailto:devendhargopagoni@gmail.com`.
- Official SVG brand pills: GitHub, LinkedIn, Instagram (owner provides profile URLs).
- 4-column grid: Bio, Navigation, Social links, Copyright.

## 8. Animation & scrolling
- Lenis smooth scroll synced with GSAP ScrollTrigger (see `SKILLS.md`).
- Scroll-triggered reveals for text and cards (`start: "top 80%"`).
- Clean up everything on unmount.

## Non-functional requirements
- Responsive: 375 / 768 / 1440 px.
- Lighthouse performance target: 85+ on desktop.
- Use `next/image` for images, `next/font/google` for fonts.
- Accessible: alt text, focus states, `prefers-reduced-motion` support, semantic HTML.
- SEO: title, description and Open Graph tags in `layout.tsx`.
