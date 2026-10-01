"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
    { name: "Approach", href: "#sec-identity" },
    { name: "Work", href: "#sec-showcase" },
    { name: "Tech Stack", href: "#sec-skills" },
    { name: "Services", href: "#sec-services" },
    { name: "Contact", href: "#sec-cta-footer" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            {/* Desktop Floating Glass Pill Header */}
            <nav className="pointer-events-auto hidden md:flex items-center gap-8 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-lg shadow-black/5 transition-all">
                <Link href="#sec-hero" className="font-bold text-ink hover:text-accent transition-colors">
                    Portfolio
                </Link>
                <div className="h-4 w-[1px] bg-slate-200" />
                <ul className="flex items-center gap-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-slate-600 hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Floating Bar & Toggle */}
            <div className="pointer-events-auto flex md:hidden items-center justify-between w-full max-w-sm px-5 py-3 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-md">
                <Link href="#sec-hero" className="font-bold text-ink">
                    Portfolio
                </Link>
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    className="p-2 text-ink focus:outline-none"
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Drawer Overlay - ALWAYS MOUNTED */}
            <div
                className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden transition-all duration-300 flex flex-col justify-center items-center pointer-events-auto ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <ul className="flex flex-col items-center gap-8 text-xl font-semibold">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                onClick={closeMenu}
                                className="text-white hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
