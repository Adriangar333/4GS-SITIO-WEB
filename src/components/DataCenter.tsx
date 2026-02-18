'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshStandardMaterial } from 'three';

const TAU = Math.PI * 2;

function seededRandom(seed: number): number {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

// Pre-compute rack configs at module level
const RACK_CONFIGS: { pos: [number, number, number]; rY: number }[] = [
    { pos: [-7.5, 0, -3], rY: 0.25 },
    { pos: [-9, 0, -0.5], rY: 0.15 },
    { pos: [-7.5, 0, 2], rY: 0.08 },
    { pos: [7.5, 0, -3], rY: -0.25 },
    { pos: [9, 0, -0.5], rY: -0.15 },
    { pos: [7.5, 0, 2], rY: -0.08 },
    { pos: [-3, 0, -7], rY: 0 },
    { pos: [0, 0, -8], rY: 0 },
    { pos: [3, 0, -7], rY: 0 },
];

// Pre-compute LED data per rack
interface LedData {
    x: number; y: number; isGold: boolean;
    blink: boolean; speed: number; phase: number;
}

const RACK_LED_DATA: LedData[][] = RACK_CONFIGS.map((_, rackIdx) => {
    const leds: LedData[] = [];
    for (let row = 0; row < 12; row++) {
        const ledCount = 2 + Math.floor(seededRandom(rackIdx * 100 + row * 7) * 4);
        for (let j = 0; j < ledCount; j++) {
            leds.push({
                x: -0.65 + j * 0.18,
                y: 0.5 + row * 0.5 + 0.14,
                isGold: seededRandom(rackIdx * 200 + row * 13 + j * 3) > 0.15,
                blink: seededRandom(rackIdx * 300 + row * 17 + j * 5) > 0.4,
                speed: 0.8 + seededRandom(rackIdx * 400 + row * 19 + j * 7) * 4,
                phase: seededRandom(rackIdx * 500 + row * 23 + j * 11) * TAU,
            });
        }
    }
    return leds;
});

function useRackMaterials() {
    return useMemo(() => {
        const rack = new MeshStandardMaterial({
            color: 0x111122, roughness: 0.5, metalness: 0.85,
        });
        const server = new MeshStandardMaterial({
            color: 0x1e2832, roughness: 0.35, metalness: 0.9,
        });
        const edge = new MeshStandardMaterial({
            color: 0x333344, roughness: 0.3, metalness: 0.9,
        });

        return { rack, server, edge };
    }, []);
}

function Led({ data, rackIdx, ledIdx }: { data: LedData; rackIdx: number; ledIdx: number }) {
    const ref = useRef<Group>(null);

    useFrame(({ clock }) => {
        if (!ref.current || !data.blink) return;
        const t = clock.elapsedTime;
        ref.current.visible = Math.sin(t * data.speed + data.phase) > -0.2;
    });

    return (
        <group ref={ref}>
            <mesh position={[data.x, data.y, 0.56]}>
                <boxGeometry args={[0.02, 0.02, 0.02]} />
                <meshBasicMaterial color={data.isGold ? '#D4A843' : (seededRandom(rackIdx * 600 + ledIdx) > 0.5 ? '#ff5252' : '#ffab00')} />
            </mesh>
        </group>
    );
}

function ServerRack({ config, rackIdx, mat }: {
    config: typeof RACK_CONFIGS[0];
    rackIdx: number;
    mat: ReturnType<typeof useRackMaterials>;
}) {
    const leds = RACK_LED_DATA[rackIdx];

    return (
        <group position={config.pos} rotation={[0, config.rY, 0]}>
            {/* Frame */}
            <mesh material={mat.rack} position={[0, 3.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.9, 6.5, 1.1]} />
            </mesh>
            {/* Edge posts */}
            {[[-0.95, 0.55], [-0.95, -0.55], [0.95, 0.55], [0.95, -0.55]].map(([ex, ez], i) => (
                <mesh key={`edge-${i}`} material={mat.edge} position={[ex, 3.25, ez]}>
                    <boxGeometry args={[0.04, 6.5, 0.04]} />
                </mesh>
            ))}
            {/* Server units */}
            {Array.from({ length: 12 }).map((_, i) => (
                <mesh key={`srv-${i}`} material={mat.server} position={[0, 0.5 + i * 0.5, 0]} castShadow>
                    <boxGeometry args={[1.7, 0.06, 0.95]} />
                </mesh>
            ))}
            {/* LEDs */}
            {leds.map((led, i) => (
                <Led key={`led-${i}`} data={led} rackIdx={rackIdx} ledIdx={i} />
            ))}
        </group>
    );
}

export default function DataCenter() {
    const mat = useRackMaterials();

    return (
        <group>
            {RACK_CONFIGS.map((config, i) => (
                <ServerRack key={`rack-${i}`} config={config} rackIdx={i} mat={mat} />
            ))}
        </group>
    );
}
