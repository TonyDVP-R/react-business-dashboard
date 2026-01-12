import React, { useState, useRef } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const Settings = () => {
    const { settings, updateSettings } = useData();
    const { addToast } = useToast();
    const fileInputRef = useRef(null);

    // Local state for live preview
    const [formData, setFormData] = useState({
        firstName: settings.firstName || '',
        lastName: settings.lastName || '',
        email: settings.email || '',
        role: settings.role || '',
        avatar: settings.avatar || null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
                updateSettings({ avatar: reader.result });
                addToast('Avatar updated successfully', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setFormData(prev => ({ ...prev, avatar: null }));
        updateSettings({ avatar: null });
        addToast('Avatar removed', 'info');
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        updateSettings({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            role: formData.role
        });
        addToast('Profile updated successfully', 'success');
    };

    const initials = `${formData.firstName?.[0] || 'A'}${formData.lastName?.[0] || 'U'}`;

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', paddingBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Account Settings</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Manage your profile information and account security.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Profile Card */}
                <Card title="Public Profile">
                    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', padding: '10px 0' }}>
                        {/* Avatar Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            <div
                                onClick={handleAvatarClick}
                                className="hover-lift"
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: formData.avatar ? `url(${formData.avatar}) center/cover` : 'var(--primary-gradient)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    boxShadow: 'var(--shadow-lg)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '4px solid var(--bg-panel)'
                                }}
                            >
                                {!formData.avatar && initials}
                                <div className="avatar-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}>
                                    Upload
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>JPG, PNG or GIF. Max 1MB.</p>
                                {formData.avatar && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--danger)',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            padding: '4px 8px',
                                            borderRadius: 'var(--radius-sm)',
                                            transition: 'background 0.2s'
                                        }}
                                        className="hover-bg-danger"
                                    >
                                        Remove Photo
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSaveProfile} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>First Name</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Last Name</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Job Title / Role</label>
                                <input
                                    name="role"
                                    type="text"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <Button type="submit" variant="primary" style={{ alignSelf: 'flex-start', marginTop: '12px' }}>
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </Card>

                {/* Security Card */}
                <Card title="Security">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '4px' }}>Change Password</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', margin: 0 }}>Protect your account with a strong password.</p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={() => addToast('Verification email sent!', 'info')}>Update Password</Button>
                        </div>
                        <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-app)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--success)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }} />
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Two-Factor Authentication is active</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Preferences Card */}
                <Card title="Notifications">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Email Alerts', 'Push Notifications', 'Weekly Reports'].map(item => (
                            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <span style={{ fontWeight: 500 }}>{item}</span>
                                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <style>{`
                .avatar-overlay:hover { opacity: 1 !important; }
                .hover-bg-danger:hover { background: rgba(239, 68, 68, 0.1); }
            `}</style>
        </div>
    );
};

const inputStyle = {
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    background: 'var(--bg-panel)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    '&:focus': {
        borderColor: 'var(--primary)'
    }
};

export default Settings;
