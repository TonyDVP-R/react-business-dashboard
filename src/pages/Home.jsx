import React from 'react';
import Card from '../components/Card';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div style={{ marginBottom: '48px' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '16px',
                    lineHeight: 1.2
                }}>
                    Welcome back, Admin
                </h1>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.125rem',
                    maxWidth: '600px'
                }}>
                    Here's an overview of your business performance and recent activities.
                </p>
            </div>

            {/* Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {/* Card 1: Overview */}
                <Card
                    title="Performance Overview"
                    actions={
                        <a href="#" style={{ color: 'var(--accent)', fontWeight: 500 }}>View detailed report &rarr;</a>
                    }
                >
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span>Total Revenue</span>
                            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>$124,500</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span>Active Users</span>
                            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>1,240</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Growth</span>
                            <span style={{ color: '#16a34a', fontWeight: 600 }}>+12.5%</span>
                        </div>
                    </div>
                </Card>

                {/* Card 2: Recent Activity */}
                <Card title="Recent Activity">
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                            <span style={{ display: 'block', color: 'var(--text-main)', fontWeight: 500 }}>New user registration</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>2 minutes ago</span>
                        </li>
                        <li style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                            <span style={{ display: 'block', color: 'var(--text-main)', fontWeight: 500 }}>Order #4521 completed</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>1 hour ago</span>
                        </li>
                        <li style={{ fontSize: '0.9rem' }}>
                            <span style={{ display: 'block', color: 'var(--text-main)', fontWeight: 500 }}>Database backup successful</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>5 hours ago</span>
                        </li>
                    </ul>
                </Card>

                {/* Card 3: Quick Actions */}
                <Card title="Quick Actions">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button style={{
                            backgroundColor: 'var(--bg-main)',
                            border: '1px solid var(--border)',
                            padding: '10px 16px',
                            borderRadius: '6px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            color: 'var(--text-main)',
                            fontWeight: 500,
                            transition: 'background 0.2s'
                        }}>
                            + Create New Invoice
                        </button>
                        <button style={{
                            backgroundColor: 'var(--bg-main)',
                            border: '1px solid var(--border)',
                            padding: '10px 16px',
                            borderRadius: '6px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            color: 'var(--text-main)',
                            fontWeight: 500,
                            transition: 'background 0.2s'
                        }}>
                            Add Team Member
                        </button>
                        <button style={{
                            backgroundColor: 'var(--bg-main)',
                            border: '1px solid var(--border)',
                            padding: '10px 16px',
                            borderRadius: '6px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            color: 'var(--text-main)',
                            fontWeight: 500,
                            transition: 'background 0.2s'
                        }}>
                            Export Data
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Home;
