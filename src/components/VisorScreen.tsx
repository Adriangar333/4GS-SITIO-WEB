'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, Color } from 'three';
import { Html } from '@react-three/drei';
import { getSelectedService, useSelectedService, setSelectedService } from './serviceStore';
import { SERVICES } from './ServiceIcons';

const GOLD = new Color(0xD4A843);
const DARK = new Color(0x060e06);

// ── Visor material that changes color ──
function VisorMaterial() {
    const matRef = useRef<MeshStandardMaterial>(null);
    const prevIdx = useRef<number | null>(null);

    useFrame(({ clock }) => {
        if (!matRef.current) return;
        const idx = getSelectedService();
        const t = clock.elapsedTime;

        if (idx !== prevIdx.current) {
            prevIdx.current = idx;
            if (idx !== null) {
                const c = new Color(SERVICES[idx].color);
                matRef.current.emissive.copy(c);
                matRef.current.color.copy(c).multiplyScalar(0.08);
            } else {
                matRef.current.emissive.copy(GOLD);
                matRef.current.color.copy(DARK);
            }
        }

        matRef.current.emissiveIntensity = idx !== null
            ? 2.2 + Math.sin(t * 3) * 0.4
            : 0.8 + Math.sin(t * 1.5) * 0.15;
    });

    return (
        <mesh position={[0, 0, 0.468]}>
            <planeGeometry args={[1.02, 0.6]} />
            <meshStandardMaterial
                ref={matRef}
                color={0x060e06}
                roughness={0.03}
                emissive={0xD4A843}
                emissiveIntensity={0.8}
                envMapIntensity={0.5}
            />
        </mesh>
    );
}

// ── Simulation HTML rendered on the visor ──
function VisorContent() {
    const selectedIdx = useSelectedService();
    if (selectedIdx === null) return null;

    const svc = SERVICES[selectedIdx];
    const color = svc.color;

    return (
        <Html
            position={[0, 0, 0.5]}
            center
            distanceFactor={1.6}
            transform
            style={{ pointerEvents: 'auto', userSelect: 'none' }}
        >
            <div
                style={{
                    width: '380px',
                    background: 'rgba(6,6,14,0.92)',
                    borderRadius: '12px',
                    border: `1px solid ${color}30`,
                    boxShadow: `0 0 40px ${color}15, 0 0 80px rgba(0,0,0,0.6)`,
                    fontFamily: "'Geist Mono', monospace",
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px 10px',
                    borderBottom: `1px solid ${color}15`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px' }}>{svc.symbol}</span>
                        <div>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{svc.name}</div>
                            <div style={{ color, fontSize: '8px', letterSpacing: '0.15em', fontWeight: 600 }}>{svc.sub.toUpperCase()}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedService(null)}
                        style={{
                            width: '24px', height: '24px', borderRadius: '50%', border: 'none',
                            background: 'rgba(255,255,255,0.06)', color: '#666', fontSize: '14px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        &times;
                    </button>
                </div>

                {/* Simulation content */}
                <div style={{ padding: '12px 16px 14px' }}>
                    {selectedIdx === 0 && <ChatSim color={color} />}
                    {selectedIdx === 1 && <FlowSim color={color} />}
                    {selectedIdx === 2 && <VisionSim color={color} />}
                    {selectedIdx === 3 && <ExcelSim color={color} />}
                    {selectedIdx === 4 && <ErpSim color={color} />}
                    {selectedIdx === 5 && <GeoSim color={color} />}
                </div>

                {/* Features */}
                <div style={{ padding: '0 16px 14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {svc.features.map((f, i) => (
                        <div key={i} style={{
                            fontSize: '9px', color: '#999', padding: '3px 8px',
                            background: `${color}08`, border: `1px solid ${color}15`,
                            borderRadius: '4px',
                        }}>
                            {f}
                        </div>
                    ))}
                </div>
            </div>
        </Html>
    );
}

// ── Simulations ──

function ChatSim({ color }: { color: string }) {
    const msgs = [
        { from: 'client', text: 'Cotización 500 unidades' },
        { from: 'bot', text: 'Procesando... 3 proveedores encontrados.' },
        { from: 'bot', text: 'Comparativo generado. Enviando a su correo.' },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {msgs.map((m, i) => (
                <div key={i} style={{
                    alignSelf: m.from === 'bot' ? 'flex-end' : 'flex-start',
                    maxWidth: '78%',
                    background: m.from === 'bot' ? `${color}12` : '#ffffff08',
                    border: `1px solid ${m.from === 'bot' ? color + '25' : '#ffffff10'}`,
                    borderRadius: '8px', padding: '6px 10px',
                }}>
                    <div style={{ fontSize: '7px', color: m.from === 'bot' ? color : '#555', fontWeight: 600 }}>
                        {m.from === 'bot' ? 'Bot FGS' : 'Cliente'}
                    </div>
                    <div style={{ fontSize: '10px', color: '#ccc', lineHeight: 1.4, marginTop: '2px' }}>{m.text}</div>
                </div>
            ))}
            <div style={{ alignSelf: 'flex-end', fontSize: '9px', color, animation: 'blink 1s infinite' }}>Escribiendo...</div>
        </div>
    );
}

function FlowSim({ color }: { color: string }) {
    return (
        <svg width="100%" height="110" viewBox="0 0 350 100" style={{ overflow: 'visible' }}>
            <path d="M65,30 C95,30 95,25 120,25" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
            <path d="M65,30 C95,30 95,55 120,55" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
            <path d="M210,25 C240,25 240,40 260,40" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
            <path d="M210,55 C240,55 240,40 260,40" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
            <circle r="3" fill={color} opacity="0.9">
                <animateMotion dur="2s" repeatCount="indefinite" path="M65,30 C95,30 95,25 120,25 L210,25 C240,25 240,40 260,40 L320,40" />
            </circle>
            {[
                { x: 8, y: 18, w: 55, label: 'Webhook' },
                { x: 120, y: 13, w: 88, label: 'HTTP Request' },
                { x: 120, y: 43, w: 88, label: 'Filter' },
                { x: 260, y: 28, w: 70, label: 'DB Write' },
            ].map((n, i) => (
                <g key={i}>
                    <rect x={n.x} y={n.y} width={n.w} height={22} rx="4" fill="#0a0a14" stroke={color} strokeWidth="0.7" opacity="0.8" />
                    <text x={n.x + n.w / 2} y={n.y + 14} textAnchor="middle" fill="#ccc" fontSize="8" fontFamily="monospace">{n.label}</text>
                </g>
            ))}
            <text x="8" y="88" fill="#555" fontSize="7" fontFamily="monospace">1,247 ejecuciones hoy · 0 errores</text>
        </svg>
    );
}

function VisionSim({ color }: { color: string }) {
    return (
        <div style={{ position: 'relative', height: '140px', background: '#080808', borderRadius: '6px', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, #ffffff05 15px, #ffffff05 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, #ffffff05 15px, #ffffff05 16px)' }} />
            <div style={{ position: 'absolute', left: '6%', top: '8%', width: '32%', height: '52%', border: `2px solid ${color}`, borderRadius: '3px', animation: 'pulseBox 2s infinite' }}>
                <div style={{ position: 'absolute', top: '-14px', left: 0, fontSize: '9px', color, background: `${color}20`, padding: '1px 6px', borderRadius: '2px', fontWeight: 600 }}>persona 0.94</div>
            </div>
            <div style={{ position: 'absolute', left: '48%', top: '12%', width: '25%', height: '42%', border: '2px solid #00ff88', borderRadius: '3px', animation: 'pulseBox 2s 0.5s infinite' }}>
                <div style={{ position: 'absolute', top: '-14px', left: 0, fontSize: '9px', color: '#00ff88', background: '#00ff8820', padding: '1px 6px', borderRadius: '2px', fontWeight: 600 }}>casco 0.87</div>
            </div>
            <div style={{ position: 'absolute', left: '56%', top: '56%', width: '28%', height: '32%', border: '2px solid #ffab00', borderRadius: '3px', animation: 'pulseBox 2s 1s infinite' }}>
                <div style={{ position: 'absolute', top: '-14px', left: 0, fontSize: '9px', color: '#ffab00', background: '#ffab0020', padding: '1px 6px', borderRadius: '2px', fontWeight: 600 }}>herramienta 0.79</div>
            </div>
            <div style={{ position: 'absolute', bottom: '4px', left: '8px', right: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '8px' }}>
                <span style={{ color: '#555' }}>YOLOv8</span>
                <span style={{ color: '#4caf50' }}>30 FPS</span>
                <span style={{ color }}>3 obj</span>
            </div>
        </div>
    );
}

function ExcelSim({ color }: { color: string }) {
    const rows = [
        ['Concreto 3000', 'm³', '45.2', '$12.8M'],
        ['Acero 60ksi', 'kg', '1,200', '$5.7M'],
        ['Formaleta', 'm²', '89.0', '$1.6M'],
        ['M.O. Oficial', 'hr', '320', '$3.8M'],
    ];
    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                <thead>
                    <tr>
                        {['ÍTEM', 'UND', 'CANT', 'TOTAL'].map(h => (
                            <th key={h} style={{ padding: '5px 6px', textAlign: 'left', color, fontWeight: 700, borderBottom: `1px solid ${color}25`, fontSize: '8px', letterSpacing: '0.08em' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            {r.map((c, ci) => (
                                <td key={ci} style={{ padding: '5px 6px', color: ci === 3 ? '#ddd' : '#999', borderBottom: '1px solid #ffffff06', textAlign: ci >= 2 ? 'right' : 'left', fontWeight: ci === 3 ? 600 : 400 }}>{c}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '12px', color, fontWeight: 700 }}>TOTAL: $26.8M</div>
        </div>
    );
}

function ErpSim({ color }: { color: string }) {
    const kpis = [
        { label: 'Órdenes', val: '47', pct: 78 },
        { label: 'Inventario', val: '2,341', pct: 62 },
        { label: 'Facturación', val: '$89M', pct: 91 },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {kpis.map((k, i) => (
                <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                        <span style={{ color: '#777' }}>{k.label}</span>
                        <span style={{ color: '#eee', fontWeight: 700 }}>{k.val}</span>
                    </div>
                    <div style={{ height: '3px', background: '#ffffff08', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${color}, ${color}88)`, width: `${k.pct}%`, animation: 'barGrow 1s ease-out' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function GeoSim({ color }: { color: string }) {
    return (
        <div style={{ position: 'relative', height: '140px', background: '#080e08', borderRadius: '6px', border: '1px solid #152015', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, #ffffff04 18px, #ffffff04 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, #ffffff04 18px, #ffffff04 19px)' }} />
            <svg width="100%" height="100%" viewBox="0 0 350 140" style={{ position: 'absolute', inset: 0 }}>
                <path d="M30,70 Q90,40 175,70 T320,55" fill="none" stroke="#ffffff10" strokeWidth="2" />
                <path d="M70,20 L170,60 L120,110 L260,30" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4,3" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="3s" repeatCount="indefinite" />
                </path>
                {[
                    { x: 70, y: 20, id: 'C-01' },
                    { x: 170, y: 60, id: 'C-02' },
                    { x: 120, y: 110, id: 'C-03' },
                    { x: 260, y: 30, id: 'C-04' },
                ].map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="4" fill={color} opacity="0.8">
                            <animate attributeName="r" values="4;6;4" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        </circle>
                        <circle cx={p.x} cy={p.y} r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2">
                            <animate attributeName="r" values="10;16;10" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        </circle>
                        <text x={p.x + 8} y={p.y + 3} fill="#aaa" fontSize="8" fontFamily="monospace">{p.id}</text>
                    </g>
                ))}
            </svg>
            <div style={{ position: 'absolute', bottom: '4px', left: '8px', fontSize: '8px', color: '#555' }}>4 activas · sync: 2s</div>
        </div>
    );
}

export default function VisorScreen() {
    return (
        <>
            <VisorMaterial />
            <VisorContent />
        </>
    );
}
