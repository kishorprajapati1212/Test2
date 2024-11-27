import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useEffect, useState } from 'react';

const Skyboxgen = () => {
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        // Load texture directly from public folder
        const loader = new THREE.TextureLoader();
        const loadedTexture = loader.load('/images.jpg', (texture) => {
            setTexture(texture);
        });

        return () => {
            // Clean up the texture loader
            loadedTexture.dispose();
        };
    }, []);

    return (
        <>
            <Canvas camera={{ position: [0, 0, 0.1] }} style={{ height: "90vh" }}>
                <OrbitControls enableZoom={false} enableDamping autoRotate={false} rotateSpeed={-0.5} />
                <Suspense fallback={null}>
                    <Preload all />
                    <group>
                        <mesh>
                            {/* Large, smooth sphere for skybox */}
                            <sphereGeometry args={[500, 60, 40]} />
                            {texture && <meshBasicMaterial map={texture} side={THREE.BackSide} />}
                        </mesh>
                    </group>
                </Suspense>
            </Canvas>
        </>
    );
};

export default Skyboxgen;


//default ptompt:-

// Generate a seamless equirectangular 360-degree skybox image at 512x256 pixels featuring: [USER_PROMPT]. Ensure there are no visible seams and blend the colors smoothly for a cohesive and immersive view.
