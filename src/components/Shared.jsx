import React from 'react';
import { Icon } from './Icons';

// --- Badge ---
export const Badge = ({ children, variant = 'primary', size = 'md', style = {} }) => {
    const variants = {
        primary: { background: 'var(--primary-light)', color: 'var(--primary-text)' },
        success: { background: 'var(--success-bg)', color: 'var(--success)' },
        warning: { background: 'var(--warning-bg)', color: 'var(--warning)' },
        danger: { background: 'var(--danger-bg)', color: 'var(--danger)' },
        neutral: { background: 'var(--bg-element)', color: 'var(--text-secondary)' }
    };
    const sizes = {
        sm: { padding: '2px 8px', fontSize: '0.75rem' },
        md: { padding: '4px 12px', fontSize: '0.85rem' }
    };
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 'var(--radius-full)',
            fontWeight: 500,
            ...variants[variant],
            ...sizes[size],
            ...style
        }}>
            {children}
        </span>
    );
};

// --- Button ---
export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const variants = {
        primary: {
            background: 'var(--primary-gradient)',
            color: 'white',
            boxShadow: 'var(--shadow-lg)',
            border: 'none',
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
    return (
        <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: 'var(--radius-md)',
            fontWeight: 500,
            transition: 'all 0.2s',
            cursor: 'pointer',
            border: 'none', // Reset defaults or handled by variant
            ...variants[variant],
            ...sizes[size],
            ...props.style
        }} className={className} {...props}>
            {children}
        </button>
    );
};

// --- Card ---
export const Card = ({ title, children, action, className, style }) => {
    return (
        <div className={`glass-panel ${className || ''}`} style={{
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-md)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...style
        }}>
            {title && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
                    {action}
                </div>
            )}
            <div style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    );
};

// --- EmptyState ---
export const EmptyState = ({
    title = 'No Data Found',
    description = 'Try adjusting your search or filters to find what you are looking for.',
    icon = 'search',
    action
}) => {
    return (
        <div style={{
            padding: '48px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            background: 'var(--bg-panel)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)',
            height: '100%',
            width: '100%',
            minHeight: '200px'
        }}>
            <div style={{
                width: '64px',
                height: '64px',
                background: 'var(--bg-element)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: 'var(--text-tertiary)'
            }}>
                <Icon name={icon} size={32} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{title}</h3>
            <p style={{ maxWidth: '400px', fontSize: '0.9rem', marginBottom: action ? '24px' : '0' }}>{description}</p>
            {action && <div>{action}</div>}
        </div>
    );
};

// --- Skeleton ---
export const Skeleton = ({ width, height, borderRadius = '4px', style = {} }) => {
    return (
        <div
            className="animate-pulse"
            style={{
                width: width || '100%',
                height: height || '20px',
                background: 'var(--bg-element)',
                borderRadius: borderRadius,
                ...style
            }}
        />
    );
};

// --- LoadingScreen ---
export const LoadingScreen = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}>
                <div className="spinner-ring" style={{
                    width: '48px',
                    height: '48px',
                    border: '4px solid var(--border)',
                    borderTop: '4px solid var(--primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />

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
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
            `}</style>
        </div>
    );
};
