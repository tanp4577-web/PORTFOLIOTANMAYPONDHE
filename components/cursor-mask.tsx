"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CursorMask() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const radiusTween = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            // Headline line-by-line entrance animation
            const lines = headlineRef.current?.querySelectorAll(".headline-line");
            if (lines && lines.length > 0) {
                gsap.fromTo(
                    lines,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.2,
                    }
                );
            }
        },
        { scope: containerRef }
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Set initial mask values (hidden by default or small)
        container.style.setProperty("--reveal-x", "50%");
        container.style.setProperty("--reveal-y", "50%");
        container.style.setProperty("--reveal-radius", "0px");

        let currentX = 0;
        let currentY = 0;
        let rafId: number | null = null;

        const updateMaskPosition = () => {
            if (container) {
                container.style.setProperty("--reveal-x", `${currentX}px`);
                container.style.setProperty("--reveal-y", `${currentY}px`);
            }
            rafId = null;
        };

        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            currentX = e.clientX - rect.left;
            currentY = e.clientY - rect.top;

            if (!rafId) {
                rafId = requestAnimationFrame(updateMaskPosition);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = container.getBoundingClientRect();
                currentX = touch.clientX - rect.left;
                currentY = touch.clientY - rect.top;

                if (!rafId) {
                    rafId = requestAnimationFrame(updateMaskPosition);
                }
            }
        };

        const handlePointerEnter = () => {
            if (radiusTween.current) radiusTween.current.kill();
            radiusTween.current = gsap.to(container, {
                "--reveal-radius": "180px",
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const handlePointerLeave = () => {
            if (radiusTween.current) radiusTween.current.kill();
            radiusTween.current = gsap.to(container, {
                "--reveal-radius": "0px",
                duration: 0.5,
                ease: "power2.out",
            });
        };

        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("touchmove", handleTouchMove);
        container.addEventListener("pointerenter", handlePointerEnter);
        container.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("pointerenter", handlePointerEnter);
            container.removeEventListener("pointerleave", handlePointerLeave);
            if (rafId) cancelAnimationFrame(rafId);
            if (radiusTween.current) radiusTween.current.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern select-none touch-action-none"
        >
            {/* Background Layer 1: Dark / Monochrome Portrait (Right 70%) */}
            <div className="absolute inset-0 z-0 flex items-center justify-end">
                <div className="relative w-full md:w-[70%] h-full">
                    <Image
                        src="/images/Base_image_desktop.png"
                        alt="Tanmay Pondhe Base Portrait"
                        fill
                        className="object-cover object-right filter grayscale contrast-125 opacity-90"
                        priority
                    />
                </div>
            </div>

            {/* Top Layer 2: Vibrant Color Portrait Revealed via Cursor Mask */}
            <div
                className="absolute inset-0 z-10 flex items-center justify-end pointer-events-none"
                style={{
                    maskImage:
                        "radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), black 100%, transparent 100%)",
                }}
            >
                <div className="relative w-full md:w-[70%] h-full">
                    <Image
                        src="/images/Reveal_image_desktop.png"
                        alt="Tanmay Pondhe Reveal Portrait"
                        fill
                        className="object-cover object-right"
                        priority
                    />
                </div>
            </div>

            {/* Foreground Content (Headline & Bio on Left 30%) */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-5 md:px-10 py-32 flex flex-col justify-center min-h-screen pointer-events-none">
                <div className="max-w-2xl pointer-events-auto">
                    <p className="font-mono text-xs md:text-sm uppercase tracking-wider text-accent mb-4 bg-white/80 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-slate-200/80">
                        Software Engineering Student | AI Agents &amp; Web Development
                    </p>
                    <h1
                        ref={headlineRef}
                        className="text-[clamp(2.8rem,8vw,6.2rem)] font-bold tracking-tight leading-[1.05] text-ink overflow-hidden"
                    >
                        <span className="block headline-line">Building</span>
                        <span className="block headline-line text-accent">Beyond</span>
                        <span className="block headline-line">Possible.</span>
                    </h1>
                    <p className="mt-6 text-slate-600 text-base md:text-lg max-w-lg leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
                        Integrated M.Tech Software Engineering student at VIT Vellore building high-impact AI coding agents and web applications.
                    </p>
                </div>
            </div>
        </div>
    );
}
