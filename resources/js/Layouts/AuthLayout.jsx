export default function AuthLayout({ title, children }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                padding: '30px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '22px', fontWeight: 'bold' }}>
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}