import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StatChart from '../components/features/StatChart';
import { Icon } from '../components/ui/Icons';

import { useData } from '../context/DataContext';

const Dashboard = () => {
    const { orders, settings } = useData();

    // Calculate real stats
    const totalRevenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((acc, curr) => acc + parseFloat(curr.total.replace(/[^0-9.-]+/g, "")), 0);

    const activeOrders = orders.filter(o => o.status === 'Processing').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

    const stats = [
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+20.1%', trend: [10, 15, 13, 20, 25, 22, 30] },
        { title: 'Processing Orders', value: activeOrders, change: 'Active', trend: [2, 4, 3, 5, 4, 6, 5] },
        { title: 'Completed Orders', value: deliveredOrders, change: '+12%', trend: [5, 8, 10, 12, 11, 15, 18] },
        { title: 'Total Sales', value: orders.length, change: '+19%', trend: [15, 10, 20, 15, 25, 20, 30] },
    ];

    // Sort by date descending and take top 5
    const recentTransactions = [...orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <div className="animate-fade-in">
            <div className="dashboard-header">
                <div>
                    <h1 className="title-large">Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {settings.firstName || 'Admin'}. Here's what's happening today.</p>
                </div>
                <div className="dashboard-header-actions">
                    <Button variant="secondary">Download Report</Button>
                    <Button>+ New Campaign</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                                <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{stat.title}</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '4px 0' }}>{stat.value}</h3>
                            </div>
                            <Badge variant="success" size="sm">{stat.change}</Badge>
                        </div>
                        <div style={{ marginTop: 'auto' }}>
                            <StatChart data={stat.trend} />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="main-grid">
                {/* Recent Sales - Takes 8 columns */}
                <div className="lg-span-8">
                    <Card title="Recent Transactions">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {recentTransactions.map((order) => (
                                <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: order.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-element)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: order.status === 'Cancelled' ? 'var(--danger)' : 'var(--primary)'
                                        }}>
                                            <Icon name={order.status === 'Delivered' ? 'box' : 'activity'} size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{order.customer}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{order.id}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 600 }}>{order.total}</p>
                                        <p style={{ fontSize: '0.8rem', color: order.status === 'Cancelled' ? 'var(--danger)' : 'var(--success)' }}>{order.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Side Panel - Takes 4 columns */}
                <div className="lg-span-4">
                    <Card title="Upcoming Events">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ padding: '12px', background: 'var(--bg-element)', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>Today, 2:00 PM</p>
                                <p style={{ fontWeight: 500 }}>Team Meeting</p>
                            </div>
                            <div style={{ padding: '12px', background: 'var(--bg-element)', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--warning)' }}>Tomorrow, 11:00 AM</p>
                                <p style={{ fontWeight: 500 }}>Product Launch</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
