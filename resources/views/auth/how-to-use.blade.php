
@extends('layouts.app')

@section('title', 'How to Use')

@section('content')

    <div class="page-title">
        <h1>How to Use the System</h1>
        <p>
            A simple guide to help you manage your income, expenses,
            budgets, and savings.
        </p>
    </div>

    <div class="card">
        <h2>Welcome to Personal Finance System!</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            This system helps you record your financial transactions,
            organize your expenses, set budgets, monitor your savings,
            and review your financial activities.
        </p>
    </div>

    <div class="card">
        <h2>1. Dashboard</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            The Dashboard provides an overview of your financial status.
        </p>
        <ul style="margin: 15px 0 0 25px; line-height: 2;">
            <li><strong>Total Income:</strong> Shows all recorded income.</li>
            <li><strong>Total Expenses:</strong> Shows all recorded expenses.</li>
            <li><strong>Current Balance:</strong> Shows income minus expenses.</li>
            <li><strong>Total Savings:</strong> Shows the total amount saved toward your goals.</li>
        </ul>
    </div>

    <div class="card">
        <h2>2. Categories</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            Categories help organize your financial transactions.
        </p>
        <ol style="margin: 15px 0 0 25px; line-height: 2;">
            <li>Open the Categories section.</li>
            <li>Enter a category name, such as Food, Salary, or Transportation.</li>
            <li>Select whether the category is Income or Expense.</li>
            <li>Click Add Category to save it.</li>
        </ol>
    </div>

    <div class="card">
        <h2>3. Transactions</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            Use Transactions to record money coming in and going out.
        </p>
        <ol style="margin: 15px 0 0 25px; line-height: 2;">
            <li>Open the Transactions section.</li>
            <li>Click Add Transaction.</li>
            <li>Enter the transaction title and amount.</li>
            <li>Select Income or Expense.</li>
            <li>Select the appropriate category.</li>
            <li>Enter the transaction date and optional description.</li>
            <li>Save your transaction.</li>
        </ol>
        <p style="margin-top: 12px; color: #64748b;">
            You can also edit or delete your recorded transactions.
        </p>
    </div>

    <div class="card">
        <h2>4. Budgets</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            Budgets help you set spending limits for your expense categories.
        </p>
        <ol style="margin: 15px 0 0 25px; line-height: 2;">
            <li>Open the Budgets section.</li>
            <li>Select an Expense Category.</li>
            <li>Enter your budget amount.</li>
            <li>Set the start date and end date.</li>
            <li>Save your budget.</li>
        </ol>
        <p style="margin-top: 12px; color: #64748b;">
            The system calculates your total spending and remaining budget.
            It also shows whether you have exceeded your budget.
        </p>
    </div>

    <div class="card">
        <h2>5. Savings Goals</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            Savings Goals help you track the money you want to save.
        </p>
        <ol style="margin: 15px 0 0 25px; line-height: 2;">
            <li>Open the Savings section.</li>
            <li>Enter your savings goal name.</li>
            <li>Set your target amount.</li>
            <li>Enter an optional deadline and description.</li>
            <li>Create your savings goal.</li>
            <li>Use Add Savings to record money saved toward your goal.</li>
        </ol>
        <p style="margin-top: 12px; color: #64748b;">
            The system displays your current savings and progress toward your target.
        </p>
    </div>

    <div class="card">
        <h2>6. Reports</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            Reports provide a summary of your financial activities.
        </p>
        <ol style="margin: 15px 0 0 25px; line-height: 2;">
            <li>Open the Reports section.</li>
            <li>Select the month you want to review.</li>
            <li>View your total income, expenses, and balance.</li>
            <li>Check the charts to understand your spending activities.</li>
            <li>Review your expense categories and transaction details.</li>
        </ol>
    </div>

    <div class="card">
        <h2>7. Account</h2>
        <p style="color: #64748b; margin-top: 10px; line-height: 1.7;">
            The Account section displays your registered account information,
            including your name and email address.
        </p>
        <p style="margin-top: 12px; color: #64748b;">
            You can also use the Log Out button to securely end your session.
        </p>
    </div>

    <div class="card">
        <h2>Important Reminders</h2>
        <ul style="margin: 15px 0 0 25px; line-height: 2;">
            <li>Create your categories before recording transactions.</li>
            <li>Use the correct transaction type and category.</li>
            <li>Enter accurate amounts and transaction dates.</li>
            <li>Regularly update your savings progress.</li>
            <li>Review your reports to monitor your spending habits.</li>
        </ul>
    </div>

@endsection
