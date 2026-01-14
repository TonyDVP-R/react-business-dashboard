import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const defaultData = {
    orders: [
        { id: 'ORD-001', customer: 'Liam Johnson', date: '2023-10-25', status: 'Delivered', total: '$250.00' },
        { id: 'ORD-002', customer: 'Noah Williams', date: '2023-10-26', status: 'Processing', total: '$120.50' },
        { id: 'ORD-003', customer: 'Emma Brown', date: '2023-10-27', status: 'Processing', total: '$75.00' },
        { id: 'ORD-004', customer: 'Oliver Jones', date: '2023-10-28', status: 'Cancelled', total: '$450.00' },
        { id: 'ORD-005', customer: 'Sophia Garcia', date: '2023-10-29', status: 'Delivered', total: '$60.00' },
        { id: 'ORD-006', customer: 'James Miller', date: '2023-10-29', status: 'Delivered', total: '$1,200.00' },
        { id: 'ORD-007', customer: 'Isabella Davis', date: '2023-10-30', status: 'Processing', total: '$320.00' },
    ],
    products: [
        { id: 1, name: 'Pro Earbuds 2.0', category: 'Electronics', price: '$299.00', stock: 145, status: 'Active' },
        { id: 2, name: 'Ergo Chair', category: 'Furniture', price: '$450.00', stock: 12, status: 'Active' },
        { id: 3, name: 'Mechanical Keys', category: 'Accessories', price: '$120.00', stock: 55, status: 'Active' },
        { id: 4, name: '4K Monitor', category: 'Electronics', price: '$800.00', stock: 4, status: 'Draft' },
        { id: 5, name: 'USB-C Dock', category: 'Accessories', price: '$150.00', stock: 200, status: 'Active' },
    ],
    customers: [
        { id: 1, name: 'Alice Freeman', email: 'alice@example.com', spent: '$1,200', city: 'New York' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', spent: '$450', city: 'London' },
        { id: 3, name: 'Charlie Kim', email: 'charlie@example.com', spent: '$2,300', city: 'Seoul' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', spent: '$890', city: 'Paris' },
    ],
    settings: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@nebula.pro',
        role: 'Senior UI/UX Designer',
        notifications: {
            email: true,
            push: true,
            reports: true
        }
    }
};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem('app-data');
            return saved ? JSON.parse(saved) : defaultData;
        } catch (e) {
            console.error("Failed to parse data", e);
            return defaultData;
        }
    });

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Order Received', message: 'Order #ORD-008 was placed by Emma Brown', time: '5m ago', type: 'order', unread: true },
        { id: 2, title: 'Stock Alert', message: 'Pro Earbuds 2.0 is running low (4 units left)', time: '12m ago', type: 'stock', unread: true },
        { id: 3, title: 'System Update', message: 'Nebula Pro v2.4 successfully deployed', time: '1h ago', type: 'system', unread: false },
    ]);

    useEffect(() => {
        localStorage.setItem('app-data', JSON.stringify(data));
    }, [data]);

    const addProduct = (product) => {
        setData(prev => ({
            ...prev,
            products: [{ ...product, id: Date.now() }, ...prev.products]
        }));
    };

    const updateProduct = (updatedProduct) => {
        setData(prev => ({
            ...prev,
            products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        }));
    };

    const deleteProduct = (id) => {
        setData(prev => ({
            ...prev,
            products: prev.products.filter(p => p.id !== id)
        }));
    };

    const updateOrder = (updatedOrder) => {
        setData(prev => ({
            ...prev,
            orders: prev.orders.map(o => o.id === updatedOrder.id ? updatedOrder : o)
        }));
    };

    const deleteOrder = (id) => {
        setData(prev => ({
            ...prev,
            orders: prev.orders.filter(o => o.id !== id)
        }));
    };

    const markNotificationRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const updateSettings = (newSettings) => {
        setData(prev => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings }
        }));
    };

    return (
        <DataContext.Provider value={{
            ...data,
            notifications,
            addProduct,
            updateProduct,
            deleteProduct,
            updateOrder,
            deleteOrder,
            markNotificationRead,
            clearNotifications,
            updateSettings
        }}>
            {children}
        </DataContext.Provider>
    );
};
