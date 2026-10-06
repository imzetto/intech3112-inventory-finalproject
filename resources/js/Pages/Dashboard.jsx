import AppLayout from '../Layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';

export default function Dashboard({ metrics, recent_logs = [] }) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const canManage = roles.includes('Admin') || roles.includes('Manager');

    return (
        <AppLayout breadcrumbs={[{ label: 'Dashboard' }]}>
            {/* Header Greeting Banner */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '24px 28px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                        Operational Overview
                    </h1>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                        System live status for <strong>{auth?.user?.name}</strong> ({roles.join(', ')})
                    </p>
                </div>
                {canManage && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link
                            href="/stock-logs/create"
                            className="btn-secondary"
                            style={{ padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13.5px' }}
                        >
                            + Stock Move
                        </Link>
                        <Link
                            href="/products/create"
                            className="btn-primary"
                            style={{ padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13.5px' }}
                        >
                            + Add Product
                        </Link>
                    </div>
                )}
            </div>

            {/* 4 Key Stat Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '28px' }}>
                <div className="stat-card" style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Total Catalogue</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginTop: '8px' }}>
                        {metrics?.total_products ?? 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Active inventory items</div>
                </div>

                <div className="stat-card" style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Departments</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginTop: '8px' }}>
                        {metrics?.total_categories ?? 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Product classifications</div>
                </div>

                <div className="stat-card" style={{
                    backgroundColor: '#ffffff',
                    padding: '22px',
                    borderRadius: '12px',
                    border: '1px solid #fecaca',
                    borderLeft: '5px solid #dc2626'
                }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Low Stock Warning</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#dc2626', marginTop: '8px' }}>
                        {metrics?.low_stock_count ?? 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>Items at or below 5 units</div>
                </div>

                <div className="stat-card" style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Movement Audits</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginTop: '8px' }}>
                        {metrics?.total_logs ?? 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Total recorded transactions</div>
                </div>
            </div>

            {/* Recent Audit Log Preview */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '18px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Recent Inventory Movements</h2>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Latest 5 tracked warehouse transactions</span>
                    </div>
                    <Link href="/stock-logs" style={{ fontSize: '13.5px', color: '#2563eb', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        View All Logs →
                    </Link>
                </div>

                {/* Horizontal Scroll Wrapper */}
                <div className="table-responsive">
                    <table style={{ minWidth: '560px', width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>Product</th>
                                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>Action</th>
                                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>Units</th>
                                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>Operator</th>
                                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent_logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                                        No stock movements recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                recent_logs.map((log) => (
                                    <tr key={log.id} className="data-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap' }}>
                                            {log.product?.name}
                                        </td>
                                        <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '3px 8px',
                                                borderRadius: '9999px',
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                letterSpacing: '0.4px',
                                                whiteSpace: 'nowrap',
                                                backgroundColor: log.type === 'IN' ? '#ecfdf5' : '#fffbeb',
                                                color: log.type === 'IN' ? '#059669' : '#d97706',
                                                border: `1px solid ${log.type === 'IN' ? '#a7f3d0' : '#fde68a'}`
                                            }}>
                                                {log.type === 'IN' ? 'STOCK IN' : 'STOCK OUT'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 20px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                                            {log.quantity_change}
                                        </td>
                                        <td style={{ padding: '14px 20px', color: '#64748b', whiteSpace: 'nowrap' }}>
                                            {log.user?.name}
                                        </td>
                                        <td style={{ padding: '14px 20px', color: '#64748b', whiteSpace: 'nowrap' }}>
                                            {new Date(log.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}