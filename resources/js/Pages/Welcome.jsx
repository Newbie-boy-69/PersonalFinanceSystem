import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen overflow-hidden bg-[#f5f8fc] text-slate-900">
            <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
                <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#10243a] text-xl font-black text-emerald-300 shadow-lg">₱</div>
                    <div>
                        <p className="text-base font-bold tracking-tight">Personal Finance</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Management System</p>
                    </div>
                </div>
                <Link href="/login" className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700">
                    Login
                </Link>
            </header>

            <main className="relative mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-14 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
                <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />

                <section className="relative max-w-2xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> A clearer way to manage your money
                    </div>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10243a] sm:text-5xl lg:text-6xl">
                        Your money matters. <span className="text-emerald-600">Make every peso count.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                        Welcome to your Personal Finance Management System. Keep your income and expenses organized, monitor your spending, and stay focused on your savings goals—all in one simple place.
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                        Whether you are planning your monthly budget or checking where your money goes, this system helps you understand your finances and make more confident everyday decisions.
                    </p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link href="/login" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#10243a] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-[#183451]">
                            Get started <span aria-hidden="true" className="text-lg">→</span>
                        </Link>
                        <span className="text-xs leading-5 text-slate-500">Sign in to access your personal finance dashboard.</span>
                    </div>
                    <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Track income and expenses</span>
                        <span className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Plan your budget</span>
                        <span className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Follow savings goals</span>
                    </div>
                </section>

                <section className="relative mx-auto w-full max-w-lg" aria-label="Personal finance features">
                    <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/60 to-sky-200/60 blur-2xl" />
                    <div className="relative rounded-[2rem] border border-white bg-white p-6 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.28)] sm:p-8">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Your financial overview</p>
                                <p className="mt-1 text-lg font-bold text-[#10243a]">Stay informed. Plan ahead.</p>
                            </div>
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-xl text-emerald-700">↗</div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-slate-50 p-5">
                                <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-lg text-emerald-700">＋</div>
                                <p className="text-sm font-bold text-slate-800">Income</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">Keep track of the money you receive.</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-5">
                                <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-lg text-rose-600">−</div>
                                <p className="text-sm font-bold text-slate-800">Expenses</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">See what you spend and where it goes.</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-5">
                                <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-lg text-blue-700">▤</div>
                                <p className="text-sm font-bold text-slate-800">Budgets</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">Set spending limits that work for you.</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-5">
                                <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-lg text-amber-700">◎</div>
                                <p className="text-sm font-bold text-slate-800">Savings goals</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">Keep your goals visible and on track.</p>
                            </div>
                        </div>
                        <div className="mt-5 rounded-2xl bg-[#10243a] p-5 text-white">
                            <p className="text-sm font-semibold">Small steps make a difference.</p>
                            <p className="mt-1 text-xs leading-5 text-slate-300">Build better money habits one day at a time.</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="relative z-10 border-t border-slate-200/80 px-6 py-5 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} Personal Finance Management System
            </footer>
        </div>
    );
}
