"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Three.js interactive background animation
    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create an elegant particle network representing structured momentum
        const particleCount = 1200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 60;
            positions[i + 1] = (Math.random() - 0.5) * 60;
            positions[i + 2] = (Math.random() - 0.5) * 40;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.12,
            color: 0x09090b,
            transparent: true,
            opacity: 0.25,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            particles.rotation.y += 0.001 + mouseX * 0.05;
            particles.rotation.x += 0.0005 + mouseY * 0.05;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
        };
    }, []);

    // GSAP Scroll Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>(".funnel-step");
            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 50, rotateX: -10 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const funnelStages = [
        {
            letter: "A",
            title: "Acquisition",
            whatWeDo: "Marketplace optimization, ratings & reviews, paid advertising, and digital/traditional marketing.",
            whatWeMeasure: "Traffic.",
            media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        },
        {
            letter: "A",
            title: "Activation",
            whatWeDo: "Customer onboarding, landing pages, homepage optimization, product features, and USP clarity.",
            whatWeMeasure: "Registrations and transaction volume.",
            media: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        },
        {
            letter: "R",
            title: "Retention",
            whatWeDo: "Loyalty campaigns, push notifications, email flows, re-engagement ads, and subscription campaigns powered by Go High Level.",
            whatWeMeasure: "Clientele.",
            media: "https://images.unsplash.com/photo-1533750349077-cdcd106d86b2?q=80&w=1200&auto=format&fit=crop",
        },
        {
            letter: "R",
            title: "Referral",
            whatWeDo: "Contact list integration, contests, review prompts, sharing mechanics, and community engagement.",
            whatWeMeasure: "Credibility, reviews, and plans.",
            media: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
        },
        {
            letter: "R",
            title: "Revenue",
            whatWeDo: "Sales & promos, product value chain, subscriptions, third parties, and resellers.",
            whatWeMeasure: "Sales.",
            media: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen bg-white text-black overflow-hidden font-light selection:bg-black selection:text-white"
        >
            {/* Interactive Three.js Background Canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

            {/* Hero Section */}
            <section className="relative z-10 px-6 md:px-12 pt-32 pb-24 md:pt-44 md:pb-32 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[85vh]">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-zinc-400 font-extralight">
                        Our Process
                    </span>
                    <span className="h-px bg-zinc-200 w-16 block" />
                    <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-zinc-400 font-extralight">
                        Working Funnel
                    </span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-zinc-950 mb-8 leading-[1.08]">
                    How we engineer <br />
                    <span className="font-normal italic">growth.</span>
                </h1>

                <p className="text-lg md:text-2xl font-extralight text-zinc-600 max-w-3xl leading-relaxed mb-12">
                    Our working funnel follows the AARRR framework — five stages, each with clear actions and measurable outcomes. No guesswork. No vanity metrics. Just structured momentum.
                </p>

                <div className="w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden relative shadow-2xl bg-zinc-100 border border-zinc-200">
                    <img
                        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop"
                        alt="Agency Workspace Placeholder"
                        className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
                        <span className="text-sm tracking-[0.2em] uppercase font-extralight">Framework Architecture</span>
                        <span className="text-xs tracking-[0.15em] uppercase font-extralight opacity-80">Scroll to Explore</span>
                    </div>
                </div>
            </section>

            {/* AARRR Framework Funnel Stages */}
            <section className="relative z-10 px-6 md:px-12 py-20 max-w-7xl mx-auto space-y-32">
                {funnelStages.map((stage, idx) => (
                    <div
                        key={idx}
                        className="funnel-step grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-b border-zinc-200 pb-28 last:border-b-0"
                    >
                        <div className="flex flex-col justify-center space-y-8">
                            <div className="flex items-baseline gap-6">
                                <span className="text-6xl md:text-8xl font-extralight text-zinc-300 tracking-tighter">
                                    0{idx + 1}
                                </span>
                                <div className="space-y-1">
                                    <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-400 font-extralight block">
                                        Stage {stage.letter}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-extralight tracking-tight text-zinc-950">
                                        {stage.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4 border-t border-zinc-100">
                                <div>
                                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-extralight mb-2">
                                        What we do:
                                    </h3>
                                    <p className="text-base md:text-lg font-extralight text-zinc-800 leading-relaxed">
                                        {stage.whatWeDo}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-extralight mb-2">
                                        What we measure:
                                    </h3>
                                    <p className="text-base md:text-lg font-normal text-zinc-950">
                                        {stage.whatWeMeasure}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2.5rem] overflow-hidden bg-zinc-100 h-[380px] md:h-[460px] border border-zinc-200 shadow-xl group">
                            <img
                                src={stage.media}
                                alt={`${stage.title} Stage Placeholder`}
                                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Section CTA */}
            <section className="relative z-10 px-6 md:px-12 py-32 max-w-5xl mx-auto text-center">
                <div className="bg-zinc-950 text-white rounded-[3rem] px-8 md:px-20 py-20 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight mb-8 leading-tight">
                        See How This Applies to <span className="italic">Your Brand</span>
                    </h2>

                    <p className="text-zinc-400 font-extralight text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                        Let’s map the AARRR framework directly to your current revenue engines and identify immediate growth vectors.
                    </p>

                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-4 bg-white text-zinc-950 px-8 py-5 rounded-full text-sm md:text-base tracking-[0.15em] uppercase font-normal transition-all duration-300 hover:bg-zinc-200 shadow-lg"
                    >
                        <span>Start Your Growth Audit</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                </div>
            </section>
        </div>
    );
}