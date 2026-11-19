
@extends('layouts.app')

@section('title', 'Savings Goals')

@section('content')

    <div class="page-title">
        <h1>Savings Goals</h1>
        <p>Set your financial goals and track your savings progress.</p>
    </div>

    <div class="card">
        <h2>Create New Savings Goal</h2>
        <p style="color: #64748b; margin: 8px 0 20px;">
            Define a savings target and work toward achieving it.
        </p>

        @if ($errors->any())
            <div style="background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
            </div>
        @endif

        <form action="{{ route('savings-goals.store') }}" method="POST">
            @csrf

            <label for="name">Goal Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value="{{ old('name') }}"
                placeholder="e.g. Emergency Fund"
                required
            >

            <label for="target_amount">Target Amount (₱)</label>
            <input
                type="number"
                id="target_amount"
                name="target_amount"
                step="0.01"
                min="0.01"
                value="{{ old('target_amount') }}"
                placeholder="Enter target amount"
                required
            >

            <label for="deadline">Target Deadline</label>
            <input
                type="date"
                id="deadline"
                name="deadline"
                value="{{ old('deadline') }}"
            >

            <label for="description">Description</label>
            <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Describe your savings goal..."
            >{{ old('description') }}</textarea>

            <button type="submit">+ Create Savings Goal</button>
        </form>
    </div>

    <div class="page-title">
        <h2>Your Savings Goals</h2>
        <p>Monitor your progress and add savings to your goals.</p>
    </div>

    @if ($goals->isEmpty())
        <div class="card">
            <p>No savings goals created yet.</p>
        </div>
    @else
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

            @foreach ($goals as $goal)
                <div class="card" style="margin-bottom: 0;">

                    <h2>{{ $goal->name }}</h2>

                    <p style="color: #64748b; margin: 8px 0 18px;">
                        {{ $goal->description ?: 'No description provided.' }}
                    </p>

                    <div style="margin-bottom: 12px;">
                        <p style="color: #64748b;">Current Savings</p>
                        <h2 style="color: #2563eb;">
                            ₱{{ number_format($goal->current_amount, 2) }}
                        </h2>
                    </div>

                    <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
                        <span>Target: ₱{{ number_format($goal->target_amount, 2) }}</span>
                        <strong>{{ number_format($goal->progress, 1) }}%</strong>
                    </div>

                    <div style="background: #e2e8f0; height: 12px; border-radius: 10px; overflow: hidden; margin-bottom: 18px;">
                        <div style="
                            background: #2563eb;
                            width: {{ $goal->progress }}%;
                            height: 100%;
                            border-radius: 10px;
                        "></div>
                    </div>

                    <p style="margin-bottom: 15px;">
                        <strong>Deadline:</strong>
                        {{ $goal->deadline ?? 'No deadline' }}
                    </p>

                    @if ($goal->current_amount >= $goal->target_amount)
                        <p style="color: #16a34a; font-weight: bold; margin-bottom: 15px;">
                            Goal Completed!
                        </p>
                    @else
                        <p style="color: #64748b; margin-bottom: 15px;">
                            Keep saving! You're making progress.
                        </p>

                        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">

                        <form action="{{ route('savings-goals.add', $goal->id) }}" method="POST">
                            @csrf

                            <label for="amount-{{ $goal->id }}">Add Savings (₱)</label>

                            <input
                                type="number"
                                id="amount-{{ $goal->id }}"
                                name="amount"
                                step="0.01"
                                min="0.01"
                                placeholder="Enter amount"
                                required
                            >

                            <button type="submit">+ Add Savings</button>
                        </form>
                    @endif

                </div>
            @endforeach

        </div>
    @endif

@endsection
