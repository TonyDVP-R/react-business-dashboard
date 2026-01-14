import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StatChart from '../components/features/StatChart';
import { Icon } from '../components/ui/Icons';
import { useData } from '../context/DataContext';
import useWindowSize from '../hooks/useWindowSize';

const Dashboard = () => {
    const { width } = useWindowSize();
    const { orders, settings } = useData();

    // Calculate real stats
    const totalRevenue = orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((acc, curr) => acc + parseFloat(curr.total.replace(/[^0-9.-]+/g, "")), 0);

    const activeOrders = orders.filter(o => o.status === 'Processing').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

    const stats = [
        { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', icon: 'dollar-sign', trend: [65, 78, 90, 85, 92, 110, 120] },
        { title: 'Active Orders', value: activeOrders, change: 'Active', icon: 'shopping-cart', trend: [12, 18, 15, 22, 28, 25, 32] },
        { title: 'Completed Orders', value: deliveredOrders, change: '+5.4%', icon: 'activity', trend: [45, 52, 48, 70, 65, 80, 75] },
        { title: 'Total Sales', value: orders.length, change: '+8.2%', icon: 'users', trend: [80, 85, 82, 90, 95, 100, 105] },
    ];

    // Sort by date descending and take top 5
    const recentTransactions = [...orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            <div className="dashboard-header flex-responsive" style={{ alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                    <h1 className="title-large" style={{ fontSize: width < 480 ? '1.5rem' : '2rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome back, {settings.firstName || 'Admin'}. Here's what's happening today.</p>
                </div>
                <div className="dashboard-header-actions" style={{ width: width < 768 ? '100%' : 'auto', display: 'flex', gap: '12px' }}>
                    <Button variant="secondary" style={{ flex: 1 }}>Report</Button>
                    <Button style={{ flex: 1 }}>+ New</Button>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {recentTransactions.map((order) => (
                                <div key={order.id} className="hover-lift" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'var(--bg-element)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-light)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            background: order.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-panel)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: order.status === 'Cancelled' ? 'var(--danger)' : 'var(--primary)',
                                            border: '1px solid var(--border)'
                                        }}>
                                            <Icon name={order.status === 'Delivered' ? 'box' : 'activity'} size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{order.customer}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{order.id}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{order.total}</p>
                                        <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'danger' : 'warning'} size="sm">
                                            {order.status}
                                        </Badge>
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
