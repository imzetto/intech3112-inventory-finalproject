import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Toast from '../Components/Toast';

export default function AppLayout({ children, breadcrumbs = [] }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();
    const user = auth?.user;
    const roles = user?.roles || [];
    const [mobileOpen, setMobileOpen] = useState(false);

    const isAdmin = roles.includes('Admin');

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', active: url === '/dashboard' },
        { name: 'Categories', href: '/categories', active: url.startsWith('/categories') },
        { name: 'Products', href: '/products', active: url.startsWith('/products') },
        { name: 'Stock Logs', href: '/stock-logs', active: url.startsWith('/stock-logs') },
        ...(isAdmin ? [{ name: 'User Management', href: '/users', active: url.startsWith('/users') }] : []),
    ];

    const roleBadge = roles.includes('Admin')
        ? { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' }
        : roles.includes('Manager')
        ? { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' }
        : { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Toast flash={flash} />

            {/* Header */}
            <header style={{ width: '100%', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 40 }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    
                    {/* Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                            <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px' }}>
                                IC
                            </div>
                            <span style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.4px' }}>
                                Inventory<span style={{ color: '#60a5fa' }}>Core</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="nav-desktop" style={{ display: 'flex', gap: '6px' }}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    style={{
                                        color: item.active ? '#ffffff' : '#94a3b8',
                                        backgroundColor: item.active ? '#1e293b' : 'transparent',
                                        padding: '7px 12px',
                                        borderRadius: '6px',
                                        fontSize: '13.5px',
                                        fontWeight: item.active ? '600' : '500',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#f1f5f9', fontSize: '13.5px', fontWeight: '500' }}>{user?.name}</span>
                            <span style={{
                                backgroundColor: roleBadge.bg,
                                color: roleBadge.color,
                                border: `1px solid ${roleBadge.border}`,
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: '700',
                                textTransform: 'uppercase'
                            }}>
                                {roles[0] || 'User'}
                            </span>
                            <Link href="/logout" method="post" as="button" className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                                Log Out
                            </Link>
                        </div>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            type="button"
                            className="nav-mobile-toggle"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                background: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '6px',
                                color: '#ffffff',
                                padding: '6px 10px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {mobileOpen && (
                    <div className="nav-mobile-drawer" style={{ backgroundColor: '#0f172a', borderTop: '1px solid #1e293b', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #1e293b' }}>
                            <span style={{ color: '#f8fafc', fontWeight: '600', fontSize: '14px' }}>{user?.name}</span>
                            <span style={{ backgroundColor: roleBadge.bg, color: roleBadge.color, padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700' }}>
                                {roles[0] || 'User'}
                            </span>
                        </div>

                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    color: item.active ? '#60a5fa' : '#cbd5e1',
                                    padding: '8px 0',
                                    fontSize: '14px',
                                    fontWeight: item.active ? '700' : '500',
                                    textDecoration: 'none'
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div style={{ paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '8px',
                                    backgroundColor: '#1e293b',
                                    color: '#f8fafc',
                                    border: '1px solid #334155',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                    cursor: 'pointer'
                                }}
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <div style={{ width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '10px 0' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                        <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
                        {breadcrumbs.map((b, i) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: '#cbd5e1' }}>/</span>
                                {b.href ? (
                                    <Link href={b.href} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>{b.label}</Link>
                                ) : (
                                    <span style={{ color: '#0f172a', fontWeight: '600' }}>{b.label}</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Content Area */}
            <main style={{ maxWidth: '1280px', width: '100%', margin: '20px auto', padding: '0 16px', flex: 1 }}>
                <div className="animate-fade">
                    {children}
                </div>
            </main>
        </div>
    );
}