import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AuthLayout title="Inventory System - Login">
            <form onSubmit={submit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
                            boxSizing: 'border-box'
                        }}
                    />
                    {errors.email && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {errors.email}
                        </span>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
                            boxSizing: 'border-box'
                        }}
                    />
                    {errors.password && (
                        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {errors.password}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: processing ? 'not-allowed' : 'pointer'
                    }}
                >
                    {processing ? 'Signing in...' : 'Sign In'}
                </button>

                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                    Don't have an account?{' '}
                    <Link href="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Register
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}