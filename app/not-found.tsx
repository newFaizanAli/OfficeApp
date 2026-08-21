'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import * as THREE from 'three';

export default function NotFound() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- GSAP Entrance Animation ---
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current?.children || [], {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out',
            });
        });

        // --- Three.js 3D Background Animation ---
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Renderer setup with clean white background
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create a modern abstract 3D Geometry (Icosahedron wireframe/particles)
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Interactive mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Handle window resizing
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Smooth interpolation (lerp) for mouse movement
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            sphere.rotation.x += 0.003 + targetY * 0.05;
            sphere.rotation.y += 0.005 + targetX * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            ctx.revert();
        };
    }, []);

    return (
        <main className="relative w-full h-screen bg-white text-black overflow-hidden flex items-center justify-center font-sans">
            {/* Three.js Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0"
            />

            {/* Content Container */}
            <div
                ref={contentRef}
                className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-8"
            >
                <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-extralight block">
                        Error 404
                    </span>
                    <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter">
                        Lost in Space.
                    </h1>
                </div>

                <p className="text-zinc-600 text-base md:text-lg font-extralight max-w-md mx-auto leading-relaxed">
                    The page you are looking for doesn&apos;t exist or has been moved to a different digital dimension.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-black text-white text-sm font-light tracking-wide rounded-full hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-black/5"
                    >
                        Back to Homepage
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-8 py-4 border border-black/20 text-black text-sm font-light tracking-wide rounded-full hover:border-black transition-all duration-300"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    );
}