'use client';

import SplineBot from '@/components/SplineBot';
import ServiceCards from '@/components/ServiceCards';
import ServiciosSection from '@/components/ServiciosSection';
import NosotrosSection from '@/components/NosotrosSection';
import ContactoSection from '@/components/ContactoSection';

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 56; // fixed nav approximate height
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
}

export default function Home() {
    return (
        <div className="w-full overflow-x-hidden relative" style={{ background: '#F5F0E8', fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace" }}>

            {/* ── Fixed Nav ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-6 md:px-10 py-4"
                style={{ background: 'linear-gradient(180deg, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.85) 70%, transparent 100%)', backdropFilter: 'blur(12px)' }}
            >
                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { label: 'SERVICIOS', id: 'servicios' },
                        { label: 'NOSOTROS', id: 'nosotros' },
                        { label: 'CONTACTO', id: 'contacto' },
                    ].map(item => (
                        <span
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="cursor-pointer"
                            style={{
                                color: '#6b6155', fontSize: '9px', letterSpacing: '0.18em', fontWeight: 600,
                                transition: 'color 0.3s, text-shadow 0.3s',
                            }}
                            onMouseEnter={e => {
                                (e.target as HTMLElement).style.color = '#D4A843';
                                (e.target as HTMLElement).style.textShadow = '0 0 12px rgba(212,168,67,0.3)';
                            }}
                            onMouseLeave={e => {
                                (e.target as HTMLElement).style.color = '#6b6155';
                                (e.target as HTMLElement).style.textShadow = 'none';
                            }}
                        >
                            {item.label}
                        </span>
                    ))}
                    <div
                        onClick={() => scrollTo('contacto')}
                        className="cursor-pointer"
                        style={{
                            padding: '6px 16px', borderRadius: '6px', fontSize: '8px',
                            letterSpacing: '0.14em', fontWeight: 700, color: '#1a1a2e',
                            background: 'linear-gradient(135deg, #D4A843 0%, #c49a38 100%)',
                            boxShadow: '0 2px 12px rgba(212,168,67,0.25)',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => {
                            (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(212,168,67,0.4)';
                            (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={e => {
                            (e.target as HTMLElement).style.boxShadow = '0 2px 12px rgba(212,168,67,0.25)';
                            (e.target as HTMLElement).style.transform = 'none';
                        }}
                    >
                        DEMO
                    </div>
                </div>
            </nav>

            {/* ── HERO Section (100vh) ── */}
            <section id="hero" className="relative w-full h-screen overflow-hidden">
                {/* Layer 0: Bone bg + giant 4GS text behind the bot */}
                <div className="absolute inset-0 z-0 flex items-center justify-center select-none" style={{ background: '#F5F0E8' }}>
                    <span style={{
                        fontSize: 'clamp(280px, 40vw, 600px)',
                        fontWeight: 900,
                        letterSpacing: '0.15em',
                        color: '#D4A843',
                        opacity: 0.15,
                        userSelect: 'none',
                        lineHeight: 1,
                        fontFamily: "'Syne', 'Inter', sans-serif",
                        textShadow: '0 0 80px rgba(212,168,67,0.2)',
                    }}>
                        4GS
                    </span>
                </div>

                {/* Layer 1: Spline Bot with transparent background */}
                <div className="absolute inset-0 z-1 pointer-events-auto">
                    <SplineBot />
                </div>

                {/* Layer 2: Bottom gradient to cover Spline watermark */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
                    height: '120px',
                    background: 'linear-gradient(to top, #F5F0E8 0%, #F5F0E8 40%, transparent 100%)',
                    zIndex: 2,
                }} />

                {/* Service Cards overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="pt-16">
                        <ServiceCards />
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40 animate-bounce">
                    <span style={{ color: '#8a7d6b', fontSize: '7px', letterSpacing: '0.2em' }}>SCROLL</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            </section>

            {/* ── SERVICIOS Section ── */}
            <section id="servicios" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <ServiciosSection />
            </section>

            {/* ── NOSOTROS Section ── */}
            <section id="nosotros" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <NosotrosSection />
            </section>

            {/* ── CONTACTO Section ── */}
            <section id="contacto" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <ContactoSection />
            </section>

            {/* ── Footer ── */}
            <footer style={{ background: '#1a1a2e', borderTop: '1px solid #2a2a3e', padding: '32px 0' }}>
                <div className="max-w-5xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span style={{ color: '#D4A843', fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em' }}>4GS</span>
                        <div style={{ width: '1px', height: '16px', background: '#ffffff20' }} />
                        <span style={{ color: '#8a8a9a', fontSize: '8px', letterSpacing: '0.15em' }}>BARRANQUILLA, COLOMBIA</span>
                    </div>
                    <span style={{ color: '#6a6a7a', fontSize: '8px', letterSpacing: '0.12em' }}>
                        &copy; 2026 FOUR G SOLUTIONS. TODOS LOS DERECHOS RESERVADOS.
                    </span>
                </div>
            </footer>
        </div>
    );
}
