import { useForm, Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

function SavingsGoalCard({ goal, formatCurrency }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
    });

    const isCompleted =
        Number(goal.current_amount) >= Number(goal.target_amount);

    const progress = Math.min(100, Math.max(0, Number(goal.progress) || 0));

    const handleAddSavings = (e) => {
        e.preventDefault();

        post(`/savings-goals/${goal.id}/add`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-2">{goal.name}</h2>

            <p className="text-gray-500 mb-6">
                {goal.description || 'No description provided.'}
            </p>

            <div className="mb-4">
                <p className="text-gray-500 text-sm">Current Savings</p>
                <h2 className="text-2xl font-bold text-blue-600">
                    {formatCurrency(goal.current_amount)}
                </h2>
            </div>

            <div className="flex justify-between gap-2 mb-2 text-sm">
                <span>
                    Target: {formatCurrency(goal.target_amount)}
                </span>
                <strong>{progress.toFixed(1)}%</strong>
            </div>

            <div className="bg-slate-200 h-3 rounded-full overflow-hidden mb-5">
                <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mb-4 text-sm">
                <strong>Deadline:</strong> {goal.deadline || 'No deadline'}
            </p>

            {isCompleted ? (
                <p className="text-green-600 font-bold">
                    Goal Completed!
                </p>
            ) : (
                <>
                    <p className="text-gray-500 text-sm mb-4">
                        Keep saving! You're making progress.
                    </p>

                    <hr className="border-gray-200 mb-4" />

                    <form onSubmit={handleAddSavings}>
                        <label className="block font-medium mb-2">
                            Add Savings (₱)
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            placeholder="Enter amount"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                        />

                        {errors.amount && (
                            <p className="text-red-600 text-sm mb-2">
                                {errors.amount}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Adding...' : '+ Add Savings'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default function Index({ goals }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        target_amount: '',
        deadline: '',
        description: '',
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(Number(amount) || 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/savings-goals', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Savings Goals" />

            <div>
                <h1 className="text-3xl font-bold mb-2">Savings Goals</h1>
                <p className="text-gray-500 mb-8">
                    Set your financial goals and track your savings progress.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-2">
                        Create New Savings Goal
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Define a savings target and work toward achieving it.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-2">
                                Goal Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Emergency Fund"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Target Amount (₱)
                            </label>
                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={data.target_amount}
                                onChange={(e) => setData('target_amount', e.target.value)}
                                placeholder="Enter target amount"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                            {errors.target_amount && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.target_amount}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Target Deadline
                            </label>
                            <input
                                type="date"
                                value={data.deadline}
                                onChange={(e) => setData('deadline', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                            {errors.deadline && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.deadline}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                rows="3"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Describe your savings goal..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                            {errors.description && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : '+ Create Savings Goal'}
                        </button>
                    </form>
                </div>

                <div className="mb-5">
                    <h2 className="text-2xl font-bold mb-2">
                        Your Savings Goals
                    </h2>
                    <p className="text-gray-500">
                        Monitor your progress and add savings to your goals.
                    </p>
                </div>

                {goals.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-gray-500">
                            No savings goals created yet.
                        </p>
                    </div>
                ) : (
                    <div
    className="grid gap-6"
    style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    }}
>
                        {goals.map((goal) => (
                            <SavingsGoalCard
                                key={goal.id}
                                goal={goal}
                                formatCurrency={formatCurrency}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
