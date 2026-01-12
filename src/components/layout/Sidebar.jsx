import { Icon } from '../ui/Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useData } from '../../context/DataContext';

const menuItems = [
    { id: '/dashboard', label: 'Dashboard', icon: 'layout' },
    { id: '/analytics', label: 'Analytics', icon: 'activity' },
    { id: '/orders', label: 'Orders', icon: 'box' },
    { id: '/products', label: 'Products', icon: 'tag' },
    { id: '/customers', label: 'Customers', icon: 'users' },
    { id: '/settings', label: 'Settings', icon: 'settings' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { settings } = useData();
    const currentRoute = location.pathname;

    const initials = `${settings.firstName?.[0] || 'A'}${settings.lastName?.[0] || 'U'}`;
    const fullName = `${settings.firstName} ${settings.lastName}`;

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay lg-hidden ${isOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 40,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'all 0.3s',
                    display: 'block'
                }}
            />

            <aside
                style={{
                    position: 'fixed',
                    left: '16px', // Floating effect
                    top: '16px',
                    bottom: '16px',
                    width: 'var(--sidebar-width)',
                    borderRadius: 'var(--radius-xl)', // Rounded corners
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border)',
                    zIndex: 50,
                    transform: isOpen ? 'translateX(0)' : 'translateX(calc(-100% - 20px))',
                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden' // Clip content to radius
                }}
            >

                {/* Logo Area */}
                <div style={{
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 32px',
                }}>
                    <Logo size={40} showText={true} />
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '0 16px', overflowY: 'auto', marginTop: '16px' }}>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {menuItems.map((item) => {
                            const isActive = currentRoute === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        className="sidebar-link"
                                        onClick={() => {
                                            navigate(item.id);
                                            if (window.innerWidth < 1024) toggleSidebar();
                                        }}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '14px 20px',
                                            borderRadius: 'var(--radius-lg)',
                                            fontSize: '1rem',
                                            fontWeight: isActive ? 600 : 500,
                                            color: isActive ? 'white' : 'var(--text-secondary)',
                                            background: isActive ? 'var(--primary-gradient)' : 'transparent',
                                            transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                            boxShadow: isActive ? 'var(--shadow-lg)' : 'none',
                                            borderLeft: isActive ? '4px solid white' : '4px solid transparent',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = 'var(--bg-element)';
                                                e.currentTarget.style.color = 'var(--text-primary)';
                                                e.currentTarget.style.transform = 'translateY(-2px)'; // Subtle lift
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'var(--text-secondary)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }
                                        }}
                                    >
                                        <Icon name={item.icon} size={22} strokeWidth={2.5} />
                                        {item.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Footer */}
                <div style={{
                    padding: '24px',
                    marginTop: 'auto',
                }}>
                    <div style={{
                        background: 'var(--bg-element)',
                        padding: '12px',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                        onClick={() => navigate('/settings')}
                        className="hover-lift"
                    >
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: settings.avatar ? `url(${settings.avatar}) center/cover` : 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            color: 'var(--bg-app)'
                        }}>
                            {!settings.avatar && initials}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{fullName}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{settings.role || 'Administrator'}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
