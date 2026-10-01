"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
}

export default function ScrollReveal({ children, className = "", stagger = 0.1 }: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Check prefers-reduced-motion
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            const elements = containerRef.current?.querySelectorAll(".reveal");
            if (elements && elements.length > 0) {
                gsap.fromTo(
                    elements,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: stagger,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
