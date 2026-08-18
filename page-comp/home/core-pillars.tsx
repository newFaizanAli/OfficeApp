"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: "01",
        title: "Product Hunting & Positioning",
        description: "We find the opportunity before the noise. Research, validation, and positioning built to solve real problems — not just look good.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
        number: "02",
        title: "Brand Development & Identity",
        description: "We build brands around products meant to last. Identity systems that feel intentional, not accidental.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    },
    {
        number: "03",
        title: "Product Launch & Campaigning",
        description: "We don’t just launch — we create momentum. Because the market remembers strong entrances.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    },
    {
        number: "04",
        title: "Pre & Post Production (Infinity Studio)",
        description: "Everything your product needs to be seen, heard, and felt. Production without dependency. Creativity without limits.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
    },
    {
        number: "05",
        title: "Power Marketing",
        description: "Marketing built to perform — not just exist. Visibility is power — when it converts.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
    {
        number: "06",
        title: "Brand Elevation & Funding",
        description: "We elevate brands — and back potential. We don’t just advise growth. We enable it.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    },
];

export default function CorePillars() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Cinematic Header Reveal with Splitting Feel & Blur
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "top 20%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            ".wwd-badge",
            { y: 35, opacity: 0, scale: 0.85, filter: "blur(6px)" },
            { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
        )
            .fromTo(
                ".wwd-title",
                { y: 50, opacity: 0, filter: "blur(12px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(
                ".wwd-link",
                { x: 30, opacity: 0, filter: "blur(6px)" },
                { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
                "-=0.8"
            );

        // 2. Ultra-Smooth 3D Perspective Grid Stagger & Floating Parallax Scrub
        if (cardsContainerRef.current) {
            const cards = gsap.utils.toArray(".wwd-card") as HTMLElement[];

            gsap.fromTo(
                cards,
                {
                    y: 120,
                    opacity: 0,
                    rotationX: -20,
                    rotationY: 12,
                    scale: 0.9,
                    filter: "blur(10px)"
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: cardsContainerRef.current,
                        start: "top 82%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Staggered interactive 3D floating scroll scrub
            cards.forEach((card, index) => {
                const depthMultiplier = (index % 2 === 0 ? 1 : -1) * 32;
                gsap.to(card, {
                    y: -depthMultiplier,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    },
                });
            });
        }
    }, { scope: sectionRef });

    // 3. High-Precision 3D Mouse Tilt & Dynamic Sheen Lighting Handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        const glow = card.querySelector(".card-glow") as HTMLElement;
        if (glow) {
            gsap.to(glow, {
                x: x - rect.width / 2,
                y: y - rect.height / 2,
                opacity: 0.45,
                duration: 0.3,
                ease: "power2.out",
            });
        }

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1200,
            scale: 1.025,
            ease: "power2.out",
            duration: 0.4,
            overwrite: "auto",
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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
            className="relative bg-gray-50 px-6 py-28 sm:px-12 lg:py-36 overflow-hidden text-neutral-900 selection:bg-neutral-900 selection:text-white"
        >
            {/* Ambient Ultra-Clean Backlight Aura for Depth */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-neutral-200/50 via-neutral-100/90 to-transparent rounded-full blur-[160px] pointer-events-none" />

            <div className="mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                        <div className="wwd-badge inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 py-2 mb-6 shadow-sm backdrop-blur-md opacity-0">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-900">
                                What We Do
                            </span>
                        </div>
                        <h2 className="wwd-title font-sans text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl leading-[1.1] opacity-0">
                            Home Overview
                        </h2>
                    </div>

                    <div className="wwd-link opacity-0">
                        <Link
                            href="/services"
                            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:text-neutral-600"
                        >
                            <span>See All Services</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </Link>
                    </div>
                </div>

                {/* 6 Cards Grid with 3D Perspective Container */}
                <div
                    ref={cardsContainerRef}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [perspective:2500px]"
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="wwd-card group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-neutral-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-neutral-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.09)] opacity-0 [transform-style:preserve-3d] h-full"
                        >
                            {/* Dynamic Interactive Cursor Glow */}
                            <div className="card-glow absolute pointer-events-none w-96 h-96 bg-gradient-to-r from-neutral-200/60 via-indigo-50/50 to-transparent rounded-full blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2 z-0" />

                            {/* Card Image Banner */}
                            <div className="relative w-full h-52 overflow-hidden bg-neutral-100 z-10 [transform:translateZ(30px)]">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="inline-block bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest text-neutral-900 shadow-sm">
                                        {service.number} / SERVICE
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 p-8 sm:p-9 flex flex-col flex-grow justify-between [transform:translateZ(50px)]">
                                <div>
                                    <h3 className="font-sans text-xl font-semibold tracking-tight text-neutral-900">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3.5 text-sm leading-relaxed text-neutral-600 font-light">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-400 transition-colors group-hover:text-neutral-900 [transform:translateZ(30px)]">
                                    <span className="uppercase tracking-widest text-[10px]">Learn more</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}