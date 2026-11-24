import { useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Edit({ transaction, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: transaction.title || '',
        type: transaction.type || '',
        amount: transaction.amount || '',
        category_id: transaction.category_id || '',
        transaction_date: transaction.transaction_date || '',
        description: transaction.description || '',
    });

    const filteredCategories = categories.filter(
        (category) => category.type === data.type
    );

    const handleTypeChange = (e) => {
        setData((previousData) => ({
            ...previousData,
            type: e.target.value,
            category_id: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transactions/${transaction.id}`);
    };

    return (
        <AppLayout>
            <div>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Transaction
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your income or expense record.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                    <a
                        href="/transactions"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        ← Back to Transaction History
                    </a>

                    <hr className="my-6 border-gray-200" />

                    <form onSubmit={handleSubmit}>

                        {/* Transaction Title */}
                        <div className="mb-5">
                            <label htmlFor="title" className="block font-semibold text-gray-700 mb-2">
                                Transaction Title
                            </label>

                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.title && (
                                <p className="text-red-600 text-sm mt-2">{errors.title}</p>
                            )}
                        </div>

                        {/* Transaction Type */}
                        <div className="mb-5">
                            <label htmlFor="type" className="block font-semibold text-gray-700 mb-2">
                                Transaction Type
                            </label>

                            <select
                                id="type"
                                value={data.type}
                                onChange={handleTypeChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>

                            {errors.type && (
                                <p className="text-red-600 text-sm mt-2">{errors.type}</p>
                            )}
                        </div>

                        {/* Amount */}
                        <div className="mb-5">
                            <label htmlFor="amount" className="block font-semibold text-gray-700 mb-2">
                                Amount (₱)
                            </label>

                            <input
                                type="number"
                                id="amount"
                                step="0.01"
                                min="0.01"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.amount && (
                                <p className="text-red-600 text-sm mt-2">{errors.amount}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mb-5">
                            <label htmlFor="category_id" className="block font-semibold text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Uncategorized</option>

                                {filteredCategories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} ({category.type.charAt(0).toUpperCase() + category.type.slice(1)})
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="text-red-600 text-sm mt-2">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Transaction Date */}
                        <div className="mb-5">
                            <label htmlFor="transaction_date" className="block font-semibold text-gray-700 mb-2">
                                Transaction Date
                            </label>

                            <input
                                type="date"
                                id="transaction_date"
                                value={data.transaction_date}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.transaction_date && (
                                <p className="text-red-600 text-sm mt-2">{errors.transaction_date}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label htmlFor="description" className="block font-semibold text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                id="description"
                                rows="4"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {errors.description && (
                                <p className="text-red-600 text-sm mt-2">{errors.description}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg transition"
                        >
                            {processing ? 'Updating...' : 'Update Transaction'}
                        </button>

                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
