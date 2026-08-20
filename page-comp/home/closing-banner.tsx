"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClosingBanner() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- 1. GSAP Scroll Animations for UI ---
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

        // --- 2. Vanilla Three.js Setup ---
        const container = canvasContainerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 6);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(-5, -5, -2);
        scene.add(pointLight);

        // Materials
        const metalMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#0a0a0a"),
            roughness: 0.15,
            metalness: 0.95,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#ffffff"),
            roughness: 0.1,
            metalness: 0.1,
            transmission: 0.9,
            thickness: 1.2,
            ior: 1.5,
        });

        // Group container for interactive rotation
        const group = new THREE.Group();
        scene.add(group);

        // Meshes / Geometries
        const octahedron = new THREE.Mesh(
            new THREE.OctahedronGeometry(1, 0),
            metalMaterial
        );
        octahedron.scale.setScalar(1.2);
        group.add(octahedron);

        const icosahedron = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1, 0),
            glassMaterial
        );
        icosahedron.position.set(1.8, -0.8, -0.5);
        icosahedron.scale.setScalar(0.6);
        group.add(icosahedron);

        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            metalMaterial
        );
        box.position.set(-1.8, 1, -0.5);
        box.scale.setScalar(0.5);
        group.add(box);

        // --- 3. Animations (Replacing <Float> and useFrame) ---
        // Store initial positions/rotations for floating offsets
        const floatItems = [
            { mesh: octahedron, speed: 3, rotInt: 1.2, floatInt: 1.5, baseY: octahedron.position.y },
            { mesh: icosahedron, speed: 4, rotInt: 1.5, floatInt: 2, baseY: icosahedron.position.y },
            { mesh: box, speed: 2.5, rotInt: 0.8, floatInt: 1, baseY: box.position.y },
        ];

        // Mouse tracking normalized (-1 to 1)
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);

        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth pointer interpolation
            mouse.x += (mouse.targetX - mouse.x) * 0.05;
            mouse.y += (mouse.targetY - mouse.y) * 0.05;

            // Main group rotation (matching original lerp logic)
            group.rotation.y = THREE.MathUtils.lerp(
                group.rotation.y,
                mouse.x * 0.6 + t * 0.1,
                0.05
            );
            group.rotation.x = THREE.MathUtils.lerp(
                group.rotation.x,
                -mouse.y * 0.6 + Math.sin(t * 0.5) * 0.2,
                0.05
            );

            // Simulate <Float> behaviors individually per mesh
            floatItems.forEach((item, index) => {
                // Floating offset simulation
                item.mesh.position.y = item.baseY + Math.sin(t * item.speed + index) * 0.15 * item.floatInt;
                // Rotation intensity simulation
                item.mesh.rotation.x = t * 0.3 * item.rotInt;
                item.mesh.rotation.y = t * 0.2 * item.rotInt;
            });

            renderer.render(scene, camera);
        };
        animate();

        // Window resize handler
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
            ctx.revert();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
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

            {/* Vanilla Three.js Canvas Container */}
            <div
                ref={canvasContainerRef}
                className="absolute inset-0 z-0 pointer-events-auto opacity-90"
            />

            {/* Bottom Section Bar linking into Footer */}
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 tracking-wider pt-8 border-t border-neutral-100 z-10">
                <p>Digital Agency & IT Solutions</p>
                <p>Transforming Ideas Into Reality</p>
            </div>
        </section>
    );
}