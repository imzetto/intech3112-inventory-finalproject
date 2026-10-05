import AppLayout from '../../Layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';

export default function Index({ logs = [] }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');

    return (
        <AppLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Stock Movement Logs</h2>
                {canManage && (
                    <Link
                        href="/stock-logs/create"
                        style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
                    >
                        + Adjust Stock
                    </Link>
                )}
            </div>

            <table style={{ width: '100%', backgroundColor: '#fff', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                    <tr>
                        <th style={{ padding: '12px 16px' }}>Date</th>
                        <th style={{ padding: '12px 16px' }}>Product</th>
                        <th style={{ padding: '12px 16px' }}>Type</th>
                        <th style={{ padding: '12px 16px' }}>Quantity</th>
                        <th style={{ padding: '12px 16px' }}>Recorded By</th>
                        <th style={{ padding: '12px 16px' }}>Reason / Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length === 0 ? (
                        <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No stock movements recorded yet.</td></tr>
                    ) : (
                        logs.map((log) => (
                            <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{new Date(log.created_at).toLocaleString()}</td>
                                <td style={{ padding: '12px 16px', fontWeight: '600' }}>{log.product?.name || 'Deleted Product'}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <span style={{
                                        padding: '3px 8px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        backgroundColor: log.type === 'IN' ? '#dcfce7' : '#fee2e2',
                                        color: log.type === 'IN' ? '#166534' : '#991b1b'
                                    }}>
                                        {log.type}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', fontWeight: '600' }}>{log.quantity_change}</td>
                                <td style={{ padding: '12px 16px' }}>{log.user?.name || 'System'}</td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{log.reason || '-'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </AppLayout>
    );
}