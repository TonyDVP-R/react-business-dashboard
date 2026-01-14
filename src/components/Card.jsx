import React from 'react';

const Card = ({ title, children, actions }) => {
    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {title && (
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: 'var(--text-main)'
                }}>
                    {title}
                </h3>
            )}

            <div style={{ flex: 1 }}>
                {children}
            </div>

            {actions && (
                <div style={{ marginTop: '24px' }}>
                    {actions}
                </div>
            )}
        </div>
    );
};

export default Card;
