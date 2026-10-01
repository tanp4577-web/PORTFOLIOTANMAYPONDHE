"use client";

import { useRef, useState } from "react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
    project: Project;
}

const gradientMap: Record<string, string> = {
    "refactor-guard": "linear-gradient(135deg, #0c111d 0%, #1e3a5f 50%, #38bdf8 100%)",
    "placement-prep": "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #a855f7 100%)",
};

const defaultGradient = "linear-gradient(135deg, #0f172a 0%, #334155 50%, #6366f1 100%)";

export default function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transformStyle, setTransformStyle] = useState<string>("");
    const [sheenPosition, setSheenPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (window.matchMedia("(hover: none)").matches) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = x / rect.width - 0.5;
        const normY = y / rect.height - 0.5;
        const rotateY = normX * 14;
        const rotateX = -normY * 14;
        setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`);
        setSheenPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handlePointerEnter = () => {
        if (window.matchMedia("(hover: none)").matches) return;
        setIsHovered(true);
    };

    const handlePointerLeave = () => {
        setIsHovered(false);
        setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
    };

    const gradient = gradientMap[project.id] || defaultGradient;

    return (
        <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            style={{
                transform: transformStyle,
                transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
            className={`${project.colSpanDesktop || "lg:col-span-6"} group relative rounded-3xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden`}
        >
            {/* Light-Sheen Glare Overlay */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-3xl"
                    style={{
                        background: `radial-gradient(circle 250px at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
                    }}
                />
            )}

            <div>
                {/* Gradient Thumbnail (No Image) */}
                <div
                    className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 flex items-center justify-center"
                    style={{ background: gradient }}
                >
                    {/* Decorative Grid Overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundSize: "30px 30px",
                            backgroundImage:
                                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        }}
                    />
                    {/* Floating Glow */}
                    <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full blur-2xl opacity-40 bg-white/20" />

                    {/* Project Initials */}
                    <span className="relative z-10 font-bold text-4xl md:text-5xl text-white/90 tracking-tight select-none">
                        {project.title.split(" ").map(w => w[0]).join("")}
                    </span>

                    {/* Bottom Mono Label */}
                    <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-white/50 z-10">
                        {project.tags[0]}
                    </span>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3 tracking-tight">{project.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    {project.description}
                </p>
            </div>

            <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Link Button */}
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-sm text-white bg-accent px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-200 shadow-md shadow-accent/20"
                    >
                        View project &rarr;
                    </a>
                )}
            </div>
        </div>
    );
}
