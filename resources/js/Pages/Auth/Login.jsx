import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    // Quick-fill helper for presentations & testing
    const fillCredentials = (email, password) => {
        setData((prev) => ({
            ...prev,
            email,
            password,
        }));
    };

    return (
        <AuthLayout title="Sign In" subtitle="Enter your credentials to access the system.">
            {/* Demo Quick-Fill Bar */}
            <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '20px',
                fontSize: '12.5px',
                color: '#1e40af'
            }}>
                <Head title="Sign In" />
                <span style={{ fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Quick-Fill Demo Credentials:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={() => fillCredentials('admin@example.com', 'password123')}
                        style={{
                            padding: '3px 8px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #93c5fd',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: '600',
                            color: '#1d4ed8',
                            cursor: 'pointer'
                        }}
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => fillCredentials('manager@example.com', 'password123')}
                        style={{
                            padding: '3px 8px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #93c5fd',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: '600',
                            color: '#1d4ed8',
                            cursor: 'pointer'
                        }}
                    >
                        Manager
                    </button>
                    <button
                        type="button"
                        onClick={() => fillCredentials('user@example.com', 'password123')}
                        style={{
                            padding: '3px 8px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #93c5fd',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: '600',
                            color: '#1d4ed8',
                            cursor: 'pointer'
                        }}
                    >
                        User
                    </button>
                </div>
            </div>

            <form onSubmit={submit}>
                {/* Email Field */}
                <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                        Email Address <span style={{ color: '#e11d48' }}>*</span>
                    </label>
                    <input
                        type="email"
                        required
                        autoFocus
                        placeholder="name@company.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: errors.email ? '1px solid #e11d48' : '1px solid #cbd5e1',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                    />
                    {errors.email && (
                        <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {errors.email}
                        </span>
                    )}
                </div>

                {/* Password Field with Show/Hide toggle */}
                <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                            Password <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#2563eb',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: errors.password ? '1px solid #e11d48' : '1px solid #cbd5e1',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                    />
                    {errors.password && (
                        <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {errors.password}
                        </span>
                    )}
                </div>

                {/* Remember Me */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '22px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#475569' }}>
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            style={{ borderRadius: '4px', accentColor: '#2563eb' }}
                        />
                        Remember this session
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                    style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: '6px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: processing ? 'not-allowed' : 'pointer'
                    }}
                >
                    {processing ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                New employee?{' '}
                <Link href="/register" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
                    Create account
                </Link>
            </div>
        </AuthLayout>
    );
}