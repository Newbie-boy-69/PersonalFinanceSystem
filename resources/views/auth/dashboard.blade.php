
@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')

    <div class="page-title">
        <h1>Welcome, {{ Auth::user()->name }}!</h1>
        <p>Personal Savings and Expense Monitoring System</p>
    </div>

    <div class="card">
        <h2>Financial Summary</h2>
        <p>Here's an overview of your finances.</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">

        <div class="card">
            <h3>Total Income</h3>
            <h2 style="color: #16a34a;">
                ₱{{ number_format($totalIncome, 2) }}
            </h2>
        </div>

        <div class="card">
            <h3>Total Expenses</h3>
            <h2 style="color: #dc2626;">
                ₱{{ number_format($totalExpenses, 2) }}
            </h2>
        </div>

        <div class="card">
            <h3>Current Balance</h3>
            <h2>₱{{ number_format($currentBalance, 2) }}</h2>
        </div>

        <div class="card">
            <h3>Total Savings</h3>
            <h2 style="color: #2563eb;">
                ₱{{ number_format($totalSavings, 2) }}
            </h2>
        </div>

    </div>


@endsection
