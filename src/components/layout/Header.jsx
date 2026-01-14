import React, { useState } from 'react';
import { Icon } from '../ui/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import useWindowSize from '../../hooks/useWindowSize';
import NotificationPanel from '../features/NotificationPanel';

const Header = ({ toggleSidebar }) => {
    const { width } = useWindowSize();
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();
    const { logout } = useAuth();
    const { settings, notifications } = useData();
    const navigate = useNavigate();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const unreadCount = notifications.filter(n => n.unread).length;

    const initials = `${settings.firstName?.[0] || 'A'}${settings.lastName?.[0] || 'U'}`;

    return (
        <header style={{
            minHeight: '80px',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: width < 480 ? '16px 12px' : '16px 5%',
            zIndex: 40,
            flexWrap: 'wrap',
            gap: width < 480 ? '12px' : '16px'
        }}>
            {/* Mobile Menu & Search */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flex: width < 480 ? '1 1 100%' : '1 1 auto',
                minWidth: '0',
                order: width < 480 ? 2 : 1
            }}>
                <button
                    className="lg-hidden hover-scale"
                    onClick={toggleSidebar}
                    style={{ color: 'var(--text-primary)', flexShrink: 0, order: width < 480 ? -1 : 0 }}
                >
                    <Icon name="layout" size={24} />
                </button>

                <div style={{
                    position: 'relative',
                    flex: '1 1 auto',
                    maxWidth: width < 480 ? '100%' : '320px',
                    display: width < 375 ? 'none' : 'block', // Hide on ultra-narrow
                    marginRight: width < 480 ? '0' : '20px'
                }}>
                    <Icon name="search" size={18} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                    }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            padding: '10px 12px 10px 40px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: 'var(--bg-panel)',
                            color: 'var(--text-primary)',
                            width: '100%',
                            outline: 'none',
                            fontSize: '0.9rem',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'box-shadow 0.2s'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
                        onBlur={(e) => e.target.style.boxShadow = 'var(--shadow-sm)'}
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: width < 480 ? '12px' : '24px',
                flexWrap: 'wrap',
                justifyContent: width < 480 ? 'center' : 'flex-end'
            }}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="hover-lift"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--bg-panel)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isNotificationOpen ? 'var(--primary)' : 'var(--text-secondary)',
                            boxShadow: isNotificationOpen ? '0 0 0 2px var(--primary)' : 'var(--shadow-sm)',
                        }}
                    >
                        <Icon name="bell" size={20} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'var(--danger)',
                                border: '2px solid var(--bg-panel)',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>
                </div>

                <button
                    onClick={toggleTheme}
                    className="hover-lift"
                    style={{
                        width: '40px',
                        height: '40px',
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
                        width: '40px',
                        height: '40px',
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
                        width: '40px',
                        height: '40px',
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

            <NotificationPanel
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </header>
    );
};

export default Header;
