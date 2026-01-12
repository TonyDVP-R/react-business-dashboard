import React from 'react';
import DataTable from '../components/features/DataTable';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';

import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const Products = () => {
    const { products, addProduct, deleteProduct } = useData();
    const { addToast } = useToast();

    const handleAddProduct = () => {
        const newProduct = {
            name: `New Product ${products.length + 1}`,
            category: 'Uncategorized',
            price: '$0.00',
            stock: 0,
            status: 'Draft'
        };
        addProduct(newProduct);
        addToast('Product added successfully', 'success');
    };

    const columns = [
        { header: 'Product Name', accessor: 'name', render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span> },
        { header: 'Category', accessor: 'category' },
        { header: 'Price', accessor: 'price' },
        {
            header: 'Stock',
            accessor: 'stock',
            render: (row) => <span style={{ color: row.stock < 20 ? 'var(--danger)' : 'inherit' }}>{row.stock} units</span>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge>
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <button
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
                            deleteProduct(row.id);
                            addToast('Product deleted', 'info');
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Products</h1>
                <Button onClick={handleAddProduct}>+ Add Product</Button>
            </div>
            <Card>
                <DataTable columns={columns} data={products} searchPlaceholder="Search products..." />
            </Card>
        </div>
    );
};

export default Products;
