import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const sections = [
    {
        title: '1. Dashboard',
        description: 'The Dashboard provides an overview of your financial status.',
        items: [
            'Total Income: Shows all recorded income.',
            'Total Expenses: Shows all recorded expenses.',
            'Current Balance: Shows income minus expenses.',
            'Total Savings: Shows the total amount saved toward your goals.',
        ],
        ordered: false,
    },
    {
        title: '2. Categories',
        description: 'Categories help organize your financial transactions.',
        items: [
            'Open the Categories section.',
            'Enter a category name, such as Food, Salary, or Transportation.',
            'Select whether the category is Income or Expense.',
            'Click Add Category to save it.',
        ],
        ordered: true,
    },
    {
        title: '3. Transactions',
        description: 'Use Transactions to record money coming in and going out.',
        items: [
            'Open the Transactions section.',
            'Click Add Transaction.',
            'Enter the transaction title and amount.',
            'Select Income or Expense.',
            'Select the appropriate category.',
            'Enter the transaction date and optional description.',
            'Save your transaction.',
        ],
        ordered: true,
        note: 'You can also edit or delete your recorded transactions.',
    },
    {
        title: '4. Budgets',
        description: 'Budgets help you set spending limits for your expense categories.',
        items: [
            'Open the Budgets section.',
            'Select an Expense Category.',
            'Enter your budget amount.',
            'Set the start date and end date.',
            'Save your budget.',
        ],
        ordered: true,
        note: 'The system calculates your total spending and remaining budget. It also shows whether you have exceeded your budget.',
    },
    {
        title: '5. Savings Goals',
        description: 'Savings Goals help you track the money you want to save.',
        items: [
            'Open the Savings section.',
            'Enter your savings goal name.',
            'Set your target amount.',
            'Enter an optional deadline and description.',
            'Create your savings goal.',
            'Use Add Savings to record money saved toward your goal.',
        ],
        ordered: true,
        note: 'The system displays your current savings and progress toward your target.',
    },
    {
        title: '6. Reports',
        description: 'Reports provide a summary of your financial activities.',
        items: [
            'Open the Reports section.',
            'Select the month you want to review.',
            'View your total income, expenses, and balance.',
            'Check the charts to understand your spending activities.',
            'Review your expense categories and transaction details.',
        ],
        ordered: true,
    },
    {
        title: '7. Account',
        description: 'The Account section displays your registered account information, including your name and email address.',
        note: 'You can also use the Log Out button to securely end your session.',
    },
];

export default function HowToUse() {
    return (
        <AppLayout>
            <Head title="How to Use" />

            <div>
                <h1 className="text-3xl font-bold mb-2">
                    How to Use the System
                </h1>

                <p className="text-gray-500 mb-8">
                    A simple guide to help you manage your income, expenses,
                    budgets, and savings.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <h2 className="text-xl font-bold">
                        Welcome to Personal Finance System!
                    </h2>
                    <p className="text-gray-500 mt-3 leading-7">
                        This system helps you record your financial transactions,
                        organize your expenses, set budgets, monitor your savings,
                        and review your financial activities.
                    </p>
                </div>

                {sections.map((section) => (
                    <div
                        key={section.title}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6"
                    >
                        <h2 className="text-xl font-bold">
                            {section.title}
                        </h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            {section.description}
                        </p>

                        {section.items && (
                            <ol
                                className={`mt-4 ml-6 space-y-2 text-gray-600 leading-7 ${
                                    section.ordered ? 'list-decimal' : 'list-disc'
                                }`}
                            >
                                {section.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ol>
                        )}

                        {section.note && (
                            <p className="text-gray-500 mt-4 leading-7">
                                {section.note}
                            </p>
                        )}
                    </div>
                ))}

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <h2 className="text-xl font-bold">
                        Important Reminders
                    </h2>

                    <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600 leading-7">
                        <li>Create your categories before recording transactions.</li>
                        <li>Use the correct transaction type and category.</li>
                        <li>Enter accurate amounts and transaction dates.</li>
                        <li>Regularly update your savings progress.</li>
                        <li>Review your reports to monitor your spending habits.</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
