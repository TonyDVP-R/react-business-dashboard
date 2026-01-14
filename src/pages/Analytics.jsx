import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import StatChart from '../components/features/StatChart';
import { Icon } from '../components/ui/Icons';
import { useData } from '../context/DataContext';
import useWindowSize from '../hooks/useWindowSize';

const Analytics = () => {
    const { width } = useWindowSize();
    const { analyticsData } = useData();

    // Mock data
    const monthlyData = [45, 52, 48, 70, 65, 80, 75, 90, 85, 95, 110, 120];
    const maxVal = Math.max(...monthlyData);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const performanceStats = [
        { label: 'Total Visits', value: '458.2k', change: '+12.5%', icon: 'users', trend: 'up' },
        { label: 'Avg. Session', value: '12m 45s', change: '+4.2%', icon: 'clock', trend: 'up' },
        { label: 'Bounce Rate', value: '32.4%', change: '-2.1%', icon: 'trending-up', trend: 'down' },
        { label: 'Conversions', value: '1,284', change: '+8.4%', icon: 'shopping-bag', trend: 'up' },
    ];

    return (
        <div className="animate-fade-in">
            {/* Header Section */}
            <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: width < 480 ? '1.5rem' : '2rem', fontWeight: 700 }}>Performance Analytics</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Detailed insights into your platform performance and user behavior.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', width: width < 768 ? '100%' : 'auto' }}>
                    <select style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-panel)',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        outline: 'none',
                        cursor: 'pointer',
                        flex: 1
                    }}>
                        <option>Last 12 Months</option>
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                    </select>
                    <Button variant="secondary" style={{ flex: 1 }}>
                        <Icon name="download" size={18} />
                        <span className="md-block" style={{ marginLeft: '8px' }}>Export</span>
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
                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingTop: '40px', margin: '-40px 0 0' }}>
                            <div style={{
                                marginTop: '24px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                height: '200px',
                                minWidth: '500px', // Ensure chart doesn't squish too much
                                gap: '12px',
                                padding: '0 10px 10px',
                                overflow: 'visible'
                            }}>
                                {monthlyData.map((val, i) => (
                                    <div key={i} style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
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
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '12px' }}>
                                            {months[i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Conversion and Traffic Sidebars */}
                <div style={{ gridColumn: 'span 12' }} className="lg-span-4">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Card title="Traffic by Source">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                                {[
                                    { name: 'Organic Search', value: '45%', color: 'var(--primary)', icon: 'globe' },
                                    { name: 'Direct', value: '25%', color: 'var(--success)', icon: 'mouse-pointer' },
                                    { name: 'Referral', value: '20%', color: 'var(--warning)', icon: 'link' },
                                    { name: 'Social', value: '10%', color: 'var(--danger)', icon: 'share-2' },
                                ].map((source, i) => (
                                    <div key={i} className="hover-lift" style={{ cursor: 'default' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ padding: '6px', borderRadius: '8px', background: 'var(--bg-element)', color: source.color }}>
                                                    <Icon name={source.icon} size={16} />
                                                </div>
                                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{source.name}</span>
                                            </div>
                                            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{source.value}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'var(--bg-element)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                            <div style={{ width: source.value, height: '100%', background: source.color, borderRadius: 'var(--radius-full)' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card title="System Performance">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
                                <div style={{
                                    padding: '16px',
                                    background: 'var(--bg-element)',
                                    borderRadius: 'var(--radius-lg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Icon name="server" size={18} style={{ color: 'var(--success)' }} />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Server Uptime</span>
                                        </div>
                                        <Badge variant="success">Online</Badge>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>99.98%</h4>
                                        <div style={{ width: '100px', height: '40px' }}>
                                            <StatChart data={[98, 99, 100, 99, 99, 100, 100]} color="var(--success)" />
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    padding: '16px',
                                    background: 'var(--bg-element)',
                                    borderRadius: 'var(--radius-lg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Icon name="zap" size={18} style={{ color: 'var(--primary)' }} />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Load Speed</span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>Excellent</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>0.8s</h4>
                                        <div style={{ width: '100px', height: '40px' }}>
                                            <StatChart data={[1.2, 1.0, 0.9, 0.8, 0.9, 0.7, 0.8].reverse()} color="var(--primary)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div >

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
        </div >
    );
};

export default Analytics;
