import { useForm, Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ budgets, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: '',
        amount: '',
        start_date: '',
        end_date: '',
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/budgets', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Budgets" />

            <div>
                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Budget Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Set and monitor your spending limits.
                    </p>
                </div>

                {/* Create Budget Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">

                    <h2 className="text-xl font-bold text-gray-800">
                        Create New Budget
                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">
                        Set a spending limit for one of your expense categories.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Expense Category */}
                        <div className="mb-5">
                            <label htmlFor="category_id" className="block font-semibold text-gray-700 mb-2">
                                Expense Category
                            </label>

                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Category</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Budget Amount */}
                        <div className="mb-5">
                            <label htmlFor="amount" className="block font-semibold text-gray-700 mb-2">
                                Budget Amount (₱)
                            </label>

                            <input
                                type="number"
                                id="amount"
                                step="0.01"
                                min="0.01"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                placeholder="Enter budget amount"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.amount && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errors.amount}
                                </p>
                            )}
                        </div>

                        {/* Start Date */}
                        <div className="mb-5">
                            <label htmlFor="start_date" className="block font-semibold text-gray-700 mb-2">
                                Start Date
                            </label>

                            <input
                                type="date"
                                id="start_date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.start_date && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errors.start_date}
                                </p>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="mb-6">
                            <label htmlFor="end_date" className="block font-semibold text-gray-700 mb-2">
                                End Date
                            </label>

                            <input
                                type="date"
                                id="end_date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.end_date && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg transition"
                        >
                            {processing ? 'Creating...' : '+ Create Budget'}
                        </button>

                    </form>
                </div>

                {/* Budget List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                    <h2 className="text-xl font-bold text-gray-800">
                        Your Budgets
                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">
                        Track your spending and see how much budget remains.
                    </p>

                    {budgets.length === 0 ? (
                        <p className="text-gray-500">
                            No budgets created yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 text-gray-600">Category</th>
                                        <th className="py-3 px-4 text-gray-600">Budget Amount</th>
                                        <th className="py-3 px-4 text-gray-600">Total Spent</th>
                                        <th className="py-3 px-4 text-gray-600">Remaining Budget</th>
                                        <th className="py-3 px-4 text-gray-600">Start Date</th>
                                        <th className="py-3 px-4 text-gray-600">End Date</th>
                                        <th className="py-3 px-4 text-gray-600">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {budgets.map((budget) => (
                                        <tr
                                            key={budget.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-4 px-4">
                                                {budget.category?.name || 'Unknown'}
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {formatCurrency(budget.amount)}
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {formatCurrency(budget.total_spent)}
                                            </td>

                                            <td className={`py-4 px-4 whitespace-nowrap font-bold ${
                                                Number(budget.remaining) < 0
                                                    ? 'text-red-600'
                                                    : 'text-green-600'
                                            }`}>
                                                {formatCurrency(budget.remaining)}
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {budget.start_date}
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {budget.end_date}
                                            </td>

                                            <td className="py-4 px-4 whitespace-nowrap">
                                                {budget.is_exceeded ? (
                                                    <span className="font-bold text-red-600">
                                                        Budget Exceeded!
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-green-600">
                                                        Within Budget
                                                    </span>
                                                )}
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
