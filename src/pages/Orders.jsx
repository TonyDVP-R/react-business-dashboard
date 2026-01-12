import React from 'react';
import DataTable from '../components/features/DataTable';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { Icon } from '../components/ui/Icons';
import { useToast } from '../context/ToastContext';

import { useData } from '../context/DataContext';

const Orders = () => {
    const { orders, deleteOrder } = useData();
    const { addToast } = useToast();

    const columns = [
        { header: 'Order ID', accessor: 'id', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.id}</span> },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => {
                const map = { 'Delivered': 'success', 'Processing': 'warning', 'Cancelled': 'danger' };
                return <Badge variant={map[row.status] || 'neutral'}>{row.status}</Badge>;
            }
        },
        { header: 'Total', accessor: 'total', render: (row) => <span style={{ fontWeight: 600 }}>{row.total}</span> },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <button
                    onClick={() => {
                        if (window.confirm(`Delete order ${row.id}?`)) {
                            deleteOrder(row.id);
                            addToast('Order deleted', 'info');
                        }
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                    title="Delete"
                >
                    <Icon name="trash" size={18} />
                </button>
            )
        },
    ];

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>Orders</h1>
            <Card>
                <DataTable columns={columns} data={orders} searchPlaceholder="Search orders..." />
            </Card>
        </div>
    );
};

export default Orders;
