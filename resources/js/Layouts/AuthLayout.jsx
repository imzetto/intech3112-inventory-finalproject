import React from 'react';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            padding: '24px 16px',
            boxSizing: 'border-box'
        }}>
            <div className="animate-fade" style={{ width: '100%', maxWidth: '440px' }}>
                {/* Brand Logo Header */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: '#2563eb',
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: '800',
                        fontSize: '20px',
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.25)',
                        marginBottom: '12px'
                    }}>
                        IC
                    </div>
                    <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
                        Inventory<span style={{ color: '#2563eb' }}>Core</span>
                    </h1>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                        Enterprise Inventory & Role Management System
                    </p>
                </div>

                {/* Main Card */}
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '32px',
                    boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05)'
                }}>
                    <div style={{ marginBottom: '22px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p style={{ margin: 0, color: '#64748b', fontSize: '13.5px' }}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#94a3b8' }}>
                    InventoryCore Platform &copy; 2026. All rights reserved.
                </div>
            </div>
        </div>
    );
}