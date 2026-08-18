"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function BellowHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. ENTRANCE ANIMATION (ScrollTrigger)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "top 20%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            ".pp-header",
            { y: 40, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
        )
            .fromTo(
                ".pp-card",
                { y: 80, opacity: 0, rotationX: -15, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    scale: 1,
                    duration: 1.4,
                    stagger: 0.3,
                    ease: "power4.out",
                },
                "-=0.8"
            )
            .fromTo(
                ".pp-synthesis",
                { y: 40, opacity: 0, scale: 0.98, filter: "blur(8px)" },
                { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
                "-=1"
            );

        // 2. MULTI-AXIS PARALLAX & AMBIENT 8D SCROLL EFFECT
        if (cardsContainerRef.current) {
            const cards = gsap.utils.toArray(".pp-card") as HTMLElement[];

            cards.forEach((card, index) => {
                const rotationDirection = index % 2 === 0 ? 1 : -1;

                // Scroll scrub rotation & depth translation
                gsap.to(card, {
                    rotationY: 12 * rotationDirection,
                    rotationX: 6,
                    z: 90,
                    y: -40 * (index + 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                });
            });

            // Subtle background float/parallax for synthesis banner
            gsap.to(".pp-synthesis", {
                y: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }
    }, { scope: sectionRef });

    // 3. ENHANCED 3D MOUSE TILT & DYNAMIC LIGHTING HANDLER
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        // Move the internal dynamic sheen/glow following cursor
        const glow = card.querySelector(".card-glow") as HTMLElement;
        if (glow) {
            gsap.to(glow, {
                x: x - rect.width / 2,
                y: y - rect.height / 2,
                opacity: 0.4,
                duration: 0.3,
                ease: "power2.out",
            });
        }

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1200,
            scale: 1.015,
            ease: "power2.out",
            duration: 0.4,
            overwrite: "auto",
        });
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const glow = card.querySelector(".card-glow") as HTMLElement;
        if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.6 });
        }

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: "power3.out",
            duration: 0.8,
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative bg-white px-6 py-20 sm:px-10 lg:py-28 xl:py-32 overflow-hidden text-neutral-900 selection:bg-neutral-900 selection:text-white"
        >
            {/* Ambient Ultra-Clean Backlight Aura for 8D Depth */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-neutral-200/40 via-neutral-100/70 to-transparent rounded-full blur-[140px] pointer-events-none" />

            <div className="mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <div className="pp-header mb-14 max-w-2xl opacity-0">
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 py-2 mb-6 shadow-sm backdrop-blur-md">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900"></span>
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-900">
                            Our Philosophy
                        </span>
                    </div>
                    <h2 className="font-sans text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl leading-[1.1]">
                        Built on the convergence of design and digitalisation.
                    </h2>
                </div>

                {/* Two-Column Core Pillars */}
                <div
                    ref={cardsContainerRef}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-2 [perspective:2500px]"
                >
                    {/* Card 1: Palette */}
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="pp-card group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white p-8 sm:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-neutral-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] opacity-0 [transform-style:preserve-3d] h-full"
                    >
                        {/* Dynamic Interactive Cursor Glow */}
                        <div className="card-glow absolute pointer-events-none w-80 h-80 bg-gradient-to-r from-neutral-200/50 via-indigo-50/40 to-transparent rounded-full blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2 z-0" />

                        {/* Content Wrapper with z-index for 3D depth */}
                        <div className="relative z-10 [transform:translateZ(50px)]">
                            <div className="mb-6 flex items-center justify-between">
                                <span className="font-mono text-[11px] font-bold tracking-widest text-neutral-400">
                                    01 / AESTHETIC FOUNDATION
                                </span>
                                <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 border-2 border-white ring-2 ring-neutral-200 shadow-sm" />
                            </div>
                            <h3 className="font-sans text-3xl font-semibold tracking-tight text-neutral-900">
                                Palette
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-neutral-600 font-light">
                                Draws from color theory, creative direction, and visual storytelling — the emotional and aesthetic core of a brand.
                            </p>
                        </div>

                        {/* Image Container with Parallax Z-translation */}
                        <div className="relative z-10 mt-8 h-60 w-full overflow-hidden rounded-2xl bg-neutral-100 [transform:translateZ(30px)] border border-neutral-200/60 shadow-inner">
                            <Image
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                                alt="Palette Aesthetic Foundation"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/10 via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="relative z-10 mt-8 flex items-center gap-3 pt-6 border-t border-neutral-100 text-[11px] font-bold uppercase tracking-widest text-neutral-400 [transform:translateZ(20px)]">
                            <span className="text-neutral-700">Emotion</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-neutral-700">Identity</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-neutral-700">Story</span>
                        </div>
                    </div>

                    {/* Card 2: Pixel */}
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="pp-card group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white p-8 sm:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-neutral-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] opacity-0 [transform-style:preserve-3d] h-full lg:mt-16"
                    >
                        {/* Dynamic Interactive Cursor Glow */}
                        <div className="card-glow absolute pointer-events-none w-80 h-80 bg-gradient-to-r from-neutral-200/50 via-blue-50/40 to-transparent rounded-full blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2 z-0" />

                        <div className="relative z-10 [transform:translateZ(50px)]">
                            <div className="mb-6 flex items-center justify-between">
                                <span className="font-mono text-[11px] font-bold tracking-widest text-neutral-400">
                                    02 / SYSTEMS INFRASTRUCTURE
                                </span>
                                <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 border-2 border-white ring-2 ring-neutral-200 shadow-sm" />
                            </div>
                            <h3 className="font-sans text-3xl font-semibold tracking-tight text-neutral-900">
                                Pixel
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-neutral-600 font-light">
                                Represents technology, digital systems, and scalable infrastructure engineered for seamless performance.
                            </p>
                        </div>

                        <div className="relative z-10 mt-8 h-60 w-full overflow-hidden rounded-2xl bg-neutral-100 [transform:translateZ(30px)] border border-neutral-200/60 shadow-inner">
                            <Image
                                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
                                alt="Pixel Systems Infrastructure"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/10 via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="relative z-10 mt-8 flex items-center gap-3 pt-6 border-t border-neutral-100 text-[11px] font-bold uppercase tracking-widest text-neutral-400 [transform:translateZ(20px)]">
                            <span className="text-neutral-700">Technology</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-neutral-700">Systems</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-neutral-700">Scale</span>
                        </div>
                    </div>
                </div>

                {/* Synthesis Banner */}
                <div className="pp-synthesis relative mt-16 overflow-hidden rounded-[2rem] bg-neutral-900 p-10 text-white shadow-[0_25px_80px_rgba(0,0,0,0.15)] sm:p-12 lg:p-16 opacity-0 border border-neutral-800">
                    {/* Dramatic background cinematic glows */}
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-neutral-700/30 blur-[100px] pointer-events-none" />
                    <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-neutral-800/30 blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-neutral-400 block mb-4 uppercase">
                            The Convergence
                        </span>
                        <p className="text-xl font-light leading-relaxed text-neutral-100 sm:text-2xl md:text-3xl">
                            Together, they define how we digitalise businesses: transforming brands into structured, performance-driven, future-ready digital products that grow with clarity and intent.
                        </p>
                        <button className="group relative mt-10 px-8 py-3.5 bg-white text-neutral-950 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-95">
                            <span className="relative z-10">Explore Our Process</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}