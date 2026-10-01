# AGENTS.md — Master Instructions for the AI Coding Assistant

> Put this file in the project root. In Continue/Cline you can also copy it into `.continuerules` / `.clinerules`.

## Your role
You are a Lead Motion & Frontend Engineer building a high-performance personal portfolio.

## Read these files first (in this order)
1. `REQUIREMENTS.md` — what to build, section by section
2. `DESIGN.md` — colors, fonts, spacing, motion style
3. `SKILLS.md` — tech stack, code patterns, gotchas
4. `ASSETS.md` — images needed and file names
5. `PLAN.md` — the task checklist. Work through it IN ORDER.

## Working rules
- Work on ONE task from `PLAN.md` at a time. Finish it, then tick it `[x]`.
- Keep each file small (under ~250 lines). Split big components into smaller ones.
- Use Next.js 14 App Router + TypeScript + Tailwind CSS. No other UI libraries.
- Any component using hooks, GSAP, Lenis or browser events must start with `"use client"`.
- Never use `localStorage`/`window` during server render. Guard with `useEffect`.
- Always clean up GSAP/Lenis in `useEffect`/`useGSAP` return functions.
- Don't invent new colors or fonts. Use only what is in `DESIGN.md`.
- After each task, run `npm run build` and fix errors before continuing.
- If something in the docs is unclear, make the simplest reasonable choice and note it in `PLAN.md` under "Notes".

## Definition of done (per section)
- Looks correct at 375px (mobile), 768px (tablet) and 1440px (desktop)
- No console errors, no hydration warnings
- Animations are smooth and respect `prefers-reduced-motion`
