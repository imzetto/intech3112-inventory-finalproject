import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'User',
        password: '',
        password_confirmation: '',
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'User Management', href: '/users' }, { label: 'Add User' }]}>
            <Head title="Add User Account" />
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>Add New User</h1>
                <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '13.5px' }}>
                    Create a team member account with a defined operational role.
                </p>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Full Name <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Sarah Jenkins"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.name ? '1px solid #e11d48' : '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                        {errors.name && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Email Address <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="sarah.jenkins@company.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.email ? '1px solid #e11d48' : '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                        {errors.email && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Assigned Role <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                            <option value="User">Regular User (Read-only catalogue access)</option>
                            <option value="Manager">Manager (Add & Edit products/categories/logs)</option>
                            <option value="Admin">Admin (Full administrative privileges)</option>
                        </select>
                        <span style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                            {data.role === 'Manager'
                                ? '⚠️ Managers can modify live inventory records and apply stock movements.'
                                : data.role === 'Admin'
                                ? '⚠️ Admins have full administrative privileges.'
                                : 'Regular users are restricted to read-only views.'}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                                Temporary Password <span style={{ color: '#e11d48' }}>*</span>
                            </label>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.password ? '1px solid #e11d48' : '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                            {errors.password && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                                Confirm Password <span style={{ color: '#e11d48' }}>*</span>
                            </label>
                            <input
                                type="password"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Account Status
                        </label>
                        <select
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                            <option value="1">Active (Permit immediate access)</option>
                            <option value="0">Disabled (Hold account)</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                        <Link
                            href="/users"
                            className="btn-secondary"
                            style={{ padding: '9px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary"
                            style={{ padding: '9px 20px', borderRadius: '6px', fontWeight: '600', fontSize: '14px', cursor: processing ? 'not-allowed' : 'pointer' }}
                        >
                            {processing ? 'Creating User...' : 'Create User Account'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}