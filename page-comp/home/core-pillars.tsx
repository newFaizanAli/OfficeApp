// components/WhatWeDoBento.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BentoCard {
    number: string;
    title: string;
    description: string;
    media: string;
    type: 'image' | 'video';
    span: string;
}

const bentoCards: BentoCard[] = [
    {
        number: '01',
        title: 'Product Hunting & Positioning',
        description: 'We find the opportunity before the noise. Research, validation, and positioning built to solve real problems — not just look good.',
        media: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        type: 'image',
        span: 'col-span-12 lg:col-span-8',
    },
    {
        number: '02',
        title: 'Brand Development & Identity',
        description: 'We build brands around products meant to last. Identity systems that feel intentional, not accidental.',
        media: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        type: 'image',
        span: 'col-span-12 lg:col-span-4',
    },
    {
        number: '03',
        title: 'Product Launch & Campaigning',
        description: 'We don’t just launch — we create momentum. Because the market remembers strong entrances.',
        media: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31910-large.mp4',
        type: 'video',
        span: 'col-span-12 lg:col-span-4',
    },
    {
        number: '04',
        title: 'Pre & Post Production (Infinity Studio)',
        description: 'Everything your product needs to be seen, heard, and felt. Production without dependency. Creativity without limits.',
        media: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop',
        type: 'image',
        span: 'col-span-12 lg:col-span-8',
    },
    {
        number: '05',
        title: 'Power Marketing',
        description: 'Marketing built to perform — not just exist. Visibility is power — when it converts.',
        media: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-interface-screen-41595-large.mp4',
        type: 'video',
        span: 'col-span-12 lg:col-span-6',
    },
    {
        number: '06',
        title: 'Brand Elevation & Funding',
        description: 'We elevate brands — and back potential. We don’t just advise growth. We enable it.',
        media: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop',
        type: 'image',
        span: 'col-span-12 lg:col-span-6',
    },
];

function CorePillars() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    });

    return (
        <Float speed={3} rotationIntensity={1.2} floatIntensity={2}>
            <mesh ref={meshRef} scale={2}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#000000"
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.4}
                    speed={2}
                    wireframe={true}
                />
            </mesh>
        </Float>
    );
}

export default function WhatWeDoBento() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const cards = cardsRef.current;

        cards.forEach((card, index) => {
            if (!card) return;
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white text-black py-28 px-6 md:px-16 overflow-hidden font-sans"
        >
            {/* Background 3D Element */}
            <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-10 hidden xl:block">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <AnimatedSphere />
                </Canvas>
            </div>

            {/* Header section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-neutral-200 pb-8 relative z-10">
                <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-3">
                        (Home Overview)
                    </span>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-black">
                        What We Do
                    </h2>
                </div>
                <div className="mt-6 md:mt-0">
                    <a
                        href="#services"
                        className="inline-flex items-center space-x-2 text-sm font-medium tracking-wide uppercase text-black hover:opacity-70 transition-opacity group"
                    >
                        <span>See All Services</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 relative z-10">
                {bentoCards.map((card, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            if (el) cardsRef.current[index] = el;
                        }}
                        className={`${card.span} group relative bg-neutral-50 rounded-3xl p-8 md:p-12 border border-neutral-200 overflow-hidden flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl opacity-0`}
                    >
                        {/* Background Media Overlay with High Contrast Gradient */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            {card.type === 'image' ? (
                                <img
                                    src={card.media}
                                    alt={card.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 opacity-25"
                                />
                            ) : (
                                <video
                                    src={card.media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 opacity-25"
                                />
                            )}
                            {/* White fade gradient overlay ensuring absolute dark text contrast readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/90 to-neutral-50/40" />
                        </div>

                        {/* Top Content (Number & Badge) */}
                        <div className="relative z-10 flex items-center justify-between mb-16">
                            <span className="text-xs font-mono font-semibold tracking-widest bg-black text-white px-3.5 py-1.5 rounded-full shadow-sm">
                                {card.number}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium">
                                Module
                            </span>
                        </div>

                        {/* Bottom Content (Title & Description with High-Contrast Colors) */}
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-black group-hover:translate-x-1 transition-transform duration-300">
                                {card.title}
                            </h3>
                            <p className="text-neutral-800 text-sm md:text-base leading-relaxed max-w-xl font-normal">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}