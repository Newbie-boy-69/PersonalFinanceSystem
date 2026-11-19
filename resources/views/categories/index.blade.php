
@extends('layouts.app')

@section('title', 'Category Management')

@section('content')

    <div class="page-title">
        <h1>Category Management</h1>
        <p>Manage your income and expense categories.</p>
    </div>

    <div class="card">
        <h2>Add New Category</h2>
        <p style="color: #64748b; margin: 8px 0 20px;">
            Create categories to organize your financial transactions.
        </p>

        @if ($errors->any())
            <div style="background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
            </div>
        @endif

        <form action="{{ route('categories.store') }}" method="POST">
            @csrf

            <label for="name">Category Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value="{{ old('name') }}"
                placeholder="e.g. Food, Salary, Transportation"
                required
            >

            <label for="type">Category Type</label>
            <select id="type" name="type" required>
                <option value="">Select Type</option>
                <option value="income" {{ old('type') == 'income' ? 'selected' : '' }}>Income</option>
                <option value="expense" {{ old('type') == 'expense' ? 'selected' : '' }}>Expense</option>
            </select>

            <button type="submit">+ Add Category</button>
        </form>
    </div>

    <div class="card">
        <h2>Your Categories</h2>

        <p style="color: #64748b; margin: 8px 0 20px;">
            View all your saved income and expense categories.
        </p>

        @if ($categories->isEmpty())

            <p>No categories added yet.</p>

        @else

            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Type</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach ($categories as $category)
                        <tr>
                            <td>{{ $category->name }}</td>
                            <td>
                                @if ($category->type === 'income')
                                    <span style="color: #16a34a; font-weight: bold;">
                                        Income
                                    </span>
                                @else
                                    <span style="color: #dc2626; font-weight: bold;">
                                        Expense
                                    </span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

        @endif
    </div>

@endsection
