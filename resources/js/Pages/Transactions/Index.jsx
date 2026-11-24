import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ transactions }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this transaction?'
        );

        if (confirmed) {
            router.delete(`/transactions/${id}`);
        }
    };

    return (
        <AppLayout>
            <div>
                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Transaction History
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your income and expenses.
                    </p>
                </div>

                {/* Transactions Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                    <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            All Transactions
                        </h2>

                        <a
                            href="/transactions/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition"
                        >
                            + Add Transaction
                        </a>
                    </div>

                    {/* Empty State */}
                    {transactions.length === 0 ? (
                        <p className="text-gray-500">
                            No transactions recorded yet.
                        </p>
                    ) : (

                        /* Transactions Table */
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 text-gray-600">
                                            Date
                                        </th>

                                        <th className="py-3 px-4 text-gray-600">
                                            Title
                                        </th>

                                        <th className="py-3 px-4 text-gray-600">
                                            Category
                                        </th>

                                        <th className="py-3 px-4 text-gray-600">
                                            Type
                                        </th>

                                        <th className="py-3 px-4 text-gray-600">
                                            Amount
                                        </th>

                                        <th className="py-3 px-4 text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {transaction.transaction_date}
                                            </td>

                                            <td className="py-4 px-4">
                                                {transaction.title}
                                            </td>

                                            <td className="py-4 px-4">
                                                {transaction.category?.name || 'Uncategorized'}
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className={`font-semibold ${
                                                    transaction.type === 'income'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}>
                                                    {transaction.type.charAt(0).toUpperCase() +
                                                        transaction.type.slice(1)}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap font-semibold">
                                                {formatCurrency(transaction.amount)}
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <a
                                                        href={`/transactions/${transaction.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                                    >
                                                        Edit
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(transaction.id)}
                                                        className="text-red-600 hover:text-red-800 font-semibold"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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
