import AppLayout from '../../Layouts/AppLayout';
import ConfirmModal from '../../Components/ConfirmModal';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ users = [], filters = {} }) {
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id;

    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [modal, setModal] = useState({ isOpen: false, user: null });

    const handleFilter = (s, r, st) => {
        router.get('/users', { search: s, role: r, status: st }, { preserveState: true, replace: true });
    };

    const confirmToggleStatus = () => {
        if (!modal.user) return;
        router.patch(`/users/${modal.user.id}/toggle-status`, {}, {
            onSuccess: () => setModal({ isOpen: false, user: null })
        });
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'User Management' }]}>
            <ConfirmModal
                isOpen={modal.isOpen}
                title={modal.user?.is_active ? 'Deactivate User Account' : 'Activate User Account'}
                message={modal.user?.is_active
                    ? `Are you sure you want to deactivate ${modal.user?.name}'s account? They will be immediately blocked from logging into the platform.`
                    : `Reactivate ${modal.user?.name}'s account? They will regain access according to their assigned role.`
                }
                confirmText={modal.user?.is_active ? 'Deactivate' : 'Activate'}
                isDanger={modal.user?.is_active}
                onConfirm={confirmToggleStatus}
                onCancel={() => setModal({ isOpen: false, user: null })}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>User Management</h1>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                        Manage corporate access, promote operators to Managers, and oversee account security.
                    </p>
                </div>
                <Link
                    href="/users/create"
                    className="btn-primary"
                    style={{
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
                    <span>+</span> Add User
                </Link>
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
                marginBottom: '20px'
            }}>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleFilter(e.target.value, roleFilter, statusFilter);
                    }}
                    style={{ flex: 1, minWidth: '220px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />

                <select
                    value={roleFilter}
                    onChange={(e) => {
                        setRoleFilter(e.target.value);
                        handleFilter(search, e.target.value, statusFilter);
                    }}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                >
                    <option value="">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">Regular User</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        handleFilter(search, roleFilter, e.target.value);
                    }}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Deactivated</option>
                </select>

                {(search || roleFilter || statusFilter) && (
                    <button
                        onClick={() => {
                            setSearch('');
                            setRoleFilter('');
                            setStatusFilter('');
                            handleFilter('', '', '');
                        }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Reset Filters
                    </button>
                )}
            </div>

            {/* User Records Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '14px 20px', color: '#475569', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '14px 20px', color: '#475569', fontWeight: '600' }}>Email</th>
                            <th style={{ padding: '14px 20px', color: '#475569', fontWeight: '600' }}>Role</th>
                            <th style={{ padding: '14px 20px', color: '#475569', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '14px 20px', color: '#475569', fontWeight: '600' }}>Registered</th>
                            <th style={{ padding: '14px 20px', color: '#475569', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                                    No users found matching the selected criteria.
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => {
                                const roleName = u.roles[0] || 'User';
                                const isSelf = u.id === currentUserId;
                                const isAdminRole = roleName === 'Admin';

                                const roleBadge = isAdminRole
                                    ? { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' }
                                    : roleName === 'Manager'
                                    ? { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' }
                                    : { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };

                                return (
                                    <tr key={u.id} className="data-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>
                                            {u.name} {isSelf && <span style={{ fontSize: '11px', color: '#2563eb' }}>(You)</span>}
                                        </td>
                                        <td style={{ padding: '14px 20px', color: '#475569' }}>{u.email}</td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{
                                                backgroundColor: roleBadge.bg,
                                                color: roleBadge.text,
                                                border: `1px solid ${roleBadge.border}`,
                                                padding: '2px 8px',
                                                borderRadius: '9999px',
                                                fontSize: '11.5px',
                                                fontWeight: '700',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.4px'
                                            }}>
                                                {roleName === 'User' ? 'Regular User' : roleName}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{
                                                backgroundColor: u.is_active ? '#ecfdf5' : '#fff1f2',
                                                color: u.is_active ? '#065f46' : '#9f1239',
                                                border: `1px solid ${u.is_active ? '#a7f3d0' : '#fecdd3'}`,
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                            }}>
                                                {u.is_active ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 20px', color: '#64748b' }}>{u.created_at}</td>
                                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                            {!isAdminRole && !isSelf ? (
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
                                                    <Link
                                                        href={`/users/${u.id}/edit`}
                                                        style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none', fontSize: '13px' }}
                                                    >
                                                        Edit / Promote
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => setModal({ isOpen: true, user: u })}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: u.is_active ? '#dc2626' : '#059669',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            fontSize: '13px',
                                                            padding: 0
                                                        }}
                                                    >
                                                        {u.is_active ? 'Disable' : 'Activate'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Protected</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}