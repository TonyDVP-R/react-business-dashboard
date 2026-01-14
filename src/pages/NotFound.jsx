import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-app)',
            color: 'var(--text-primary)',
            textAlign: 'center',
            gap: '24px'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: 'var(--bg-element)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)'
            }}>
                <Icon name="search" size={40} color="var(--text-secondary)" />
            </div>

            <div>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
                <h2 style={{ fontSize: '1.5rem', marginTop: '16px' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '300px' }}>
                    The page you are looking for doesn't exist or has been moved.
                </p>
            </div>

            <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
            </Button>
        </div>
    );
};

export default NotFound;
