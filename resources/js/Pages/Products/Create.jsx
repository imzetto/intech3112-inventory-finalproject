import AppLayout from '../../Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create({ categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: categories[0]?.id || '',
        name: '',
        sku: '',
        price: '',
        stock: '0',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'New Product' }]}>
            <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px 0', color: '#0f172a' }}>Create Product</h1>
                <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>Fill in the details below to add a new inventory item.</p>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Category <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.category_id}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Product Name <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. ThinkPad P16 Workstation"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.name ? '1px solid #dc2626' : '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                        {errors.name && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            SKU (Stock Keeping Unit) <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. TP-P16-01"
                            value={data.sku}
                            onChange={(e) => setData('sku', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.sku ? '1px solid #dc2626' : '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                        {errors.sku && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.sku}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                                Unit Price ($) <span style={{ color: '#dc2626' }}>*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.price ? '1px solid #dc2626' : '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                            {errors.price && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.price}</span>}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                                Initial Stock <span style={{ color: '#dc2626' }}>*</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.stock ? '1px solid #dc2626' : '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                            {errors.stock && <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.stock}</span>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                        <Link
                            href="/products"
                            style={{ padding: '9px 16px', color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '600', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                backgroundColor: processing ? '#93c5fd' : '#2563eb',
                                color: '#ffffff',
                                border: 'none',
                                padding: '9px 20px',
                                borderRadius: '6px',
                                fontWeight: '600',
                                fontSize: '14px',
                                cursor: processing ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {processing ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}