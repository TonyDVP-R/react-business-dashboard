import React from 'react';

const Badge = ({ children, variant = 'primary', size = 'md' }) => {
    const variants = {
        primary: { bg: 'var(--primary-light)', color: 'var(--primary-text)' },
        success: { bg: 'var(--success-bg)', color: 'var(--success)' },
        warning: { bg: 'var(--warning-bg)', color: 'var(--warning)' },
        danger: { bg: 'var(--danger-bg)', color: 'var(--danger)' },
        neutral: { bg: 'var(--bg-element)', color: 'var(--text-secondary)' },
    };

    const sizes = {
        sm: { padding: '2px 8px', fontSize: '0.75rem' },
        md: { padding: '4px 10px', fontSize: '0.85rem' }
    };

    const v = variants[variant] || variants.neutral;
    const s = sizes[size];

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            backgroundColor: v.bg,
            color: v.color,
            ...s
        }}>
            {children}
        </span>
    );
};

export default Badge;
