import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, activePage, onNavigate }) => {
    const menuItems = [
        { name: 'Dashboard', icon: '📊' },
        { name: 'Orders', icon: '📦' },
        { name: 'Products', icon: '🏷️' },
        { name: 'Customers', icon: '👥' },
        { name: 'Analytics', icon: '📈' },
        { name: 'Settings', icon: '⚙️' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
            ></div>

            <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">AdminPanel</div>
                    <button className="close-btn" onClick={toggleSidebar}>&times;</button>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.name} className={item.name === activePage ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate(item.name);
                                        if (window.innerWidth <= 768) toggleSidebar();
                                    }}
                                >
                                    <span className="icon">{item.icon}</span>
                                    <span className="label">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar" style={{ background: '#94a3b8', padding: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="details">
                            <span className="name">Admin User</span>
                            <span className="role">Manager</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
