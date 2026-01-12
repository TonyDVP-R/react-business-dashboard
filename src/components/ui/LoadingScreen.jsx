import React from 'react';

const LoadingScreen = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999, // Ensure it's on top of everything
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}>
                {/* Spinner */}
                <div className="spinner-ring" style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid var(--border)',
                    borderTop: '4px solid var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />

                {/* Brand Text */}
                <p style={{
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                    NEBULA PRO
                </p>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
