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
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.nombre || !form.email || !form.mensaje) {
            alert('Por favor completa los campos obligatorios.');
            return;
        }

        setStatus('loading');

        try {
            // Usar el endpoint local /api/contact que actúa como proxy
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ nombre: '', empresa: '', email: '', mensaje: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
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
        fontSize: '14px',
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

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10 flex flex-col items-center">
                {/* ── Section header ── */}
                <div
                    ref={headerReveal.ref}
                    className="text-center mb-12 md:mb-20 w-full"
                    style={getRevealStyle(headerReveal.isVisible, 0, 'up')}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A843)' }} className="w-10 md:w-16" />
                        <span style={{ color: '#D4A843', fontSize: '11px', letterSpacing: '0.4em', fontWeight: 700 }}>CONTACTO</span>
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
                        Hablemos de tu <span style={{ color: '#D4A843', textDecoration: 'underline', textDecorationColor: '#D4A84340', textUnderlineOffset: '8px', textDecorationThickness: '4px' }}>proyecto</span>
                    </h2>
                    <p style={{ color: '#6b6155', fontSize: 'clamp(14px, 1.8vw, 17px)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.8 }}>
                        Contáctanos directamente o agenda una demo personalizada para llevar tu empresa al siguiente nivel.
                    </p>
                </div>

                {/* ── Contact info cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 mb-12 md:mb-16 w-full">
                    {contactCards.map((c, i) => (
                        <div
                            key={c.label}
                            ref={cardReveals[i].ref}
                            style={getRevealStyle(cardReveals[i].isVisible, 0.15 * (i + 1), 'up')}
                            className="w-full"
                        >
                            <a
                                href={c.href || undefined}
                                target={c.href ? '_blank' : undefined}
                                rel={c.href ? 'noopener noreferrer' : undefined}
                                style={{
                                    textAlign: 'center',
                                    padding: 'clamp(20px, 3vw, 32px) 20px',
                                    background: 'rgba(255,253,248,0.85)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderRadius: '20px',
                                    border: '1px solid #e8e0d0',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                    textDecoration: 'none',
                                    transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: c.href ? 'pointer' : 'default',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = '#D4A84360';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.01)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(212,168,67,0.1)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = '#e8e0d0';
                                    (e.currentTarget as HTMLElement).style.transform = 'none';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '14px', opacity: 0.9 }}>{c.icon}</div>
                                <div style={{ color: '#D4A843', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '8px' }}>{c.label.toUpperCase()}</div>
                                <div style={{ color: '#1a1a2e', fontSize: '16px', fontWeight: 800, marginBottom: '4px', letterSpacing: '-0.01em' }}>{c.value}</div>
                                <div style={{ color: '#8a7d6b', fontSize: '13px', fontWeight: 500 }}>{c.sub}</div>
                            </a>
                        </div>
                    ))}
                </div>

                {/* ── Decorative divider ── */}
                <div
                    ref={dividerReveal.ref}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '40px',
                        ...getRevealStyle(dividerReveal.isVisible, 0, 'scale'),
                    }}
                >
                    <div style={{
                        width: '50%',
                        maxWidth: '300px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #D4A84330, transparent)',
                    }} />
                </div>

                {/* ── Agenda tu demo sub-header ── */}
                <div
                    ref={demoHeaderReveal.ref}
                    className="text-center mb-10 w-full"
                    style={getRevealStyle(demoHeaderReveal.isVisible, 0, 'up')}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                        <div style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A84330)' }} className="w-6 md:w-10" />
                        <span style={{ color: '#D4A843', fontSize: '11px', letterSpacing: '0.3em', fontWeight: 700 }}>AGENDA UNA DEMO</span>
                        <div style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, #D4A84330, transparent)' }} className="w-6 md:w-10" />
                    </div>
                    <h3 style={{ color: '#1a1a2e', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '10px' }}>
                        ¿Listo para <span style={{ color: '#D4A843' }}>comenzar</span>?
                    </h3>
                    <p style={{ color: '#6b6155', fontSize: '14px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
                        Déjanos tus datos y un especialista te contactará próximamente.
                    </p>
                </div>

                {/* ── Form with reveal ── */}
                <div
                    ref={formReveal.ref}
                    className="w-full max-w-xl"
                    style={{
                        background: 'rgba(255,253,248,0.92)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        borderRadius: '20px',
                        border: '1px solid #e8e0d0',
                        padding: 'clamp(20px, 4vw, 36px)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                        ...getRevealStyle(formReveal.isVisible, 0.2, 'up'),
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label style={{ color: '#6b6155', fontSize: '11px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>NOMBRE</label>
                            <input
                                type="text"
                                value={form.nombre}
                                onChange={e => handleChange('nombre', e.target.value)}
                                placeholder="Tu nombre"
                                style={inputStyle}
                                disabled={status === 'loading'}
                                onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                        <div>
                            <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMPRESA</label>
                            <input
                                type="text"
                                value={form.empresa}
                                onChange={e => handleChange('empresa', e.target.value)}
                                placeholder="Tu empresa"
                                style={inputStyle}
                                disabled={status === 'loading'}
                                onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMAIL</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            placeholder="correo@empresa.com"
                            style={inputStyle}
                            disabled={status === 'loading'}
                            onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ color: '#555', fontSize: '11px', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>MENSAJE</label>
                        <textarea
                            value={form.mensaje}
                            onChange={e => handleChange('mensaje', e.target.value)}
                            placeholder="Describe brevemente tu proyecto o necesidad..."
                            rows={4}
                            style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '100px' }}
                            disabled={status === 'loading'}
                            onFocus={e => { e.target.style.borderColor = '#D4A84380'; e.target.style.boxShadow = '0 0 0 3px rgba(212,168,67,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = '#e8e0d0'; e.target.style.boxShadow = 'none'; }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '13px',
                            letterSpacing: '0.2em',
                            fontWeight: 800,
                            color: '#000',
                            fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace",
                            // Usar propiedades específicas para evitar conflictos con shorthand
                            backgroundColor: status === 'success' ? '#4CAF50' : status === 'error' ? '#F44336' : undefined,
                            backgroundImage: (status === 'idle' || status === 'loading') ? 'linear-gradient(135deg, #D4A843 0%, #F0D78C 50%, #D4A843 100%)' : 'none',
                            backgroundSize: '200% 200%',
                            animation: status === 'loading' ? 'pulse 1.5s infinite' : status === 'idle' ? 'goldShimmer 3s ease infinite' : 'none',
                            boxShadow: '0 4px 20px rgba(212,168,67,0.3)',
                            cursor: status === 'loading' ? 'wait' : 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            opacity: status === 'loading' ? 0.7 : 1,
                        }}
                        onMouseEnter={e => {
                            if (status !== 'idle') return;
                            (e.target as HTMLElement).style.boxShadow = '0 8px 40px rgba(212,168,67,0.5)';
                            (e.target as HTMLElement).style.transform = 'translateY(-3px) scale(1.01)';
                        }}
                        onMouseLeave={e => {
                            if (status !== 'idle') return;
                            (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,168,67,0.3)';
                            (e.target as HTMLElement).style.transform = 'none';
                        }}
                    >
                        {status === 'loading' ? 'ENVIANDO...' :
                            status === 'success' ? '¡ENVIADO!' :
                                status === 'error' ? 'ERROR AL ENVIAR' :
                                    'SOLICITAR DEMO GRATUITA'}
                    </button>

                    {status === 'success' && (
                        <p style={{ marginTop: '10px', textAlign: 'center', color: '#4CAF50', fontSize: '12px' }}>
                            ¡Gracias! Nos pondremos en contacto contigo pronto.
                        </p>
                    )}
                    {status === 'error' && (
                        <p style={{ marginTop: '10px', textAlign: 'center', color: '#F44336', fontSize: '12px' }}>
                            Hubo un problema. Por favor intenta de nuevo o contáctanos por WhatsApp.
                        </p>
                    )}
                </div>
            </div>

            {/* Shimmer keyframe for the button */}
            <style jsx>{`
                @keyframes goldShimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes pulse {
                    0% { opacity: 0.7; }
                    50% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
            `}</style>
        </div>
    );
}
