import AppLayout from '../Layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recent_logs = [] }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');

    const cardStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    return (
        <AppLayout>
            {/* Header banner */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
                        Welcome back, {auth?.user?.name}!
                    </h1>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                        Logged in role: <strong style={{ color: '#2563eb' }}>{roles.join(', ')}</strong>
                    </p>
                </div>
                {canManage && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link
                            href="/stock-logs/create"
                            style={{ backgroundColor: '#10b981', color: '#fff', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}
                        >
                            + Stock Move
                        </Link>
                        <Link
                            href="/products/create"
                            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}
                        >
                            + New Product
                        </Link>
                    </div>
                )}
            </div>

            {/* Quick Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '24px' }}>
                <div style={cardStyle}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>TOTAL PRODUCTS</span>
                    <h2 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#0f172a' }}>{metrics?.total_products ?? 0}</h2>
                </div>
                <div style={cardStyle}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>CATEGORIES</span>
                    <h2 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#0f172a' }}>{metrics?.total_categories ?? 0}</h2>
                </div>
                <div style={{ ...cardStyle, borderLeft: '4px solid #ef4444' }}>
                    <span style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>LOW STOCK ITEMS (≤ 5)</span>
                    <h2 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#dc2626' }}>{metrics?.low_stock_count ?? 0}</h2>
                </div>
                <div style={cardStyle}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>STOCK AUDITS LOGGED</span>
                    <h2 style={{ fontSize: '28px', margin: '10px 0 0 0', color: '#0f172a' }}>{metrics?.total_logs ?? 0}</h2>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Recent Stock Movements</h3>
                    <Link href="/stock-logs" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>View All →</Link>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <th style={{ padding: '8px 12px' }}>Product</th>
                            <th style={{ padding: '8px 12px' }}>Action</th>
                            <th style={{ padding: '8px 12px' }}>Quantity</th>
                            <th style={{ padding: '8px 12px' }}>User</th>
                            <th style={{ padding: '8px 12px' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recent_logs.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No recent stock adjustments.</td></tr>
                        ) : (
                            recent_logs.map(log => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                    <td style={{ padding: '10px 12px', fontWeight: '600' }}>{log.product?.name}</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            backgroundColor: log.type === 'IN' ? '#dcfce7' : '#fee2e2',
                                            color: log.type === 'IN' ? '#166534' : '#991b1b'
                                        }}>
                                            {log.type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px 12px', fontWeight: '600' }}>{log.quantity_change}</td>
                                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{log.user?.name}</td>
                                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{new Date(log.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}