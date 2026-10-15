import AppLayout from '../../Layouts/AppLayout';
import ConfirmModal from '../../Components/ConfirmModal';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products = [], categories = [], filters = {} }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');
    const canDelete = roles.includes('Admin');

    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [stockStatus, setStockStatus] = useState(filters.stock_status || '');
    const [modalData, setModalData] = useState({ isOpen: false, id: null, name: '' });

    const handleFilter = (newSearch, newCat, newStock) => {
        router.get('/products', {
            search: newSearch,
            category_id: newCat,
            stock_status: newStock
        }, { preserveState: true, replace: true });
    };

    const confirmDelete = () => {
        if (!modalData.id) return;
        router.delete(`/products/${modalData.id}`, {
            onSuccess: () => setModalData({ isOpen: false, id: null, name: '' })
        });
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'Products' }]}>
            <Head title="Products Catalogue" />
            <ConfirmModal
                isOpen={modalData.isOpen}
                title="Delete Product"
                message={`Are you sure you want to permanently delete "${modalData.name}"? This action cannot be reversed.`}
                onConfirm={confirmDelete}
                onCancel={() => setModalData({ isOpen: false, id: null, name: '' })}
            />

            {/* Top Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Product Inventory</h1>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                        Manage catalogue items, stock thresholds, and unit prices.
                    </p>
                </div>
                {canManage && (
                    <Link
                        href="/products/create"
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            padding: '10px 18px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            fontSize: '14px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
                        }}
                    >
                        <span>+</span> Add Product
                    </Link>
                )}
            </div>

            {/* Filter Bar */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '14px 18px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '18px'
            }}>
                <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleFilter(e.target.value, categoryId, stockStatus);
                    }}
                    style={{ flex: 1, minWidth: '220px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />

                <select
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                        handleFilter(search, e.target.value, stockStatus);
                    }}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>

                <select
                    value={stockStatus}
                    onChange={(e) => {
                        setStockStatus(e.target.value);
                        handleFilter(search, categoryId, e.target.value);
                    }}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                >
                    <option value="">All Stock Levels</option>
                    <option value="low">Low Stock (≤ 5 units)</option>
                </select>

                {(search || categoryId || stockStatus) && (
                    <button
                        onClick={() => {
                            setSearch('');
                            setCategoryId('');
                            setStockStatus('');
                            handleFilter('', '', '');
                        }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Reset Filters
                    </button>
                )}
            </div>

            {/* Data Table */}
            <div className="table-responsive" style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <table style={{ minWidth: '650px', width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>SKU</th>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Product Name</th>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Category</th>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Unit Price</th>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Stock Level</th>
                            {canManage && <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600', textAlign: 'right' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
                                    <p style={{ margin: 0, fontWeight: '600', color: '#0f172a' }}>No products match your criteria</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>Try resetting your search query or filters.</p>
                                </td>
                            </tr>
                        ) : (
                            products.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: '#64748b', fontWeight: '600' }}>{item.sku}</td>
                                    <td style={{ padding: '14px 18px', fontWeight: '600', color: '#0f172a' }}>{item.name}</td>
                                    <td style={{ padding: '14px 18px', color: '#475569' }}>
                                        <span style={{ backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                            {item.category?.name || 'Unassigned'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 18px', color: '#0f172a', fontWeight: '600' }}>
                                        ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td style={{ padding: '14px 18px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '9999px',
                                            fontWeight: '700',
                                            fontSize: '12px',
                                            backgroundColor: item.stock > 5 ? '#ecfdf5' : '#fef2f2',
                                            color: item.stock > 5 ? '#065f46' : '#991b1b',
                                            border: `1px solid ${item.stock > 5 ? '#a7f3d0' : '#fecaca'}`
                                        }}>
                                            {item.stock} in stock
                                        </span>
                                    </td>
                                    {canManage && (
                                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                                            <Link
                                                href={`/products/${item.id}/edit`}
                                                style={{ color: '#2563eb', fontWeight: '600', marginRight: '14px', textDecoration: 'none', fontSize: '13px' }}
                                            >
                                                Edit
                                            </Link>
                                            {canDelete && (
                                                <button
                                                    onClick={() => setModalData({ isOpen: true, id: item.id, name: item.name })}
                                                    style={{ color: '#dc2626', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}