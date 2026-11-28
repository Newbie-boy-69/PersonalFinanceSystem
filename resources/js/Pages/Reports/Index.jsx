import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { router, Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

Chart.register(...registerables);

export default function Index({
    month,
    transactions,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
}) {
    const pieCanvas = useRef(null);
    const trendCanvas = useRef(null);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(Number(amount) || 0);
    };

    const categoryLabels = Object.keys(expensesByCategory || {});
    const categoryValues = Object.values(expensesByCategory || {});

    useEffect(() => {
        if (!pieCanvas.current || categoryLabels.length === 0) {
            return;
        }

        const chart = new Chart(pieCanvas.current, {
            type: 'pie',
            data: {
                labels: categoryLabels,
                datasets: [{
                    data: categoryValues,
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return context.label + ': ' +
                                    formatCurrency(context.raw);
                            },
                        },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [month, expensesByCategory]);

    useEffect(() => {
        if (!trendCanvas.current || transactions.length === 0) {
            return;
        }

        const dailyData = {};

        transactions.forEach((transaction) => {
            const date = transaction.transaction_date;

            if (!dailyData[date]) {
                dailyData[date] = {
                    income: 0,
                    expense: 0,
                };
            }

            dailyData[date][transaction.type] += Number(transaction.amount);
        });

        const dates = Object.keys(dailyData).sort();

        const incomeData = dates.map((date) => dailyData[date].income);
        const expenseData = dates.map((date) => dailyData[date].expense);

        const chart = new Chart(trendCanvas.current, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        borderColor: '#16a34a',
                        backgroundColor: 'rgba(22, 163, 74, 0.10)',
                        tension: 0.4,
                        fill: true,
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.10)',
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (₱)',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Transaction Date',
                        },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [month, transactions]);

    const handleMonthChange = (e) => {
        router.get('/reports', {
            month: e.target.value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Reports" />

            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Financial Reports
                </h1>

                <p className="text-gray-500 mb-8">
                    Analyze your income, expenses, and financial activities.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Monthly Financial Summary
                    </h2>

                    <label className="block font-medium mb-2">
                        Select Month
                    </label>

                    <input
                        type="month"
                        value={month}
                        onChange={handleMonthChange}
                        className="border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>

                <div className="mb-5">
                    <h2 className="text-2xl font-bold mb-2">
                        Financial Overview
                    </h2>
                    <p className="text-gray-500">
                        Your financial performance for the selected month.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <p className="text-gray-500 mb-2">Total Income</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            {formatCurrency(totalIncome)}
                        </h2>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <p className="text-gray-500 mb-2">Total Expenses</p>
                        <h2 className="text-2xl font-bold text-red-600">
                            {formatCurrency(totalExpenses)}
                        </h2>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <p className="text-gray-500 mb-2">Monthly Balance</p>
                        <h2 className={`text-2xl font-bold ${Number(balance) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {formatCurrency(balance)}
                        </h2>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-2">
                        Expense Distribution
                    </h2>

                    <p className="text-gray-500 mb-6">
                        See how your expenses are divided among categories.
                    </p>

                    {categoryLabels.length === 0 ? (
                        <p className="text-gray-500">
                            No expenses recorded for this month.
                        </p>
                    ) : (
                        <div className="max-w-[450px] mx-auto">
                            <canvas ref={pieCanvas} />
                        </div>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-2">
                        Financial Activity Trend
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Track your daily income and expenses using a line chart.
                    </p>

                    {transactions.length === 0 ? (
                        <p className="text-gray-500">
                            No financial activity recorded for this month.
                        </p>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[500px] h-[320px]">
                                <canvas ref={trendCanvas} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Expenses by Category
                    </h2>

                    {categoryLabels.length === 0 ? (
                        <p className="text-gray-500">
                            No expenses recorded for this month.
                        </p>
                    ) : (
                        categoryLabels.map((category, index) => (
                            <div
                                key={category}
                                className="flex justify-between gap-4 py-3 border-b border-gray-100"
                            >
                                <span>{category}</span>
                                <strong>
                                    {formatCurrency(categoryValues[index])}
                                </strong>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">
                        Transaction Details
                    </h2>

                    {transactions.length === 0 ? (
                        <p className="text-gray-500">
                            No transactions found for this month.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Type</th>
                                        <th className="p-3">Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b border-gray-100"
                                        >
                                            <td className="p-3">
                                                {transaction.transaction_date}
                                            </td>
                                            <td className="p-3">
                                                {transaction.title}
                                            </td>
                                            <td className="p-3">
                                                {transaction.category?.name || 'Uncategorized'}
                                            </td>
                                            <td className={`p-3 font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </td>
                                            <td className="p-3">
                                                {formatCurrency(transaction.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
