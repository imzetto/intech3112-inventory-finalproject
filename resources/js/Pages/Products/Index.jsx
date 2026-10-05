import AppLayout from '../../Layouts/AppLayout';
import { Link, usePage, router } from '@inertiajs/react';

export default function Index({ products }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');
    const canDelete = roles.includes('Admin');

    const handleDelete = (id) => {
        if (confirm('Delete this product?')) {
            router.delete(`/products/${id}`);
        }
    };

    return (
        <AppLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Products Inventory</h2>
                {canManage && (
                    <Link
                        href="/products/create"
                        style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
                    >
                        + Add Product
                    </Link>
                )}
            </div>

            <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                    <tr>
                        <th style={{ padding: '12px 16px' }}>SKU</th>
                        <th style={{ padding: '12px 16px' }}>Name</th>
                        <th style={{ padding: '12px 16px' }}>Category</th>
                        <th style={{ padding: '12px 16px' }}>Price</th>
                        <th style={{ padding: '12px 16px' }}>Stock</th>
                        {canManage && <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No products found.</td></tr>
                    ) : (
                        products.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569' }}>{item.sku}</td>
                                <td style={{ padding: '12px 16px', fontWeight: '600' }}>{item.name}</td>
                                <td style={{ padding: '12px 16px' }}>{item.category?.name || 'Unassigned'}</td>
                                <td style={{ padding: '12px 16px' }}>${parseFloat(item.price).toFixed(2)}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        backgroundColor: item.stock > 5 ? '#dcfce7' : '#fee2e2',
                                        color: item.stock > 5 ? '#166534' : '#991b1b'
                                    }}>
                                        {item.stock} in stock
                                    </span>
                                </td>
                                {canManage && (
                                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                        <Link href={`/products/${item.id}/edit`} style={{ color: '#2563eb', marginRight: '12px', textDecoration: 'none' }}>Edit</Link>
                                        {canDelete && (
                                            <button onClick={() => handleDelete(item.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>
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