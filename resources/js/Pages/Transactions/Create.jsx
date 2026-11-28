import { useId } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import PageHeader from '../../Components/PageHeader';
import Card from '../../Components/Card';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import Button from '../../Components/Button';

export default function Create({ categories = [] }) {
    const today = new Date().toLocaleDateString('en-CA');
    const descriptionId = useId();

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: '',
        amount: '',
        category_id: '',
        transaction_date: today,
        description: '',
    });

    const filteredCategories = categories.filter(
        (category) => category.type === data.type
    );

    const categoryOptions = filteredCategories.map((category) => ({
        value: category.id,
        label: `${category.name} (${category.type.charAt(0).toUpperCase() + category.type.slice(1)})`,
    }));

    const typeOptions = [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' },
    ];

    const handleTypeChange = (e) => {
        setData((previousData) => ({
            ...previousData,
            type: e.target.value,
            category_id: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/transactions');
    };

    const descriptionErrorId = errors.description ? `${descriptionId}-error` : undefined;

    return (
        <AppLayout>
            <Head title="Add Transaction" />

            <div className="mx-auto max-w-4xl space-y-6 text-[#17212B]">
                <PageHeader
                    title="Add New Transaction"
                    description="Record your income or expenses."
                    className="mb-0"
                    action={
                        <Button
                            href="/transactions"
                            variant="secondary"
                            size="sm"
                            icon={
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            }
                        >
                            Back to Transactions
                        </Button>
                    }
                />

                <Card className="border-[#E2E8F0]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            id="title"
                            label="Transaction Title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Monthly Allowance"
                            error={errors.title}
                            required
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Select
                                id="type"
                                label="Transaction Type"
                                value={data.type}
                                onChange={handleTypeChange}
                                options={typeOptions}
                                placeholder="Select Type"
                                error={errors.type}
                                required
                            />

                            <Input
                                id="amount"
                                label="Amount (₱)"
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                placeholder="0.00"
                                error={errors.amount}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Select
                                id="category_id"
                                label="Category"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                options={categoryOptions}
                                placeholder="No Category"
                                disabled={!data.type}
                                hint={!data.type ? 'Select a transaction type first to choose a category.' : undefined}
                                error={errors.category_id}
                            />

                            <Input
                                id="transaction_date"
                                label="Transaction Date"
                                type="date"
                                value={data.transaction_date}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                                error={errors.transaction_date}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor={descriptionId}
                                className="block text-sm font-semibold text-slate-700"
                            >
                                Description (Optional)
                            </label>

                            <textarea
                                id={descriptionId}
                                rows="4"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Add additional details..."
                                aria-invalid={errors.description ? 'true' : 'false'}
                                aria-describedby={descriptionErrorId}
                                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                    errors.description
                                        ? 'border-rose-300 focus:border-rose-600 focus:ring-rose-100'
                                        : 'border-slate-300 focus:border-teal-700 focus:ring-teal-100'
                                }`}
                            />

                            {errors.description && (
                                <p id={descriptionErrorId} className="text-xs text-rose-600 font-medium mt-1" role="alert">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-end gap-3">
                            <Button
                                href="/transactions"
                                variant="secondary"
                                disabled={processing}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="primary"
                                loading={processing}
                                className="!bg-[#18263A] hover:!bg-[#263B55] focus:!ring-[#18263A]"
                            >
                                {processing ? 'Saving...' : 'Save Transaction'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
