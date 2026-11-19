
@extends('layouts.app')

@section('title', 'Edit Transaction')

@section('content')

    <div class="page-title">
        <h1>Edit Transaction</h1>
        <p>Update your income or expense record.</p>
    </div>

    <div class="card">

        <a href="{{ route('transactions.index') }}">
            ← Back to Transaction History
        </a>

        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

        @if ($errors->any())
            <div style="background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
            </div>
        @endif

        <form action="{{ route('transactions.update', $transaction->id) }}" method="POST">
            @csrf
            @method('PUT')

            <label for="title">Transaction Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value="{{ old('title', $transaction->title) }}"
                required
            >

            <label for="type">Transaction Type</label>
            <select id="type" name="type" required>
                <option value="income" {{ old('type', $transaction->type) == 'income' ? 'selected' : '' }}>Income</option>
                <option value="expense" {{ old('type', $transaction->type) == 'expense' ? 'selected' : '' }}>Expense</option>
            </select>

            <label for="amount">Amount (₱)</label>
            <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0.01"
                value="{{ old('amount', $transaction->amount) }}"
                required
            >

            <label for="category_id">Category</label>
            <select id="category_id" name="category_id">
                <option value="">Uncategorized</option>

                @foreach ($categories as $category)
                    <option
                        value="{{ $category->id }}"
                        {{ old('category_id', $transaction->category_id) == $category->id ? 'selected' : '' }}
                    >
                        {{ $category->name }} ({{ ucfirst($category->type) }})
                    </option>
                @endforeach
            </select>

            <label for="transaction_date">Transaction Date</label>
            <input
                type="date"
                id="transaction_date"
                name="transaction_date"
                value="{{ old('transaction_date', $transaction->transaction_date) }}"
                required
            >

            <label for="description">Description</label>
            <textarea
                id="description"
                name="description"
                rows="4"
            >{{ old('description', $transaction->description) }}</textarea>

            <button type="submit">Update Transaction</button>

        </form>

    </div>

@endsection
