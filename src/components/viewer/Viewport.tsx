'use client';

import { useViewerStore } from '@/store/viewerStore';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Preload } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { STLLoader } from 'three-stdlib';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

function ModelRenderer({ data, ext, isWireframe }: { data: ArrayBuffer | string; ext: string; isWireframe: boolean }) {
    const geometryOrGroup = useMemo(() => {
        try {
            if (ext === 'stl') {
                const loader = new STLLoader();
                // Since it's parsed locally we just parse the buffer
                const geometry = loader.parse(data as ArrayBuffer);
                geometry.computeVertexNormals();
                return geometry;
            } else if (ext === 'obj') {
                const loader = new OBJLoader();
                const objGroup = loader.parse(data as string);
                return objGroup;
            }
        } catch (err) {
            console.error("Error parsing model:", err);
            return null;
        }
    }, [data, ext]);

    if (!geometryOrGroup) return null;

    if (ext === 'stl') {
        return (
            <mesh geometry={geometryOrGroup as THREE.BufferGeometry} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#1e293b"
                    metalness={0.5}
                    roughness={0.4}
                    clearcoat={0.3}
                    wireframe={isWireframe}
                />
            </mesh>
        );
    }

    if (ext === 'obj') {
        return <primitive object={geometryOrGroup} />;
    }

    return null;
}

export function Viewport() {
    const { fileData, fileExt, isWireframe, isAutoRotate } = useViewerStore();

    return (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] to-[#020617] pt-16">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5} adjustCamera>
                        {fileData && fileExt && (
                            <ModelRenderer data={fileData} ext={fileExt} isWireframe={isWireframe} />
                        )}
                    </Stage>
                    <OrbitControls makeDefault autoRotate={isAutoRotate} autoRotateSpeed={2} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
