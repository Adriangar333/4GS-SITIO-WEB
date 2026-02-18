'use client';

/**
 * Holographic projected FGS emblem — looks like it's being projected
 * onto the bot's surface, not a floating sticker.
 * Uses mix-blend-mode: screen for light-projection effect.
 */
export default function ChestBadge() {
    return (
        <div style={{
            perspective: '600px',
            perspectiveOrigin: '50% 30%',
        }}>
            <div style={{
                transform: 'rotateX(12deg)',
                transformStyle: 'preserve-3d',
                animation: 'badgeFloat 5s ease-in-out infinite, fadeInUp 1.5s 2s both',
                position: 'relative',
                width: '140px',
                height: '80px',
                mixBlendMode: 'screen',
            }}>
                {/* Projected glow halo behind */}
                <div style={{
                    position: 'absolute',
                    inset: '-20px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                    transform: 'translateZ(-6px)',
                }} />

                {/* Main projected hologram SVG */}
                <svg
                    width="140"
                    height="80"
                    viewBox="0 0 140 80"
                    style={{
                        position: 'relative',
                        transform: 'translateZ(0)',
                        filter: 'drop-shadow(0 0 20px rgba(212,168,67,0.25))',
                    }}
                >
                    <defs>
                        {/* Holographic gold gradient */}
                        <linearGradient id="holo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A07D2E" stopOpacity="0.6" />
                            <stop offset="30%" stopColor="#D4A843" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#FFF5D4" stopOpacity="1" />
                            <stop offset="70%" stopColor="#D4A843" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#A07D2E" stopOpacity="0.6" />
                        </linearGradient>

                        {/* Scanline mask */}
                        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="140" height="3">
                            <line x1="0" y1="0" x2="140" y2="0" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
                        </pattern>

                        {/* Animated sweep */}
                        <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#FFF5D4" stopOpacity="0.15" />
                            <stop offset="60%" stopColor="transparent" />
                            <stop offset="100%" stopColor="transparent" />
                            <animate attributeName="x1" from="-100%" to="100%" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="x2" from="0%" to="200%" dur="3s" repeatCount="indefinite" />
                        </linearGradient>

                        {/* Border glow */}
                        <filter id="border-glow">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Text glow */}
                        <filter id="text-glow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* ── Hexagonal/rounded frame — projected border ── */}
                    <rect x="10" y="6" width="120" height="68" rx="8"
                        fill="none"
                        stroke="url(#holo-gold)"
                        strokeWidth="1"
                        opacity="0.5"
                        filter="url(#border-glow)"
                    />

                    {/* Inner frame */}
                    <rect x="16" y="11" width="108" height="58" rx="5"
                        fill="none"
                        stroke="#D4A843"
                        strokeWidth="0.3"
                        opacity="0.25"
                    />

                    {/* ── Corner brackets — tech detail ── */}
                    {/* Top-left */}
                    <path d="M18,18 L18,14 L22,14" fill="none" stroke="#D4A843" strokeWidth="1" opacity="0.6" />
                    {/* Top-right */}
                    <path d="M122,18 L122,14 L118,14" fill="none" stroke="#D4A843" strokeWidth="1" opacity="0.6" />
                    {/* Bottom-left */}
                    <path d="M18,62 L18,66 L22,66" fill="none" stroke="#D4A843" strokeWidth="1" opacity="0.6" />
                    {/* Bottom-right */}
                    <path d="M122,62 L122,66 L118,66" fill="none" stroke="#D4A843" strokeWidth="1" opacity="0.6" />

                    {/* ── Horizontal rule lines ── */}
                    <line x1="30" y1="28" x2="110" y2="28"
                        stroke="#D4A843" strokeWidth="0.3" opacity="0.2"
                    />
                    <line x1="30" y1="56" x2="110" y2="56"
                        stroke="#D4A843" strokeWidth="0.3" opacity="0.2"
                    />

                    {/* ── "FOUR G" subtitle top ── */}
                    <text
                        x="70" y="22"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#D4A843"
                        fontSize="6"
                        fontWeight="600"
                        letterSpacing="5"
                        fontFamily="'Geist Mono', 'IBM Plex Mono', monospace"
                        opacity="0.5"
                    >
                        FOUR G
                    </text>

                    {/* ── FGS main text — holographic projection ── */}
                    {/* Glow layer */}
                    <text
                        x="70" y="43"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#D4A843"
                        fontSize="26"
                        fontWeight="900"
                        letterSpacing="8"
                        fontFamily="'Geist Mono', 'IBM Plex Mono', monospace"
                        filter="url(#text-glow)"
                        opacity="0.5"
                    >
                        FGS
                    </text>
                    {/* Main text */}
                    <text
                        x="70" y="43"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="url(#holo-gold)"
                        fontSize="26"
                        fontWeight="900"
                        letterSpacing="8"
                        fontFamily="'Geist Mono', 'IBM Plex Mono', monospace"
                    >
                        FGS
                    </text>

                    {/* ── "SOLUTIONS" subtitle bottom ── */}
                    <text
                        x="70" y="63"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#D4A843"
                        fontSize="5"
                        fontWeight="500"
                        letterSpacing="4"
                        fontFamily="'Geist Mono', 'IBM Plex Mono', monospace"
                        opacity="0.4"
                    >
                        SOLUTIONS
                    </text>

                    {/* ── Status indicators ── */}
                    <circle cx="24" cy="40" r="1.5" fill="#D4A843" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="116" cy="40" r="1.5" fill="#D4A843" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
                    </circle>

                    {/* ── Scanline overlay ── */}
                    <rect x="16" y="11" width="108" height="58" rx="5"
                        fill="url(#scanlines)"
                    />

                    {/* ── Animated sweep/glint ── */}
                    <rect x="16" y="11" width="108" height="58" rx="5"
                        fill="url(#sweep)"
                    />
                </svg>

                {/* Projected light cone — subtle bottom glow */}
                <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '20%',
                    right: '20%',
                    height: '8px',
                    background: 'radial-gradient(ellipse at center, rgba(212,168,67,0.15) 0%, transparent 80%)',
                    filter: 'blur(4px)',
                    transform: 'translateZ(-2px)',
                }} />
            </div>
        </div>
    );
}
