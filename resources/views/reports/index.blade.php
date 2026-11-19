
@extends('layouts.app')

@section('title', 'Financial Reports')

@section('content')

    <div class="page-title">
        <h1>Financial Reports</h1>
        <p>Analyze your income, expenses, and financial activities.</p>
    </div>

    <div class="card">
        <h2>Monthly Financial Summary</h2>

        <form action="{{ route('reports.index') }}" method="GET">
            <label for="month">Select Month</label>

            <input
                type="month"
                id="month"
                name="month"
                value="{{ $month }}"
                required
            >

            <button type="submit">Generate Report</button>
        </form>
    </div>

    <div class="page-title">
        <h2>Financial Overview</h2>
        <p>Your financial performance for the selected month.</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">

        <div class="card">
            <p style="color: #64748b;">Total Income</p>
            <h2 style="color: #16a34a;">
                ₱{{ number_format($totalIncome, 2) }}
            </h2>
        </div>

        <div class="card">
            <p style="color: #64748b;">Total Expenses</p>
            <h2 style="color: #dc2626;">
                ₱{{ number_format($totalExpenses, 2) }}
            </h2>
        </div>

        <div class="card">
            <p style="color: #64748b;">Monthly Balance</p>
            <h2 style="color: {{ $balance >= 0 ? '#2563eb' : '#dc2626' }};">
                ₱{{ number_format($balance, 2) }}
            </h2>
        </div>

    </div>

    <div class="card">
        <h2>Expense Distribution</h2>
        <p style="color: #64748b; margin: 8px 0 20px;">
            See how your expenses are divided among categories.
        </p>

        @if ($expensesByCategory->isEmpty())
            <p>No expenses recorded for this month.</p>
        @else
            <div style="max-width: 450px; margin: auto;">
                <canvas id="expensePieChart"></canvas>
            </div>
        @endif
    </div>

    <div class="card">
        <h2>Financial Activity Trend</h2>
        <p style="color: #64748b; margin: 8px 0 20px;">
            Track your daily income and expenses using a line chart.
        </p>

        @if ($transactions->isEmpty())
            <p>No financial activity recorded for this month.</p>
        @else
            <div style="width: 100%; overflow-x: auto;">
                <div style="min-width: 500px; height: 320px;">
                    <canvas id="financialTrendChart"></canvas>
                </div>
            </div>
        @endif
    </div>

    <div class="card">
        <h2>Expenses by Category</h2>

        @forelse ($expensesByCategory as $category => $amount)
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee;">
                <span>{{ $category }}</span>
                <strong>₱{{ number_format($amount, 2) }}</strong>
            </div>
        @empty
            <p>No expenses recorded for this month.</p>
        @endforelse
    </div>

    <div class="card">
        <h2>Transaction Details</h2>

        @if ($transactions->isEmpty())
            <p>No transactions found for this month.</p>
        @else
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach ($transactions as $transaction)
                            <tr>
                                <td>{{ $transaction->transaction_date }}</td>
                                <td>{{ $transaction->title }}</td>
                                <td>{{ $transaction->category->name ?? 'Uncategorized' }}</td>
                                <td>{{ ucfirst($transaction->type) }}</td>
                                <td>₱{{ number_format($transaction->amount, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>

@endsection

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
        const expenseLabels = @json($expensesByCategory->keys()->values());
        const expenseValues = @json($expensesByCategory->values());

        const transactions = @json($transactions->map(function ($transaction) {
            return [
                'date' => $transaction->transaction_date,
                'type' => $transaction->type,
                'amount' => (float) $transaction->amount
            ];
        })->values());

        // Expense Pie Chart
        const pieCanvas = document.getElementById('expensePieChart');

        if (pieCanvas) {
            new Chart(pieCanvas, {
                type: 'pie',
                data: {
                    labels: expenseLabels,
                    datasets: [{
                        data: expenseValues,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ₱' +
                                        Number(context.raw).toLocaleString('en-PH', {
                                            minimumFractionDigits: 2
                                        });
                                }
                            }
                        }
                    }
                }
            });
        }

        // Daily Financial Activity
        const dailyData = {};

        transactions.forEach(transaction => {
            if (!dailyData[transaction.date]) {
                dailyData[transaction.date] = {
                    income: 0,
                    expense: 0
                };
            }

            dailyData[transaction.date][transaction.type] += transaction.amount;
        });

        const dates = Object.keys(dailyData).sort();

        const incomeData = dates.map(date => dailyData[date].income);
        const expenseData = dates.map(date => dailyData[date].expense);

        const trendCanvas = document.getElementById('financialTrendChart');

        if (trendCanvas) {
            new Chart(trendCanvas, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Income',
                            data: incomeData,
                            borderColor: '#16a34a',
                            backgroundColor: 'rgba(22, 163, 74, 0.10)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Expenses',
                            data: expenseData,
                            borderColor: '#dc2626',
                            backgroundColor: 'rgba(220, 38, 38, 0.10)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount (₱)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Transaction Date'
                            }
                        }
                    }
                }
            });
        }
    </script>
@endpush
