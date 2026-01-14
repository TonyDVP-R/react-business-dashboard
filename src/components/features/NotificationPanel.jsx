import React from 'react';
import { Icon } from '../ui/Icons';
import { useData } from '../../context/DataContext';
import useWindowSize from '../../hooks/useWindowSize';

const NotificationPanel = ({ isOpen, onClose }) => {
    const { width } = useWindowSize();
    const { notifications, markNotificationRead, clearNotifications } = useData();

    if (!isOpen) return null;

    const isMobile = width < 768;

    return (
        <div
            className={`animate-slide-up ${isMobile ? 'mobile-panel' : ''}`}
            style={isMobile ? {
                position: 'fixed',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100vw - 32px)',
                maxWidth: '400px',
                maxHeight: '70vh',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            } : {
                position: 'absolute',
                top: '60px',
                right: '0',
                width: '320px',
                maxHeight: '400px',
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            <div style={{
                padding: '16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-element)'
            }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Notifications</h4>
                <button
                    onClick={clearNotifications}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                    Clear All
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                        <Icon name="bell" size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                        <p style={{ fontSize: '0.85rem' }}>No new notifications</p>
                    </div>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            style={{
                                padding: '16px',
                                borderBottom: '1px solid var(--border-light)',
                                cursor: 'pointer',
                                background: n.unread ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent',
                                transition: 'background 0.2s',
                                position: 'relative'
                            }}
                            className="hover-lift"
                        >
                            {n.unread && (
                                <div style={{
                                    position: 'absolute',
                                    left: '8px',
                                    top: '20px',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)'
                                }} />
                            )}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: 'var(--bg-element)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: n.type === 'order' ? 'var(--success)' : n.type === 'stock' ? 'var(--danger)' : 'var(--primary)'
                                }}>
                                    <Icon name={n.type === 'order' ? 'box' : n.type === 'stock' ? 'alert-circle' : 'activity'} size={18} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</p>
                                    <p style={{ margin: '4px 0', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.message}</p>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{n.time}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {notifications.length > 0 && (
                <div
                    onClick={onClose}
                    style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-element)',
                        cursor: 'pointer',
                        borderTop: '1px solid var(--border)'
                    }}
                >
                    Close
                </div>
            )}
        </div>
    );
};

export default NotificationPanel;
