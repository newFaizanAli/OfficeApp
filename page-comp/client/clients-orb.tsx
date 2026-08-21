"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";


export default function ClientsOrb() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 7);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Outer node network — low-poly icosahedron (the "clients")
        const nodeGeo = new THREE.IcosahedronGeometry(2.4, 1);
        const nodeLines = new THREE.LineSegments(
            new THREE.WireframeGeometry(nodeGeo),
            new THREE.LineBasicMaterial({
                color: 0x0a0a0a,
                transparent: true,
                opacity: 0.9,
            })
        );
        const nodePoints = new THREE.Points(
            nodeGeo,
            new THREE.PointsMaterial({
                color: 0x0a0a0a,
                size: 0.06,
                sizeAttenuation: true,
            })
        );

        // Inner fine wireframe sphere — depth / texture
        const fineGeo = new THREE.IcosahedronGeometry(1.55, 3);
        const fineLines = new THREE.LineSegments(
            new THREE.WireframeGeometry(fineGeo),
            new THREE.LineBasicMaterial({
                color: 0x0a0a0a,
                transparent: true,
                opacity: 0.16,
            })
        );

        const group = new THREE.Group();
        group.add(nodeLines, nodePoints, fineLines);
        scene.add(group);

        let targetX = 0;
        let targetY = 0;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = mount.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // gentle scale-in entrance
        group.scale.setScalar(0.001);
        gsap.to(group.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.8,
            ease: "power3.out",
            delay: 0.2,
        });

        let frameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            const delta = clock.getDelta();

            targetX += (mouseX * 0.4 - targetX) * 0.04;
            targetY += (mouseY * 0.4 - targetY) * 0.04;

            group.rotation.y += delta * 0.12 + targetX * 0.01;
            group.rotation.x += (targetY * 0.2 - group.rotation.x) * 0.02;
            fineLines.rotation.y -= delta * 0.06;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            nodeGeo.dispose();
            fineGeo.dispose();
            nodeLines.geometry.dispose();
            fineLines.geometry.dispose();
            (nodeLines.material as THREE.Material).dispose();
            (nodePoints.material as THREE.Material).dispose();
            (fineLines.material as THREE.Material).dispose();
            renderer.dispose();
            if (renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
    );
}