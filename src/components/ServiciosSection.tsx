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

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10 flex flex-col items-center">
                {/* Section header — BIGGER */}
                <div className="text-center mb-12 md:mb-20 w-full">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A843)' }} className="w-10 md:w-16" />
                        <span style={{ color: '#D4A843', fontSize: '10px', letterSpacing: '0.4em', fontWeight: 700 }}>NUESTROS SERVICIOS</span>
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #D4A843, transparent)' }} className="w-10 md:w-16" />
                    </div>
                    <h2 style={{
                        color: '#1a1a2e',
                        fontSize: 'clamp(34px, 6vw, 64px)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        marginBottom: '20px',
                    }}>
                        Soluciones que{' '}
                        <span style={{
                            color: '#D4A843',
                            textDecoration: 'underline',
                            textDecorationColor: '#D4A84330',
                            textUnderlineOffset: '8px',
                            textDecorationThickness: '4px',
                        }}>transforman</span>
                    </h2>
                    <p style={{ color: '#6b6155', fontSize: 'clamp(14px, 1.8vw, 17px)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.8, fontWeight: 400 }}>
                        Automatización, inteligencia artificial y desarrollo a medida para empresas que quieren escalar con tecnología de punta.
                    </p>
                </div>

                {/* Service grid — more compact cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
                    {SERVICES.map((svc) => (
                        <div
                            key={svc.name}
                            className="group"
                            style={{
                                background: '#FFFDF8',
                                borderRadius: '16px',
                                border: '1px solid #e8e0d0',
                                padding: 'clamp(16px, 2.5vw, 24px) 20px',
                                transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.border = `1px solid ${svc.color}50`;
                                el.style.boxShadow = `0 12px 32px ${svc.color}10, 0 4px 12px rgba(0,0,0,0.05)`;
                                el.style.transform = 'translateY(-4px)';
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
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                {/* Icon */}
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `${svc.color}10`,
                                    border: `1.5px solid ${svc.color}25`,
                                    boxShadow: `0 4px 12px ${svc.color}08`,
                                }}>
                                    {renderIcon(svc.symbol, svc.color, 20)}
                                </div>
                                {/* Title */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        color: '#1a1a2e',
                                        fontSize: '15px',
                                        fontWeight: 800,
                                        letterSpacing: '-0.01em',
                                        marginBottom: '2px',
                                    }}>{svc.name}</div>
                                    <div style={{
                                        color: svc.color,
                                        fontSize: '8.5px',
                                        letterSpacing: '0.2em',
                                        fontWeight: 700,
                                    }}>{svc.sub}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <p style={{
                                color: '#5a5a6a',
                                fontSize: '12px',
                                lineHeight: 1.6,
                                marginBottom: '14px',
                                textAlign: 'center',
                            }}>{svc.desc}</p>

                            {/* Feature tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginTop: 'auto' }}>
                                {svc.features.map((f) => (
                                    <span key={f} style={{
                                        fontSize: '9px',
                                        color: '#5a5a6a',
                                        padding: '4px 10px',
                                        background: `${svc.color}06`,
                                        border: `1px solid ${svc.color}15`,
                                        borderRadius: '6px',
                                        letterSpacing: '0.03em',
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
