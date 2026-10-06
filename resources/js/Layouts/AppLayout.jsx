import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Toast from '../Components/Toast';

export default function AppLayout({ children, breadcrumbs = [] }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();
    const user = auth?.user;
    const roles = user?.roles || [];
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', active: url === '/dashboard' },
        { name: 'Categories', href: '/categories', active: url.startsWith('/categories') },
        { name: 'Products', href: '/products', active: url.startsWith('/products') },
        { name: 'Stock Logs', href: '/stock-logs', active: url.startsWith('/stock-logs') },
    ];

    const roleBadgeColor = roles.includes('Admin')
        ? { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' }
        : roles.includes('Manager')
        ? { bg: '#e0e7ff', text: '#3730a3', border: '#a5b4fc' }
        : { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <Toast flash={flash} />

            {/* Main Header */}
            <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#ffffff' }}>
                            <span style={{ fontSize: '22px' }}>📦</span>
                            <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>InventoryCore</span>
                        </Link>

                        <nav style={{ display: 'flex', gap: '4px' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    style={{
                                        color: link.active ? '#ffffff' : '#94a3b8',
                                        backgroundColor: link.active ? '#1e293b' : 'transparent',
                                        padding: '8px 14px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: link.active ? '600' : '500',
                                        textDecoration: 'none',
                                        transition: 'background-color 0.15s ease'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
                            <span style={{
                                backgroundColor: roleBadgeColor.bg,
                                color: roleBadgeColor.text,
                                border: `1px solid ${roleBadgeColor.border}`,
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {roles[0] || 'User'}
                            </span>
                        </div>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            style={{
                                backgroundColor: '#1e293b',
                                color: '#e2e8f0',
                                border: '1px solid #334155',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </header>

            {/* Breadcrumb Bar */}
            {breadcrumbs.length > 0 && (
                <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '10px 0' }}>
                    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                        <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
                        {breadcrumbs.map((crumb, idx) => (
                            <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>/</span>
                                {crumb.href ? (
                                    <Link href={crumb.href} style={{ color: '#2563eb', textDecoration: 'none' }}>{crumb.label}</Link>
                                ) : (
                                    <span style={{ color: '#0f172a', fontWeight: '600' }}>{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main style={{ maxWidth: '1240px', width: '100%', margin: '24px auto', padding: '0 20px', flex: 1, boxSizing: 'border-box' }}>
                {children}
            </main>
        </div>
    );
}