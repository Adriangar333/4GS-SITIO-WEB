'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useScrollReveal, getRevealStyle } from '@/hooks/useScrollReveal';

// Lazy-load the Three.js particles so it doesn't block initial paint
const ContactoParticles = dynamic(() => import('./ContactoParticles'), {
    ssr: false,
    loading: () => null,
});

export default function ContactoSection() {
    const [form, setForm] = useState({ nombre: '', empresa: '', email: '', mensaje: '' });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    // Scroll-reveal hooks for each block
    const headerReveal = useScrollReveal({ threshold: 0.2 });
    const card0Reveal = useScrollReveal({ threshold: 0.15 });
    const card1Reveal = useScrollReveal({ threshold: 0.15 });
    const card2Reveal = useScrollReveal({ threshold: 0.15 });
    const dividerReveal = useScrollReveal({ threshold: 0.3 });
    const demoHeaderReveal = useScrollReveal({ threshold: 0.2 });
    const formReveal = useScrollReveal({ threshold: 0.1 });

    const inputStyle = {
        width: '100%',
        padding: '14px 18px',
        background: '#FFFDF8',
        border: '1px solid #e8e0d0',
        borderRadius: '10px',
        color: '#1a1a2e',
        fontSize: '13px',
        fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace",
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    };

    const contactCards = [
        {
            icon: '📱',
            label: 'WhatsApp',
            value: '+57 314 584 9576',
            sub: 'Adrian Garzón',
            href: 'https://wa.me/573145849576',
        },
        {
            icon: '✉️',
            label: 'Email',
            value: 'contacto@fourgsolutions.com',
            sub: 'Respuesta en menos de 24h',
            href: 'mailto:contacto@fourgsolutions.com',
        },
        {
            icon: '📍',
            label: 'Ubicación',
            value: 'Barranquilla, Colombia',
            sub: 'Atendemos todo LATAM',
            href: null,
        },
    ];

    const cardReveals = [card0Reveal, card1Reveal, card2Reveal];

    return (
        <div style={{ background: '#F5F0E8', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
            {/* ── Three.js animated particle background ── */}
            <Suspense fallback={null}>
                <ContactoParticles />
            </Suspense>

            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
                {/* ── Section header — CONTACTO badge ── */}
                <div
                    ref={headerReveal.ref}
                    className="text-center mb-8"
                    style={getRevealStyle(headerReveal.isVisible, 0, 'up')}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
                        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A843)' }} />
                        <span style={{ color: '#D4A843', fontSize: '11px', letterSpacing: '0.35em', fontWeight: 700 }}>CONTACTO</span>
                        <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, #D4A843, transparent)' }} />
                    </div>
                    <h2 style={{ color: '#1a1a2e', fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
                        Hablemos de tu <span style={{ color: '#D4A843', textDecoration: 'underline', textDecorationColor: '#D4A84340', textUnderlineOffset: '6px', textDecorationThickness: '3px' }}>proyecto</span>
                    </h2>
                    <p style={{ color: '#6b6155', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
                        Contáctanos directamente o agenda una demo personalizada.
                    </p>
                </div>

                {/* ── Contact info cards with staggered entrance ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-40">
                    {contactCards.map((c, i) => (
                        <div
                            key={c.label}
                            ref={cardReveals[i].ref}
                            style={getRevealStyle(cardReveals[i].isVisible, 0.15 * (i + 1), 'up')}
                        >
                            <a
                                href={c.href || undefined}
                                target={c.href ? '_blank' : undefined}
                                rel={c.href ? 'noopener noreferrer' : undefined}
                                style={{
                                    textAlign: 'center',
                                    padding: '28px 20px',
                                    background: 'rgba(255,253,248,0.85)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    borderRadius: '16px',
                                    border: '1px solid #e8e0d0',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                    textDecoration: 'none',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    display: 'block',
                                    cursor: c.href ? 'pointer' : 'default',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = '#D4A84360';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px) scale(1.02)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(212,168,67,0.15)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = '#e8e0d0';
                                    (e.currentTarget as HTMLElement).style.transform = 'none';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                }}
                            >
                                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{c.icon}</div>
                                <div style={{ color: '#D4A843', fontSize: '8px', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '8px' }}>{c.label.toUpperCase()}</div>
                                <div style={{ color: '#1a1a2e', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{c.value}</div>
                                <div style={{ color: '#8a7d6b', fontSize: '11px' }}>{c.sub}</div>
                            </a>
                        </div>
                    ))}
                </div>

                {/* ── Decorative animated divider ── */}
                <div
                    ref={dividerReveal.ref}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '60px',
                        ...getRevealStyle(dividerReveal.isVisible, 0, 'scale'),
                    }}
                >
                    <div style={{
                        width: '60%',
                        maxWidth: '400px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #D4A84350, transparent)',
                        transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                </div>

                {/* ── Agenda tu demo sub-header ── */}
                <div
                    ref={demoHeaderReveal.ref}
                    className="text-center mb-10"
                    style={getRevealStyle(demoHeaderReveal.isVisible, 0, 'up')}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
                        <div style={{ width: '35px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A84350)' }} />
                        <span style={{ color: '#D4A843', fontSize: '10px', letterSpacing: '0.3em', fontWeight: 700 }}>DEMO</span>
                        <div style={{ width: '35px', height: '1px', background: 'linear-gradient(90deg, #D4A84350, transparent)' }} />
                    </div>
                    <h3 style={{ color: '#1a1a2e', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '10px' }}>
                        Agenda tu <span style={{ color: '#D4A843' }}>demo</span>
                    </h3>
                    <p style={{ color: '#6b6155', fontSize: '14px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
                        Cuéntanos sobre tu proyecto y te contactamos en menos de 24 horas.
                    </p>
                </div>

                {/* ── Form with reveal ── */}
                <div
                    ref={formReveal.ref}
                    style={{
                        background: 'rgba(255,253,248,0.88)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderRadius: '20px',
                        border: '1px solid #e8e0d0',
                        padding: 'clamp(24px, 4vw, 40px)',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
                        ...getRevealStyle(formReveal.isVisible, 0.2, 'up'),
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label style={{ color: '#6b6155', fontSize: '9px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>NOMBRE</label>
                            <input
                                type="text"
                                value={form.nombre}
                                onChange={e => handleChange('nombre', e.target.value)}
                                placeholder="Tu nombre"
                                style={inputStyle}
                                onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                        <div>
                            <label style={{ color: '#555', fontSize: '9px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMPRESA</label>
                            <input
                                type="text"
                                value={form.empresa}
                                onChange={e => handleChange('empresa', e.target.value)}
                                placeholder="Tu empresa"
                                style={inputStyle}
                                onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ color: '#555', fontSize: '9px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMAIL</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="correo@empresa.com"
                            style={inputStyle}
                            onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ color: '#555', fontSize: '9px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>MENSAJE</label>
                        <textarea
                            value={form.mensaje}
                            onChange={e => handleChange('mensaje', e.target.value)}
                            placeholder="Describe brevemente tu proyecto o necesidad..."
                            rows={4}
                            style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '100px' }}
                            onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <button
                        type="button"
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            fontWeight: 800,
                            color: '#000',
                            fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace",
                            background: 'linear-gradient(135deg, #D4A843 0%, #F0D78C 50%, #D4A843 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'goldShimmer 3s ease infinite',
                            boxShadow: '0 4px 20px rgba(212,168,67,0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={e => {
                            (e.target as HTMLElement).style.boxShadow = '0 8px 40px rgba(212,168,67,0.5)';
                            (e.target as HTMLElement).style.transform = 'translateY(-3px) scale(1.01)';
                        }}
                        onMouseLeave={e => {
                            (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,168,67,0.3)';
                            (e.target as HTMLElement).style.transform = 'none';
                        }}
                    >
                        SOLICITAR DEMO GRATUITA
                    </button>
                </div>
            </div>

            {/* Shimmer keyframe for the button */}
            <style jsx>{`
                @keyframes goldShimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}
