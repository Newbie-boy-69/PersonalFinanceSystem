import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '../Components/FlashMessage';

export default function AppLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url, props } = usePage();
    const user = props.auth?.user;

    const hamburgerBtnRef = useRef(null);
    const drawerRef = useRef(null);
    const closeBtnRef = useRef(null);
    const wasMobileOpen = useRef(false);

    const mainLinks = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            ),
        },
        {
            label: 'Transactions',
            href: '/transactions',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
            ),
        },
        {
            label: 'Categories',
            href: '/categories',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.386a9.96 9.96 0 003.585-3.585c.486-.827.313-1.908-.386-2.607L9.464 5.25A2.25 2.25 0 008.868 4.659L9.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
            ),
        },
        {
            label: 'Budgets',
            href: '/budgets',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
            ),
        },
        {
            label: 'Savings Goals',
            href: '/savings-goals',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
            ),
        },
        {
            label: 'Reports',
            href: '/reports',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
            ),
        },
    ];

    const bottomLinks = [
        {
            label: 'How to Use',
            href: '/how-to-use',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
            ),
        },
        {
            label: 'Account',
            href: '/account',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            ),
        },
    ];

    // Correction 3: Extract pathname to ensure query parameters (e.g. /reports?month=2026-11) match correctly
    const currentPathname = url ? url.split('?')[0].split('#')[0] : '';

    const isActive = (href) => {
        return currentPathname === href || currentPathname.startsWith(href + '/');
    };

    // Correction 1: Focus management (move focus into drawer on open, restore to hamburger on close)
    useEffect(() => {
        if (mobileOpen) {
            wasMobileOpen.current = true;
            const frameId = requestAnimationFrame(() => {
                if (closeBtnRef.current) {
                    closeBtnRef.current.focus();
                } else if (drawerRef.current) {
                    const firstFocusable = drawerRef.current.querySelector(
                        'button, a[href], [tabindex]:not([tabindex="-1"])'
                    );
                    firstFocusable?.focus();
                }
            });
            return () => cancelAnimationFrame(frameId);
        } else if (wasMobileOpen.current) {
            wasMobileOpen.current = false;
            hamburgerBtnRef.current?.focus();
        }
    }, [mobileOpen]);

    // Correction 1 & 5: Keyboard trap (Tab / Shift+Tab) & Escape handling while drawer is open
    useEffect(() => {
        if (!mobileOpen) {
            return;
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setMobileOpen(false);
                return;
            }

            if (e.key === 'Tab' && drawerRef.current) {
                const focusable = drawerRef.current.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) {
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first || !drawerRef.current.contains(document.activeElement)) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last || !drawerRef.current.contains(document.activeElement)) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mobileOpen]);

    // Correction 2: Body scroll restoration (preserve previous value and restore on close/unmount)
    useEffect(() => {
        if (!mobileOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileOpen]);

    // Correction 4 & 5: Responsive resize listener (auto-close mobile drawer when viewport reaches desktop >=1024px)
    useEffect(() => {
        if (!mobileOpen) {
            return;
        }

        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        const handleMediaChange = (e) => {
            if (e.matches) {
                setMobileOpen(false);
            }
        };

        if (mediaQuery.matches) {
            setMobileOpen(false);
            return;
        }

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange);
            return () => mediaQuery.removeEventListener('change', handleMediaChange);
        } else {
            mediaQuery.addListener(handleMediaChange);
            return () => mediaQuery.removeListener(handleMediaChange);
        }
    }, [mobileOpen]);

    const renderNavLinks = (onItemClick) => (
        <>
            <div className="space-y-1">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Menu
                </p>
                {mainLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onItemClick}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                active
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}>
                                {link.icon}
                            </span>
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-800/80 space-y-1">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    System & Preferences
                </p>
                {bottomLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onItemClick}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                active
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}>
                                {link.icon}
                            </span>
                            <span>{link.label}</span>
                        </Link>
                    );
                })}

                {/* User Info Capsule */}
                {user && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60 px-3 py-2 flex items-center gap-3 bg-slate-800/40 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-sky-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-200 truncate leading-tight">
                                {user.name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
                                {user.email}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#f4f6f9] text-[#333] overflow-x-hidden">

            {/* Desktop Persistent Left Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:fixed lg:inset-y-0 bg-slate-900 text-white border-r border-slate-800 z-30">
                {/* Branding Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 font-black text-lg tracking-wider shrink-0">
                        F
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base font-bold tracking-tight text-white leading-none">
                            FUNDA-SYSTEM
                        </h1>
                        <p className="text-[11px] font-medium text-slate-400 mt-1 truncate">
                            Personal Finance
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="flex-1 flex flex-col p-4 overflow-y-auto" aria-label="Desktop Navigation">
                    {renderNavLinks()}
                </nav>
            </aside>

            {/* Mobile Top Navigation Header */}
            <header className="lg:hidden sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <button
                        ref={hamburgerBtnRef}
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Open navigation sidebar"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation-drawer"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            F
                        </div>
                        <span className="font-bold text-sm tracking-tight text-white">
                            FUNDA-SYSTEM
                        </span>
                    </div>
                </div>

                <Link
                    href="/account"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5"
                    aria-label="Account"
                >
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-sky-400 border border-slate-700 flex items-center justify-center font-bold text-xs">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                </Link>
            </header>

            {/* Mobile Slide-Out Sidebar Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop Overlay */}
                    <div
                        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Sliding Drawer */}
                    <aside
                        id="mobile-navigation-drawer"
                        ref={drawerRef}
                        className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 text-white z-50 flex flex-col shadow-2xl border-r border-slate-800 animate-in slide-in-from-left duration-200"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation drawer"
                    >
                        {/* Drawer Header with Close Button */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                                    F
                                </div>
                                <span className="text-base font-bold tracking-tight text-white">
                                    FUNDA-SYSTEM
                                </span>
                            </div>
                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Close navigation sidebar"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links in Drawer */}
                        <nav className="flex-1 flex flex-col p-4 overflow-y-auto" aria-label="Mobile Navigation">
                            {renderNavLinks(() => setMobileOpen(false))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main Content Area (offset by left sidebar on desktop) */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
                {/* Flash Notifications */}
                <FlashMessage />

                {/* Page Main Content */}
                <main className="w-full max-w-[1200px] mx-auto my-6 px-4 sm:px-6 lg:px-8 flex-1">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs text-center py-4 px-6 mt-auto">
                    <p>
                        <span className="font-semibold text-slate-300">FUNDA-SYSTEM</span> &bull; Personal Savings and Expense Monitoring System
                    </p>
                </footer>
            </div>

        </div>
    );
}
