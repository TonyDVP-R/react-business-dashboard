import React from 'react';
import { Icon } from './Icons';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '500px' }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
        }}>
            {/* Backdrop */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)'
                }}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="animate-fade-in" style={{
                position: 'relative',
                width: '100%',
                maxWidth: maxWidth,
                background: 'var(--bg-panel)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
                    <button onClick={onClose} style={{ color: 'var(--text-secondary)', cursor: 'pointer', background: 'transparent', border: 'none' }}>
                        <Icon name="x" size={24} />
                    </button>
                </div>

                {/* Body */}
                <div style={{
                    padding: '24px',
                    overflowY: 'auto'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
