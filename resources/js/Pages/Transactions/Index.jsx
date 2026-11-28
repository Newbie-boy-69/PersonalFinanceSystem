import { useState } from 'react';
import { router, Link, Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import PageHeader from '../../Components/PageHeader';
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import Button from '../../Components/Button';
import EmptyState from '../../Components/EmptyState';
import Modal from '../../Components/Modal';
import { formatCurrency } from '../../Utils/formatCurrency';

export default function Index({ transactions = [] }) {
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteModal = (transaction) => {
        setTransactionToDelete(transaction);
    };

    const closeDeleteModal = () => {
        if (!isDeleting) {
            setTransactionToDelete(null);
        }
    };

    const confirmDelete = () => {
        if (!transactionToDelete || isDeleting) return;

        setIsDeleting(true);
        router.delete(`/transactions/${transactionToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setTransactionToDelete(null);
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const formatTypeLabel = (type) => {
        if (!type) return 'Unknown';
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <AppLayout>
            <Head title="Transactions" />

            <div className="space-y-6 text-[#17212B]">
                <PageHeader
                    title="Transaction History"
                    description="Manage your income and expenses."
                    className="mb-0"
                    action={
                        <Button
                            href="/transactions/create"
                            variant="primary"
                            className="!bg-[#18263A] hover:!bg-[#263B55] focus:!ring-[#18263A]"
                            icon={
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            }
                        >
                            Add Transaction
                        </Button>
                    }
                />

                <Card padding="none" className="overflow-hidden border-[#E2E8F0]">
                    <div className="px-5 py-4 sm:px-6 border-b border-[#E2E8F0] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-base sm:text-lg font-bold text-[#17212B] tracking-tight">
                                All Transactions
                            </h2>
                            <Badge variant="neutral" size="sm">
                                {transactions.length} {transactions.length === 1 ? 'record' : 'records'}
                            </Badge>
                        </div>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="p-6">
                            <EmptyState
                                title="No transactions recorded yet"
                                description="Start tracking your personal finances by recording your first income or expense transaction."
                                action={
                                    <Button
                                        href="/transactions/create"
                                        variant="primary"
                                        className="!bg-[#18263A] hover:!bg-[#263B55] focus:!ring-[#18263A]"
                                    >
                                        Record First Transaction
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            {/* Mobile Compact Card Layout */}
                            <div className="md:hidden divide-y divide-[#E2E8F0]">
                                {transactions.map((transaction) => {
                                    const isIncome = transaction.type === 'income';
                                    return (
                                        <div key={transaction.id} className="p-4 space-y-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-[#17212B] break-words">
                                                        {transaction.title}
                                                    </p>
                                                    <p className="text-xs text-[#64748B] mt-0.5 tabular-nums break-words">
                                                        {transaction.transaction_date} &bull; {transaction.category?.name || 'Uncategorized'}
                                                    </p>
                                                </div>

                                                <p
                                                    className={`text-sm font-bold tabular-nums shrink-0 ${
                                                        isIncome ? 'text-[#047857]' : 'text-[#C2414B]'
                                                    }`}
                                                >
                                                    {formatCurrency(transaction.amount)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 pt-1">
                                                <Badge
                                                    variant={isIncome ? 'income' : 'expense'}
                                                    size="sm"
                                                    dot
                                                    className={
                                                        isIncome
                                                            ? '!bg-emerald-50 !text-[#047857] !border-emerald-200'
                                                            : '!bg-rose-50 !text-[#C2414B] !border-rose-200'
                                                    }
                                                >
                                                    {formatTypeLabel(transaction.type)}
                                                </Badge>

                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/transactions/${transaction.id}/edit`}
                                                        aria-label={`Edit transaction: ${transaction.title}`}
                                                        className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#18263A] bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#18263A]"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => openDeleteModal(transaction)}
                                                        aria-label={`Delete transaction: ${transaction.title}`}
                                                        className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#C2414B] bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C2414B]"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Desktop & Tablet Table Layout */}
                            <div className="hidden md:block">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                            <th scope="col" className="py-3.5 px-6">
                                                Date
                                            </th>
                                            <th scope="col" className="py-3.5 px-4">
                                                Title
                                            </th>
                                            <th scope="col" className="py-3.5 px-4">
                                                Category
                                            </th>
                                            <th scope="col" className="py-3.5 px-4">
                                                Type
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-right">
                                                Amount
                                            </th>
                                            <th scope="col" className="py-3.5 px-6 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {transactions.map((transaction) => {
                                            const isIncome = transaction.type === 'income';
                                            return (
                                                <tr
                                                    key={transaction.id}
                                                    className="hover:bg-slate-50/80 transition-colors"
                                                >
                                                    <td className="py-4 px-6 whitespace-nowrap text-xs font-medium text-[#64748B] tabular-nums">
                                                        {transaction.transaction_date}
                                                    </td>

                                                    <td className="py-4 px-4 font-semibold text-[#17212B] break-words">
                                                        {transaction.title}
                                                    </td>

                                                    <td className="py-4 px-4 text-[#64748B] break-words">
                                                        {transaction.category?.name || 'Uncategorized'}
                                                    </td>

                                                    <td className="py-4 px-4 whitespace-nowrap">
                                                        <Badge
                                                            variant={isIncome ? 'income' : 'expense'}
                                                            size="sm"
                                                            dot
                                                            className={
                                                                isIncome
                                                                    ? '!bg-emerald-50 !text-[#047857] !border-emerald-200'
                                                                    : '!bg-rose-50 !text-[#C2414B] !border-rose-200'
                                                            }
                                                        >
                                                            {formatTypeLabel(transaction.type)}
                                                        </Badge>
                                                    </td>

                                                    <td
                                                        className={`py-4 px-4 whitespace-nowrap text-right font-bold tabular-nums ${
                                                            isIncome ? 'text-[#047857]' : 'text-[#C2414B]'
                                                        }`}
                                                    >
                                                        {formatCurrency(transaction.amount)}
                                                    </td>

                                                    <td className="py-4 px-6 whitespace-nowrap text-right">
                                                        <div className="inline-flex items-center justify-end gap-2">
                                                            <Link
                                                                href={`/transactions/${transaction.id}/edit`}
                                                                aria-label={`Edit transaction: ${transaction.title}`}
                                                                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#18263A] hover:text-[#263B55] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#18263A]"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={() => openDeleteModal(transaction)}
                                                                aria-label={`Delete transaction: ${transaction.title}`}
                                                                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#C2414B] hover:text-rose-800 hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C2414B]"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </Card>
            </div>

            <Modal
                isOpen={Boolean(transactionToDelete)}
                onClose={closeDeleteModal}
                title="Delete Transaction"
                description="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmText={isDeleting ? 'Deleting...' : 'Delete Transaction'}
                confirmVariant="danger"
                onConfirm={confirmDelete}
                loading={isDeleting}
            >
                {transactionToDelete && (
                    <div className="rounded-xl border border-[#E2E8F0] bg-slate-50 p-3.5 text-sm space-y-1">
                        <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-1.5">
                                <p className="min-w-0 font-semibold text-[#17212B] [overflow-wrap:anywhere]">
                                    {transactionToDelete.title}
                                </p>
                                <Badge
                                    variant={transactionToDelete.type === 'income' ? 'income' : 'expense'}
                                    size="sm"
                                    dot
                                    className={
                                        transactionToDelete.type === 'income'
                                            ? '!bg-emerald-50 !text-[#047857] !border-emerald-200'
                                            : '!bg-rose-50 !text-[#C2414B] !border-rose-200'
                                    }
                                >
                                    {formatTypeLabel(transactionToDelete.type)}
                                </Badge>
                            </div>
                            <span
                                className={`font-bold tabular-nums shrink-0 ${
                                    transactionToDelete.type === 'income'
                                        ? 'text-[#047857]'
                                        : 'text-[#C2414B]'
                                }`}
                            >
                                {formatCurrency(transactionToDelete.amount)}
                            </span>
                        </div>
                        <p className="text-xs text-[#64748B] tabular-nums">
                            {transactionToDelete.transaction_date} &bull; {transactionToDelete.category?.name || 'Uncategorized'}
                        </p>
                    </div>
                )}
            </Modal>
        </AppLayout>
    );
}
