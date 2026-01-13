import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// Simple ID generator
let idCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = ++idCounter;
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container" style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} className="toast" style={{
                        background: 'var(--bg-panel)',
                        color: 'var(--text-primary)',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        borderLeft: `4px solid var(--${toast.type === 'error' ? 'danger' : toast.type === 'success' ? 'success' : 'primary'})`,
                        animation: 'slideInRight 0.3s ease-out forwards',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '300px'
                    }}>
                        {/* Icon based on type */}
                        <span style={{ fontSize: '1.2rem' }}>
                            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : 'ℹ️'}
                        </span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '1.2rem' }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
