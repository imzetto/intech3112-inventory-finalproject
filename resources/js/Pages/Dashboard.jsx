import AppLayout from '../Layouts/AppLayout';
import { usePage, Link } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];

    return (
        <AppLayout>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Welcome back, {auth?.user?.name}!
                </h1>
                <p style={{ color: '#4b5563', marginBottom: '20px' }}>
                    Current Role: <strong>{roles.join(', ')}</strong>
                </p>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <Link
                        href="/products"
                        style={{
                            padding: '12px 20px',
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: '600'
                        }}
                    >
                        Browse Inventory
                    </Link>
                    <Link
                        href="/categories"
                        style={{
                            padding: '12px 20px',
                            backgroundColor: '#475569',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: '600'
                        }}
                    >
                        Manage Categories
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}