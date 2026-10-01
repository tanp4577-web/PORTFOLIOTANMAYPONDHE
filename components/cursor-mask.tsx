"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CursorMask() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const cursorGlowRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const lines = headlineRef.current?.querySelectorAll(".headline-line");
            if (lines && lines.length > 0) {
                gsap.fromTo(
                    lines,
                    { y: 80, opacity: 0, rotateX: 40 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1.4,
                        stagger: 0.18,
                        ease: "power3.out",
                        delay: 0.3,
                    }
                );
            }

            // Animate the floating orbs
            const orbs = containerRef.current?.querySelectorAll(".hero-orb");
            if (orbs) {
                orbs.forEach((orb, i) => {
                    gsap.to(orb, {
                        y: `random(-30, 30)`,
                        x: `random(-20, 20)`,
                        duration: 4 + i * 0.8,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                    });
                });
            }

            // Subtle badge entrance
            const badges = containerRef.current?.querySelectorAll(".hero-badge");
            if (badges) {
                gsap.fromTo(
                    badges,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        delay: 1.2,
                    }
                );
            }
        },
        { scope: containerRef }
    );

    useEffect(() => {
        const container = containerRef.current;
        const glow = cursorGlowRef.current;
        if (!container || !glow) return;

        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
            glow.style.opacity = "1";
        };

        const handlePointerLeave = () => {
            glow.style.opacity = "0";
        };

        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden select-none"
            style={{ background: "linear-gradient(135deg, #0c111d 0%, #0f172a 40%, #1e1b4b 100%)" }}
        >
            {/* Animated Cursor Glow */}
            <div
                ref={cursorGlowRef}
                className="pointer-events-none absolute w-[400px] h-[400px] rounded-full transition-opacity duration-300"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)",
                    opacity: 0,
                    willChange: "transform",
                }}
            />

            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundSize: "60px 60px",
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
                }}
            />

            {/* Floating Gradient Orbs */}
            <div className="hero-orb absolute top-[10%] right-[15%] w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
            <div className="hero-orb absolute bottom-[15%] left-[10%] w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }} />
            <div className="hero-orb absolute top-[50%] left-[50%] w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />

            {/* Decorative Code Lines (Right Side) */}
            <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 opacity-20 hidden md:flex flex-col gap-3 font-mono text-xs text-slate-400">
                <span className="text-indigo-400">{"const"} <span className="text-cyan-400">builder</span> = <span className="text-emerald-400">{"{"}</span></span>
                <span className="pl-4 text-slate-500">{"name: "}<span className="text-amber-300">{'"Tanmay"'}</span>,</span>
                <span className="pl-4 text-slate-500">{"focus: "}<span className="text-amber-300">{'"AI Agents"'}</span>,</span>
                <span className="pl-4 text-slate-500">{"stack: "}<span className="text-cyan-400">{"["}</span><span className="text-amber-300">{'"TS"'}</span>, <span className="text-amber-300">{'"Python"'}</span>, <span className="text-amber-300">{'"React"'}</span><span className="text-cyan-400">{"]"}</span>,</span>
                <span className="pl-4 text-slate-500">{"status: "}<span className="text-emerald-400">{'"shipping"'}</span></span>
                <span className="text-emerald-400">{"}"}</span>;
                <span className="mt-2 text-purple-400">{"export default"} <span className="text-cyan-400">builder</span>;</span>
            </div>

            {/* Floating Badges */}
            <div className="hero-badge absolute top-[18%] left-[8%] font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
                Python
            </div>
            <div className="hero-badge absolute top-[12%] right-[20%] font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
                TypeScript
            </div>
            <div className="hero-badge absolute bottom-[22%] left-[15%] font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
                React
            </div>
            <div className="hero-badge absolute bottom-[18%] right-[12%] font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
                Next.js
            </div>
            <div className="hero-badge absolute top-[45%] left-[3%] font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
                AI Agents
            </div>
            <div className="hero-badge absolute top-[40%] right-[5%] font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
                Node.js
            </div>

            {/* Foreground Content */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-5 md:px-10 py-32 flex flex-col justify-center items-center min-h-screen text-center">
                <div className="max-w-3xl">
                    <p className="font-mono text-xs md:text-sm uppercase tracking-wider text-indigo-300 mb-6 inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
                        Software Engineering Student · AI Agents &amp; Web Development
                    </p>
                    <h1
                        ref={headlineRef}
                        className="text-[clamp(3rem,9vw,7rem)] font-bold tracking-tight leading-[1.05] overflow-hidden"
                        style={{ perspective: "800px" }}
                    >
                        <span className="block headline-line text-white">Building</span>
                        <span className="block headline-line bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Beyond</span>
                        <span className="block headline-line text-white">Possible.</span>
                    </h1>
                    <p className="mt-8 text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        Integrated M.Tech Software Engineering student at VIT Vellore building high-impact AI coding agents and web applications.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#sec-showcase"
                            className="inline-flex items-center gap-2 font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
                        >
                            View My Work &rarr;
                        </a>
                        <a
                            href="#sec-cta-footer"
                            className="inline-flex items-center gap-2 font-semibold text-sm text-slate-300 border border-slate-700 px-8 py-4 rounded-full hover:bg-white/5 transition-all duration-300"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
    );
}
