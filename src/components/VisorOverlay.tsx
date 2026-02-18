'use client';

import { Html } from '@react-three/drei';
import { useSelectedService, setSelectedService } from './serviceStore';
import { SERVICES } from './ServiceIcons';

function ChatSim({ color }: { color: string }) {
    const msgs = [
        { from: 'client', text: 'Cotización 500 unidades' },
        { from: 'bot', text: 'Procesando... 3 proveedores encontrados.' },
        { from: 'bot', text: 'Comparativo generado. Enviando a su correo.' },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {msgs.map((m, i) => (
                <div key={i} style={{
                    alignSelf: m.from === 'bot' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%', background: m.from === 'bot' ? `${color}12` : '#ffffff08',
                    border: `1px solid ${m.from === 'bot' ? color + '25' : '#ffffff10'}`,
                    borderRadius: '8px', padding: '7px 11px',
                }}>
                    <div style={{ fontSize: '8px', color: m.from === 'bot' ? color : '#555', fontWeight: 600 }}>
                        {m.from === 'bot' ? 'Bot FGS' : 'Cliente'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#ccc', lineHeight: 1.5, marginTop: '2px' }}>{m.text}</div>
                </div>
            ))}
            <div style={{ alignSelf: 'flex-end', fontSize: '10px', color, animation: 'blink 1s infinite' }}>Escribiendo...</div>
        </div>
    );
}

function FlowSim({ color }: { color: string }) {
    return (
        <svg width="100%" height="120" viewBox="0 0 360 110" style={{ overflow: 'visible' }}>
            <path d="M70,35 C100,35 100,25 130,25" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
            <path d="M70,35 C100,35 100,60 130,60" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
            <path d="M220,25 C250,25 250,42 270,42" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
            <path d="M220,60 C250,60 250,42 270,42" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
            <circle r="3.5" fill={color} opacity="0.9">
                <animateMotion dur="2s" repeatCount="indefinite" path="M70,35 C100,35 100,25 130,25 L220,25 C250,25 250,42 270,42 L330,42" />
            </circle>
            {[
                { x: 10, y: 22, w: 58, label: 'Webhook' },
                { x: 130, y: 12, w: 90, label: 'HTTP Request' },
                { x: 130, y: 47, w: 90, label: 'Filter' },
                { x: 270, y: 30, w: 72, label: 'DB Write' },
            ].map((n, i) => (
                <g key={i}>
                    <rect x={n.x} y={n.y} width={n.w} height={24} rx="5" fill="#0a0a14" stroke={color} strokeWidth="0.8" opacity="0.8" />
                    <text x={n.x + n.w / 2} y={n.y + 15} textAnchor="middle" fill="#ccc" fontSize="9" fontFamily="monospace">{n.label}</text>
                </g>
            ))}
            <text x="10" y="98" fill="#555" fontSize="8" fontFamily="monospace">1,247 ejecuciones hoy</text>
        </svg>
    );
}

function VisionSim({ color }: { color: string }) {
    return (
        <div style={{ position: 'relative', height: '155px', background: '#080808', borderRadius: '6px', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, #ffffff05 18px, #ffffff05 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, #ffffff05 18px, #ffffff05 19px)' }} />
            <div style={{ position: 'absolute', left: '6%', top: '8%', width: '34%', height: '52%', border: `2px solid ${color}`, borderRadius: '3px', animation: 'pulseBox 2s infinite' }}>
                <div style={{ position: 'absolute', top: '-16px', left: 0, fontSize: '10px', color, background: `${color}20`, padding: '2px 7px', borderRadius: '3px', fontWeight: 600 }}>persona 0.94</div>
            </div>
            <div style={{ position: 'absolute', left: '48%', top: '14%', width: '26%', height: '42%', border: '2px solid #00ff88', borderRadius: '3px', animation: 'pulseBox 2s 0.5s infinite' }}>
                <div style={{ position: 'absolute', top: '-16px', left: 0, fontSize: '10px', color: '#00ff88', background: '#00ff8820', padding: '2px 7px', borderRadius: '3px', fontWeight: 600 }}>casco 0.87</div>
            </div>
            <div style={{ position: 'absolute', left: '55%', top: '58%', width: '28%', height: '30%', border: '2px solid #ffab00', borderRadius: '3px', animation: 'pulseBox 2s 1s infinite' }}>
                <div style={{ position: 'absolute', top: '-16px', left: 0, fontSize: '10px', color: '#ffab00', background: '#ffab0020', padding: '2px 7px', borderRadius: '3px', fontWeight: 600 }}>herramienta 0.79</div>
            </div>
            <div style={{ position: 'absolute', bottom: '5px', left: '8px', right: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                <span style={{ color: '#555' }}>YOLOv8</span>
                <span style={{ color: '#4caf50' }}>30 FPS</span>
                <span style={{ color }}>3 objetos</span>
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
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                    <tr>{['ÍTEM', 'UND', 'CANT', 'TOTAL'].map(h => (
                        <th key={h} style={{ padding: '6px 8px', textAlign: 'left', color, fontWeight: 700, borderBottom: `1px solid ${color}25`, fontSize: '9px', letterSpacing: '0.08em' }}>{h}</th>
                    ))}</tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>{r.map((c, ci) => (
                            <td key={ci} style={{ padding: '6px 8px', color: ci === 3 ? '#ddd' : '#999', borderBottom: '1px solid #ffffff06', textAlign: ci >= 2 ? 'right' : 'left', fontWeight: ci === 3 ? 600 : 400 }}>{c}</td>
                        ))}</tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '13px', color, fontWeight: 700 }}>TOTAL: $26.8M</div>
        </div>
    );
}

function ErpSim({ color }: { color: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
                { label: 'Órdenes', val: '47', pct: 78 },
                { label: 'Inventario', val: '2,341', pct: 62 },
                { label: 'Facturación', val: '$89M', pct: 91 },
            ].map((k, i) => (
                <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                        <span style={{ color: '#777' }}>{k.label}</span>
                        <span style={{ color: '#eee', fontWeight: 700 }}>{k.val}</span>
                    </div>
                    <div style={{ height: '4px', background: '#ffffff08', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${color}, ${color}88)`, width: `${k.pct}%`, animation: 'barGrow 1s ease-out' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function GeoSim({ color }: { color: string }) {
    return (
        <div style={{ position: 'relative', height: '155px', background: '#080e08', borderRadius: '6px', border: '1px solid #152015', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #ffffff04 20px, #ffffff04 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #ffffff04 20px, #ffffff04 21px)' }} />
            <svg width="100%" height="100%" viewBox="0 0 360 150" style={{ position: 'absolute', inset: 0 }}>
                <path d="M30,75 Q100,40 180,75 T330,60" fill="none" stroke="#ffffff10" strokeWidth="2.5" />
                <path d="M75,22 L175,65 L125,115 L270,30" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="3s" repeatCount="indefinite" />
                </path>
                {[{ x: 75, y: 22, id: 'C-01' }, { x: 175, y: 65, id: 'C-02' }, { x: 125, y: 115, id: 'C-03' }, { x: 270, y: 30, id: 'C-04' }].map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill={color} opacity="0.8">
                            <animate attributeName="r" values="5;7;5" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        </circle>
                        <circle cx={p.x} cy={p.y} r="12" fill="none" stroke={color} strokeWidth="0.7" opacity="0.2">
                            <animate attributeName="r" values="12;18;12" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                        </circle>
                        <text x={p.x + 10} y={p.y + 3} fill="#aaa" fontSize="9" fontFamily="monospace">{p.id}</text>
                    </g>
                ))}
            </svg>
            <div style={{ position: 'absolute', bottom: '5px', left: '8px', fontSize: '9px', color: '#555' }}>4 activas · sync: 2s</div>
        </div>
    );
}

const SIM_COMPONENTS = [ChatSim, FlowSim, VisionSim, ExcelSim, ErpSim, GeoSim];

export default function VisorOverlay() {
    const selectedIdx = useSelectedService();
    if (selectedIdx === null) return null;

    const svc = SERVICES[selectedIdx];
    const SimComponent = SIM_COMPONENTS[selectedIdx];

    return (
        <Html
            position={[0, 3.2, 1.5]}
            center
            distanceFactor={3.5}
            transform
            style={{ pointerEvents: 'auto' }}
        >
            <div
                style={{
                    width: '400px',
                    background: 'rgba(6,6,14,0.93)',
                    borderRadius: '14px',
                    border: `1px solid ${svc.color}28`,
                    boxShadow: `0 0 50px ${svc.color}12, 0 4px 40px rgba(0,0,0,0.7)`,
                    fontFamily: "'Geist Mono', monospace",
                    overflow: 'hidden',
                    animation: 'panelIn 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px 12px', borderBottom: `1px solid ${svc.color}15`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '8px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                            background: `${svc.color}12`, border: `1px solid ${svc.color}30`,
                        }}>
                            {svc.symbol}
                        </div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>{svc.name}</div>
                            <div style={{ color: svc.color, fontSize: '8px', letterSpacing: '0.15em', fontWeight: 600 }}>{svc.sub.toUpperCase()}</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedService(null)}
                        style={{
                            width: '26px', height: '26px', borderRadius: '50%', border: 'none',
                            background: 'rgba(255,255,255,0.06)', color: '#666', fontSize: '16px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        &times;
                    </button>
                </div>

                {/* Simulation */}
                <div style={{ padding: '14px 18px 16px' }}>
                    <SimComponent color={svc.color} />
                </div>

                {/* Feature tags */}
                <div style={{ padding: '0 18px 16px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {svc.features.map((f, i) => (
                        <div key={i} style={{
                            fontSize: '9px', color: '#888', padding: '3px 8px',
                            background: `${svc.color}08`, border: `1px solid ${svc.color}12`,
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
