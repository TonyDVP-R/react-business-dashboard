import React from 'react';
import { Icon } from '../ui/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const Header = ({ toggleSidebar }) => {
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();
    const { logout } = useAuth();
    const { settings } = useData();
    const navigate = useNavigate();

    const initials = `${settings.firstName?.[0] || 'A'}${settings.lastName?.[0] || 'U'}`;

    return (
        <header style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            zIndex: 40,
        }}>
            {/* Mobile Menu & Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button
                    className="lg-hidden hover-scale"
                    onClick={toggleSidebar}
                    style={{ color: 'var(--text-primary)' }}
                >
                    <Icon name="layout" size={24} />
                </button>

                <div style={{ position: 'relative' }} className="md-block">
                    <Icon name="search" size={18} style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                    }} />
                    <input
                        type="text"
                        placeholder="Type to search..."
                        style={{
                            padding: '12px 16px 12px 48px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: 'var(--bg-panel)',
                            color: 'var(--text-primary)',
                            width: '320px',
                            outline: 'none',
                            fontSize: '0.95rem',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'box-shadow 0.2s'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
                        onBlur={(e) => e.target.style.boxShadow = 'var(--shadow-sm)'}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                    onClick={() => addToast('No new notifications', 'info')}
                    className="hover-lift"
                    style={{
                        position: 'relative',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--bg-panel)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                >
                    <Icon name="bell" size={20} />
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--danger)',
                        border: '2px solid var(--bg-panel)'
                    }}></span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="hover-lift"
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--bg-panel)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                    title="Toggle Theme"
                >
                    <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
                </button>

                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                        addToast('Logged out successfully', 'info');
                    }}
                    className="hover-lift"
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--bg-panel)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--danger)',
                        boxShadow: 'var(--shadow-sm)',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    title="Logout"
                >
                    <Icon name="logout" size={20} />
                </button>

                <div
                    className="hover-lift"
                    onClick={() => navigate('/settings')}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: settings.avatar ? `url(${settings.avatar}) center/cover` : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--bg-app)',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                    title="Go to Profile"
                >
                    {!settings.avatar && initials}
                </div>
            </div>
        </header>
    );
};

export default Header;
