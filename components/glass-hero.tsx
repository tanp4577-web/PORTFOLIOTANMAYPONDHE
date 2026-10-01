"use client";

import CursorMask from "@/components/cursor-mask";
import ProjectCard from "@/components/project-card";
import ScrollReveal from "@/components/scroll-reveal";
import { ownerDetails, projectsData } from "@/lib/projects";
import Image from "next/image";

const floatingBadges = [
    { name: "Python", class: "top-6 left-6 animate-float-slow" },
    { name: "TypeScript", class: "top-10 right-8 animate-float-medium" },
    { name: "React", class: "bottom-16 left-10 animate-float-fast" },
    { name: "Next.js", class: "bottom-10 right-10 animate-float-slow" },
    { name: "Node.js", class: "top-1/2 -left-4 animate-float-medium" },
    { name: "AI Agents", class: "top-1/2 -right-4 animate-float-fast" },
];

const skillCategories = [
    {
        title: "AI & Automation",
        skills: ["AI Agents & Multi-Agent Pipelines", "LLM Fine-tuning & Prompting", "LangChain & LlamaIndex", "Web Speech & Audio AI"],
    },
    {
        title: "Frontend Engineering",
        skills: ["React 18 / Next.js 14 App Router", "TypeScript", "Tailwind CSS & Modern Styling", "GSAP & Motion Engineering"],
    },
    {
        title: "Backend & Systems",
        skills: ["Node.js & Express", "Python & FastAPI", "RESTful & GraphQL APIs", "PostgreSQL & Supabase"],
    },
    {
        title: "Tools & Ecosystem",
        skills: ["Git & GitHub Workflow", "Vercel & Cloud Deployment", "Docker Containerization", "Jest & Unit Testing"],
    },
];

const servicesList = [
    {
        title: "AI Agents & Autonomous Workflows",
        description: "Custom AI coding agents, refactoring tools, and multi-agent pipelines tailored for complex developer workflows.",
        bullets: ["Multi-file code refactoring", "Automated code review agents", "Custom LLM integrations", "Task-oriented agents"],
        tags: ["Python", "TypeScript", "LLMs", "LangChain"],
    },
    {
        title: "Full-Stack Web Applications",
        description: "High-performance, scalable web apps built from scratch with modern frameworks and resilient backend APIs.",
        bullets: ["Next.js 14 App Router", "Type-safe database design", "Authentication & Security", "Serverless Architecture"],
        tags: ["Next.js", "TypeScript", "Node.js", "Supabase"],
    },
    {
        title: "SaaS Platforms & AI Tools",
        description: "End-to-end SaaS products with rich dashboards, real-time analytics, and interactive AI capabilities.",
        bullets: ["Placement & interview trackers", "Interactive audio/video AI", "Payment & auth integrations", "Responsive dashboards"],
        tags: ["React", "Tailwind CSS", "Web Speech API", "FastAPI"],
    },
    {
        title: "High-Performance Landing Pages",
        description: "Cinematic, motion-rich landing pages engineered to captivate users and convert visitors into clients.",
        bullets: ["Liquid cursor & motion effects", "60 FPS GSAP animations", "Lenis smooth scrolling", "100% Mobile responsiveness"],
        tags: ["GSAP", "Lenis", "Tailwind CSS", "SEO"],
    },
];

export default function GlassHero() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section id="sec-hero">
                <CursorMask />
            </section>

            {/* 01 / THE APPROACH Section */}
            <section id="sec-identity" className="py-24 md:py-32 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <ScrollReveal>
                        <span className="reveal font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                            01 / THE APPROACH
                        </span>
                        <h2 className="reveal text-4xl md:text-6xl font-bold mt-4 mb-12 text-ink">
                            Identity &amp; Philosophy
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        {/* Developer Portrait Card */}
                        <div className="reveal md:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                            <Image
                                src="/images/Base_image_desktop.png"
                                alt={ownerDetails.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                                <h3 className="text-2xl font-bold">{ownerDetails.name}</h3>
                                <p className="font-mono text-xs text-slate-300">{ownerDetails.title}</p>
                            </div>
                        </div>

                        {/* Personal Bio & Metrics Grid */}
                        <div className="reveal md:col-span-7 flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4 leading-snug text-ink">
                                    Crafting intelligent AI agents &amp; modern web interfaces.
                                </h3>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    {ownerDetails.bio}
                                </p>
                            </div>

                            {/* 4-Metric Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                                {ownerDetails.metrics.map((metric) => (
                                    <div key={metric.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="font-bold text-xl md:text-2xl text-accent">{metric.value}</p>
                                        <p className="font-mono text-xs text-slate-500 mt-1">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 02 / SELECTED WORK Section */}
            <section id="sec-showcase" className="py-24 md:py-32 border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <ScrollReveal>
                        <span className="reveal font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                            02 / SELECTED WORK
                        </span>
                        <h2 className="reveal text-4xl md:text-6xl font-bold mt-4 mb-12 text-ink">
                            Showcase
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {projectsData.map((project) => (
                            <div key={project.id} className="reveal lg:col-span-6 flex">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </ScrollReveal>
                </div>
            </section>

            {/* 03 / TECH STACK & ECOSYSTEM Section */}
            <section id="sec-skills" className="py-24 md:py-32 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <ScrollReveal>
                        <span className="reveal font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                            03 / TECH STACK &amp; ECOSYSTEM
                        </span>
                        <h2 className="reveal text-4xl md:text-6xl font-bold mt-4 mb-12 text-ink">
                            Skills &amp; Architecture
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Illustration Box with Floating Badges */}
                        <div className="reveal lg:col-span-5 relative min-h-[380px] sm:min-h-[480px] rounded-3xl bg-slate-50 border border-slate-200/80 bg-grid-pattern flex items-center justify-center p-6 overflow-hidden">
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                                <Image
                                    src="/images/tech-developer-illustration-transparent.png"
                                    alt="Tech Developer Illustration"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* 6 Floating Badges */}
                            {floatingBadges.map((badge) => (
                                <div
                                    key={badge.name}
                                    className={`absolute font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-ink ${badge.class}`}
                                >
                                    {badge.name}
                                </div>
                            ))}
                        </div>

                        {/* Right Categorized Skill Checklists */}
                        <div className="reveal lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {skillCategories.map((cat) => (
                                <div key={cat.title} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                                    <h3 className="font-bold text-lg text-ink mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-accent" />
                                        {cat.title}
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {cat.skills.map((skill) => (
                                            <li key={skill} className="flex items-center gap-2 text-sm text-slate-600">
                                                <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 04 / SERVICES Section */}
            <section id="sec-services" className="py-24 md:py-32 border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <ScrollReveal>
                        <span className="reveal font-mono text-xs uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                            04 / SERVICES
                        </span>
                        <h2 className="reveal text-4xl md:text-6xl font-bold mt-4 mb-12 text-ink">
                            Capabilities
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {servicesList.map((service, idx) => (
                            <div
                                key={service.title}
                                className="reveal p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div>
                                    <span className="font-mono text-xs font-bold text-accent mb-2 block">
                                        {"0" + (idx + 1) + " // SERVICE"}
                                    </span>
                                    <h3 className="text-2xl font-bold text-ink mb-3">{service.title}</h3>
                                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2 mb-8">
                                        {service.bullets.map((bullet) => (
                                            <li key={bullet} className="flex items-center gap-2 text-sm text-slate-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </ScrollReveal>
                </div>
            </section>

            {/* Cinematic Footer Section */}
            <footer id="sec-cta-footer" className="py-24 md:py-32 bg-footer text-white">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-16 border-b border-slate-800">
                        <div className="reveal">
                            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                                Got a project in mind?
                            </p>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                                Let’s build something extraordinary.
                            </h2>
                        </div>
                        <a
                            href={`mailto:${ownerDetails.email}`}
                            className="reveal inline-flex items-center gap-2 font-semibold text-base text-ink bg-white px-8 py-4 rounded-full hover:bg-slate-100 transition-colors shadow-lg shrink-0"
                        >
                            Get In Touch &rarr;
                        </a>
                    </ScrollReveal>

                    <ScrollReveal className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Bio Column */}
                        <div className="reveal">
                            <h3 className="font-bold text-lg mb-3">{ownerDetails.name}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {ownerDetails.bio}
                            </p>
                        </div>

                        {/* Navigation Column */}
                        <div className="reveal">
                            <h4 className="font-mono text-xs uppercase text-slate-500 mb-4">Navigation</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#sec-hero" className="text-slate-300 hover:text-white transition-colors">Hero</a></li>
                                <li><a href="#sec-identity" className="text-slate-300 hover:text-white transition-colors">Approach</a></li>
                                <li><a href="#sec-showcase" className="text-slate-300 hover:text-white transition-colors">Showcase</a></li>
                                <li><a href="#sec-skills" className="text-slate-300 hover:text-white transition-colors">Tech Stack</a></li>
                                <li><a href="#sec-services" className="text-slate-300 hover:text-white transition-colors">Services</a></li>
                            </ul>
                        </div>

                        {/* Social Column */}
                        <div className="reveal">
                            <h4 className="font-mono text-xs uppercase text-slate-500 mb-4">Connect</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href={ownerDetails.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href={ownerDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Copyright Column */}
                        <div className="reveal">
                            <h4 className="font-mono text-xs uppercase text-slate-500 mb-4">Legal</h4>
                            <p className="text-slate-400 text-sm">
                                &copy; {new Date().getFullYear()} Tanmay Pondhe. All rights reserved.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </footer>
        </div>
    );
}
