'use client';

const STATS = [
    { value: '+50', label: 'Proyectos entregados' },
    { value: '+15', label: 'Clientes activos' },
    { value: '99.9%', label: 'Uptime garantizado' },
    { value: '24/7', label: 'Soporte técnico' },
];

const PILLARS = [
    {
        icon: '\u{1F9E0}',
        title: 'Ingeniería de Software',
        desc: 'Desarrollamos soluciones a medida con arquitecturas modernas, escalables y mantenibles.',
    },
    {
        icon: '\u{2699}\u{FE0F}',
        title: 'Automatización',
        desc: 'Eliminamos procesos manuales repetitivos con flujos inteligentes que conectan todos tus sistemas.',
    },
    {
        icon: '\u{1F916}',
        title: 'Inteligencia Artificial',
        desc: 'Implementamos modelos de ML y visión por computadora adaptados a las necesidades específicas de cada cliente.',
    },
];

export default function NosotrosSection() {
    return (
        <div style={{ background: '#F5F0E8', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Subtle background pattern */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.05,
                backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A843 1px, transparent 0)',
                backgroundSize: '40px 40px',
            }} />

            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12 md:mb-16">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
                        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A843)' }} />
                        <span style={{ color: '#D4A843', fontSize: '11px', letterSpacing: '0.35em', fontWeight: 700 }}>NOSOTROS</span>
                        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, #D4A843, transparent)' }} />
                    </div>
                    <h2 style={{ color: '#1a1a2e', fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
                        Tecnología con <span style={{ color: '#D4A843', textDecoration: 'underline', textDecorationColor: '#D4A84340', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>propósito</span>
                    </h2>
                    <p style={{ color: '#6b6155', fontSize: '15px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
                        Somos un equipo de ingenieros en Barranquilla, Colombia, especializados en transformación digital para empresas de construcción, logística e industria.
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-20">
                    {STATS.map((s) => (
                        <div key={s.label} style={{
                            textAlign: 'center',
                            padding: '24px 16px',
                            background: '#FFFDF8',
                            borderRadius: '14px',
                            border: '1px solid #e8e0d0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}>
                            <div style={{ color: '#D4A843', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>
                                {s.value}
                            </div>
                            <div style={{ color: '#6b6155', fontSize: '10px', letterSpacing: '0.1em', marginTop: '8px', fontWeight: 600 }}>
                                {s.label.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PILLARS.map((p) => (
                        <div key={p.title} style={{
                            padding: '32px 28px',
                            background: '#FFFDF8',
                            borderRadius: '16px',
                            border: '1px solid #e8e0d0',
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            textAlign: 'center',
                        }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = '#D4A84360';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = '#e8e0d0';
                                (e.currentTarget as HTMLElement).style.transform = 'none';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                            }}
                        >
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
                            <div style={{ color: '#1a1a2e', fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{p.title}</div>
                            <p style={{ color: '#4a4a5a', fontSize: '12px', lineHeight: 1.8 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
