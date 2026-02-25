'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { STLLoader } = require('three/examples/jsm/loaders/STLLoader');

function BunnyMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometry = useLoader(STLLoader, '/sample_model.stl') as THREE.BufferGeometry;

    // Center and compute normals
    geometry.computeVertexNormals();
    geometry.center();

    // Auto-scale to fit nicely
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.4 / maxDim;

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.35;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} scale={[scale, scale, scale]}>
            <meshPhysicalMaterial
                color="#818cf8"
                metalness={0.15}
                roughness={0.25}
                emissive="#4338ca"
                emissiveIntensity={0.12}
            />
        </mesh>
    );
}

function FallbackShape() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.15;
            meshRef.current.rotation.y += delta * 0.25;
        }
    });
    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial
                color="#6366f1"
                wireframe={true}
                transparent
                opacity={0.7}
                emissive="#6366f1"
                emissiveIntensity={0.4}
            />
        </mesh>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0.5, 5], fov: 38 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
                <pointLight position={[-4, 3, -3]} intensity={1.0} color="#818cf8" />
                <pointLight position={[3, -2, 3]} intensity={0.6} color="#c084fc" />
                <pointLight position={[0, 6, 0]} intensity={0.4} color="#60a5fa" />

                <Suspense fallback={<FallbackShape />}>
                    <BunnyMesh />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={(3 * Math.PI) / 4}
                />
            </Canvas>

            {/* Subtle radial glow behind model */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full bg-primary/10 blur-[60px]" />
            </div>
        </div>
    );
}
