import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';
import Logo from '../components/ui/Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
            addToast('Welcome back, Admin!', 'success');
            navigate('/dashboard');
        } catch (error) {
            addToast(error, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-app)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'var(--primary)',
                filter: 'blur(120px)',
                opacity: 0.1,
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'var(--success)', // Teal hint
                filter: 'blur(100px)',
                opacity: 0.05,
                zIndex: 0
            }} />

            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '48px',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
            }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <Logo size={64} showText={false} />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Nebula Pro</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue to dashboard</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Icon name="user" size={18} style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-tertiary)'
                            }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 48px',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--border)',
                                    background: 'var(--bg-app)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Icon name="lock" size={18} style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-tertiary)'
                            }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 48px',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--border)',
                                    background: 'var(--bg-app)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        style={{ marginTop: '8px' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Contact Admin</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
