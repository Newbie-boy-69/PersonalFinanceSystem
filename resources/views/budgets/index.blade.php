
@extends('layouts.app')

@section('title', 'Budget Management')

@section('content')

    <div class="page-title">
        <h1>Budget Management</h1>
        <p>Set and monitor your spending limits.</p>
    </div>

    <div class="card">
        <h2>Create New Budget</h2>
        <p style="color: #64748b; margin: 8px 0 20px;">
            Set a spending limit for one of your expense categories.
        </p>

        @if ($errors->any())
            <div style="background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
            </div>
        @endif

        <form action="{{ route('budgets.store') }}" method="POST">
            @csrf

            <label for="category_id">Expense Category</label>
            <select id="category_id" name="category_id" required>
                <option value="">Select Category</option>

                @foreach (\App\Models\Category::where('user_id', Auth::id())->where('type', 'expense')->orderBy('name')->get() as $category)
                    <option value="{{ $category->id }}"
                        {{ old('category_id') == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>

            <label for="amount">Budget Amount (₱)</label>
            <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0.01"
                value="{{ old('amount') }}"
                placeholder="Enter budget amount"
                required
            >

            <label for="start_date">Start Date</label>
            <input
                type="date"
                id="start_date"
                name="start_date"
                value="{{ old('start_date') }}"
                required
            >

            <label for="end_date">End Date</label>
            <input
                type="date"
                id="end_date"
                name="end_date"
                value="{{ old('end_date') }}"
                required
            >

            <button type="submit">+ Create Budget</button>
        </form>
    </div>

    <div class="card">
        <h2>Your Budgets</h2>
        <p style="color: #64748b; margin: 8px 0 20px;">
            Track your spending and see how much budget remains.
        </p>

        @if ($budgets->isEmpty())
            <p>No budgets created yet.</p>
        @else
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Budget Amount</th>
                            <th>Total Spent</th>
                            <th>Remaining Budget</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach ($budgets as $budget)
                            <tr>
                                <td>{{ $budget->category->name }}</td>

                                <td>₱{{ number_format($budget->amount, 2) }}</td>

                                <td>₱{{ number_format($budget->total_spent, 2) }}</td>

                                <td style="color: {{ $budget->remaining < 0 ? '#dc2626' : '#16a34a' }}; font-weight: bold;">
                                    ₱{{ number_format($budget->remaining, 2) }}
                                </td>

                                <td>{{ $budget->start_date }}</td>

                                <td>{{ $budget->end_date }}</td>

                                <td>
                                    @if ($budget->is_exceeded)
                                        <span style="color: #dc2626; font-weight: bold;">
                                            Budget Exceeded!
                                        </span>
                                    @else
                                        <span style="color: #16a34a; font-weight: bold;">
                                            Within Budget
                                        </span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>

@endsection
