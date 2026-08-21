"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton, HeroMesh, MediaPanel } from "@/page-comp/services";
import { SERVICES, STUDIO_NOTE } from "@/data/services";
gsap.registerPlugin(ScrollTrigger);




export default function ServicesContent() {
    const heroRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    /* Hero entrance, on load rather than on scroll */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = heroRef.current?.querySelectorAll(".hero-word");
            if (words && words.length) {
                gsap.fromTo(
                    words,
                    { y: 60, opacity: 0, rotateX: -70, transformOrigin: "50% 100%" },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1.1,
                        stagger: 0.02,
                        ease: "power3.out",
                        delay: 0.15,
                    }
                );
            }
            gsap.fromTo(
                ".hero-sub, .hero-eyebrow, .scroll-cue",
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.08, delay: 0.5 }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    /* Capabilities section scroll animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const revealBlocks = gsap.utils.toArray<HTMLElement>(".scroll-reveal-block");
            revealBlocks.forEach((block) => {
                const words = block.querySelectorAll(".scroll-reveal-word");
                gsap.to(words, {
                    color: "#09090b",
                    stagger: 0.06,
                    ease: "none",
                    scrollTrigger: { trigger: block, start: "top 80%", end: "bottom 55%", scrub: 0.5 },
                });
            });

            const lineMasks = gsap.utils.toArray<HTMLElement>(".line-mask");
            lineMasks.forEach((mask) => {
                gsap.to(mask, {
                    width: "100%",
                    duration: 1.1,
                    ease: "power2.inOut",
                    scrollTrigger: { trigger: mask, start: "top 90%" },
                });
            });

            const rows = gsap.utils.toArray<HTMLElement>(".service-row");
            rows.forEach((row) => {
                gsap.fromTo(
                    row,
                    { y: 50, opacity: 0, rotateX: -8, transformPerspective: 1000 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: { trigger: row, start: "top 92%" },
                    }
                );
            });
        }, capabilitiesRef);
        return () => ctx.revert();
    }, []);

    /* CTA entrance */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, rotateX: 30, transformPerspective: 1400, transformOrigin: "50% 100%" },
                {
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ctaRef.current, start: "top 82%" },
                }
            );
        }, ctaRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!capabilitiesRef.current) return;
        const activeBullets = capabilitiesRef.current.querySelectorAll(
            `.service-row[data-index="${activeIndex}"] .bullet-chip`
        );
        gsap.fromTo(
            activeBullets,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out", delay: 0.15 }
        );
    }, [activeIndex]);

    const railRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!railRef.current) return;
        gsap.to(railRef.current, {
            top: `${(activeIndex / (SERVICES.length - 1)) * 100}%`,
            duration: 0.5,
            ease: "power3.out",
        });
    }, [activeIndex]);

    const heroWords = (text: string) =>
        text.split(" ").map((w, i) => (
            <span key={i} className="hero-word inline-block mr-[0.22em]">
                {w}
            </span>
        ));

    return (
        <main className="bg-white text-black [perspective:1600px]">
            {/* ================= HERO ================= */}
            <div ref={heroRef} className="relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden px-6 md:px-12 py-24">
                <div className="absolute inset-0 -z-0">
                    <div className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[110%] md:w-[70%] aspect-square">
                        <HeroMesh />
                    </div>
                </div>

                <div className="mx-auto w-full max-w-7xl relative z-10">


                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extralight leading-[1.08] tracking-tight text-zinc-950 max-w-4xl [transform-style:preserve-3d]">
                        {heroWords("We build brands by thinking beyond visuals and campaigns.")}
                    </h1>

                    <p className="hero-sub text-lg md:text-2xl text-zinc-500 leading-relaxed max-w-xl mt-8">
                        Six capabilities. One integrated system. Every service designed to move
                        your brand from idea to market leadership.
                    </p>
                </div>

                <div className="scroll-cue absolute bottom-10 left-6 md:left-12 flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-zinc-400">
                    <span className="w-8 h-px bg-zinc-300" />
                    Scroll
                </div>
            </div>

            {/* ================= CAPABILITIES ================= */}
            <section ref={capabilitiesRef} className="section relative w-full overflow-hidden bg-white text-black px-6 md:px-12 py-24 md:py-32">
                <div className="mx-auto w-full max-w-7xl relative z-10">
                    <div className="flex items-center gap-4 mb-16 md:mb-20">
                        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 font-medium whitespace-nowrap">
                            The Capabilities
                        </span>
                        <span className="line-mask h-px bg-zinc-300 w-0 flex-1 block" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20">
                        <div className="relative">
                            <div className="hidden md:block absolute left-0 top-2 bottom-2 w-px bg-zinc-200">
                                <div ref={railRef} className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-950" style={{ top: 0 }} />
                            </div>

                            <div className="md:pl-10 flex flex-col">
                                {SERVICES.map((service, i) => {
                                    const isActive = activeIndex === i;
                                    return (
                                        <div key={service.index} data-index={i} className="service-row border-b border-zinc-200 first:border-t">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIndex(i)}
                                                className="w-full flex items-start gap-4 md:gap-6 py-6 md:py-8 text-left group"
                                                aria-expanded={isActive}
                                            >
                                                <span
                                                    className={`text-lg md:text-xl font-normal tracking-tight tabular-nums transition-colors duration-300 ${isActive ? "text-zinc-950" : "text-zinc-300 group-hover:text-zinc-500"
                                                        }`}
                                                >
                                                    {service.index}
                                                </span>

                                                <div className="flex-1">
                                                    <h3
                                                        className={`text-xl sm:text-2xl md:text-3xl font-normal tracking-tight transition-colors duration-300 ${isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                                                            }`}
                                                    >
                                                        {service.title}
                                                        {service.index === "04" && (
                                                            <span className="ml-3 align-middle text-xs md:text-sm tracking-[0.15em] uppercase text-zinc-400">
                                                                {STUDIO_NOTE}
                                                            </span>
                                                        )}
                                                    </h3>

                                                    <div
                                                        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                                                        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                                                    >
                                                        <div className="overflow-hidden">
                                                            <p className="text-zinc-500 text-base md:text-lg mt-3 mb-5 max-w-md">
                                                                {service.tagline}
                                                            </p>

                                                            <ul className="flex flex-wrap gap-2 mb-5">
                                                                {service.bullets.map((b) => (
                                                                    <li
                                                                        key={b}
                                                                        className="bullet-chip text-sm md:text-base text-zinc-700 border border-zinc-200 rounded-full px-4 py-1.5"
                                                                    >
                                                                        {b}
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            <p className="font-serif italic text-zinc-950 text-lg md:text-xl pb-6">
                                                                {service.closing}
                                                            </p>

                                                            <div className="lg:hidden h-80 sm:h-96 mb-6">
                                                                <MediaPanel index={i} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive
                                                        ? "border-zinc-950 bg-zinc-950 text-white rotate-45"
                                                        : "border-zinc-300 text-zinc-400 group-hover:border-zinc-500"
                                                        }`}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden lg:block self-start sticky top-28">
                            <div className="h-[min(74vh,760px)] min-h-[560px]">
                                <MediaPanel index={activeIndex} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CLOSING CTA ================= */}
            <section className="relative w-full px-6 md:px-12 pb-24 md:pb-32">
                <div className="mx-auto w-full max-w-7xl">
                    <div
                        ref={ctaRef}
                        className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3rem] px-8 md:px-20 py-20 md:py-28 overflow-hidden text-center"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute -bottom-16 right-4 md:right-10 text-[220px] md:text-[320px] leading-none font-serif italic text-white/[0.04] select-none pointer-events-none"
                        >
                            "
                        </span>

                        <p className="relative z-10 text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 mb-6">
                            Let's build the system around it
                        </p>
                        <h2 className="relative z-10 font-normal text-white text-3xl sm:text-5xl md:text-6xl leading-[1.15] tracking-tight max-w-3xl mx-auto">
                            One integrated team. Six capabilities. Zero guesswork.
                        </h2>

                        <MagneticButton
                            className="relative z-10 mt-12 inline-flex items-center gap-3 bg-white text-zinc-950 rounded-full px-8 py-4 text-base md:text-lg font-normal"
                            onClick={() => {
                                /* wire to your contact route / form */
                            }}
                        >
                            Start a project
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </MagneticButton>
                    </div>
                </div>
            </section>
        </main>
    );
}