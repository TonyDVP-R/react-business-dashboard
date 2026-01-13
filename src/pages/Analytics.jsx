import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import StatChart from '../components/features/StatChart';
import { Icon } from '../components/ui/Icons';

const Analytics = () => {
    // Mock data
    const monthlyData = [45, 60, 75, 50, 80, 95, 85, 90, 100, 110, 95, 120];
    const maxVal = Math.max(...monthlyData);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const performanceStats = [
        { label: 'Avg. Session Duration', value: '4m 32s', change: '+12%', icon: 'activity' },
        { label: 'Bounce Rate', value: '24.8%', change: '-5%', icon: 'users' }, // Using users as placeholder for bounce
        { label: 'New Visitors', value: '1,240', change: '+22%', icon: 'users' },
    ];

    return (
        <div className="animate-fade-in">
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Performance Analytics</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Detailed insights into your platform performance and user behavior.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <select style={{
                        padding: '10px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-panel)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        cursor: 'pointer'
                    }}>
                        <option>Last 12 Months</option>
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                    </select>
                    <Button variant="secondary">
                        <Icon name="download" size={18} style={{ marginRight: '8px' }} />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Performance Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {performanceStats.map((stat, i) => (
                    <Card key={i}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'var(--bg-element)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)'
                            }}>
                                <Icon name={stat.icon} size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</h3>
                                    <Badge variant={stat.change.startsWith('+') ? 'success' : 'danger'} size="sm">
                                        {stat.change}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
                {/* Revenue Growth Bar Chart */}
                <div style={{ gridColumn: 'span 12' }} className="lg-span-8">
                    <Card title="Revenue Growth History">
                        <div style={{
                            marginTop: '24px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            height: '240px',
                            gap: '12px',
                            padding: '0 10px'
                        }}>
                            {monthlyData.map((val, i) => (
                                <div key={i} style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    height: '100%'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: `${(val / maxVal) * 100}%`,
                                        background: i === monthlyData.length - 1 ? 'var(--primary-gradient)' : 'var(--bg-element)',
                                        borderRadius: 'var(--radius-sm)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        cursor: 'pointer'
                                    }}
                                        className="hover-lift"
                                        onMouseEnter={(e) => {
                                            if (i !== monthlyData.length - 1) e.currentTarget.style.background = 'var(--primary-light)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (i !== monthlyData.length - 1) e.currentTarget.style.background = 'var(--bg-element)';
                                        }}
                                    >
                                        <div className="tooltip" style={{
                                            position: 'absolute',
                                            top: '-35px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            padding: '4px 8px',
                                            background: 'var(--text-primary)',
                                            color: 'var(--bg-panel)',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            display: 'none',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            ${val}k
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                                        {months[i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Conversion and Traffic Sidebars */}
                <div style={{ gridColumn: 'span 12' }} className="lg-span-4">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Card title="Traffic by Source">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                                {[
                                    { name: 'Organic Search', value: '45%', color: 'var(--primary)' },
                                    { name: 'Direct', value: '25%', color: 'var(--success)' },
                                    { name: 'Referral', value: '20%', color: 'var(--warning)' },
                                    { name: 'Social', value: '10%', color: 'var(--danger)' },
                                ].map((source, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                                            <span style={{ fontWeight: 500 }}>{source.name}</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>{source.value}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: 'var(--bg-element)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                            <div style={{ width: source.value, height: '100%', background: source.color, borderRadius: 'var(--radius-full)' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card title="System Performance">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Server Uptime</p>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>99.98%</h4>
                                </div>
                                <StatChart data={[98, 99, 100, 99, 99, 100, 100]} color="var(--success)" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Load Speed</p>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>0.8s</h4>
                                </div>
                                <StatChart data={[1.2, 1.0, 0.9, 0.8, 0.9, 0.7, 0.8].reverse()} color="var(--primary)" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <style>{`
                .lg-span-8 { grid-column: span 12; }
                .lg-span-4 { grid-column: span 12; }
                @media (min-width: 1024px) {
                    .lg-span-8 { grid-column: span 8; }
                    .lg-span-4 { grid-column: span 4; }
                }
                .hover-lift:hover .tooltip {
                    display: block !important;
                }
            `}</style>
        </div>
    );
};

export default Analytics;
