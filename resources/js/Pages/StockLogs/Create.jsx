import AppLayout from '../../Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create({ products = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: products[0]?.id || '',
        type: 'IN',
        quantity_change: '1',
        reason: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/stock-logs');
    };

    return (
        <AppLayout>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Record Stock Adjustment</h2>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Select Product</label>
                        <select
                            value={data.product_id}
                            onChange={(e) => setData('product_id', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        >
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (Current Stock: {p.stock})
                                </option>
                            ))}
                        </select>
                        {errors.product_id && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.product_id}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Adjustment Type</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                        >
                            <option value="IN">IN (Stock Received / Added)</option>
                            <option value="OUT">OUT (Stock Damaged / Dispatched)</option>
                        </select>
                        {errors.type && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.type}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={data.quantity_change}
                            onChange={(e) => setData('quantity_change', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: errors.quantity_change ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                        />
                        {errors.quantity_change && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.quantity_change}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Reason / Notes</label>
                        <input
                            type="text"
                            placeholder="e.g. Supplier delivery, monthly audit correction"
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" disabled={processing} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                            {processing ? 'Processing...' : 'Apply Stock Movement'}
                        </button>
                        <Link href="/stock-logs" style={{ padding: '10px 18px', color: '#64748b', textDecoration: 'none' }}>Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}