import React from 'react';
import { Icon } from './Icons';

const EmptyState = ({
    icon = 'box',
    title = 'No data found',
    description = "There's nothing to show here yet.",
    action = null
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
        }}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--bg-element)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid var(--border)'
            }}>
                <Icon name={icon} size={32} style={{ opacity: 0.5 }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {title}
            </h3>
            <p style={{ maxWidth: '300px', fontSize: '0.95rem', marginBottom: action ? '24px' : '0' }}>
                {description}
            </p>
            {action}
        </div>
    );
};

export default EmptyState;
