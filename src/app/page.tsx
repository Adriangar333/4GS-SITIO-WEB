'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import SplineBot from '@/components/SplineBot';
import ServiceCards from '@/components/ServiceCards';
import ServiciosSection from '@/components/ServiciosSection';
import NosotrosSection from '@/components/NosotrosSection';
import ContactoSection from '@/components/ContactoSection';

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    // Get actual nav height or fallback to 80
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 80;

    // Center the element in the available viewport (viewport - nav)
    const elementRect = el.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;

    // Calculate the best position to center the content
    // We want the element's center to align with the center of the viewport remaining after nav
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - navHeight;
    const elementHeight = elementRect.height;

    let targetTop = absoluteElementTop - navHeight;

    // If element is larger than available height, align to top with small buffer
    if (elementHeight > availableHeight) {
        targetTop += 20; // Small buffer to show the header clearly
    } else {
        targetTop -= (availableHeight - elementHeight) / 2;
    }

    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
    });
}

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="w-full overflow-x-hidden relative" style={{ background: '#F5F0E8', fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace" }}>
 
            {/* ── Fixed Nav ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 transition-all duration-300"
                style={{ 
                    background: isMobileMenuOpen ? '#F5F0E8' : 'linear-gradient(180deg, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.85) 75%, transparent 100%)', 
                    backdropFilter: isMobileMenuOpen ? 'none' : 'blur(12px)',
                    borderBottom: isMobileMenuOpen ? '1px solid #e8e0d0' : 'none'
                }}
            >
                <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                    {/* Logo (Left) */}
                    <div className="flex items-center gap-2 cursor-pointer w-32" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                        <span style={{ color: '#D4A843', fontSize: '18px', fontWeight: 900, letterSpacing: '0.15em' }}>4GS</span>
                    </div>

                    {/* Desktop Nav (Center) */}
                    <div className="hidden md:flex gap-8 items-center justify-center flex-1">
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

                    {/* Right spacer to keep center aligned on desktop */}
                    <div className="hidden md:block w-32"></div>

                    {/* Mobile Menu Toggle (Right) */}
                    <div className="md:hidden flex items-center justify-end w-32">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: '#1a1a2e', padding: '4px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                {isMobileMenuOpen ? (
                                    <>
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </>
                                ) : (
                                    <>
                                        <line x1="4" y1="6" x2="20" y2="6" />
                                        <line x1="4" y1="12" x2="20" y2="12" />
                                        <line x1="4" y1="18" x2="20" y2="18" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-[#F5F0E8] border-b border-[#e8e0d0] shadow-2xl flex flex-col items-center py-8 gap-8" style={{ zIndex: 49 }}>
                        {[
                            { label: 'SERVICIOS', id: 'servicios' },
                            { label: 'NOSOTROS', id: 'nosotros' },
                            { label: 'CONTACTO', id: 'contacto' },
                        ].map(item => (
                            <span
                                key={item.id}
                                onClick={() => { setIsMobileMenuOpen(false); scrollTo(item.id); }}
                                className="cursor-pointer"
                                style={{
                                    color: '#1a1a2e', fontSize: '13px', letterSpacing: '0.2em', fontWeight: 700,
                                }}
                            >
                                {item.label}
                            </span>
                        ))}
                        <div
                            onClick={() => { setIsMobileMenuOpen(false); scrollTo('contacto'); }}
                            className="cursor-pointer mt-2"
                            style={{
                                padding: '12px 32px', borderRadius: '8px', fontSize: '11px',
                                letterSpacing: '0.15em', fontWeight: 800, color: '#1a1a2e',
                                background: 'linear-gradient(135deg, #D4A843 0%, #c49a38 100%)',
                                boxShadow: '0 4px 16px rgba(212,168,67,0.3)',
                            }}
                        >
                            AGENDA TU DEMO
                        </div>
                    </div>
                )}
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
                <div className="absolute inset-0 z-1 pointer-events-auto flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full md:scale-[0.80] md:-translate-y-4 origin-center transition-transform duration-700">
                        <SplineBot />
                    </div>
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
            <section id="servicios" className="min-h-screen py-12 md:py-16 flex items-center justify-center">
                <ServiciosSection />
            </section>

            {/* ── NOSOTROS Section ── */}
            <section id="nosotros" className="min-h-screen py-12 md:py-16 flex items-center justify-center">
                <NosotrosSection />
            </section>

            {/* ── CONTACTO Section ── */}
            <section id="contacto" className="min-h-screen py-12 md:py-16 flex items-center justify-center">
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
                    <div className="flex items-center gap-6">
                        <Link href="/politica-de-privacidad"
                            style={{ color: '#8a8a9a', fontSize: '8px', letterSpacing: '0.15em', textDecoration: 'none', transition: 'color 0.3s' }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#D4A843')}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#8a8a9a')}
                        >
                            POLÍTICA DE PRIVACIDAD
                        </Link>
                        <span style={{ color: '#6a6a7a', fontSize: '8px', letterSpacing: '0.12em' }}>
                            &copy; 2026 FOUR G SOLUTIONS. TODOS LOS DERECHOS RESERVADOS.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
