import AppLayout from '../../Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ products = [] }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [step, setStep] = useState('FORM'); // 'FORM' | 'CONFIRM'
    const [localError, setLocalError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        type: '', // Deliberately blank so user must make an intentional choice
        quantity_change: '',
        reason: '',
    });

    const handleProductChange = (e) => {
        const id = e.target.value;
        setData('product_id', id);
        const prod = products.find(p => String(p.id) === String(id));
        setSelectedProduct(prod || null);
        setLocalError('');
    };

    const handleTypeChange = (type) => {
        setData('type', type);
        setLocalError('');
    };

    const handleQuantityChange = (val) => {
        setData('quantity_change', val);
        setLocalError('');
    };

    // Client-side pre-validation
    const handleReviewClick = (e) => {
        e.preventDefault();
        setLocalError('');

        if (!data.product_id) {
            setLocalError('Please select a product from the list.');
            return;
        }
        if (!data.type) {
            setLocalError('Please specify whether this is a Stock In or Stock Out adjustment.');
            return;
        }
        const qty = parseInt(data.quantity_change, 10);
        if (isNaN(qty) || qty <= 0) {
            setLocalError('Quantity must be a positive whole number greater than 0.');
            return;
        }

        if (data.type === 'OUT' && selectedProduct && qty > selectedProduct.stock) {
            setLocalError(`Insufficient inventory. You cannot remove ${qty} units because only ${selectedProduct.stock} are currently in stock.`);
            return;
        }

        // Open Confirmation Step
        setStep('CONFIRM');
    };

    const handleFinalConfirm = () => {
        post('/stock-logs', {
            onError: () => setStep('FORM'),
        });
    };

    const currentStock = selectedProduct ? selectedProduct.stock : 0;
    const qtyNumber = parseInt(data.quantity_change, 10) || 0;
    const projectedStock = data.type === 'IN' ? currentStock + qtyNumber : currentStock - qtyNumber;

    return (
        <AppLayout breadcrumbs={[{ label: 'Stock Logs', href: '/stock-logs' }, { label: 'Record Adjustment' }]}>
            <Head title="New Stock Adjustment" />
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '32px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}>
                    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
                            Record Stock Movement
                        </h1>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13.5px' }}>
                            Every transaction is audited with your user credentials and timestamp.
                        </p>
                    </div>

                    {localError && (
                        <div style={{
                            backgroundColor: '#fff1f2',
                            border: '1px solid #fecdd3',
                            color: '#9f1239',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            fontSize: '13.5px',
                            fontWeight: '500',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <span>⚠️</span>
                            <span>{localError}</span>
                        </div>
                    )}

                    {/* Step 1: Form Inputs */}
                    {step === 'FORM' && (
                        <form onSubmit={handleReviewClick}>
                            {/* Product Selection */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                                    Product <span style={{ color: '#e11d48' }}>*</span>
                                </label>
                                <select
                                    value={data.product_id}
                                    onChange={handleProductChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: errors.product_id ? '1px solid #e11d48' : '1px solid #cbd5e1',
                                        fontSize: '14px',
                                        backgroundColor: '#ffffff'
                                    }}
                                >
                                    <option value="">-- Choose a product to adjust --</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} (SKU: {p.sku}) — Current Stock: {p.stock} units
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.product_id}</span>}
                            </div>

                            {/* Adjustment Type Cards */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '8px' }}>
                                    Adjustment Type <span style={{ color: '#e11d48' }}>*</span>
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('IN')}
                                        style={{
                                            padding: '14px',
                                            borderRadius: '8px',
                                            border: data.type === 'IN' ? '2px solid #059669' : '1px solid #cbd5e1',
                                            backgroundColor: data.type === 'IN' ? '#ecfdf5' : '#ffffff',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: '#065f46', fontSize: '14px' }}>
                                            <span>📥</span> Stock In
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                                            Add inventory from supplier or purchase
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('OUT')}
                                        style={{
                                            padding: '14px',
                                            borderRadius: '8px',
                                            border: data.type === 'OUT' ? '2px solid #d97706' : '1px solid #cbd5e1',
                                            backgroundColor: data.type === 'OUT' ? '#fffbeb' : '#ffffff',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: '#92400e', fontSize: '14px' }}>
                                            <span>📤</span> Stock Out
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                                            Deduct for dispatched orders or damage
                                        </span>
                                    </button>
                                </div>
                                {errors.type && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.type}</span>}
                            </div>

                            {/* Quantity Input with Current Stock Reference */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <label style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>
                                        Quantity <span style={{ color: '#e11d48' }}>*</span>
                                    </label>
                                    {selectedProduct && (
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                                            Available in warehouse: <strong>{selectedProduct.stock} units</strong>
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter units to move..."
                                    value={data.quantity_change}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: errors.quantity_change ? '1px solid #e11d48' : '1px solid #cbd5e1',
                                        fontSize: '14px'
                                    }}
                                />
                                {errors.quantity_change && <span style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.quantity_change}</span>}
                            </div>

                            {/* Reason / Reference */}
                            <div style={{ marginBottom: '28px' }}>
                                <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>
                                    Adjustment Reason / Reference
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. PO-8491 delivery, quarterly inventory audit"
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <Link
                                    href="/stock-logs"
                                    className="btn-secondary"
                                    style={{ padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ padding: '10px 22px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Review Adjustment →
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 2: Verification & Confirmation Modal View */}
                    {step === 'CONFIRM' && (
                        <div className="animate-fade">
                            <div style={{
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                padding: '20px',
                                marginBottom: '24px'
                            }}>
                                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Stock Adjustment Summary
                                </span>

                                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                                        <span style={{ color: '#64748b' }}>Target Product:</span>
                                        <strong style={{ color: '#0f172a' }}>{selectedProduct?.name}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                                        <span style={{ color: '#64748b' }}>Action Type:</span>
                                        <span style={{
                                            fontWeight: '700',
                                            color: data.type === 'IN' ? '#059669' : '#d97706'
                                        }}>
                                            {data.type === 'IN' ? '+ Stock In' : '- Stock Out'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                                        <span style={{ color: '#64748b' }}>Units to Move:</span>
                                        <strong style={{ color: '#0f172a' }}>{qtyNumber} units</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                                        <span style={{ color: '#64748b' }}>Current Inventory:</span>
                                        <span>{currentStock} units</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                                        <span style={{ color: '#0f172a', fontWeight: '700' }}>Projected Stock Level:</span>
                                        <span style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb' }}>
                                            {projectedStock} units
                                        </span>
                                    </div>
                                    {data.reason && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', fontSize: '13px', color: '#64748b' }}>
                                            <span>Reference:</span>
                                            <em>{data.reason}</em>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0' }}>
                                ⚠️ Clicking <strong>Confirm & Apply</strong> will immediately recalculate the product's warehouse balance and create an immutable audit record.
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => setStep('FORM')}
                                    disabled={processing}
                                    className="btn-secondary"
                                    style={{ padding: '10px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    ← Modify Values
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFinalConfirm}
                                    disabled={processing}
                                    style={{
                                        backgroundColor: data.type === 'IN' ? '#059669' : '#d97706',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '10px 22px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: processing ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {processing ? 'Applying Changes...' : 'Confirm & Apply'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}