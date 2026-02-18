'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating golden particles that drift and shimmer ── */
function Particles({ count = 120 }) {
    const meshRef = useRef<THREE.Points>(null);

    const { positions, sizes, speeds, offsets } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const speeds = new Float32Array(count);
        const offsets = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Spread particles across a wide area
            positions[i * 3] = (Math.random() - 0.5) * 20;      // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;  // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;   // z

            sizes[i] = Math.random() * 3 + 1;
            speeds[i] = Math.random() * 0.3 + 0.1;
            offsets[i] = Math.random() * Math.PI * 2;
        }
        return { positions, sizes, speeds, offsets };
    }, [count]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const time = clock.getElapsedTime();
        const geo = meshRef.current.geometry;
        const posAttr = geo.getAttribute('position');
        const sizeAttr = geo.getAttribute('size');

        for (let i = 0; i < count; i++) {
            // Gentle floating motion
            const baseY = positions[i * 3 + 1];
            posAttr.setY(i, baseY + Math.sin(time * speeds[i] + offsets[i]) * 0.8);

            const baseX = positions[i * 3];
            posAttr.setX(i, baseX + Math.sin(time * speeds[i] * 0.7 + offsets[i] + 1.5) * 0.3);

            // Pulsing size
            const baseSize = sizes[i];
            sizeAttr.setX(i, baseSize * (0.6 + 0.4 * Math.sin(time * speeds[i] * 2 + offsets[i])));
        }

        posAttr.needsUpdate = true;
        sizeAttr.needsUpdate = true;

        // Slow rotation of the whole particle system
        meshRef.current.rotation.y = time * 0.02;
    });

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uColor1: { value: new THREE.Color('#D4A843') },
                uColor2: { value: new THREE.Color('#F0D78C') },
                uTime: { value: 0 },
            },
            vertexShader: `
                attribute float size;
                varying float vAlpha;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                    vAlpha = size / 4.0;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uTime;
                varying float vAlpha;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.4;
                    vec3 color = mix(uColor1, uColor2, gl_PointCoord.x);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    // Update time uniform
    useFrame(({ clock }) => {
        shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <points ref={meshRef} material={shaderMaterial}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
        </points>
    );
}

/* ── Floating geometric rings ── */
function FloatingRings() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.children.forEach((child, i) => {
            child.rotation.x = t * 0.15 * (i % 2 === 0 ? 1 : -1);
            child.rotation.z = t * 0.1 * (i % 2 === 0 ? -1 : 1);
            child.position.y = Math.sin(t * 0.3 + i * 2) * 0.5;
        });
    });

    return (
        <group ref={groupRef}>
            {[
                { pos: [-5, 2, -3] as [number, number, number], scale: 1.2 },
                { pos: [6, -1, -4] as [number, number, number], scale: 0.8 },
                { pos: [-3, -2, -2] as [number, number, number], scale: 0.6 },
                { pos: [4, 3, -5] as [number, number, number], scale: 1.0 },
            ].map((ring, i) => (
                <mesh key={i} position={ring.pos} scale={ring.scale}>
                    <torusGeometry args={[1, 0.02, 16, 64]} />
                    <meshBasicMaterial
                        color="#D4A843"
                        transparent
                        opacity={0.12}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ── Main exported component ── */
export default function ContactoParticles() {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
                style={{ background: 'transparent' }}
            >
                <Particles count={100} />
                <FloatingRings />
            </Canvas>
        </div>
    );
}
