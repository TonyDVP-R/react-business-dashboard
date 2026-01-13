import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-app)',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <div className="spinner"></div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Loading Nebula Pro...</p>
            <style>{`
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--bg-element);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
