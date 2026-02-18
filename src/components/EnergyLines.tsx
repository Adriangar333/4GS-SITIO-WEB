'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, Vector3, Group, AdditiveBlending } from 'three';
import { getIconPosition } from './ServiceIcons';

const LINE_SEGMENTS = 64;

const ARM_DEFS = [
    { side: -1, yOff: 0.2 },
    { side: -1, yOff: -0.35 },
    { side: 1, yOff: 0.2 },
    { side: 1, yOff: -0.35 },
];

const CONNECTIONS = [
    { armIdx: 0, iconIdx: 0, color: '#25D366' },
    { armIdx: 1, iconIdx: 1, color: '#FF6D00' },
    { armIdx: 2, iconIdx: 2, color: '#E040FB' },
    { armIdx: 3, iconIdx: 3, color: '#217346' },
    { armIdx: 2, iconIdx: 4, color: '#1565C0' },
    { armIdx: 1, iconIdx: 5, color: '#FF5722' },
];

function getArmTipPosition(armIdx: number, robotY: number): Vector3 {
    const def = ARM_DEFS[armIdx];
    // Match Robot arm geometry: armSpread=0.7, tip at side * (1.0 + 0.7 * 2.3)
    const tipX = def.side * (1.0 + 0.7 * 2.3);
    return new Vector3(tipX, 2.9 + def.yOff - 0.15 + robotY, 0.3);
}

function seededRandom(seed: number): number {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

const PARTICLES_PER_LINE = 6;

// Pre-allocate buffers at module level (one pair per connection)
const LINE_BUFFERS = CONNECTIONS.map(() => ({
    positions: new Float32Array(LINE_SEGMENTS * 3),
    glowPositions: new Float32Array(LINE_SEGMENTS * 3),
    particles: Array.from({ length: PARTICLES_PER_LINE }, () => ({
        t: 0, speed: 0,
    })),
}));

// Initialize particle data
CONNECTIONS.forEach((_, ci) => {
    const buf = LINE_BUFFERS[ci];
    for (let pi = 0; pi < PARTICLES_PER_LINE; pi++) {
        buf.particles[pi].t = pi / PARTICLES_PER_LINE;
        buf.particles[pi].speed = 0.15 + seededRandom(ci * 100 + pi * 7) * 0.1;
    }
});

function EnergyLine({ conn, connIdx }: { conn: typeof CONNECTIONS[0]; connIdx: number }) {
    const mainAttrRef = useRef<BufferAttribute>(null);
    const glowAttrRef = useRef<BufferAttribute>(null);
    const particleRefs = useRef<(Group | null)[]>([]);
    const bufRef = useRef(LINE_BUFFERS[connIdx]);

    useFrame(({ clock }) => {
        const buf = bufRef.current;
        const t = clock.elapsedTime;
        const dt = Math.min(clock.getDelta(), 0.04);
        const robotY = Math.sin(t * 0.6) * 0.1 + Math.sin(t * 1.7) * 0.03;

        const start = getArmTipPosition(conn.armIdx, robotY);
        const iconPos = getIconPosition(conn.iconIdx, t);
        const end = new Vector3(...iconPos);
        const mid = start.clone().lerp(end, 0.5);
        mid.y += 1.0 + Math.sin(t * 1.2 + conn.iconIdx) * 0.35;
        mid.z += Math.sin(t * 0.7 + conn.armIdx) * 0.4;

        for (let i = 0; i < LINE_SEGMENTS; i++) {
            const frac = i / (LINE_SEGMENTS - 1);
            const p1 = new Vector3().lerpVectors(start, mid, frac);
            const p2 = new Vector3().lerpVectors(mid, end, frac);
            p1.lerp(p2, frac);
            p1.y += Math.sin(frac * Math.PI * 5 + t * 4) * 0.04 * (1 - Math.abs(frac - 0.5) * 2);

            const idx = i * 3;
            buf.positions[idx] = p1.x;
            buf.positions[idx + 1] = p1.y;
            buf.positions[idx + 2] = p1.z;
            buf.glowPositions[idx] = p1.x;
            buf.glowPositions[idx + 1] = p1.y;
            buf.glowPositions[idx + 2] = p1.z;
        }

        if (mainAttrRef.current) mainAttrRef.current.needsUpdate = true;
        if (glowAttrRef.current) glowAttrRef.current.needsUpdate = true;

        buf.particles.forEach((ps, pi) => {
            ps.t = (ps.t + dt * ps.speed) % 1;
            const frac = ps.t;
            const pa = new Vector3().lerpVectors(start, mid, frac);
            const pb = new Vector3().lerpVectors(mid, end, frac);
            pa.lerp(pb, frac);
            pa.y += Math.sin(frac * Math.PI * 5 + t * 4) * 0.04 * (1 - Math.abs(frac - 0.5) * 2);

            const pRef = particleRefs.current[pi];
            if (pRef) {
                pRef.position.copy(pa);
                pRef.visible = true;
            }
        });
    });

    return (
        <group>
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        ref={mainAttrRef}
                        attach="attributes-position"
                        args={[LINE_BUFFERS[connIdx].positions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={conn.color} transparent opacity={0.55} />
            </line>
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        ref={glowAttrRef}
                        attach="attributes-position"
                        args={[LINE_BUFFERS[connIdx].glowPositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={conn.color} transparent opacity={0.12} />
            </line>
            {Array.from({ length: PARTICLES_PER_LINE }).map((_, pi) => (
                <group key={`p-${pi}`} ref={el => { particleRefs.current[pi] = el; }}>
                    <mesh>
                        <sphereGeometry args={[0.04, 6, 6]} />
                        <meshBasicMaterial
                            color={conn.color}
                            transparent
                            opacity={0.9}
                            blending={AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

export default function EnergyLines() {
    return (
        <group>
            {CONNECTIONS.map((conn, i) => (
                <EnergyLine key={`el-${i}`} conn={conn} connIdx={i} />
            ))}
        </group>
    );
}
