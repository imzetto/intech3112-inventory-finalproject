import AppLayout from '../../Layouts/AppLayout';
import ConfirmModal from '../../Components/ConfirmModal';
import { useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ managedUser }) {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: managedUser.name || '',
        email: managedUser.email || '',
        role: managedUser.role || 'User',
        is_active: managedUser.is_active,
        password: '',
        password_confirmation: '',
    });

    const isRoleChanged = data.role !== managedUser.role;

    const handleSubmitClick = (e) => {
        e.preventDefault();
        // If the role was changed, force the admin to explicitly confirm first
        if (isRoleChanged) {
            setConfirmModalOpen(true);
        } else {
            put(`/users/${managedUser.id}`);
        }
    };

    const confirmAndSave = () => {
        setConfirmModalOpen(false);
        put(`/users/${managedUser.id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'User Management', href: '/users' }, { label: `Edit ${managedUser.name}` }]}>
            <ConfirmModal
                isOpen={confirmModalOpen}
                title="Confirm Role Change"
                message={`You are modifying ${managedUser.name}'s role from "${managedUser.role === 'User' ? 'Regular User' : managedUser.role}" to "${data.role === 'User' ? 'Regular User' : data.role}". This will immediately alter their ability to create and modify live inventory.`}
                confirmText="Confirm Role Change"
                isDanger={false}
                onConfirm={confirmAndSave}
                onCancel={() => setConfirmModalOpen(false)}
            />

            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>Edit User Account</h1>
                <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '13.5px' }}>
                    Promote/demote user roles, manage account status, or reset credentials.
                </p>

                <form onSubmit={handleSubmitClick}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Full Name <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
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
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.email ? '1px solid #e11d48' : '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                        {errors.email && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>

                    <div style={{ marginBottom: '18px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '13px', color: '#0f172a', marginBottom: '6px' }}>
                            Operational Role Assignment <span style={{ color: '#e11d48' }}>*</span>
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
                        <div style={{ marginTop: '8px', fontSize: '12.5px', color: isRoleChanged ? '#b45309' : '#64748b' }}>
                            {isRoleChanged
                                ? `⚠️ Pending change from "${managedUser.role}" to "${data.role}". A confirmation dialog will appear upon saving.`
                                : `Current access level: ${managedUser.role === 'User' ? 'Regular User' : managedUser.role}`}
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                            Account Status
                        </label>
                        <select
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                        >
                            <option value="1">Active</option>
                            <option value="0">Disabled / Inactive</option>
                        </select>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
                            Reset Password (Leave blank to keep unchanged)
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <input
                                    type="password"
                                    placeholder="New password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: errors.password ? '1px solid #e11d48' : '1px solid #cbd5e1', fontSize: '14px' }}
                                />
                                {errors.password && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                                />
                            </div>
                        </div>
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
                            {processing ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}