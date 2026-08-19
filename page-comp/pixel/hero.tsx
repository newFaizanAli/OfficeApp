"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero — "Shaping the Brands of Future"
 *
 * Why this version is different from a stock centered hero:
 *
 * 1. Asymmetric editorial grid. Headline sits left and runs full-bleed;
 *    a bordered "BUILD LOG" panel sits right, like a spec sheet next to
 *    a manifesto — the kind of layout an actual design studio would ship,
 *    not a marketing template.
 * 2. The build log is alive. Four rows — Idea, Product, Brand, System —
 *    check themselves off and a progress bar fills as the visitor scrolls,
 *    literally performing the subheadline's sentence instead of just
 *    stating it.
 * 3. A cursor-tracked spotlight brightens the blueprint grid wherever the
 *    pointer goes, like inspecting a schematic with a flashlight — a
 *    tactile detail no template ships with by default.
 * 4. Vertical ghost type ("FUTURE") runs up the right margin, subtle
 *    depth without adding a second color.
 * 5. Magnetic CTAs, a live "00 / 04" scroll counter, and a velocity-
 *    reactive service ticker round out the motion system.
 *
 * Install once in your Next.js project:
 *   npm install gsap
 *
 * For real production polish, swap the default font stack for a proper
 * display + mono pairing via next/font, e.g.:
 *   import { Inter_Tight, JetBrains_Mono } from "next/font/google";
 */

const BUILD_STEPS = [
    {
        id: "01",
        label: "Idea",
        desc: "Define the problem worth building for.",
    },
    {
        id: "02",
        label: "Product",
        desc: "Ship something people actually use.",
    },
    {
        id: "03",
        label: "Brand",
        desc: "Give it a voice that scales with it.",
    },
    {
        id: "04",
        label: "System",
        desc: "Turn it into a repeatable machine.",
    },
] as const;

const SERVICES = [
    "BRAND STRATEGY",
    "PRODUCT DESIGN",
    "VISUAL IDENTITY",
    "DESIGN SYSTEMS",
    "GROWTH ENGINEERING",
];

export default function Hero() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const marqueeTrackRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressPctRef = useRef<HTMLSpanElement>(null);
    const primaryCtaRef = useRef<HTMLButtonElement>(null);
    const secondaryCtaRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const ctx = gsap.context(() => {
            // ---- Cursor spotlight on the blueprint grid ----
            if (!prefersReducedMotion && spotlightRef.current) {
                const el = spotlightRef.current;
                let raf = 0;
                const handleMove = (e: MouseEvent) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    cancelAnimationFrame(raf);
                    raf = requestAnimationFrame(() => {
                        el.style.setProperty("--mx", `${x}px`);
                        el.style.setProperty("--my", `${y}px`);
                    });
                };
                el.addEventListener("mousemove", handleMove);
            }

            // ---- Magnetic CTAs ----
            if (!prefersReducedMotion) {
                [primaryCtaRef.current, secondaryCtaRef.current].forEach((btn) => {
                    if (!btn) return;
                    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
                    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
                    const handleMove = (e: MouseEvent) => {
                        const rect = btn.getBoundingClientRect();
                        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
                        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
                    };
                    const reset = () => {
                        xTo(0);
                        yTo(0);
                    };
                    btn.addEventListener("mousemove", handleMove);
                    btn.addEventListener("mouseleave", reset);
                });
            }

            // ---- Entrance (runs once on mount, not scroll-tied) ----
            const entrance = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.1,
            });

            if (prefersReducedMotion) {
                gsap.set(
                    [".hl-line", ".hero-kicker", ".hero-sub", ".hero-cta", ".panel"],
                    { clearProps: "all" }
                );
            } else {
                entrance
                    .fromTo(
                        ".hero-kicker",
                        { opacity: 0, y: -8 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    )
                    .fromTo(
                        ".hl-line",
                        { yPercent: 110 },
                        { yPercent: 0, duration: 0.85, stagger: 0.1 },
                        "-=0.2"
                    )
                    .fromTo(
                        ".hero-sub",
                        { opacity: 0, y: 14 },
                        { opacity: 1, y: 0, duration: 0.5 },
                        "-=0.4"
                    )
                    .fromTo(
                        ".hero-cta",
                        { opacity: 0, y: 12 },
                        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
                        "-=0.3"
                    )
                    .fromTo(
                        ".panel",
                        { opacity: 0, y: 16 },
                        { opacity: 1, y: 0, duration: 0.6 },
                        "-=0.5"
                    );
            }

            // ---- Scroll-scrubbed build log (modest pin, purposeful not decorative) ----
            if (!prefersReducedMotion) {
                gsap.set(".step-marker", { backgroundColor: "rgba(0,0,0,0)" });
                if (progressBarRef.current) {
                    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
                }

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "+=90%",
                        scrub: 0.6,
                        pin: pinRef.current,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const step = Math.min(
                                BUILD_STEPS.length,
                                Math.floor(self.progress * BUILD_STEPS.length + 0.001)
                            );
                            if (counterRef.current) {
                                counterRef.current.textContent = String(step).padStart(2, "0");
                            }
                            if (progressPctRef.current) {
                                progressPctRef.current.textContent = `${Math.round(
                                    self.progress * 100
                                )}%`;
                            }
                        },
                    },
                });

                BUILD_STEPS.forEach((_, i) => {
                    tl.to(
                        `.step-marker-${i}`,
                        { backgroundColor: "rgba(0,0,0,1)", duration: 0.15, ease: "power1.out" },
                        i * 0.22
                    ).to(
                        `.step-desc-${i}`,
                        { opacity: 1, duration: 0.15 },
                        i * 0.22
                    );
                });

                if (progressBarRef.current) {
                    tl.to(
                        progressBarRef.current,
                        { scaleX: 1, duration: BUILD_STEPS.length * 0.22, ease: "none" },
                        0
                    );
                }

                tl.fromTo(
                    ".ghost-word",
                    { yPercent: 8 },
                    { yPercent: -8, ease: "none" },
                    0
                );
            }

            // ---- Marquee: constant loop, speed/direction reacts to scroll velocity ----
            if (marqueeTrackRef.current) {
                const marqueeTween = gsap.to(marqueeTrackRef.current, {
                    xPercent: -50,
                    duration: 16,
                    repeat: -1,
                    ease: "none",
                });
                if (!prefersReducedMotion) {
                    ScrollTrigger.create({
                        onUpdate: (self) => {
                            const factor = gsap.utils.clamp(-5, 5, self.getVelocity() / 400);
                            marqueeTween.timeScale(1 + factor);
                        },
                    });
                }
            }
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full motion-reduce:h-screen" style={{ height: "170vh" }}>
            <section
                ref={pinRef}
                className="relative flex h-screen w-full flex-col overflow-hidden bg-white motion-reduce:static"
            >
                {/* Blueprint grid + cursor spotlight */}
                <div
                    ref={spotlightRef}
                    className="pointer-events-none absolute inset-0"
                    style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
                    aria-hidden
                >
                    <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:48px_48px]" />
                    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(240px_circle_at_var(--mx)_var(--my),black_0%,transparent_70%)] [-webkit-mask-image:radial-gradient(240px_circle_at_var(--mx)_var(--my),black_0%,transparent_70%)]" />
                </div>

                {/* Vertical ghost word along right margin */}
                <div
                    className="ghost-word pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none opacity-[0.06] sm:block md:-right-10"
                    aria-hidden
                >
                    <span className="block origin-center rotate-90 whitespace-nowrap text-[10vw] font-black uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_black]">
                        FUTURE
                    </span>
                </div>

                {/* Top bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-black/10 px-6 py-4 sm:px-10">
                    <span className="hero-kicker font-mono text-[11px] font-medium tracking-[0.25em] text-black/60">
                        STUDIO&nbsp;&mdash;&nbsp;2026
                    </span>
                    <span className="hero-kicker font-mono text-[11px] font-medium tracking-[0.25em] text-black/60">
                        <span ref={counterRef}>00</span>
                        <span className="text-black/30"> / 04</span>
                    </span>
                </div>

                {/* Main content: asymmetric grid */}
                <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_340px] lg:gap-16">
                    {/* Left: headline, subhead, CTAs */}
                    <div className="max-w-3xl">
                        <h1 className="font-sans text-[2.5rem] font-bold leading-[1.03] tracking-tight text-black sm:text-6xl md:text-7xl">
                            <span className="block overflow-hidden">
                                <span className="hl-line block font-normal text-black/85">
                                    Shaping the
                                </span>
                            </span>
                            <span className="block overflow-hidden">
                                <span className="hl-line block">
                                    Brands of <em className="italic">Future.</em>
                                </span>
                            </span>
                        </h1>

                        <p className="hero-sub mt-8 max-w-md text-balance text-base leading-relaxed text-black/60 sm:ml-1 sm:text-lg">
                            We turn ideas into products, products into brands, and brands
                            into systems built to scale.
                        </p>

                        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <button
                                ref={primaryCtaRef}
                                type="button"
                                className="hero-cta group inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Let&rsquo;s Build Together
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                                    <path d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <button
                                ref={secondaryCtaRef}
                                type="button"
                                className="hero-cta inline-flex items-center gap-2 rounded-full border border-black/20 px-7 py-3.5 text-sm font-medium text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Explore Our Work
                            </button>
                        </div>
                    </div>

                    {/* Right: live build log panel */}
                    <div className="panel w-full border border-black/15 bg-white/70 backdrop-blur-sm">
                        <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
                            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-black">
                                BUILD LOG
                            </span>
                            <span
                                ref={progressPctRef}
                                className="font-mono text-[11px] text-black/50"
                            >
                                0%
                            </span>
                        </div>

                        <ul>
                            {BUILD_STEPS.map((step, i) => (
                                <li
                                    key={step.id}
                                    className="flex items-start gap-3 border-b border-black/10 px-5 py-4 last:border-b-0"
                                >
                                    <span
                                        className={`step-marker step-marker-${i} mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-black/40`}
                                    />
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-mono text-[10px] text-black/40">
                                                {step.id}
                                            </span>
                                            <span className="text-sm font-semibold text-black">
                                                {step.label}
                                            </span>
                                        </div>
                                        <p
                                            className={`step-desc-${i} mt-1 text-xs leading-relaxed text-black/55 opacity-40 transition-opacity`}
                                        >
                                            {step.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="px-5 py-4">
                            <div className="h-1 w-full overflow-hidden bg-black/10">
                                <div ref={progressBarRef} className="h-full w-full bg-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer ticker — velocity reactive */}
                <div className="relative z-10 border-t border-black/10 py-4">
                    <div className="flex overflow-hidden">
                        <div ref={marqueeTrackRef} className="flex w-max shrink-0">
                            {[0, 1].map((rep) => (
                                <div key={rep} className="flex shrink-0 items-center">
                                    {SERVICES.map((s) => (
                                        <span key={s} className="flex items-center">
                                            <span className="px-4 font-mono text-xs font-medium tracking-[0.25em] text-black/60 sm:px-6">
                                                {s}
                                            </span>
                                            <span className="text-black/25">/</span>
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}