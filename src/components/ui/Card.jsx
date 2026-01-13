import React from 'react';

const Card = ({ title, children, actions, className = '' }) => {
    return (
        <div className={`glass-panel ${className}`} style={{
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxShadow: 'var(--shadow-sm)',
            transition: 'box-shadow 0.2s, transform 0.2s',
            background: 'var(--bg-panel)'
        }}>
            {(title || actions) && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    {title && <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
};

export default Card;
