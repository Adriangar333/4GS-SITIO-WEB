'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Points, Vector3 } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ServiceIcons from './ServiceIcons';
import EnergyLines from './EnergyLines';
import { mouseState } from './mouseStore';
import { getSelectedService, setSelectedService } from './serviceStore';
import VisorOverlay from './VisorOverlay';

function seededRandom(seed: number): number {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

const PARTICLE_COUNT = 400;
const PARTICLE_POS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
    PARTICLE_POS[i * 3] = (seededRandom(i * 3 + 200) - 0.5) * 35;
    PARTICLE_POS[i * 3 + 1] = seededRandom(i * 3 + 201) * 10;
    PARTICLE_POS[i * 3 + 2] = (seededRandom(i * 3 + 202) - 0.5) * 30;
}

function AmbientParticles() {
    const ref = useRef<Points>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const arr = ref.current.geometry.getAttribute('position').array as Float32Array;
        const t = clock.elapsedTime;
        const dt = Math.min(clock.getDelta(), 0.04);
        for (let i = 0; i < arr.length; i += 3) {
            arr[i + 1] += dt * 0.05;
            arr[i] += Math.sin(t * 0.3 + i) * dt * 0.01;
            if (arr[i + 1] > 10) {
                arr[i + 1] = 0;
                arr[i] = (seededRandom(i + t * 100) - 0.5) * 35;
                arr[i + 2] = (seededRandom(i + t * 200 + 50) - 0.5) * 30;
            }
        }
        ref.current.geometry.getAttribute('position').needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[PARTICLE_POS, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#D4A843"
                size={0.04}
                transparent
                opacity={0.2}
                blending={AdditiveBlending}
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    );
}

// Camera
const FAR_LOOK = new Vector3(0, 2.2, 0);
const CLOSE_LOOK = new Vector3(0, 3.2, 0);

const _targetPos = new Vector3();
const _targetLook = new Vector3();

function CameraFollowMouse() {
    const zoomProgress = useRef(0);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            mouseState.nx = (e.clientX / window.innerWidth) * 2 - 1;
            mouseState.ny = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, []);

    useFrame((state) => {
        const m = mouseState;
        m.smoothX += (m.nx - m.smoothX) * 0.04;
        m.smoothY += (m.ny - m.smoothY) * 0.04;

        const isZoomed = getSelectedService() !== null;
        const targetZoom = isZoomed ? 1 : 0;
        zoomProgress.current += (targetZoom - zoomProgress.current) * 0.06;
        const z = zoomProgress.current;

        // Far: normal orbit
        const farX = m.smoothX * 1.5;
        const farY = 3.8 + m.smoothY * 0.8;
        const farZ = 10;

        // Close: zoom toward bot center
        const closeX = m.smoothX * 0.2;
        const closeY = 3.5 + m.smoothY * 0.1;
        const closeZ = 5.0;

        _targetPos.set(
            farX + (closeX - farX) * z,
            farY + (closeY - farY) * z,
            farZ + (closeZ - farZ) * z,
        );

        _targetLook.set(
            FAR_LOOK.x + (CLOSE_LOOK.x - FAR_LOOK.x) * z,
            FAR_LOOK.y + (CLOSE_LOOK.y - FAR_LOOK.y) * z,
            FAR_LOOK.z + (CLOSE_LOOK.z - FAR_LOOK.z) * z,
        );

        state.camera.position.copy(_targetPos);
        state.camera.lookAt(_targetLook);
    });

    return null;
}

function BackgroundClickHandler() {
    return (
        <mesh
            position={[0, 0, -10]}
            onClick={() => {
                if (getSelectedService() !== null) {
                    setSelectedService(null);
                }
            }}
        >
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial visible={false} />
        </mesh>
    );
}

export default function Scene() {
    return (
        <>
            <CameraFollowMouse />

            {/* Minimal lighting for service icon cubes */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 6]} intensity={1.2} color="#ffeedd" />
            <pointLight position={[-4, 4, 2]} intensity={2} color="#D4A843" distance={12} decay={2} />
            <pointLight position={[4, 4, 2]} intensity={2} color="#F0D78C" distance={12} decay={2} />

            {/* Scene objects */}
            <ServiceIcons />
            <EnergyLines />
            <AmbientParticles />
            <BackgroundClickHandler />

            {/* Visor simulation overlay in 3D space */}
            <VisorOverlay />

            {/* Post-Processing — bloom only for icon glow */}
            <EffectComposer>
                <Bloom
                    intensity={0.9}
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.85}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
}
