'use client';

import { useState } from 'react';

interface Service {
    name: string;
    sub: string;
    color: string;
    symbol: string;
    desc: string;
    features: string[];
}

const SERVICES: Service[] = [
    { name: 'WhatsApp', sub: 'Meta API', color: '#25D366', symbol: '\u{1F4AC}', desc: 'Chatbots inteligentes y flujos automatizados sobre la API oficial de WhatsApp Business.', features: ['Respuestas 24/7', 'Plantillas Meta', 'CRM Integration'] },
    { name: 'n8n', sub: 'Automatización', color: '#FF6D00', symbol: '\u{26A1}', desc: 'Orquestación de procesos con flujos visuales y +400 integraciones.', features: ['No-code flows', 'Webhooks', 'Any API'] },
    { name: 'AI Vision', sub: 'Computer Vision', color: '#E040FB', symbol: 'svg:vision', desc: 'Detección y reconocimiento YOLO para inspección visual industrial.', features: ['YOLO custom', 'Real-time', 'Clasificación'] },
    { name: 'Excel', sub: 'Licitaciones', color: '#217346', symbol: '\u{1F4CA}', desc: 'Automatización de APUs, presupuestos y reportes de licitación.', features: ['APUs auto', 'Consolidación', 'Formatos oficiales'] },
    { name: 'ERP', sub: 'Base de Datos', color: '#1565C0', symbol: 'svg:erp', desc: 'Integración con sistemas empresariales para centralizar operación.', features: ['Real-time sync', 'Dashboards', 'SQL / NoSQL'] },
    { name: 'GEO', sub: 'Campo', color: '#FF5722', symbol: '\u{1F4CD}', desc: 'Control de cuadrillas con geolocalización y reportes automáticos.', features: ['GPS live', 'Rutas óptimas', 'Reportes geo'] },
];

const LEFT = SERVICES.slice(0, 3);
const RIGHT = SERVICES.slice(3);

/** Render icon: emoji string or inline SVG for known keys */
function renderIcon(symbol: string, color: string, size = 18) {
    if (symbol === 'svg:vision') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
            </svg>
        );
    }
    if (symbol === 'svg:erp') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        );
    }
    return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>{symbol}</span>;
}

// ── Simulations (bigger) ──
function ChatSim({ c }: { c: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
                { f: 'c', t: 'Necesito cotización de 500 unidades' },
                { f: 'b', t: 'Procesando... consultando 3 proveedores.' },
                { f: 'b', t: 'Comparativo listo. Enviado a su correo.' },
            ].map((m, i) => (
                <div key={i} style={{
                    alignSelf: m.f === 'b' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: m.f === 'b' ? `${c}12` : '#ffffff06',
                    border: `1px solid ${m.f === 'b' ? c + '25' : '#ffffff0a'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                }}>
                    <div style={{ fontSize: '8px', color: m.f === 'b' ? c : '#555', fontWeight: 700, marginBottom: '3px', letterSpacing: '0.06em' }}>
                        {m.f === 'b' ? 'BOT' : 'CLIENTE'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#b0b0b0', lineHeight: 1.5 }}>{m.t}</div>
                </div>
            ))}
        </div>
    );
}

function FlowSim({ c }: { c: string }) {
    return (
        <svg width="100%" height="70" viewBox="0 0 280 60">
            <path d="M56,27 C75,27 75,17 94,17" fill="none" stroke={c} strokeWidth="1" opacity="0.35" />
            <path d="M56,27 C75,27 75,43 94,43" fill="none" stroke={c} strokeWidth="1" opacity="0.35" />
            <path d="M174,17 C195,17 195,30 210,30" fill="none" stroke={c} strokeWidth="1" opacity="0.35" />
            <path d="M174,43 C195,43 195,30 210,30" fill="none" stroke={c} strokeWidth="1" opacity="0.35" />
            <circle r="3" fill={c}>
                <animateMotion dur="2s" repeatCount="indefinite" path="M56,27 C75,27 75,17 94,17 L174,17 C195,17 195,30 210,30 L265,30" />
            </circle>
            {[
                { x: 4, y: 14, w: 50, l: 'Trigger' },
                { x: 94, y: 5, w: 78, l: 'HTTP Request' },
                { x: 94, y: 31, w: 78, l: 'Filter' },
                { x: 210, y: 18, w: 60, l: 'DB Write' },
            ].map((n, i) => (
                <g key={i}>
                    <rect x={n.x} y={n.y} width={n.w} height={22} rx="4" fill="#0a0a14" stroke={c} strokeWidth="0.6" opacity="0.7" />
                    <text x={n.x + n.w / 2} y={n.y + 14} textAnchor="middle" fill="#aaa" fontSize="8" fontFamily="monospace">{n.l}</text>
                </g>
            ))}
        </svg>
    );
}

function VisionSim({ c }: { c: string }) {
    return (
        <div style={{ position: 'relative', height: '120px', background: '#080810', borderRadius: '8px', border: '1px solid #2a2a3a', overflow: 'hidden' }}>
            {/* Grid background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 11px,#ffffff06 11px,#ffffff06 12px),repeating-linear-gradient(90deg,transparent,transparent 11px,#ffffff06 11px,#ffffff06 12px)' }} />
            {/* Animated scan line */}
            <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${c}80, transparent)`, animation: 'scanline 3s linear infinite', top: 0 }} />
            {/* Detection box 1: persona */}
            <div style={{ position: 'absolute', left: '5%', top: '14%', width: '34%', height: '52%', border: `2.5px solid ${c}`, borderRadius: '4px', animation: 'pulseBox 2s infinite', boxShadow: `0 0 8px ${c}30` }}>
                <div style={{ position: 'absolute', top: '2px', left: '4px', fontSize: '8px', color: '#fff', background: c, padding: '1px 6px', borderRadius: '2px', fontWeight: 700, letterSpacing: '0.04em' }}>persona 94%</div>
            </div>
            {/* Detection box 2: casco */}
            <div style={{ position: 'absolute', left: '46%', top: '18%', width: '25%', height: '44%', border: '2.5px solid #00ff88', borderRadius: '4px', animation: 'pulseBox 2s .5s infinite', boxShadow: '0 0 8px #00ff8830' }}>
                <div style={{ position: 'absolute', top: '2px', left: '4px', fontSize: '8px', color: '#000', background: '#00ff88', padding: '1px 6px', borderRadius: '2px', fontWeight: 700 }}>casco 87%</div>
            </div>
            {/* Detection box 3: vest */}
            <div style={{ position: 'absolute', right: '5%', top: '30%', width: '18%', height: '34%', border: '2px solid #ffaa00', borderRadius: '4px', animation: 'pulseBox 2s 1s infinite', boxShadow: '0 0 6px #ffaa0020' }}>
                <div style={{ position: 'absolute', top: '2px', left: '3px', fontSize: '7px', color: '#000', background: '#ffaa00', padding: '1px 5px', borderRadius: '2px', fontWeight: 700 }}>vest 72%</div>
            </div>
            {/* Status bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '4px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '8px', background: 'rgba(0,0,0,0.6)', borderTop: '1px solid #ffffff10' }}>
                <span style={{ color: '#888', fontFamily: 'monospace' }}>YOLOv8 — Custom</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ color: c }}>3 det</span>
                    <span style={{ color: '#4caf50', fontWeight: 700 }}>● 30fps</span>
                </div>
            </div>
        </div>
    );
}

function ExcelSim({ c }: { c: string }) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
            <thead>
                <tr>
                    {['ÍTEM', 'UND', 'TOTAL'].map(h => (
                        <th key={h} style={{ padding: '5px 8px', textAlign: 'left', color: c, fontWeight: 700, borderBottom: `1px solid ${c}20`, fontSize: '8px', letterSpacing: '0.08em' }}>{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[
                    ['Concreto 3000 psi', 'm³', '$12.8M'],
                    ['Acero figurado', 'kg', '$5.7M'],
                    ['Formaleta metálica', 'ml', '$1.6M'],
                    ['Mano de obra', 'gl', '$3.2M'],
                ].map((r, i) => (
                    <tr key={i}>
                        <td style={{ padding: '5px 8px', color: '#888', borderBottom: '1px solid #ffffff06' }}>{r[0]}</td>
                        <td style={{ padding: '5px 8px', color: '#555', borderBottom: '1px solid #ffffff06', fontSize: '9px' }}>{r[1]}</td>
                        <td style={{ padding: '5px 8px', color: '#ccc', borderBottom: '1px solid #ffffff06', textAlign: 'right', fontWeight: 700 }}>{r[2]}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2} style={{ padding: '6px 8px', color: '#666', fontSize: '9px', fontWeight: 600 }}>TOTAL APU</td>
                    <td style={{ padding: '6px 8px', color: c, textAlign: 'right', fontWeight: 800, fontSize: '13px' }}>$23.3M</td>
                </tr>
            </tfoot>
        </table>
    );
}

function ErpSim({ c }: { c: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
                { l: 'Órdenes activas', v: '47', p: 78 },
                { l: 'Facturación mes', v: '$89M', p: 91 },
                { l: 'Inventario', v: '1,240', p: 65 },
            ].map((k, i) => (
                <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                        <span style={{ color: '#666' }}>{k.l}</span>
                        <span style={{ color: '#ddd', fontWeight: 800 }}>{k.v}</span>
                    </div>
                    <div style={{ height: '4px', background: '#ffffff08', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg,${c},${c}88)`, width: `${k.p}%`, animation: 'barGrow 1s ease-out' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function GeoSim({ c }: { c: string }) {
    return (
        <div style={{ position: 'relative', height: '90px', background: '#060a06', borderRadius: '6px', border: '1px solid #151a15', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 240 90" style={{ position: 'absolute', inset: 0 }}>
                <path d="M20,45 Q70,15 120,45 T220,35" fill="none" stroke="#ffffff0a" strokeWidth="2" />
                <path d="M40,15 L110,45 L75,75 L185,20" fill="none" stroke={c} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.45">
                    <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="3s" repeatCount="indefinite" />
                </path>
                {[{ x: 40, y: 15 }, { x: 110, y: 45 }, { x: 75, y: 75 }, { x: 185, y: 20 }].map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="3.5" fill={c} opacity="0.8">
                            <animate attributeName="r" values="3.5;5.5;3.5" dur="2s" begin={`${i * .4}s`} repeatCount="indefinite" />
                        </circle>
                        <circle cx={p.x} cy={p.y} r="7" fill="none" stroke={c} strokeWidth="0.5" opacity="0.2">
                            <animate attributeName="r" values="7;12;7" dur="2s" begin={`${i * .4}s`} repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" begin={`${i * .4}s`} repeatCount="indefinite" />
                        </circle>
                    </g>
                ))}
                <text x="200" y="82" fill="#333" fontSize="7" fontFamily="monospace">GPS LIVE</text>
            </svg>
        </div>
    );
}

const SIMS = [ChatSim, FlowSim, VisionSim, ExcelSim, ErpSim, GeoSim];

// ── Desktop Card ──
function Card({ svc, index, selected, onSelect }: {
    svc: Service; index: number; selected: boolean; onSelect: () => void;
}) {
    const Sim = SIMS[index];
    const isExpanded = selected;

    return (
        <div
            onClick={onSelect}
            style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                width: isExpanded ? '340px' : '60px',
                background: isExpanded ? 'rgba(8,8,16,0.95)' : '#F5F0E8',
                borderRadius: '14px',
                backdropFilter: isExpanded ? 'blur(24px)' : 'none',
                border: `1px solid ${isExpanded ? svc.color + '30' : '#e8e0d0'}`,
                boxShadow: isExpanded
                    ? `0 8px 40px ${svc.color}10, 0 0 0 1px ${svc.color}08, inset 0 1px 0 #ffffff08`
                    : '0 2px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Accent line top */}
            <div style={{
                position: 'absolute', top: 0, left: isExpanded ? '0' : '50%',
                width: isExpanded ? '100%' : '0',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${svc.color}60, transparent)`,
                transform: isExpanded ? 'none' : 'translateX(-50%)',
                transition: 'all 0.4s ease',
            }} />

            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: isExpanded ? '14px 18px' : '12px 0',
                justifyContent: 'center',
            }}>
                {/* Icon */}
                <div style={{
                    width: '34px', height: '34px', borderRadius: '9px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: `${svc.color}0c`,
                    border: `1px solid ${isExpanded ? svc.color + '35' : svc.color + '18'}`,
                    boxShadow: isExpanded ? `0 0 12px ${svc.color}15` : 'none',
                    transition: 'all 0.3s',
                }}>
                    {renderIcon(svc.symbol, svc.color, 18)}
                </div>
                {/* Title */}
                {isExpanded && (
                    <div style={{ minWidth: 0 }}>
                        <div style={{ color: '#f0f0f0', fontWeight: 700, fontSize: '14px', letterSpacing: '0.02em', textAlign: 'center' }}>{svc.name}</div>
                        <div style={{ color: svc.color, fontSize: '8px', letterSpacing: '0.18em', fontWeight: 600, marginTop: '2px', textAlign: 'center' }}>{svc.sub.toUpperCase()}</div>
                    </div>
                )}
                {/* Status dot */}
                {isExpanded && (
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: svc.color, boxShadow: `0 0 8px ${svc.color}`, animation: 'pulse-dot 2s infinite' }} />
                        <span style={{ fontSize: '7px', color: '#555', letterSpacing: '0.12em', fontWeight: 600 }}>LIVE</span>
                    </div>
                )}
            </div>

            {/* Collapsed label */}
            {!isExpanded && (
                <div style={{
                    textAlign: 'center', paddingBottom: '10px', paddingTop: '0',
                    fontSize: '7px', color: '#6b6155', letterSpacing: '0.1em', fontWeight: 700,
                    transition: 'opacity 0.3s',
                }}>
                    {svc.name.slice(0, 5).toUpperCase()}
                </div>
            )}

            {/* Expanded content */}
            {isExpanded && (
                <>
                    <div style={{ margin: '0 18px', height: '1px', background: `linear-gradient(90deg, transparent, ${svc.color}18, transparent)` }} />
                    <div style={{ padding: '14px 18px 16px', animation: 'fadeInUp 0.3s ease-out', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Simulation */}
                        <div style={{ marginBottom: '12px', width: '100%', alignSelf: 'stretch' }}>
                            <Sim c={svc.color} />
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.7, marginBottom: '12px', textAlign: 'center' }}>{svc.desc}</p>

                        {/* Feature tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                            {svc.features.map((f, i) => (
                                <span key={i} style={{
                                    fontSize: '9px', color: '#666', padding: '4px 10px',
                                    background: '#ffffff05', border: '1px solid #ffffff0a',
                                    borderRadius: '5px', letterSpacing: '0.04em',
                                }}>
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// ── Mobile Card (bottom bar icon) ──
function MobileCard({ svc, selected, onSelect }: {
    svc: Service; selected: boolean; onSelect: () => void;
}) {
    return (
        <div
            onClick={onSelect}
            className="flex-shrink-0"
            style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                width: '64px',
                height: '64px',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: selected ? `${svc.color}18` : '#F5F0E8',
                backdropFilter: selected ? 'blur(20px)' : 'none',
                border: `1px solid ${selected ? svc.color + '45' : '#e8e0d0'}`,
                boxShadow: selected ? `0 0 20px ${svc.color}18` : '0 2px 8px rgba(0,0,0,0.12)',
                transition: 'all 0.3s',
            }}
        >
            {renderIcon(svc.symbol, svc.color, 24)}
            <span style={{ fontSize: '9px', color: selected ? svc.color : '#6b6155', letterSpacing: '0.04em', fontWeight: 700 }}>
                {svc.name.slice(0, 7).toUpperCase()}
            </span>
        </div>
    );
}

// ── Mobile Expanded Card ──
function MobileExpandedCard({ svc, index, onClose }: {
    svc: Service; index: number; onClose: () => void;
}) {
    const Sim = SIMS[index];

    return (
        <div
            onClick={onClose}
            style={{
                width: '100%',
                background: 'rgba(8,8,16,0.94)',
                borderRadius: '16px',
                backdropFilter: 'blur(28px)',
                border: `1px solid ${svc.color}30`,
                boxShadow: `0 12px 48px ${svc.color}10, inset 0 1px 0 #ffffff08`,
                overflow: 'hidden',
                animation: 'fadeInUp 0.3s ease-out',
                position: 'relative',
            }}
        >
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${svc.color}60, transparent)`,
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{
                    width: '42px', height: '42px', borderRadius: '12px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: `${svc.color}0c`, border: `1px solid ${svc.color}35`,
                }}>
                    {renderIcon(svc.symbol, svc.color, 24)}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ color: '#f0f0f0', fontWeight: 700, fontSize: '18px', textAlign: 'center' }}>{svc.name}</div>
                    <div style={{ color: svc.color, fontSize: '10px', letterSpacing: '0.15em', fontWeight: 600, marginTop: '4px', textAlign: 'center' }}>{svc.sub.toUpperCase()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: svc.color, boxShadow: `0 0 8px ${svc.color}`, animation: 'pulse-dot 2s infinite' }} />
                    <span style={{ fontSize: '9px', color: '#555', letterSpacing: '0.12em' }}>LIVE</span>
                </div>
            </div>

            <div style={{ margin: '0 18px', height: '1px', background: `linear-gradient(90deg, transparent, ${svc.color}18, transparent)` }} />

            <div style={{ padding: '16px 20px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '16px' }}>
                    <Sim c={svc.color} />
                </div>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '16px' }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {svc.features.map((f, i) => (
                        <span key={i} style={{
                            fontSize: '11px', color: '#777', padding: '6px 12px',
                            background: '#ffffff05', border: '1px solid #ffffff0a',
                            borderRadius: '6px', letterSpacing: '0.04em',
                        }}>
                            {f}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ServiceCards() {
    const [selected, setSelected] = useState<number | null>(null);
    const handleSelect = (idx: number) => setSelected(prev => prev === idx ? null : idx);

    return (
        <>
            {/* Desktop: side columns */}
            <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3" style={{ zIndex: 5 }}>
                {LEFT.map((svc, i) => (
                    <Card key={svc.name} svc={svc} index={i} selected={selected === i} onSelect={() => handleSelect(i)} />
                ))}
            </div>
            <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3" style={{ zIndex: 5 }}>
                {RIGHT.map((svc, i) => (
                    <Card key={svc.name} svc={svc} index={i + 3} selected={selected === i + 3} onSelect={() => handleSelect(i + 3)} />
                ))}
            </div>

            {/* Mobile: horizontal bottom row with smooth scrolling */}
            <div 
                className="flex md:hidden absolute bottom-20 left-0 right-0 gap-3 px-6 overflow-x-auto pb-4" 
                style={{ zIndex: 5, scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
                {SERVICES.map((svc, i) => (
                    <div key={svc.name} style={{ scrollSnapAlign: 'center' }}>
                        <MobileCard svc={svc} selected={selected === i} onSelect={() => handleSelect(i)} />
                    </div>
                ))}
            </div>

            {/* Mobile expanded overlay */}
            {selected !== null && (
                <div className="flex md:hidden absolute bottom-36 left-3 right-3 pointer-events-auto" style={{ zIndex: 6 }}>
                    <MobileExpandedCard svc={SERVICES[selected]} index={selected} onClose={() => setSelected(null)} />
                </div>
            )}
        </>
    );
}
