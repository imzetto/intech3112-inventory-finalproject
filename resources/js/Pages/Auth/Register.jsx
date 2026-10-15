import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AuthLayout title="Create an Account">
            <Head title="Create an Account" />
            <form onSubmit={submit}>
                <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.name ? '1px solid #ef4444' : '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
                    {errors.name && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Email Address</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
                    {errors.email && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
                    {errors.password && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.password}</span>}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                    />
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
                    {processing ? 'Registering...' : 'Register'}
                </button>

                <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Log In
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}