import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ product, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || '',
        stock: product.stock ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Edit Product' }]}>
            <Head title={`Edit ${product.name}`} />
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Edit Product</h2>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.category_id}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Product Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: errors.name ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                        />
                        {errors.name && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.name}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>SKU</label>
                        <input
                            type="text"
                            value={data.sku}
                            onChange={(e) => setData('sku', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: errors.sku ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                        />
                        {errors.sku && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.sku}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', border: errors.price ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                            {errors.price && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.price}</span>}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Stock</label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', border: errors.stock ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                            {errors.stock && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.stock}</span>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" disabled={processing} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                            {processing ? 'Updating...' : 'Update Product'}
                        </button>
                        <Link href="/products" style={{ padding: '10px 18px', color: '#64748b', textDecoration: 'none' }}>Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}