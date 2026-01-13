import React from 'react';

const Logo = ({ size = 40, showText = true, color = 'white' }) => {
    return (
        <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'default' }}
        >
            <div
                className="logo-container"
                style={{
                    width: size,
                    height: size,
                    background: 'var(--primary-gradient)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-glow)',
                    position: 'relative',
                    overflow: 'hidden',
                    // Transition handled by class
                }}
            >
                {/* Hex-Nebula Tech Logo */}
                <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Hexagon Frame */}
                    <path
                        d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 L50 5Z"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        fill="rgba(255,255,255,0.1)"
                    />

                    {/* Internal Constellation */}
                    <path d="M50 25 L50 50 L75 62" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M50 50 L25 62" stroke="white" strokeWidth="4" strokeLinecap="round" />

                    {/* Nodes */}
                    <circle cx="50" cy="50" r="8" fill="white" filter="url(#glow)" />
                    <circle cx="50" cy="25" r="4" fill="white" opacity="0.9" />
                    <circle cx="75" cy="62" r="4" fill="white" opacity="0.9" />
                    <circle cx="25" cy="62" r="4" fill="white" opacity="0.9" />

                </svg>

                {/* Shine overlay */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                    transform: 'rotate(45deg)',
                    pointerEvents: 'none'
                }} />
            </div>

            {showText && (
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{
                        fontSize: Math.max(16, size * 0.5),
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        fontFamily: "'Outfit', sans-serif"
                    }}>
                        NEBULA
                    </span>
                    <span style={{
                        fontSize: Math.max(10, size * 0.35),
                        fontWeight: 500,
                        color: 'var(--primary)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase'
                    }}>
                        Pro
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
