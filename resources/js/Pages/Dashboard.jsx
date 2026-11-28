import { usePage, Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { formatCurrency } from '../Utils/formatCurrency';

export default function Dashboard({
    totalIncome = 0,
    totalExpenses = 0,
    currentBalance = 0,
    totalSavings = 0,
}) {
    const { auth } = usePage().props;
    const userName = auth?.user?.name || 'User';

    const numericBalance = Number(currentBalance) || 0;
    const numericIncome = Number(totalIncome) || 0;
    const numericExpenses = Number(totalExpenses) || 0;
    const numericSavings = Number(totalSavings) || 0;

    const isZeroData = numericIncome === 0 && numericExpenses === 0 && numericSavings === 0;

    // Determine balance styling and exact semantic badge
    let balanceConfig = {
        label: 'No Net Balance',
        textColor: 'text-[#17212B]',
        badgeClass: 'bg-slate-100 text-[#64748B] border-[#E2E8F0]',
        dotClass: 'bg-[#64748B]',
    };

    if (numericBalance > 0) {
        balanceConfig = {
            label: 'Positive Balance',
            textColor: 'text-[#059669]',
            badgeClass: 'bg-emerald-50 text-[#047857] border-emerald-200',
            dotClass: 'bg-[#047857]',
        };
    } else if (numericBalance < 0) {
        balanceConfig = {
            label: 'Deficit',
            textColor: 'text-[#C2414B]',
            badgeClass: 'bg-rose-50 text-[#C2414B] border-rose-200',
            dotClass: 'bg-[#C2414B]',
        };
    }

    const quickActions = [
        {
            title: 'Add Transaction',
            description: 'Record income or expense',
            href: '/transactions/create',
            badge: 'Create',
            icon: (
                <svg className="w-4 h-4 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            ),
        },
        {
            title: 'View Transactions',
            description: 'Browse all records',
            href: '/transactions',
            badge: 'History',
            icon: (
                <svg className="w-4 h-4 text-[#18263A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
            ),
        },
        {
            title: 'Manage Budgets',
            description: 'Monitor category limits',
            href: '/budgets',
            badge: 'Limits',
            icon: (
                <svg className="w-4 h-4 text-[#18263A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
        {
            title: 'Savings Goals',
            description: 'Track targets & savings',
            href: '/savings-goals',
            badge: 'Goals',
            icon: (
                <svg className="w-4 h-4 text-[#0F766E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-6 text-[#17212B]">

                {/* Section A: Welcome Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-[#64748B] border border-[#E2E8F0]">
                                Financial Overview
                            </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#17212B] tracking-tight">
                            Welcome back, {userName}
                        </h1>
                        <p className="text-xs text-[#64748B] mt-0.5">
                            Personal Savings and Expense Monitoring System
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            href="/transactions/create"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#18263A] hover:bg-[#263B55] text-white shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#18263A] focus:ring-offset-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Add Transaction</span>
                        </Link>
                    </div>
                </div>

                {/* Section B: Net Transaction Balance Panel */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <div className="space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                    Net Transaction Balance
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${balanceConfig.badgeClass}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${balanceConfig.dotClass}`} aria-hidden="true" />
                                    {balanceConfig.label}
                                </span>
                            </div>

                            <h2
                                className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight tabular-nums break-words ${balanceConfig.textColor}`}
                            >
                                {formatCurrency(numericBalance)}
                            </h2>

                            <p className="text-xs text-[#64748B]">
                                Recorded income minus recorded expenses.
                            </p>
                        </div>

                        {/* Income & Expense Supporting Breakdown */}
                        <div className="flex flex-wrap sm:flex-nowrap items-stretch sm:items-center gap-4 sm:gap-8 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E2E8F0] md:pl-8">
                            <div className="min-w-0 flex-1 sm:flex-initial">
                                <p className="text-xs text-[#64748B] uppercase tracking-wider font-medium">
                                    Total Inflow
                                </p>
                                <p className="text-base sm:text-lg font-bold text-[#047857] tabular-nums mt-0.5 break-words">
                                    {formatCurrency(numericIncome)}
                                </p>
                            </div>

                            <div className="hidden sm:block w-px self-stretch bg-[#E2E8F0]" aria-hidden="true" />

                            <div className="min-w-0 flex-1 sm:flex-initial">
                                <p className="text-xs text-[#64748B] uppercase tracking-wider font-medium">
                                    Total Outflow
                                </p>
                                <p className="text-base sm:text-lg font-bold text-[#C2414B] tabular-nums mt-0.5 break-words">
                                    {formatCurrency(numericExpenses)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section C: Financial Summary Cards */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                            Summary Metrics
                        </h2>

                        {/* Section E: Visually Secondary Reports Shortcut */}
                        <Link
                            href="/reports"
                            className="text-xs font-medium text-[#18263A] hover:text-[#263B55] hover:underline flex items-center gap-1 transition-colors"
                        >
                            <span>View Detailed Reports</span>
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Total Income Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                                    Total Income
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 min-w-0">
                                <p
                                    className="text-lg sm:text-xl lg:text-2xl font-bold text-[#047857] tabular-nums tracking-tight break-words"
                                    title={formatCurrency(numericIncome)}
                                >
                                    {formatCurrency(numericIncome)}
                                </p>
                                <p className="text-xs text-[#64748B] mt-1">
                                    All recorded earnings
                                </p>
                            </div>
                        </div>

                        {/* Total Expenses Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                                    Total Expenses
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C2414B] border border-rose-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 min-w-0">
                                <p
                                    className="text-lg sm:text-xl lg:text-2xl font-bold text-[#C2414B] tabular-nums tracking-tight break-words"
                                    title={formatCurrency(numericExpenses)}
                                >
                                    {formatCurrency(numericExpenses)}
                                </p>
                                <p className="text-xs text-[#64748B] mt-1">
                                    All recorded spending
                                </p>
                            </div>
                        </div>

                        {/* Total Savings Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                                    Total Savings
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0F766E] border border-teal-100 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 min-w-0">
                                <p
                                    className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F766E] tabular-nums tracking-tight break-words"
                                    title={formatCurrency(numericSavings)}
                                >
                                    {formatCurrency(numericSavings)}
                                </p>
                                <p className="text-xs text-[#64748B] mt-1">
                                    Current savings accumulated
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section D: Quick Actions */}
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                        Quick Shortcuts
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="group p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0">
                                        {action.icon}
                                    </div>
                                    <span className="text-[11px] font-medium text-[#64748B] group-hover:text-[#18263A] transition-colors">
                                        {action.badge} <span aria-hidden="true">&rarr;</span>
                                    </span>
                                </div>

                                <div className="mt-3">
                                    <p className="text-sm font-semibold text-[#17212B] group-hover:text-[#18263A] transition-colors leading-snug">
                                        {action.title}
                                    </p>
                                    <p className="text-xs text-[#64748B] mt-0.5 leading-snug">
                                        {action.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Section F: Accurate Empty State */}
                {isZeroData && (
                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 text-center shadow-xs">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-[#64748B] mx-auto flex items-center justify-center mb-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-[#17212B]">
                            No financial activity recorded
                        </h3>
                        <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                            No income, expenses, or savings contributions recorded yet.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                            <Link
                                href="/transactions/create"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#18263A] hover:bg-[#263B55] text-white shadow-xs transition-colors"
                            >
                                Record First Transaction
                            </Link>
                            <Link
                                href="/categories"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-[#17212B] border border-[#E2E8F0] shadow-xs transition-colors"
                            >
                                Configure Categories
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
