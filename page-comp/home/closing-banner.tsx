'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Smooth continuous rotation for high-end engagement
    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.8}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#000000"
                    roughness={0.1}
                    metalness={0.9}
                    distort={0.4}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

export default function AgencyCanvas() {
    return (
        <div className="w-full h-[400px] lg:h-[500px] relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <pointLight position={[-10, -10, -5]} intensity={1} />
                <AnimatedShape />
                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
            </Canvas>
        </div>
    );
}