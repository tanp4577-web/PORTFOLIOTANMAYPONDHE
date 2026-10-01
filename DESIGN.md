# DESIGN.md — Visual Style Guide

## Mood
Clean, futuristic, premium-tech editorial. Bright white canvas, sharp dark-slate type, one electric-blue accent, a dramatic dark footer. "Glass" and "liquid" feel, never cluttered.

## Fonts (load with `next/font/google`)
| Use | Font |
|---|---|
| Headings + body | **Plus Jakarta Sans** |
| Tags, pills, code-like labels | **JetBrains Mono** |

## Colors
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#ffffff` | page background |
| `--ink` | `#0c111d` | dark slate text, dark accents |
| `--footer` | `#050507` | cinematic footer |
| `--accent` | `#0055ff` | electric blue highlights, links, buttons |
| grid overlay | slate lines at `opacity-[0.06]` | subtle technical grid on the white background |

Add these as CSS variables in `globals.css` and extend them in `tailwind.config.ts`.

## Section header pills
Bold, uppercase, monospace (JetBrains Mono), small pill/badge above each section title:
- `01 / THE APPROACH`
- `02 / SELECTED WORK`
- `03 / TECH STACK & ECOSYSTEM`
- `04 / SERVICES`

## Components
- **Glass header:** translucent white, `backdrop-blur`, thin border, fully rounded pill.
- **Cards:** rounded-2xl/3xl, soft shadow, 1px light border, generous padding.
- **Buttons:** pill-shaped. Primary = `#0055ff` background, white text. Secondary = outline.
- **Mobile drawer:** `bg-black/80 backdrop-blur-lg`, large links.

## Typography scale
- Hero: `text-[clamp(2.8rem,10vw,6.8rem)]`, tight leading, bold.
- Section titles: `text-4xl md:text-6xl`, bold.
- Body: `text-base md:text-lg`, slate with ~70% opacity.

## Motion principles
- Entrance: lines slide up + fade (y: 100 → 0).
- Scroll reveals: trigger at `top 80%`.
- Cards: 3D tilt + glare sheen on hover (desktop only).
- Floating badges: slow infinite up/down CSS keyframes (~4–6s, staggered).
- Smooth scroll via Lenis (`lerp: 0.1`).
- Always honor `prefers-reduced-motion` (disable tilt, floats, parallax).

## Spacing
Max content width ~1280px, centered. Section padding `py-24 md:py-32`. Side padding `px-5 md:px-10`.
