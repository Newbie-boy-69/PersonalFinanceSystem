import { useState } from 'react';

export default function AppLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Categories', href: '/categories' },
        { label: 'Transactions', href: '/transactions' },
        { label: 'Budgets', href: '/budgets' },
        { label: 'Savings', href: '/savings-goals' },
        { label: 'Reports', href: '/reports' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-[#333]">

            {/* Navigation Bar */}
            <nav className="relative z-20 bg-slate-800 text-white px-6 py-4 flex items-center gap-3">

                <h2 className="text-xl font-bold whitespace-nowrap">
                    Personal Finance System
                </h2>

                <div className="ml-auto flex items-center gap-2">

                    <a
                        href="/how-to-use"
                        className="px-3 py-2 rounded hover:bg-slate-700 whitespace-nowrap"
                    >
                        How to Use
                    </a>

                    {/* Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="border border-slate-500 rounded px-3 py-2 text-xl hover:bg-slate-700"
                        aria-label="Toggle navigation menu"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>

                    <a
                        href="/account"
                        className="border border-slate-500 rounded px-3 py-2 whitespace-nowrap hover:bg-slate-700"
                    >
                        Account
                    </a>

                </div>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute top-full right-6 mt-1 w-56 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-hidden">

                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-3 hover:bg-slate-700 hover:text-sky-400"
                            >
                                {link.label}
                            </a>
                        ))}

                    </div>
                )}

            </nav>

            {/* Main Content */}
            <main className="w-full max-w-[1200px] mx-auto my-8 px-6 flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-800 text-white text-center p-5 mt-auto">
                Personal Savings and Expense Monitoring System
            </footer>

        </div>
    );
}
