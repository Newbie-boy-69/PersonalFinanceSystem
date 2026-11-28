import { useForm, Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        type: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/categories', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Categories" />

            <div>
                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Category Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your income and expense categories.
                    </p>
                </div>

                {/* Add Category Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Add New Category
                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">
                        Create categories to organize your financial transactions.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Category Name */}
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block font-semibold text-gray-700 mb-2"
                            >
                                Category Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Food, Salary, Transportation"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {errors.name && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Category Type */}
                        <div className="mb-6">
                            <label
                                htmlFor="type"
                                className="block font-semibold text-gray-700 mb-2"
                            >
                                Category Type
                            </label>

                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>

                            {errors.type && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errors.type}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 py-3 rounded-lg transition"
                        >
                            {processing ? 'Adding...' : '+ Add Category'}
                        </button>
                    </form>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Your Categories
                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">
                        View all your saved income and expense categories.
                    </p>

                    {categories.length === 0 ? (
                        <p className="text-gray-500">
                            No categories added yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 text-gray-600 font-semibold">
                                            Category Name
                                        </th>

                                        <th className="py-3 px-4 text-gray-600 font-semibold">
                                            Type
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-4 px-4 text-gray-800">
                                                {category.name}
                                            </td>

                                            <td className="py-4 px-4">
                                                {category.type === 'income' ? (
                                                    <span className="font-bold text-green-600">
                                                        Income
                                                    </span>
                                                ) : (
                                                    <span className="font-bold text-red-600">
                                                        Expense
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
