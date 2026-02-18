'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector2, MeshStandardMaterial, MeshBasicMaterial, DoubleSide } from 'three';
import { mouseState } from './mouseStore';
import VisorScreen from './VisorScreen';

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

function useRobotMaterials() {
    return useMemo(() => {
        const chrome = new MeshStandardMaterial({
            color: 0xd0d5da, roughness: 0.06, metalness: 1,
            envMapIntensity: 1.8,
        });
        const darkCh = new MeshStandardMaterial({
            color: 0x1a1f24, roughness: 0.12, metalness: 0.95,
            envMapIntensity: 1.3,
        });
        const brushed = new MeshStandardMaterial({
            color: 0x7a838b, roughness: 0.28, metalness: 0.93,
            envMapIntensity: 1.4,
        });
        const copper = new MeshStandardMaterial({
            color: 0xb87333, roughness: 0.18, metalness: 0.96,
            envMapIntensity: 1.5,
        });
        const rubber = new MeshStandardMaterial({
            color: 0x0e0e0e, roughness: 0.92, metalness: 0.02,
        });
        const emGold = new MeshStandardMaterial({
            color: 0xD4A843, emissive: 0xD4A843, emissiveIntensity: 3.5,
            roughness: 0.3, metalness: 0.3,
        });
        const emWarm = new MeshStandardMaterial({
            color: 0xF0D78C, emissive: 0xF0D78C, emissiveIntensity: 3.5,
            roughness: 0.3, metalness: 0.3,
        });
        const screen = new MeshStandardMaterial({
            color: 0x060e06, roughness: 0.03,
            emissive: 0xD4A843, emissiveIntensity: 0.8,
            envMapIntensity: 0.5,
        });
        const fgsEm = new MeshStandardMaterial({
            color: 0xD4A843, emissive: 0xD4A843, emissiveIntensity: 4.5,
            roughness: 0.2, metalness: 0.4,
        });
        const visorGlow = new MeshBasicMaterial({
            color: 0xD4A843, transparent: true, opacity: 0.1, side: DoubleSide,
        });
        const coreGlow = new MeshStandardMaterial({
            color: 0xD4A843, emissive: 0xD4A843, emissiveIntensity: 6,
            roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.85,
        });
        const panelDark = new MeshStandardMaterial({
            color: 0x12151a, roughness: 0.2, metalness: 0.9, envMapIntensity: 1.0,
        });

        return { chrome, darkCh, brushed, copper, rubber, emGold, emWarm, screen, fgsEm, visorGlow, coreGlow, panelDark };
    }, []);
}

const TORSO_POINTS = [
    [0.7, 0], [0.82, 0.25], [0.88, 0.65],
    [0.86, 1.05], [0.78, 1.45], [0.62, 1.75], [0.42, 1.95],
] as const;

// ── Platform ──
function Platform({ mat }: { mat: ReturnType<typeof useRobotMaterials> }) {
    const ringRef = useRef<Group>(null);

    const bolts = useMemo(() => {
        const arr: [number, number][] = [];
        for (let i = 0; i < 16; i++) {
            const a = (i / 16) * TAU;
            arr.push([Math.cos(a) * 1.3, Math.sin(a) * 1.3]);
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        if (ringRef.current) ringRef.current.rotation.y = clock.elapsedTime * 0.25;
    });

    return (
        <group>
            <mesh material={mat.darkCh} position={[0, 0.25, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.35, 1.55, 0.5, 64]} />
            </mesh>
            {/* Beveled top edge */}
            <mesh material={mat.chrome} position={[0, 0.51, 0]}>
                <cylinderGeometry args={[1.38, 1.35, 0.03, 64]} />
            </mesh>
            <mesh material={mat.emGold} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.53, 0]}>
                <torusGeometry args={[1.45, 0.035, 16, 96]} />
            </mesh>
            <mesh material={mat.emGold} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.53, 0]}>
                <torusGeometry args={[1.1, 0.02, 12, 64]} />
            </mesh>
            <mesh material={mat.chrome} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}>
                <torusGeometry args={[1.4, 0.045, 12, 64]} />
            </mesh>
            {bolts.map(([x, z], i) => (
                <mesh key={i} material={mat.chrome} position={[x, 0.53, z]} castShadow>
                    <cylinderGeometry args={[0.028, 0.028, 0.08, 8]} />
                </mesh>
            ))}
            {/* Rotating outer ring */}
            <group ref={ringRef}>
                <mesh material={mat.visorGlow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
                    <torusGeometry args={[1.8, 0.06, 8, 96]} />
                </mesh>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                    const a = (i / 8) * TAU;
                    return (
                        <mesh key={`rm-${i}`} material={mat.emGold} position={[Math.cos(a) * 1.8, 0.06, Math.sin(a) * 1.8]}>
                            <sphereGeometry args={[0.03, 8, 8]} />
                        </mesh>
                    );
                })}
            </group>
        </group>
    );
}

// ── Waist ──
function Waist({ mat }: { mat: ReturnType<typeof useRobotMaterials> }) {
    return (
        <group>
            <mesh material={mat.brushed} position={[0, 0.85, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.52, 0.72, 0.7, 32]} />
            </mesh>
            {[0, 1, 2, 3].map(i => (
                <mesh key={`coil-${i}`} material={mat.copper} position={[0, 0.58 + i * 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.6 + i * 0.03, 0.03, 8, 48]} />
                </mesh>
            ))}
            {/* Pistons */}
            {[0, 1, 2, 3, 4, 5].map(i => {
                const a = (i / 6) * TAU;
                return (
                    <group key={`piston-${i}`}>
                        <mesh material={mat.darkCh} position={[Math.cos(a) * 0.78, 0.85, Math.sin(a) * 0.78]} castShadow>
                            <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
                        </mesh>
                        <mesh material={mat.chrome} position={[Math.cos(a) * 0.78, 1.04, Math.sin(a) * 0.78]}>
                            <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

// ── Torso ──
function Torso({ mat }: { mat: ReturnType<typeof useRobotMaterials> }) {
    const coreRef = useRef<Group>(null);
    const lathePoints = useMemo(() => TORSO_POINTS.map(([x, y]) => new Vector2(x, y)), []);

    useFrame(({ clock }) => {
        if (coreRef.current) {
            const t = clock.elapsedTime;
            coreRef.current.rotation.y = t * 1.8;
            coreRef.current.rotation.x = Math.sin(t * 0.7) * 0.25;
        }
    });

    return (
        <group>
            <mesh material={mat.chrome} position={[0, 1.2, 0]} castShadow receiveShadow>
                <latheGeometry args={[lathePoints, 64]} />
            </mesh>
            {/* Armor panels on sides */}
            {([-1, 1] as const).map(s => (
                <group key={`armor-${s}`}>
                    <mesh material={mat.panelDark} position={[s * 0.75, 2.0, 0.3]} rotation={[0, s * 10 * DEG, 0]} castShadow>
                        <boxGeometry args={[0.18, 0.8, 0.5]} />
                    </mesh>
                    {/* Vent slits */}
                    {[0, 1, 2].map(v => (
                        <mesh key={`vent-${v}`} material={mat.darkCh}
                            position={[s * 0.76, 1.75 + v * 0.18, 0.3]}
                            rotation={[0, s * 10 * DEG, 0]}>
                            <boxGeometry args={[0.2, 0.04, 0.35]} />
                        </mesh>
                    ))}
                </group>
            ))}
            {/* Back heat sink */}
            {[0, 1, 2, 3, 4].map(i => (
                <mesh key={`hs-${i}`} material={mat.darkCh} position={[0, 1.7 + i * 0.15, -0.75]} castShadow>
                    <boxGeometry args={[0.6, 0.04, 0.12]} />
                </mesh>
            ))}
            {/* Chest panel */}
            <mesh material={mat.panelDark} position={[0, 2.2, 0.82]} castShadow>
                <boxGeometry args={[0.9, 0.7, 0.1]} />
            </mesh>
            <mesh position={[0, 2.2, 0.88]}>
                <boxGeometry args={[0.96, 0.76, 0.015]} />
                <meshStandardMaterial color={0x2a2a35} roughness={0.3} metalness={0.9} />
            </mesh>
            {/* Energy core */}
            <group ref={coreRef} position={[0, 2.2, 0.68]}>
                <mesh material={mat.coreGlow}>
                    <octahedronGeometry args={[0.12, 2]} />
                </mesh>
                <mesh material={mat.visorGlow}>
                    <octahedronGeometry args={[0.18, 1]} />
                </mesh>
            </group>
            {/* FGS dots */}
            {[0, 1, 2, 3].map(i => (
                <mesh key={`dot-${i}`} material={mat.fgsEm} position={[-0.18 + i * 0.12, 2.4, 0.9]}>
                    <sphereGeometry args={[0.03, 10, 10]} />
                </mesh>
            ))}
            {/* Status LEDs */}
            {[0, 1, 2, 3, 4].map(i => (
                <mesh key={`led-${i}`} position={[-0.2 + i * 0.1, 1.9, 0.89]}>
                    <sphereGeometry args={[0.013, 8, 8]} />
                    <meshBasicMaterial color={i < 3 ? '#D4A843' : '#F0D78C'} />
                </mesh>
            ))}
            {/* Shoulder mounts */}
            {([-1, 1] as const).map(s => (
                <group key={`sm-${s}`}>
                    <mesh material={mat.darkCh} position={[s * 0.85, 3.05, 0]} rotation={[0, 0, s * 12 * DEG]} castShadow>
                        <cylinderGeometry args={[0.22, 0.18, 0.2, 16]} />
                    </mesh>
                    <mesh material={mat.copper} position={[s * 0.85, 3.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.24, 0.018, 8, 24]} />
                    </mesh>
                    {/* Shoulder armor plate */}
                    <mesh material={mat.chrome} position={[s * 0.95, 3.15, 0]} rotation={[0, 0, s * 15 * DEG]} castShadow>
                        <boxGeometry args={[0.35, 0.08, 0.35]} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// ── Neck ──
function Neck({ mat }: { mat: ReturnType<typeof useRobotMaterials> }) {
    return (
        <group>
            <mesh material={mat.brushed} position={[0, 3.35, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.28, 0.3, 16]} />
            </mesh>
            <mesh material={mat.chrome} position={[0, 3.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.2, 0.018, 8, 20]} />
            </mesh>
            <mesh material={mat.chrome} position={[0, 3.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.26, 0.015, 8, 20]} />
            </mesh>
            {[-1.2, 0, 1.2].map(i => {
                const a = (i * 30) * DEG;
                return (
                    <mesh key={`cable-${i}`} material={mat.rubber}
                        position={[Math.sin(a) * 0.22, 3.35, Math.cos(a) * 0.22]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
                    </mesh>
                );
            })}
        </group>
    );
}

// ── Head — tracks mouse, contains visor screen ──
function Head({ mat }: { mat: ReturnType<typeof useRobotMaterials> }) {
    const headRef = useRef<Group>(null);

    useFrame(() => {
        if (!headRef.current) return;
        const targetRotY = -mouseState.smoothX * 0.4;
        const targetRotX = mouseState.smoothY * 0.15;
        headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * 0.05;
        headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * 0.05;
    });

    return (
        <group ref={headRef} position={[0, 3.85, 0]}>
            {/* Main head */}
            <mesh material={mat.chrome} castShadow>
                <boxGeometry args={[1.4, 0.95, 0.88]} />
            </mesh>
            {/* Top plate */}
            <mesh material={mat.darkCh} position={[0, 0.42, 0]}>
                <boxGeometry args={[1.25, 0.12, 0.72]} />
            </mesh>
            {/* Bottom chin */}
            <mesh material={mat.darkCh} position={[0, -0.42, 0.1]}>
                <boxGeometry args={[0.9, 0.12, 0.5]} />
            </mesh>
            {/* Side panels */}
            {([-1, 1] as const).map(s => (
                <group key={`hp-${s}`}>
                    <mesh material={mat.panelDark} position={[s * 0.69, 0, 0]}>
                        <boxGeometry args={[0.06, 0.82, 0.78]} />
                    </mesh>
                    {/* Side sensor */}
                    <mesh material={mat.darkCh} position={[s * 0.73, 0.1, 0]}>
                        <cylinderGeometry args={[0.06, 0.06, 0.06, 8]} />
                    </mesh>
                    <mesh material={s === -1 ? mat.emGold : mat.emWarm} position={[s * 0.74, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
                    </mesh>
                </group>
            ))}

            {/* ── Visor ── */}
            <mesh material={mat.darkCh} position={[0, 0, 0.43]}>
                <boxGeometry args={[1.15, 0.72, 0.05]} />
            </mesh>
            {/* Eyes */}
            {([-1, 1] as const).map(s => (
                <group key={`eye-${s}`}>
                    <mesh material={mat.emGold} position={[s * 0.26, 0.04, 0.47]}>
                        <sphereGeometry args={[0.07, 16, 16]} />
                    </mesh>
                    <mesh position={[s * 0.26, 0.04, 0.50]}>
                        <circleGeometry args={[0.035, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>
            ))}
            {/* Visor glow */}
            <mesh material={mat.visorGlow} position={[0, 0, 0.48]}>
                <planeGeometry args={[1.08, 0.66]} />
            </mesh>
            {/* Visor screen content (Html) */}
            <VisorScreen />

            {/* ── Antennae ── */}
            <mesh material={mat.darkCh} position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[0.8, 0.06, 0.5]} />
            </mesh>
            <mesh material={mat.chrome} position={[0.52, 0.6, 0]}>
                <cylinderGeometry args={[0.01, 0.016, 0.35, 8]} />
            </mesh>
            <mesh material={mat.emGold} position={[0.52, 0.8, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
            </mesh>
            <mesh material={mat.chrome} position={[-0.42, 0.57, 0]}>
                <cylinderGeometry args={[0.008, 0.013, 0.22, 8]} />
            </mesh>
            <mesh material={mat.emWarm} position={[-0.42, 0.7, 0]}>
                <sphereGeometry args={[0.022, 8, 8]} />
            </mesh>
            {/* Top sensor array */}
            {[-0.15, 0, 0.15].map((x, i) => (
                <mesh key={`sensor-${i}`} material={mat.darkCh} position={[x, 0.49, -0.15]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
                </mesh>
            ))}
        </group>
    );
}

// ── Arm — compact, close to body ──
function RobotArm({ side, yOff, spread, mat }: {
    side: -1 | 1; yOff: number; spread: number;
    mat: ReturnType<typeof useRobotMaterials>;
}) {
    const ref = useRef<Group>(null);
    const s = side;
    const by = 2.9 + yOff;
    const idx = (s === -1 ? 0 : 2) + (yOff < 0 ? 1 : 0);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime;
        const mouseInfluence = mouseState.smoothX * s * 0.025;
        ref.current.rotation.z = Math.sin(t * 0.8 + idx * 1.5) * 0.06 + mouseInfluence;
        ref.current.rotation.x = Math.sin(t * 0.45 + idx * 0.6) * 0.035;
    });

    const emMat = s === -1 ? mat.emGold : mat.emWarm;
    // Reduced horizontal spread for more realistic arm positions
    const armSpread = 0.7;

    return (
        <group ref={ref}>
            {/* Shoulder joint */}
            <mesh material={mat.chrome} position={[s * 1.0, by, 0]} castShadow>
                <sphereGeometry args={[0.18, 20, 20]} />
            </mesh>
            <mesh material={mat.darkCh} position={[s * 1.0, by, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.2, 0.022, 8, 24]} />
            </mesh>
            {/* Upper arm */}
            <mesh material={mat.brushed}
                position={[s * (1.0 + armSpread * 0.55), by - 0.25, 0.05]}
                rotation={[0, 0, s * (20 + spread * 0.6) * DEG]} castShadow>
                <cylinderGeometry args={[0.09, 0.11, 1.0, 16]} />
            </mesh>
            {/* Hydraulic line */}
            <mesh material={mat.copper}
                position={[s * (1.0 + armSpread * 0.55) + s * 0.07, by - 0.2, 0.12]}
                rotation={[0, 0, s * (20 + spread * 0.6) * DEG]}>
                <cylinderGeometry args={[0.025, 0.02, 0.65, 6]} />
            </mesh>
            {/* Elbow */}
            <mesh material={mat.darkCh} position={[s * (1.0 + armSpread), by - 0.55, 0.12]} castShadow>
                <sphereGeometry args={[0.14, 16, 16]} />
            </mesh>
            <mesh material={mat.chrome} position={[s * (1.0 + armSpread), by - 0.55, 0.12]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.16, 0.018, 8, 20]} />
            </mesh>
            {/* Forearm */}
            <mesh material={mat.chrome}
                position={[s * (1.0 + armSpread * 1.6), by - 0.35, 0.2]}
                rotation={[0, 0, s * (40 + spread * 0.8) * DEG]} castShadow>
                <cylinderGeometry args={[0.07, 0.09, 0.95, 16]} />
            </mesh>
            {/* Rubber wraps */}
            {[0, 1, 2].map(c => (
                <mesh key={`wrap-${c}`} material={mat.rubber}
                    position={[
                        s * (1.0 + armSpread * 1.3 + c * 0.15),
                        by - 0.4 - c * 0.03,
                        0.17 + c * 0.015,
                    ]}
                    rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[0.09, 0.013, 6, 16]} />
                </mesh>
            ))}
            {/* Wrist */}
            <mesh material={mat.darkCh}
                position={[s * (1.0 + armSpread * 2.0), by - 0.2, 0.28]}
                rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.07, 0.055, 0.12, 12]} />
            </mesh>
            {/* Hand */}
            <mesh material={mat.chrome} position={[s * (1.0 + armSpread * 2.15), by - 0.15, 0.3]} castShadow>
                <sphereGeometry args={[0.13, 16, 16]} />
            </mesh>
            {/* Fingers */}
            {[0, 1, 2].map(f => {
                const fa = (f - 1) * 28 * DEG;
                return (
                    <mesh key={`finger-${f}`} material={mat.brushed}
                        position={[
                            s * (1.0 + armSpread * 2.15) + s * 0.1,
                            by - 0.15 + 0.06 * Math.sin(fa),
                            0.3 + 0.1 * Math.cos(fa),
                        ]}
                        rotation={[0, 0, s * 20 * DEG]} castShadow>
                        <cylinderGeometry args={[0.018, 0.024, 0.16, 6]} />
                    </mesh>
                );
            })}
            {/* Glow tip */}
            <mesh material={emMat} position={[s * (1.0 + armSpread * 2.3), by - 0.15, 0.3]}>
                <sphereGeometry args={[0.05, 8, 8]} />
            </mesh>
        </group>
    );
}

// ── Holographic orbit rings ──
function HoloRings({ mat }: { mat: ReturnType<typeof useRobotMaterials> }) {
    const ref1 = useRef<Group>(null);
    const ref2 = useRef<Group>(null);
    const ref3 = useRef<Group>(null);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (ref1.current) {
            ref1.current.rotation.y = t * 0.35;
            ref1.current.rotation.x = Math.sin(t * 0.25) * 0.08;
        }
        if (ref2.current) {
            ref2.current.rotation.y = -t * 0.25;
            ref2.current.rotation.z = Math.cos(t * 0.2) * 0.12;
        }
        if (ref3.current) {
            ref3.current.rotation.y = t * 0.15;
            ref3.current.rotation.x = Math.sin(t * 0.18) * 0.1;
        }
    });

    return (
        <group position={[0, 2.0, 0]}>
            <group ref={ref1}>
                <mesh material={mat.visorGlow} rotation={[Math.PI / 3.5, 0, 0]}>
                    <torusGeometry args={[2.0, 0.012, 8, 96]} />
                </mesh>
            </group>
            <group ref={ref2}>
                <mesh material={mat.visorGlow} rotation={[-Math.PI / 4.5, Math.PI / 5, 0]}>
                    <torusGeometry args={[2.3, 0.01, 8, 96]} />
                </mesh>
            </group>
            <group ref={ref3}>
                <mesh material={mat.visorGlow} rotation={[Math.PI / 6, -Math.PI / 3, Math.PI / 8]}>
                    <torusGeometry args={[2.6, 0.008, 8, 96]} />
                </mesh>
            </group>
        </group>
    );
}

export default function Robot() {
    const groupRef = useRef<Group>(null);
    const mat = useRobotMaterials();

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.elapsedTime;
        groupRef.current.position.y = Math.sin(t * 0.6) * 0.1 + Math.sin(t * 1.7) * 0.03;
    });

    return (
        <group ref={groupRef}>
            <Platform mat={mat} />
            <Waist mat={mat} />
            <Torso mat={mat} />
            <Neck mat={mat} />
            <Head mat={mat} />
            <RobotArm side={-1} yOff={0.2} spread={0} mat={mat} />
            <RobotArm side={-1} yOff={-0.35} spread={8} mat={mat} />
            <RobotArm side={1} yOff={0.2} spread={0} mat={mat} />
            <RobotArm side={1} yOff={-0.35} spread={8} mat={mat} />
            <HoloRings mat={mat} />
        </group>
    );
}
