"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";


const HeroMesh = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        /* Core */
        const coreGeo = new THREE.IcosahedronGeometry(1.9, 1);
        const coreWire = new THREE.WireframeGeometry(coreGeo);
        const coreMat = new THREE.LineBasicMaterial({ color: 0x09090b, transparent: true, opacity: 0.16 });
        const core = new THREE.LineSegments(coreWire, coreMat);
        group.add(core);

        /* Six orbiting nodes — one per capability */
        const orbitGroup = new THREE.Group();
        group.add(orbitGroup);
        const nodeGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0x09090b, transparent: true, opacity: 0.55 });
        const ringGeo = new THREE.RingGeometry(3.05, 3.06, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x09090b,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.4;
        group.add(ring);

        const NODE_COUNT = 6;
        const nodes: THREE.Mesh[] = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            const angle = (i / NODE_COUNT) * Math.PI * 2;
            const node = new THREE.Mesh(nodeGeo, nodeMat);
            node.position.set(Math.cos(angle) * 3.05, 0, Math.sin(angle) * 3.05);
            orbitGroup.add(node);
            nodes.push(node);
        }
        orbitGroup.rotation.x = Math.PI / 2.4;

        let mouseX = 0;
        let mouseY = 0;
        let scrollProgress = 0;
        let frameId = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove);

        const trigger = ScrollTrigger.create({
            trigger: mount,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                scrollProgress = self.progress;
            },
        });

        let t = 0;
        const animate = () => {
            t += 0.0035;
            group.rotation.y += (mouseX * 0.5 - group.rotation.y * 0.02 + 0.0015);
            group.rotation.x += (mouseY * 0.2 - group.rotation.x) * 0.02;
            core.rotation.y = t * 0.6;
            core.rotation.x = t * 0.3;
            orbitGroup.rotation.y = t * 1.4;
            group.position.y = scrollProgress * -1.2;
            group.scale.setScalar(1 - scrollProgress * 0.15);
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            trigger.kill();
            coreGeo.dispose();
            coreWire.dispose();
            coreMat.dispose();
            nodeGeo.dispose();
            nodeMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
        />
    );
};


export default HeroMesh;