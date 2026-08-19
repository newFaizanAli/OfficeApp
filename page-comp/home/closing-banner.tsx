"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function DynamicSculpture() {
    const groupRef = useRef<THREE.Group>(null);
    const { pointer } = useThree();

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();

        // Smooth interactive rotation following mouse pointer
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            pointer.x * 0.6 + t * 0.1,
            0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            -pointer.y * 0.6 + Math.sin(t * 0.5) * 0.2,
            0.05
        );
    });

    const metalMaterial = useMemo(
        () =>
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color("#0a0a0a"),
                roughness: 0.15,
                metalness: 0.95,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
            }),
        []
    );

    const glassMaterial = useMemo(
        () =>
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color("#ffffff"),
                roughness: 0.1,
                metalness: 0.1,
                transmission: 0.9,
                thickness: 1.2,
                ior: 1.5,
            }),
        []
    );

    return (
        <group ref={groupRef}>
            <Float speed={3} rotationIntensity={1.2} floatIntensity={1.5}>
                <mesh material={metalMaterial} scale={1.2}>
                    <octahedronGeometry args={[1, 0]} />
                </mesh>
            </Float>
            <Float speed={4} rotationIntensity={1.5} floatIntensity={2}>
                <mesh position={[1.8, -0.8, -0.5]} material={glassMaterial} scale={0.6}>
                    <icosahedronGeometry args={[1, 0]} />
                </mesh>
            </Float>
            <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
                <mesh position={[-1.8, 1, -0.5]} material={metalMaterial} scale={0.5}>
                    <boxGeometry args={[1, 1, 1]} />
                </mesh>
            </Float>
        </group>
    );
}

export default function ClosingBanner() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                ctaRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            backgroundColor: "#171717",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            backgroundColor: "#000000",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[85vh] bg-white text-black flex flex-col justify-between overflow-hidden pt-28 pb-20 px-6 md:px-20"
        >
            {/* Top Tagline */}
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-xs tracking-widest uppercase text-neutral-400 font-medium z-10">
                <span>Ready for impact?</span>
                <span>Let&apos;s collaborate</span>
            </div>

            {/* Main Content & Call To Action */}
            <div className="relative max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
                <div className="lg:col-span-8 flex flex-col items-start">
                    <h2
                        ref={headingRef}
                        className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-black"
                    >
                        Built with a palette of intention. <br />
                        <span className="text-neutral-400">Delivered pixel by pixel.</span>
                    </h2>
                </div>

                <div
                    ref={ctaRef}
                    className="lg:col-span-4 flex lg:justify-end items-center"
                >
                    <a
                        href="#contact"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="inline-flex items-center justify-center px-9 py-6 rounded-full bg-black text-white text-sm md:text-base font-medium tracking-wide uppercase shadow-2xl transition-all"
                    >
                        Start a Conversation
                    </a>
                </div>
            </div>

            {/* Interactive 3D Background Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-auto opacity-90">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <pointLight position={[-5, -5, -2]} intensity={1} />
                    <DynamicSculpture />
                </Canvas>
            </div>

            {/* Bottom Section Bar linking into Footer */}
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 tracking-wider pt-8 border-t border-neutral-100 z-10">
                <p>Digital Agency & IT Solutions</p>
                <p>Transforming Ideas Into Reality</p>
            </div>
        </section>
    );
}