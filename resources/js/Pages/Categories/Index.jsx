import AppLayout from '../../Layouts/AppLayout';
import ConfirmModal from '../../Components/ConfirmModal';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ categories = [], filters = {} }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');
    const canDelete = roles.includes('Admin');

    const [search, setSearch] = useState(filters.search || '');
    const [modalData, setModalData] = useState({ isOpen: false, id: null, name: '' });

    const handleSearch = (val) => {
        setSearch(val);
        router.get('/categories', { search: val }, { preserveState: true, replace: true });
    };

    const confirmDelete = () => {
        if (!modalData.id) return;
        router.delete(`/categories/${modalData.id}`, {
            onSuccess: () => setModalData({ isOpen: false, id: null, name: '' })
        });
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'Categories' }]}>
            <ConfirmModal
                isOpen={modalData.isOpen}
                title="Delete Category"
                message={`Warning: Deleting "${modalData.name}" will also cascade delete all associated inventory products.`}
                onConfirm={confirmDelete}
                onCancel={() => setModalData({ isOpen: false, id: null, name: '' })}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Categories</h1>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                        Organize your inventory into operational business departments.
                    </p>
                </div>
                {canManage && (
                    <Link
                        href="/categories/create"
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
                            gap: '6px'
                        }}
                    >
                        <span>+</span> Add Category
                    </Link>
                )}
            </div>

            <div style={{ marginBottom: '18px' }}>
                <input
                    type="text"
                    placeholder="Search category name..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ maxWidth: '320px', width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Description</th>
                            <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600' }}>Linked Items</th>
                            {canManage && <th style={{ padding: '14px 18px', color: '#475569', fontWeight: '600', textAlign: 'right' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                                    No categories found.
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '14px 18px', fontWeight: '600', color: '#0f172a' }}>{cat.name}</td>
                                    <td style={{ padding: '14px 18px', color: '#64748b' }}>{cat.description || '—'}</td>
                                    <td style={{ padding: '14px 18px' }}>
                                        <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                                            {cat.products_count} products
                                        </span>
                                    </td>
                                    {canManage && (
                                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                                            <Link href={`/categories/${cat.id}/edit`} style={{ color: '#2563eb', fontWeight: '600', marginRight: '14px', textDecoration: 'none', fontSize: '13px' }}>
                                                Edit
                                            </Link>
                                            {canDelete && (
                                                <button
                                                    onClick={() => setModalData({ isOpen: true, id: cat.id, name: cat.name })}
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