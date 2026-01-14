import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import useWindowSize from '../../hooks/useWindowSize';
const Layout = ({ children }) => {
    const { width } = useWindowSize();
    const [sidebarOpen, setSidebarOpen] = useState(width >= 1024);

    useEffect(() => {
        if (width < 1024) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [width]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', overflowX: 'hidden' }}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                // Adjust margin to account for floating sidebar (Width + Left Margin + Gap)
                marginLeft: sidebarOpen && width >= 1024 ? 'calc(var(--sidebar-width) + 32px)' : '0',
                transition: 'margin-left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                width: '100%',
                minWidth: '0' // Prevent flex items from overflowing
            }}>
                <Header toggleSidebar={toggleSidebar} />

                <main className="main-layout-content" style={{
                    flex: 1,
                    // padding handled by class
                    // maxWidth handled by class
                    // margin handled by class
                    // width handled by class
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
