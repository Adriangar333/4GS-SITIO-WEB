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

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10 flex flex-col items-center">
                {/* Section header */}
                <div className="text-center mb-12 md:mb-20 w-full">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A843)' }} className="w-10 md:w-16" />
                        <span style={{ color: '#D4A843', fontSize: '11px', letterSpacing: '0.4em', fontWeight: 700 }}>NOSOTROS</span>
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #D4A843, transparent)' }} className="w-10 md:w-16" />
                    </div>
                    <h2 style={{
                        color: '#1a1a2e',
                        fontSize: 'clamp(34px, 6vw, 64px)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        marginBottom: '20px'
                    }}>
                        Tecnología con <span style={{ color: '#D4A843', textDecoration: 'underline', textDecorationColor: '#D4A84340', textUnderlineOffset: '8px', textDecorationThickness: '4px' }}>propósito</span>
                    </h2>
                    <p style={{ color: '#6b6155', fontSize: 'clamp(14px, 1.8vw, 17px)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.8 }}>
                        Somos un equipo de ingenieros en Barranquilla, Colombia, especializados en transformación digital para empresas que buscan liderar su industria.
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16 w-full">
                    {STATS.map((s) => (
                        <div key={s.label} style={{
                            textAlign: 'center',
                            padding: 'clamp(16px, 2.5vw, 28px) 12px',
                            background: '#FFFDF8',
                            borderRadius: '16px',
                            border: '1px solid #e8e0d0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        }}>
                            <div style={{ color: '#D4A843', fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
                                {s.value}
                            </div>
                            <div style={{ color: '#6b6155', fontSize: '11px', letterSpacing: '0.12em', marginTop: '12px', fontWeight: 700 }}>
                                {s.label.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 w-full">
                    {PILLARS.map((p) => (
                        <div key={p.title} style={{
                            padding: 'clamp(24px, 4vw, 36px) 24px',
                            background: '#FFFDF8',
                            borderRadius: '20px',
                            border: '1px solid #e8e0d0',
                            transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = '#D4A84350';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(0,0,0,0.06)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = '#e8e0d0';
                                (e.currentTarget as HTMLElement).style.transform = 'none';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                            }}
                        >
                            <div style={{ fontSize: '36px', marginBottom: '18px', opacity: 0.9 }}>{p.icon}</div>
                            <div style={{ color: '#1a1a2e', fontSize: '18px', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.01em' }}>{p.title}</div>
                            <p style={{ color: '#5a5a6a', fontSize: '14px', lineHeight: 1.7 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
