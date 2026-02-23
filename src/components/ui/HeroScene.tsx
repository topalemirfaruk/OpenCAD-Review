'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2.5, 1]} />
            <meshStandardMaterial
                color="#0ea5e9"
                wireframe={true}
                transparent
                opacity={0.6}
                emissive="#0ea5e9"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 bg-transparent overflow-hidden">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
                <AnimatedShape />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
            {/* Overlay gradient to fade out bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background z-0 pointer-events-none" />
        </div>
    );
}
