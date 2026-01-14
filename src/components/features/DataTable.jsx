import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '../ui/Icons';
import EmptyState from '../ui/EmptyState';
import useWindowSize from '../../hooks/useWindowSize';

const DataTable = ({ columns, data, searchPlaceholder = "Search..." }) => {
    const { width } = useWindowSize();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Reset page to 1 on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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
            <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ position: 'relative', width: width < 480 ? '100%' : '280px' }}>
                    <Icon name="search" size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 12px 10px 40px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-panel)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontSize: width < 480 ? '0.75rem' : '0.85rem' }}>
                    Showing {paginatedData.length} of {filteredData.length} entries
                </div>
            </div>

            {/* Table or Card View based on screen width */}
            {width < 640 ? (
                /* Card View for Mobile */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, i) => (
                            <div key={row.id || i} className="mobile-card animate-fade-in">
                                {columns.map((col) => (
                                    <div key={col.key || col.accessor} className="mobile-card-row" style={{ alignItems: 'flex-start' }}>
                                        <span className="mobile-card-label" style={{ marginTop: '2px' }}>{col.header}</span>
                                        <div className="mobile-card-value" style={{ flex: 1, marginLeft: '12px' }}>
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <EmptyState
                            title="No results found"
                            description="Try adjusting your search or filters to find what you're looking for."
                            icon="search"
                        />
                    )}
                </div>
            ) : (
                /* Standard Table View for Desktop/Tablet */
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
            )}

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
