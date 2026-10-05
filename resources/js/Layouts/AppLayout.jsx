import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const roles = user?.roles || [];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
            <nav style={{ backgroundColor: '#1e293b', color: '#ffffff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>📦 InventoryCore</span>
                        <Link href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard</Link>
                        <Link href="/categories" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Categories</Link>
                        <Link href="/products" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Products</Link>
                        <Link href="/stock-logs" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Stock Logs</Link>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px' }}>
                        {user?.name} 
                        <strong style={{ marginLeft: '6px', backgroundColor: '#334155', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                            {roles.join(', ') || 'No Role'}
                        </strong>
                    </span>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        style={{
                            backgroundColor: '#ef4444',
                            border: 'none',
                            color: '#ffffff',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        Logout
                    </Link>
                </div>
            </nav>

            <main style={{ maxWidth: '1100px', width: '100%', margin: '30px auto', padding: '0 20px', flex: 1 }}>
                {children}
            </main>
        </div>
    );
}