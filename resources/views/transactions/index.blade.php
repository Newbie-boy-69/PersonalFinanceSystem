
@extends('layouts.app')

@section('title', 'Transactions')

@section('content')

    <div class="page-title">
        <h1>Transaction History</h1>
        <p>Manage your income and expenses.</p>
    </div>

    <div class="card">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <h2>All Transactions</h2>

            <a href="{{ route('transactions.create') }}">
                <button type="button">+ Add Transaction</button>
            </a>
        </div>

        @if ($transactions->isEmpty())

            <p>No transactions recorded yet.</p>

        @else

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach ($transactions as $transaction)
                        <tr>
                            <td>{{ $transaction->transaction_date }}</td>

                            <td>{{ $transaction->title }}</td>

                            <td>
                                {{ $transaction->category?->name ?? 'Uncategorized' }}
                            </td>

                            <td>{{ ucfirst($transaction->type) }}</td>

                            <td>
                                ₱{{ number_format($transaction->amount, 2) }}
                            </td>

                            <td>
                                <a href="{{ route('transactions.edit', $transaction->id) }}">
                                    Edit
                                </a>

                                |

                                <form
                                    action="{{ route('transactions.destroy', $transaction->id) }}"
                                    method="POST"
                                    style="display: inline;"
                                    onsubmit="return confirm('Are you sure you want to delete this transaction?');"
                                >
                                    @csrf
                                    @method('DELETE')

                                    <button
                                        type="submit"
                                        style="background: #dc2626;"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

        @endif

    </div>

@endsection
