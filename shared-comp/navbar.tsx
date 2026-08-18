"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Navbar entrance animation
            gsap.fromTo(
                navRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        }, navRef);

        return () => ctx.revert();
    }, []);

    // Handle mobile menu slide animation
    useLayoutEffect(() => {
        if (!menuRef.current) return;

        if (isOpen) {
            gsap.to(menuRef.current, {
                y: "0%",
                opacity: 1,
                duration: 0.4,
                ease: "power3.out",
            });
        } else {
            gsap.to(menuRef.current, {
                y: "-100%",
                opacity: 0,
                duration: 0.3,
                ease: "power3.in",
            });
        }
    }, [isOpen]);

    return (
        <header
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black/10 bg-white/80 px-6 py-4 backdrop-blur-md sm:px-12"
        >
            {/* Logo */}
            <Link
                href="/"
                className="font-sans text-base font-semibold tracking-tight text-black"
            >
                Studio<span className="text-black/40">.</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-8 md:flex">
                <Link
                    href="#work"
                    className="text-sm font-medium text-black/60 transition-colors hover:text-black"
                >
                    Work
                </Link>
                <Link
                    href="#services"
                    className="text-sm font-medium text-black/60 transition-colors hover:text-black"
                >
                    Services
                </Link>
                <Link
                    href="#studio"
                    className="text-sm font-medium text-black/60 transition-colors hover:text-black"
                >
                    Studio
                </Link>
                <Link
                    href="#contact"
                    className="text-sm font-medium text-black/60 transition-colors hover:text-black"
                >
                    Contact
                </Link>
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:block">
                <Link
                    href="#contact"
                    className="inline-flex items-center rounded-full bg-black px-5 py-2 text-xs font-medium uppercase tracking-wider text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                    Let's Talk
                </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="relative z-50 flex flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label="Toggle Menu"
            >
                <span
                    className={`h-[1.5px] w-6 bg-black transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""
                        }`}
                />
                <span
                    className={`h-[1.5px] w-6 bg-black transition-opacity duration-300 ${isOpen ? "opacity-0" : ""
                        }`}
                />
                <span
                    className={`h-[1.5px] w-6 bg-black transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""
                        }`}
                />
            </button>

            {/* Mobile Fullscreen Drawer */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 flex flex-col justify-between bg-white px-8 py-24 opacity-0 -translate-y-full md:hidden"
            >
                <div className="flex flex-col gap-6 text-2xl font-semibold tracking-tight text-black">
                    <Link
                        href="#work"
                        onClick={() => setIsOpen(false)}
                        className="transition-colors hover:text-black/60"
                    >
                        Work
                    </Link>
                    <Link
                        href="#services"
                        onClick={() => setIsOpen(false)}
                        className="transition-colors hover:text-black/60"
                    >
                        Services
                    </Link>
                    <Link
                        href="#studio"
                        onClick={() => setIsOpen(false)}
                        className="transition-colors hover:text-black/60"
                    >
                        Studio
                    </Link>
                    <Link
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="transition-colors hover:text-black/60"
                    >
                        Contact
                    </Link>
                </div>

                <div className="flex flex-col gap-4 border-t border-black/10 pt-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                        Get in Touch
                    </p>
                    <Link
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex w-full items-center justify-center rounded-full bg-black py-3.5 text-sm font-medium text-white"
                    >
                        Start a Project
                    </Link>
                </div>
            </div>
        </header>
    );
}