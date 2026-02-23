'use client';

import { useViewerStore } from '@/store/viewerStore';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Preload } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { STLLoader } from 'three-stdlib';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

function ModelRenderer({
    data,
    ext,
    isWireframe,
    isSectioning,
    isExploded,
    explodeFactor
}: {
    data: ArrayBuffer | string;
    ext: string;
    isWireframe: boolean;
    isSectioning: boolean;
    isExploded: boolean;
    explodeFactor: number;
    setModelStructure: (structure: string[]) => void;
}) {
    const geometryOrGroup = useMemo(() => {
        try {
            if (ext === 'stl') {
                const loader = new STLLoader();
                const geometry = loader.parse(data as ArrayBuffer);
                geometry.computeVertexNormals();
                setModelStructure(['Ana Gövde (STL)']);
                return geometry;
            } else if (ext === 'obj') {
                const loader = new OBJLoader();
                const objGroup = loader.parse(data as string);

                // Extract mesh names for hierarchy
                const names: string[] = [];
                objGroup.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        names.push(child.name || `Parça ${names.length + 1}`);
                    }
                });
                setModelStructure(names.length > 0 ? names : ['Ana Montaj (OBJ)']);

                return objGroup;
            }
        } catch (err) {
            console.error("Error parsing model:", err);
            return null;
        }
    }, [data, ext, setModelStructure]);

    // Sectioning: Create a clipping plane
    const clippingPlanes = useMemo(() => {
        if (!isSectioning) return [];
        return [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)];
    }, [isSectioning]);

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
                    clippingPlanes={clippingPlanes}
                    side={THREE.DoubleSide}
                />
            </mesh>
        );
    }

    if (ext === 'obj') {
        // Apply explode factor to children if groups exist
        if (isExploded && (geometryOrGroup as THREE.Group).isGroup) {
            (geometryOrGroup as THREE.Group).traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const direction = child.position.clone().normalize();
                    if (direction.length() === 0) direction.set(1, 1, 1).normalize();
                    child.position.copy(direction.multiplyScalar(explodeFactor));

                    // Also apply wireframe and clipping to children materials
                    if (Array.isArray((child as THREE.Mesh).material)) {
                        ((child as THREE.Mesh).material as THREE.Material[]).forEach(m => {
                            (m as any).wireframe = isWireframe;
                            (m as any).clippingPlanes = clippingPlanes;
                        });
                    } else {
                        ((child as THREE.Mesh).material as any).wireframe = isWireframe;
                        ((child as THREE.Mesh).material as any).clippingPlanes = clippingPlanes;
                    }
                }
            });
        }
        return <primitive object={geometryOrGroup} />;
    }

    return null;
}

export function Viewport() {
    const { fileData, fileExt, isWireframe, isAutoRotate, isSectioning, isExploded, explodeFactor, setModelStructure } = useViewerStore();

    return (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] to-[#020617] pt-16">
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ fov: 45 }}
                gl={{ localClippingEnabled: true }}
            >
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5} adjustCamera>
                        {fileData && fileExt && (
                            <ModelRenderer
                                data={fileData}
                                ext={fileExt}
                                isWireframe={isWireframe}
                                isSectioning={isSectioning}
                                isExploded={isExploded}
                                explodeFactor={explodeFactor}
                                setModelStructure={setModelStructure}
                            />
                        )}
                    </Stage>
                    <OrbitControls makeDefault autoRotate={isAutoRotate} autoRotateSpeed={2} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
