import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';

const DataTable = ({ columns, data, searchPlaceholder = "Search..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sorting
    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    // Filtering
    const filteredData = useMemo(() => {
        return sortedData.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [sortedData, searchTerm]);

    // Pagination
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Table Header Controls */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px 16px',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-panel)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        width: '300px'
                    }}
                />
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Showing {paginatedData.length} of {filteredData.length} entries
                </div>
            </div>

            {/* Table */}
            <div style={{
                overflowX: 'auto',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-panel)'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-element)', borderBottom: '1px solid var(--border)' }}>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => requestSort(col.accessor)}
                                    style={{
                                        padding: '16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        userSelect: 'none'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {col.header}
                                        {sortConfig.key === col.accessor && (
                                            <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, i) => (
                                <tr
                                    key={row.id || i}
                                    style={{
                                        borderBottom: i === paginatedData.length - 1 ? 'none' : '1px solid var(--border)',
                                        transition: 'all 0.2s ease',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--bg-element)';
                                        e.currentTarget.style.transform = 'scale(1.002)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key || col.accessor} style={{ padding: '16px', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} style={{ padding: 0 }}>
                                    <EmptyState
                                        title="No results found"
                                        description="Try adjusting your search or filters to find what you're looking for."
                                        icon="search"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{ padding: '8px 16px', opacity: currentPage === 1 ? 0.5 : 1, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                >
                    Previous
                </button>
                <span style={{ display: 'flex', alignItems: 'center', padding: '0 12px', fontWeight: 600 }}>
                    Page {currentPage} of {pageCount || 1}
                </span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                    disabled={currentPage === pageCount}
                    style={{ padding: '8px 16px', opacity: currentPage === pageCount ? 0.5 : 1, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;
