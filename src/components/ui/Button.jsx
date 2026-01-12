import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: 'var(--radius-md)',
        fontWeight: 500,
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: '1px solid transparent'
    };

    const variants = {
        primary: {
            background: 'var(--primary-gradient)',
            color: 'white',
            boxShadow: 'var(--shadow-lg)',
            border: 'none'
        },
        secondary: {
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)'
        },
        ghost: {
            background: 'transparent',
            color: 'var(--text-secondary)'
        },
        danger: {
            background: 'var(--danger)',
            color: 'white'
        }
    };

    const sizes = {
        sm: { padding: '6px 12px', fontSize: '0.85rem' },
        md: { padding: '10px 16px', fontSize: '0.95rem' },
        lg: { padding: '12px 24px', fontSize: '1rem' }
    };

    const style = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size]
    };

    return (
        <button style={style} className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;
