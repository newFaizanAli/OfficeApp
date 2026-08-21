"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { companies } from "@/data/companies";
import { CompanyItem } from "@/types";



//  contact page
export default function ClientContent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const [activeClient, setActiveClient] = useState<CompanyItem | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Three.js interactive background animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particleCount = 300;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 25;
            positions[i + 1] = (Math.random() - 0.5) * 25;
            positions[i + 2] = (Math.random() - 0.5) * 12;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x111111,
            transparent: true,
            opacity: 0.45,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 6;

        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.0004;
            particles.rotation.y += 0.0008;

            camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.6 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
        };
    }, []);

    // GSAP Entrance Animations
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (introRef.current) {
            tl.fromTo(
                introRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }
            );
        }

        if (gridRef.current) {
            tl.fromTo(
                gridRef.current.children,
                { opacity: 0, scale: 0.96 },
                { opacity: 1, scale: 1, duration: 0.8, stagger: 0.03 },
                "-=0.6"
            );
        }
    }, []);

    return (
        <main className="relative min-h-screen bg-white text-black font-extralight overflow-x-hidden selection:bg-black selection:text-white">
            {/* Three.js Canvas Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0 opacity-80"
            />

            {/* Floating Interactive Logo Preview Cursor */}
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-50 transition-opacity duration-200 transform -translate-x-1/2 -translate-y-1/2 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
            >
                {activeClient && (
                    <div className="w-48 h-32 bg-white shadow-2xl border border-neutral-300 p-4 flex items-center justify-center relative overflow-hidden rounded-md backdrop-blur-md">
                        <img
                            src={activeClient.img}
                            alt={activeClient.name}
                            className="max-h-full max-w-full object-contain filter grayscale contrast-125"
                        />
                    </div>
                )}
            </div>

            {/* Hero Intro Section */}
            <section className="relative z-10 px-8 md:px-16 pt-28 pb-16 max-w-7xl mx-auto">
                <div ref={introRef} className="max-w-4xl">
                    <span className="text-xs uppercase tracking-[0.3em] text-neutral-700 font-normal block mb-6">
                        Clients & Collaborators
                    </span>
                    <h1 className="text-4xl md:text-7xl tracking-tight leading-[1.08] mb-8 font-extralight text-neutral-950">
                        We’re known for building brands that don’t just get noticed — they get remembered.
                    </h1>
                    <p className="text-lg md:text-2xl text-neutral-800 font-extralight leading-relaxed max-w-3xl">
                        From global technology leaders to ambitious local ventures, our work spans industries, markets, and scales. Hover over any partner below to reveal their official brand insignia.
                    </p>
                </div>
            </section>

            {/* Hero Creative Visual Component */}
            <section className="relative z-10 px-8 md:px-16 py-12 max-w-7xl mx-auto">
                <div className="relative group overflow-hidden bg-neutral-900 aspect-[21/9] rounded-lg shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1800&q=80"
                        alt="Modern Digital Engineering Workspace"
                        className="w-full h-full object-cover filter grayscale contrast-125 opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-300 block mb-2">
                                Enterprise Engineering & Aesthetics
                            </span>
                            <h3 className="text-xl md:text-3xl font-extralight text-white tracking-wide">
                                Crafting digital ecosystems at global scale.
                            </h3>
                        </div>
                        <div className="hidden md:block text-xs uppercase tracking-widest text-neutral-300 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                            Live Showcase 2026
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Logo Grid Section */}
            <section className="relative z-10 px-8 md:px-16 py-24 max-w-7xl mx-auto border-t border-neutral-200">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-neutral-700 font-normal block mb-2">
                            Network Directory
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extralight tracking-tight text-neutral-950">
                            Trusted Partnerships Grid
                        </h2>
                    </div>
                    {/* <span className="text-xs uppercase tracking-widest text-neutral-700 font-normal">
                        [Hover to inspect logos]
                    </span> */}
                </div>

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {companies.map((client, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => {
                                setActiveClient(client);
                                setIsHovered(true);
                            }}
                            onMouseLeave={() => {
                                setIsHovered(false);
                            }}
                            className="group relative bg-neutral-50 hover:bg-black hover:text-white p-8 border border-neutral-200 flex flex-col justify-between h-44 transition-all duration-500 cursor-pointer overflow-hidden rounded-sm"
                        >
                            <div className="flex justify-between items-start w-full">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-white transition-colors" />
                            </div>
                            <div className="my-auto">
                                <h3 className="text-lg md:text-xl font-extralight tracking-wide text-neutral-900 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                                    {client.name}
                                </h3>
                            </div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-neutral-200/60 to-transparent group-hover:from-neutral-800 transition-colors pointer-events-none" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Signature Quote CTA Section */}
            <section className="relative z-10 px-6 md:px-12 py-32 max-w-5xl mx-auto text-center">
                <div className="bg-zinc-950 text-white rounded-[3rem] px-8 md:px-20 py-20 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

                    <span
                        aria-hidden="true"
                        className="absolute -top-10 left-4 md:left-10 text-[220px] md:text-[340px] leading-none font-serif italic text-white/[0.04] select-none pointer-events-none"
                    >
                        "
                    </span>

                    <blockquote className="relative z-10 max-w-4xl mx-auto text-center">
                        <p className="font-serif italic text-white text-2xl sm:text-3xl md:text-4xl leading-snug tracking-tight mb-8">
                            &ldquo;Their precision in execution and modern design language completely shifted our enterprise market trajectory.&rdquo;
                        </p>
                        <footer className="text-zinc-500 text-xs md:text-sm tracking-[0.15em] uppercase">
                            — Future Client Testimonial Placeholder
                        </footer>
                    </blockquote>

                    <div className="mt-12">
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-4 bg-white text-zinc-950 px-8 py-5 rounded-full text-sm md:text-base tracking-[0.15em] uppercase font-normal transition-all duration-300 hover:bg-zinc-200 shadow-lg"
                        >
                            <span>Start Your Growth Audit</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}