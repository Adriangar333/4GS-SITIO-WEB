'use client';

const SERVICES = [
    {
        name: 'WhatsApp Business API',
        sub: 'CHATBOTS & MESSAGING',
        color: '#25D366',
        symbol: 'svg:whatsapp',
        desc: 'Chatbots inteligentes sobre la API oficial de WhatsApp Business. Respuestas 24/7, flujos conversacionales y CRM.',
        features: ['Respuestas 24/7', 'Plantillas Meta', 'CRM Integration', 'Multi-agente'],
    },
    {
        name: 'n8n Automatización',
        sub: 'WORKFLOW ORCHESTRATION',
        color: '#FF6D00',
        symbol: '\u{26A1}',
        desc: 'Orquestación de procesos empresariales con flujos visuales no-code. +400 integraciones disponibles.',
        features: ['No-code flows', 'Webhooks', '+400 integraciones', 'Cron jobs'],
    },
    {
        name: 'AI Vision',
        sub: 'COMPUTER VISION & YOLO',
        color: '#E040FB',
        symbol: 'svg:vision',
        desc: 'Modelos YOLO para detección de objetos, inspección visual industrial, control de calidad y conteo en tiempo real.',
        features: ['YOLO custom', 'Real-time 30fps', 'Clasificación', 'Seguridad industrial'],
    },
    {
        name: 'Excel & Licitaciones',
        sub: 'APUS & PRESUPUESTOS',
        color: '#217346',
        symbol: '\u{1F4CA}',
        desc: 'Automatización de APUs, presupuestos de obra y generación de reportes en formatos oficiales.',
        features: ['APUs automáticos', 'Consolidación', 'Formatos oficiales', 'Macros VBA'],
    },
    {
        name: 'ERP & Bases de Datos',
        sub: 'ENTERPRISE INTEGRATION',
        color: '#1565C0',
        symbol: 'svg:erp',
        desc: 'Integración con sistemas empresariales. Dashboards en tiempo real y centralización de operaciones.',
        features: ['Real-time sync', 'Dashboards', 'SQL / NoSQL', 'REST APIs'],
    },
    {
        name: 'GEO & Campo',
        sub: 'GEOLOCALIZACIÓN',
        color: '#FF5722',
        symbol: '\u{1F4CD}',
        desc: 'Control de cuadrillas con geolocalización en vivo, rutas óptimas y reportes automáticos de avance.',
        features: ['GPS live', 'Rutas óptimas', 'Reportes geo', 'Tracking flota'],
    },
];

/** Render icon: emoji or inline SVG for known keys */
function renderIcon(symbol: string, color: string, size = 28) {
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
    if (symbol === 'svg:whatsapp') {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        );
    }
    return <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>{symbol}</span>;
}

export default function ServiciosSection() {
    return (
        <div style={{ background: '#F5F0E8', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Subtle top divider */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '800px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A84330, transparent)', zIndex: 1 }} />

            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
                {/* Section header — BIGGER */}
                <div className="text-center mb-12 md:mb-16">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
                        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A843)' }} />
                        <span style={{ color: '#D4A843', fontSize: '11px', letterSpacing: '0.35em', fontWeight: 700 }}>NUESTROS SERVICIOS</span>
                        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, #D4A843, transparent)' }} />
                    </div>
                    <h2 style={{
                        color: '#1a1a2e',
                        fontSize: 'clamp(32px, 5.5vw, 56px)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        marginBottom: '16px',
                    }}>
                        Soluciones que{' '}
                        <span style={{
                            color: '#D4A843',
                            textDecoration: 'underline',
                            textDecorationColor: '#D4A84340',
                            textUnderlineOffset: '6px',
                            textDecorationThickness: '3px',
                        }}>transforman</span>
                    </h2>
                    <p style={{ color: '#6b6155', fontSize: '15px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8, fontWeight: 400 }}>
                        Automatización, inteligencia artificial y desarrollo a medida para empresas que quieren escalar.
                    </p>
                </div>

                {/* Service grid — bigger cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SERVICES.map((svc) => (
                        <div
                            key={svc.name}
                            style={{
                                background: '#FFFDF8',
                                borderRadius: '18px',
                                border: '1px solid #e8e0d0',
                                padding: '32px 28px 28px',
                                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.border = `1px solid ${svc.color}50`;
                                el.style.boxShadow = `0 12px 40px ${svc.color}12, 0 4px 16px rgba(0,0,0,0.08)`;
                                el.style.transform = 'translateY(-6px)';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.border = '1px solid #e8e0d0';
                                el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)';
                                el.style.transform = 'none';
                            }}
                        >
                            {/* Top accent line */}
                            <div style={{
                                position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px',
                                background: `linear-gradient(90deg, transparent, ${svc.color}60, transparent)`,
                            }} />

                            {/* Icon + Title block */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                                {/* Icon */}
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `${svc.color}12`,
                                    border: `1.5px solid ${svc.color}30`,
                                    boxShadow: `0 4px 16px ${svc.color}10`,
                                }}>
                                    {renderIcon(svc.symbol, svc.color, 28)}
                                </div>
                                {/* Title */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        color: '#1a1a2e',
                                        fontSize: '18px',
                                        fontWeight: 800,
                                        letterSpacing: '-0.01em',
                                        marginBottom: '4px',
                                    }}>{svc.name}</div>
                                    <div style={{
                                        color: svc.color,
                                        fontSize: '10px',
                                        letterSpacing: '0.22em',
                                        fontWeight: 700,
                                    }}>{svc.sub}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <p style={{
                                color: '#5a5a6a',
                                fontSize: '13px',
                                lineHeight: 1.8,
                                marginBottom: '20px',
                                textAlign: 'center',
                            }}>{svc.desc}</p>

                            {/* Feature tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                                {svc.features.map((f) => (
                                    <span key={f} style={{
                                        fontSize: '10px',
                                        color: '#5a5a6a',
                                        padding: '5px 12px',
                                        background: `${svc.color}08`,
                                        border: `1px solid ${svc.color}18`,
                                        borderRadius: '8px',
                                        letterSpacing: '0.04em',
                                        fontWeight: 600,
                                    }}>
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
