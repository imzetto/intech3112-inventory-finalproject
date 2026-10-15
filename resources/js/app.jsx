import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'InventoryCore';

createInertiaApp({
    title: (title) => title ? `${title} - InventoryCore` : 'InventoryCore',
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#2563eb',
    },
});

// 1. Invalidate BFCache snapshot when navigating via browser back/forward
window.addEventListener('pageshow', (event) => {
    if (event.persisted || (performance.navigation && performance.navigation.type === 2)) {
        window.location.reload();
    }
});

// 2. Intercept popstate (Back/Forward clicks) to force fresh server revalidation
window.addEventListener('popstate', () => {
    window.location.reload();
});