import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

const links = [
    { label: 'Dashboard', href: '/dashboard', icon: '◈' },
    { label: 'Transactions', href: '/transactions', icon: '↔' },
    { label: 'Categories', href: '/categories', icon: '◉' },
    { label: 'Budgets', href: '/budgets', icon: '▤' },
    { label: 'Savings Goals', href: '/savings-goals', icon: '◷' },
    { label: 'Reports', href: '/reports', icon: '▥' },
];

export default function AppLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;
    const path = window.location.pathname;
    const initials = (user?.name || 'User').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

    const sidebar = (
        <>
            <div className="finance-brand">
                <div className="finance-brand-mark">₱</div>
                <div><strong>Financia</strong><span>PERSONAL FINANCE</span></div>
            </div>
            <div className="finance-nav-label">WORKSPACE</div>
            <nav className="finance-nav">
                {links.map((link) => {
                    const active = path === link.href || (link.href !== '/dashboard' && path.startsWith(link.href));
                    return <a key={link.href} href={link.href} className={`finance-nav-link ${active ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                        <span className="finance-nav-icon">{link.icon}</span><span>{link.label}</span>{active && <span className="finance-nav-dot" />}
                    </a>;
                })}
            </nav>
            <div className="finance-sidebar-bottom">
                <a href="/how-to-use" className={`finance-nav-link ${path === '/how-to-use' ? 'active' : ''}`}><span className="finance-nav-icon">?</span><span>How to Use</span></a>
                <a href="/account" className={`finance-nav-link ${path === '/account' ? 'active' : ''}`}><span className="finance-nav-icon">⚙</span><span>Account</span></a>
                <button type="button" onClick={() => router.post('/logout')} className="finance-nav-link finance-logout-link"><span className="finance-nav-icon">↪</span><span>Log out</span></button>
                <div className="finance-user-card"><div className="finance-avatar">{user?.profile_photo_url ? <img src={user.profile_photo_url} alt="Profile" className="h-full w-full rounded-full object-cover" /> : initials}</div><div className="finance-user-info"><strong>{user?.name || 'Account'}</strong><span>Personal account</span></div><a href="/account" className="finance-user-more" aria-label="Account settings">···</a></div>
            </div>
        </>
    );

    return <div className="finance-shell">
        <aside className="finance-sidebar">{sidebar}</aside>
        {mobileOpen && <div className="finance-mobile-backdrop" onClick={() => setMobileOpen(false)} />}
        <aside className={`finance-mobile-sidebar ${mobileOpen ? 'open' : ''}`}>{sidebar}</aside>
        <div className="finance-main-shell">
            <header className="finance-topbar"><button className="finance-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle sidebar">☰</button><div className="finance-topbar-title">Personal Finance</div><div className="finance-topbar-actions"><span className="finance-topbar-date">Your money, organized.</span><a href="/account" className="finance-top-avatar">{user?.profile_photo_url ? <img src={user.profile_photo_url} alt="Profile" className="h-full w-full rounded-full object-cover" /> : initials}</a></div></header>
            <main className="finance-content">{children}</main>
            <footer className="finance-footer">Personal Finance System <span>·</span> Stay mindful. Spend wisely.</footer>
        </div>
    </div>;
}
