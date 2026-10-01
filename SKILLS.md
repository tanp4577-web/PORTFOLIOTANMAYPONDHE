# SKILLS.md — Tech Stack, Patterns & Gotchas

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **GSAP** + **ScrollTrigger** + `@gsap/react` (`useGSAP`)
- **Lenis** smooth scroll
- Fonts: Plus Jakarta Sans, JetBrains Mono (`next/font/google`)
- Hosting: **Vercel** (free)

## Setup commands
```bash
npx create-next-app@14 portfolio_app   # TypeScript: yes, Tailwind: yes, App Router: yes
cd portfolio_app
npm i gsap @gsap/react lenis
npm run dev
```

## Folder structure
```
portfolio_app/
├── app/
│   ├── globals.css        # font vars, noise/grid background, keyframes
│   ├── layout.tsx         # fonts + metadata + <LenisScroll/>
│   └── page.tsx           # renders <GlassHero/>
├── components/
│   ├── glass-hero.tsx     # composes all sections
│   ├── lenis-scroll.tsx   # Lenis + GSAP ticker sync
│   ├── cursor-mask.tsx    # liquid cursor hero
│   ├── header.tsx         # glass header + mobile drawer
│   ├── project-card.tsx   # tilt + glare card
│   └── sections/          # identity, showcase, skills, services, footer
├── lib/projects.ts        # project data array
└── public/images/         # see ASSETS.md
```
(The original blueprint uses one big `glass-hero.tsx`. Splitting into small files is recommended so AI models don't truncate output.)

## Pattern: Lenis + GSAP sync (`components/lenis-scroll.tsx`)
```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
```
Note: the original doc says `smooth: 0.1`; in current Lenis the damping option is `lerp: 0.1`.

## Pattern: scroll reveal
```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ref = useRef<HTMLDivElement>(null);
useGSAP(() => {
  gsap.fromTo(".reveal",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" } });
}, { scope: ref });
```
`useGSAP` handles cleanup automatically and avoids duplicate triggers on hot reload.

## Pattern: liquid cursor mask
- Container has CSS vars `--reveal-x`, `--reveal-y`, `--reveal-radius`.
- On `pointermove` / `touchmove`, compute position relative to container, then update vars inside `requestAnimationFrame` via `el.style.setProperty(...)`.
- Radius grows on hover/touch (e.g. 0 → 180px) with a GSAP tween on `--reveal-radius`.
- Set both `maskImage` and `WebkitMaskImage`.
- Add `touch-action: none` on the hero while dragging if needed.

## Pattern: 3D tilt card
- On `pointermove`: compute normalized x/y (−0.5…0.5), set `rotateY = x * 12`, `rotateX = -y * 12`, `translateY(-8px)`, `perspective(1000px)`.
- Move a gradient "sheen" overlay with the pointer position.
- Reset on `pointerleave`. Skip on `(hover: none)` devices.

## Gotchas
- Mobile drawer must stay mounted (see REQUIREMENTS.md) to avoid hydration errors.
- All GSAP/Lenis code is client-only: `"use client"`.
- Use `next/image` with explicit `width`/`height` or `fill`; remote images need `images.remotePatterns`.
- Floating badges: use CSS `@keyframes float` in `globals.css`, not JS.
- `next.config.mjs` — only if Vercel builds fail, add: `eslint: { ignoreDuringBuilds: true }, typescript: { ignoreBuildErrors: true }`. The blueprint also lists `outputFileTracing: false`; skip it unless the build specifically needs it. Prefer fixing real type errors over ignoring them.

## Deploy
1. `git init`, commit, push to GitHub.
2. vercel.com → Add New Project → import repo → Deploy.
