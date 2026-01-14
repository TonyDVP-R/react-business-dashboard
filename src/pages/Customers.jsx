import React from 'react';
import DataTable from '../components/features/DataTable';
import Card from '../components/ui/Card';
import { useData } from '../context/DataContext';
import useWindowSize from '../hooks/useWindowSize';

const Customers = () => {
    const { width } = useWindowSize();
    const { customers } = useData();

    const columns = [
        {
            header: 'Customer', accessor: 'name', render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {row.name.charAt(0)}
                    </div>
                    <span>{row.name}</span>
                </div>
            )
        },
        { header: 'Email', accessor: 'email' },
        { header: 'Spent', accessor: 'spent' },
        { header: 'City', accessor: 'city' },
    ];

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>Customers</h1>
            <Card>
                <DataTable columns={columns} data={customers} searchPlaceholder="Search customers..." />
            </Card>
        </div>
    );
};

export default Customers;
