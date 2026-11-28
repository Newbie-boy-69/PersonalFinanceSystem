import { useForm, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] text-slate-900 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Brand panel */}
            <section className="relative hidden min-h-screen overflow-hidden bg-[#101d35] px-12 py-10 text-white lg:flex lg:flex-col xl:px-20">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-blue-400/10 blur-3xl" />
                <div className="relative flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-2xl font-black text-[#10243a] shadow-lg shadow-emerald-950/30">₱</div>
                    <div>
                        <p className="text-lg font-bold tracking-tight">Personal Finance</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Management System</p>
                    </div>
                </div>

                <div className="relative my-auto max-w-xl py-16">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" /> Your money, made clearer
                    </div>
                    <h1 className="max-w-lg text-5xl font-bold leading-[1.12] tracking-tight xl:text-6xl">Take control of your <span className="text-emerald-300">financial future.</span></h1>
                    <p className="mt-6 max-w-md text-base leading-7 text-slate-300">Stay on top of your income, expenses, and savings. Make informed decisions with a clearer view of your finances.</p>

                    <div className="mt-12 grid max-w-lg grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                            <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-emerald-300/15 text-xl text-emerald-200">↗</div>
                            <p className="font-semibold">Track your spending</p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">Understand where your money goes.</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                            <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-blue-300/15 text-xl text-blue-200">◎</div>
                            <p className="font-semibold">Build better habits</p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">Keep your savings goals in sight.</p>
                        </div>
                    </div>
                </div>
                <p className="relative text-xs text-slate-500">Personal Savings and Expense Monitoring System</p>
            </section>

            {/* Login panel */}
            <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                <div className="w-full max-w-[430px]">
                    <div className="mb-10 text-center lg:hidden">
                        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-[#10243a] text-2xl font-black text-emerald-300 shadow-lg">₱</div>
                        <p className="text-xl font-bold tracking-tight text-slate-900">Personal Finance System</p>
                        <p className="mt-1 text-sm text-slate-500">Manage your money with confidence.</p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.25)] sm:p-10">
                        <div className="mb-8">
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Welcome back</p>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">Enter your details below to continue to your dashboard.</p>
                        </div>

                        {flash?.status && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{flash.status}</div>}
                        {Object.keys(errors).length > 0 && (
                            <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                                    <Link href="/forgot-password" className="text-xs font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-4 text-xs font-bold text-slate-500 transition hover:text-emerald-700">
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={processing} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10243a] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#183451] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">
                                {processing ? 'Signing in...' : 'Sign in'}
                                {!processing && <span aria-hidden="true">→</span>}
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">New here?</span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        <p className="text-center text-sm text-slate-500">Don't have an account?{' '}
                            <Link href="/register" className="font-bold text-emerald-700 transition hover:text-emerald-800 hover:underline">Create an account</Link>
                        </p>
                    </div>
                    <p className="mt-7 text-center text-xs text-slate-400">© {new Date().getFullYear()} Personal Finance System. All rights reserved.</p>
                </div>
            </main>
        </div>
    );
}
