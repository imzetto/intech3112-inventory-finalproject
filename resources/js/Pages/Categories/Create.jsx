import AppLayout from '../../Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/categories');
    };

    return (
        <AppLayout>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Create Category</h2>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: errors.name ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                        />
                        {errors.name && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.name}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', minHeight: '80px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" disabled={processing} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                            {processing ? 'Saving...' : 'Save Category'}
                        </button>
                        <Link href="/categories" style={{ padding: '10px 18px', color: '#64748b', textDecoration: 'none' }}>Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}