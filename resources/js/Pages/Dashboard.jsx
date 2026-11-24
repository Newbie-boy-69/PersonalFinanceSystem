import { usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard({
    totalIncome,
    totalExpenses,
    currentBalance,
    totalSavings,
}) {
    const { auth } = usePage().props;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const cards = [
        {
            title: 'Total Income',
            amount: totalIncome,
            color: 'text-green-600',
        },
        {
            title: 'Total Expenses',
            amount: totalExpenses,
            color: 'text-red-600',
        },
        {
            title: 'Current Balance',
            amount: currentBalance,
            color: 'text-blue-600',
        },
        {
            title: 'Total Savings',
            amount: totalSavings,
            color: 'text-purple-600',
        },
    ];

    return (
        <AppLayout>
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome, {auth?.user?.name || 'User'}!
                </h1>

                <p className="text-gray-500 mb-8">
                    Personal Savings and Expense Monitoring System
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-2">
                        Financial Summary
                    </h2>

                    <p className="text-gray-500">
                        Here's an overview of your finances.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                        >
                            <p className="text-gray-500 text-sm mb-3">
                                {card.title}
                            </p>

                            <h2 className={`text-2xl font-bold ${card.color}`}>
                                {formatCurrency(card.amount)}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
