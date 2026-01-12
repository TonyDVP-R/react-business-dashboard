import React, { useEffect, useRef, useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';

const CommandPalette = () => {
    const { isOpen, closeSearch, query, setQuery } = useSearch();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const commands = [
        { id: 'dash', label: 'Dashboard', icon: 'layout', path: '/dashboard', section: 'Navigation' },
        { id: 'analytics', label: 'Analytics', icon: 'activity', path: '/analytics', section: 'Navigation' },
        { id: 'orders', label: 'Orders', icon: 'box', path: '/orders', section: 'Navigation' },
        { id: 'products', label: 'Products', icon: 'tag', path: '/products', section: 'Navigation' },
        { id: 'customers', label: 'Customers', icon: 'users', path: '/customers', section: 'Navigation' },
        { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings', section: 'General' },
        { id: 'new-order', label: 'Create New Order', icon: 'plus', action: () => alert('New Order Modal'), section: 'Actions' },
        { id: 'theme', label: 'Toggle Theme', icon: 'moon', action: () => document.documentElement.classList.toggle('dark'), section: 'Actions' },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isOpen) {
            // Slight delay to allow render
            setTimeout(() => inputRef.current?.focus(), 50);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const handleSelect = (command) => {
        if (command.path) {
            navigate(command.path);
        } else if (command.action) {
            command.action();
        }
        closeSearch();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
                handleSelect(filteredCommands[selectedIndex]);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '15vh',
        }}>
            {/* Backdrop */}
            <div
                onClick={closeSearch}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                }}
            />

            {/* Modal */}
            <div className="animate-fade-in-up" style={{
                position: 'relative',
                width: '600px',
                maxHeight: '400px',
                background: 'var(--bg-panel)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-2xl)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid var(--border)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderBottom: '1px solid var(--border)',
                    gap: '12px'
                }}>
                    <Icon name="search" size={20} style={{ color: 'var(--text-tertiary)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            outline: 'none'
                        }}
                    />
                    <div style={{
                        padding: '4px 8px',
                        background: 'var(--bg-app)',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: 'var(--text-tertiary)',
                        border: '1px solid var(--border)'
                    }}>ESC</div>
                </div>

                <div style={{ overflowY: 'auto', padding: '8px' }}>
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd, index) => (
                            <div
                                key={cmd.id}
                                onClick={() => handleSelect(cmd)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    background: index === selectedIndex ? 'var(--primary-gradient)' : 'transparent',
                                    color: index === selectedIndex ? 'white' : 'var(--text-primary)',
                                    transition: 'all 0.1s'
                                }}
                            >
                                <Icon name={cmd.icon} size={18} />
                                <span style={{ flex: 1, fontWeight: 500 }}>{cmd.label}</span>
                                {index === selectedIndex && <Icon name="arrow-right" size={16} />}
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                            No results found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
