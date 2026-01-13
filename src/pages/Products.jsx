import React, { useState } from 'react';
import DataTable from '../components/features/DataTable';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Icon } from '../components/ui/Icons';

import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const Products = () => {
    const { products, addProduct, deleteProduct } = useData();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'Active'
    });

    const handleAddProduct = () => {
        setFormData({
            name: '',
            category: '',
            price: '',
            stock: '',
            status: 'Active'
        });
        setIsModalOpen(true);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            addToast('Please fill in required fields', 'error');
            return;
        }

        addProduct({
            ...formData,
            // Ensure price has $ if missing
            price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`
        });

        addToast('Product added successfully', 'success');
        setIsModalOpen(false);
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Product"
            >
                <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                        <label className="form-label">Product Name</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="e.g. Wireless Headphones"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Electronics"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Price</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="99.99"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label className="form-label">Stock</label>
                            <input
                                className="form-control"
                                type="number"
                                placeholder="50"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                className="form-control"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Products;
