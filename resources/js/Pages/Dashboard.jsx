import { usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard({ totalIncome = 0, totalExpenses = 0, currentBalance = 0, totalSavings = 0 }) {
    const { auth } = usePage().props;
    const formatCurrency = (amount) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(Number(amount || 0));
    const cards = [
        { title: 'Total Income', amount: totalIncome, icon: '↗', tone: 'income', note: 'Money received' },
        { title: 'Total Expenses', amount: totalExpenses, icon: '↘', tone: 'expense', note: 'Money spent' },
        { title: 'Current Balance', amount: currentBalance, icon: '₱', tone: 'balance', note: 'Available balance' },
        { title: 'Total Savings', amount: totalSavings, icon: '◷', tone: 'savings', note: 'Across your goals' },
    ];
    return <AppLayout>
        <div className="space-y-7">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div><div className="text-sm font-semibold text-emerald-600 mb-2">OVERVIEW</div><h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {auth?.user?.name?.split(' ')[0] || 'there'}.</h1><p className="text-slate-500">A clearer picture of your money starts here.</p></div>
                <div className="flex flex-wrap gap-2"><a href="/transactions/create" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">＋ Add transaction</a><a href="/reports" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">View reports ↗</a></div>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {cards.map((card) => <article key={card.title} className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{card.title}</p><p className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">{formatCurrency(card.amount)}</p><p className="mt-2 text-xs text-slate-400">{card.note}</p></div><div className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-bold ${card.tone==='income'?'bg-emerald-50 text-emerald-600':card.tone==='expense'?'bg-rose-50 text-rose-600':card.tone==='balance'?'bg-blue-50 text-blue-600':'bg-violet-50 text-violet-600'}`}>{card.icon}</div></div><div className={`absolute bottom-0 left-0 h-1 w-full ${card.tone==='income'?'bg-emerald-400':card.tone==='expense'?'bg-rose-400':card.tone==='balance'?'bg-blue-400':'bg-violet-400'}`} /></article>)}
            </section>
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <article className="xl:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Financial snapshot</h2><p className="text-sm text-slate-500 mt-1">Your key numbers at a glance.</p></div><span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">All-time overview</span></div><div className="mt-7 rounded-xl bg-gradient-to-br from-emerald-50 to-slate-50 p-5 md:p-7"><div className="text-sm font-medium text-slate-500">Current balance</div><div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{formatCurrency(currentBalance)}</div><div className="mt-4 text-sm text-slate-600">Track your transactions to keep this overview up to date.</div></div><div className="mt-5 grid grid-cols-2 gap-4"><div className="rounded-xl border border-slate-100 p-4"><div className="text-xs text-slate-500">Income</div><div className="mt-1 font-bold text-emerald-600">{formatCurrency(totalIncome)}</div></div><div className="rounded-xl border border-slate-100 p-4"><div className="text-xs text-slate-500">Expenses</div><div className="mt-1 font-bold text-rose-600">{formatCurrency(totalExpenses)}</div></div></div></article>
                <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-900">Quick access</h2><p className="text-sm text-slate-500 mt-1">Jump straight into your tools.</p><div className="mt-5 grid gap-3">{[{label:'Manage transactions',href:'/transactions',icon:'↔'},{label:'Review budgets',href:'/budgets',icon:'▤'},{label:'Savings goals',href:'/savings-goals',icon:'◷'},{label:'Explore reports',href:'/reports',icon:'▥'}].map((item)=><a key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50"><span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-lg">{item.icon}</span>{item.label}<span className="ml-auto text-slate-400">→</span></a>)}</div></article>
            </section>
        </div>
    </AppLayout>;
}
