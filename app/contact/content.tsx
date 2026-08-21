"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import ContactForm from "@/shared-comp/contact-form";

gsap.registerPlugin(ScrollTrigger);

export default function ContactContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const formWrapRef = useRef<HTMLDivElement>(null);

    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

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
            opacity: 0.35,
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

    // GSAP Entrance Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (headingRef.current) {
                tl.fromTo(
                    headingRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1.2 }
                );
            }

            if (paragraphRef.current) {
                tl.fromTo(
                    paragraphRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.8"
                );
            }

            if (formWrapRef.current) {
                gsap.fromTo(
                    formWrapRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: formWrapRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen bg-white text-black overflow-x-hidden font-light selection:bg-black selection:text-white"
        >
            {/* Interactive Three.js Background Canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

            <section
                id="contact"
                className="relative z-10 px-6 md:px-12 pt-32 pb-32 md:pt-44 max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-16 lg:gap-24">
                    {/* Left column — intro + contact details */}
                    <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-normal block mb-6">
                            Contact / Let&apos;s Build
                        </span>

                        <h1
                            ref={headingRef}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-zinc-950 mb-8 leading-[1.08] opacity-0"
                        >
                            Let&apos;s build something{" "}
                            <span className="font-normal italic">for the future.</span>
                        </h1>

                        <p
                            ref={paragraphRef}
                            className="text-lg md:text-xl font-extralight text-zinc-700 leading-relaxed mb-14 opacity-0 max-w-md"
                        >
                            We believe the best work begins with the right conversation. If our
                            vision aligns with yours, let&apos;s build and explore how we can
                            turn ideas into impact — together.
                        </p>

                        {/* <div className="space-y-6 border-t border-neutral-200 pt-10">
                            <div>
                                <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                                    Address
                                </span>
                                <p className="text-base md:text-lg text-zinc-900 leading-relaxed">
                                    90 B MM Alam Rd, Block B1, Gulberg III,
                                    <br />
                                    Lahore, Pakistan
                                </p>
                            </div>

                            <div>
                                <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-2">
                                    Phone
                                </span>

                                <a href="tel:+923393949949"
                                    className="text-base md:text-lg text-zinc-900 hover:text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-colors"
                                >
                                    +92 339 3949949
                                </a>
                            </div>
                        </div> */}
                    </div>

                    {/* Right column — form */}
                    <div ref={formWrapRef} className="opacity-0">
                        <ContactForm variant="light" showHeading={false} />
                    </div>
                </div>
            </section>
        </div>
    );
}