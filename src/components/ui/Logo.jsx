import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Logo = ({ size = 40, showText = true }) => {
    // Unique ID for gradients to prevent conflicts if multiple logos exist
    const gradientId = `nebula-gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
                position: 'relative',
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Main Logo SVG */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="logo-spin-hover"
                >
                    <defs>
                        <linearGradient id={`${gradientId}-primary`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <linearGradient id={`${gradientId}-glow`} x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                        </linearGradient>
                        <filter id={`${gradientId}-blur`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                        </filter>
                    </defs>

                    {/* Background Glow (Soft Nebula effect) */}
                    <circle cx="20" cy="20" r="14" fill={`url(#${gradientId}-primary)`} fillOpacity="0.2" filter={`url(#${gradientId}-blur)`} />

                    {/* Orbital Rings / Abstract N */}
                    {/* Ring 1 */}
                    <path
                        d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36"
                        stroke={`url(#${gradientId}-primary)`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Ring 2 (Offset) */}
                    <path
                        d="M36 20C36 11.1634 28.8366 4 20 4"
                        stroke={`url(#${gradientId}-glow)`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        style={{ opacity: 0.8 }}
                    />

                    {/* Central Core / Star */}
                    <path
                        d="M20 20L24 16M20 20L16 24M20 20L24 24M20 20L16 16"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />

                    {/* Stylized 'N' node connection */}
                    <circle cx="20" cy="20" r="4" fill="white" />
                </svg>
            </div>

            {showText && (
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{
                        fontSize: Math.max(18, size * 0.55),
                        fontWeight: 700,
                        background: 'var(--text-primary)', // Clip background to text for gradient effect in future
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'var(--text-primary)',
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: '-0.03em'
                    }}>
                        NEBULA
                    </span>
                    <span style={{
                        fontSize: Math.max(10, size * 0.3),
                        fontWeight: 600,
                        color: 'var(--primary)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginLeft: '1px'
                    }}>
                        PRO
                    </span>
                </div>
            )}

            <style>{`
                .logo-spin-hover { transition: transform 0.5s ease-out; }
                .logo-spin-hover:hover { transform: rotate(180deg); }
            `}</style>
        </div>
    );
};

export default Logo;
