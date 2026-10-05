import AppLayout from '../../Layouts/AppLayout';
import { Link, usePage, router } from '@inertiajs/react';

export default function Index({ categories }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');
    const canDelete = roles.includes('Admin');

    const handleDelete = (id) => {
        if (confirm('Are you sure? All related products will also be deleted!')) {
            router.delete(`/categories/${id}`);
        }
    };

    return (
        <AppLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Categories</h2>
                {canManage && (
                    <Link
                        href="/categories/create"
                        style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
                    >
                        + Add Category
                    </Link>
                )}
            </div>

            <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                    <tr>
                        <th style={{ padding: '12px 16px' }}>Name</th>
                        <th style={{ padding: '12px 16px' }}>Description</th>
                        <th style={{ padding: '12px 16px' }}>Total Products</th>
                        {canManage && <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? (
                        <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No categories found.</td></tr>
                    ) : (
                        categories.map((cat) => (
                            <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 16px', fontWeight: '600' }}>{cat.name}</td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{cat.description || 'N/A'}</td>
                                <td style={{ padding: '12px 16px' }}>{cat.products_count}</td>
                                {canManage && (
                                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                        <Link href={`/categories/${cat.id}/edit`} style={{ color: '#2563eb', marginRight: '12px', textDecoration: 'none' }}>Edit</Link>
                                        {canDelete && (
                                            <button onClick={() => handleDelete(cat.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>
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
        </AppLayout>
    );
}