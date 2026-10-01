"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transformStyle, setTransformStyle] = useState<string>("");
    const [sheenPosition, setSheenPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        // Disable 3D tilt on touch or pointer without hover capability
        if (window.matchMedia("(hover: none)").matches) return;

        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate relative coordinates (-0.5 to 0.5)
        const normX = x / rect.width - 0.5;
        const normY = y / rect.height - 0.5;

        // Calculate rotation angles
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
                {/* Image Thumbnail */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-100">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
