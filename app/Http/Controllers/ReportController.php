<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));

        $startDate = \Carbon\Carbon::createFromFormat('Y-m', $month)
            ->startOfMonth();

        $endDate = $startDate->copy()->endOfMonth();

        $transactions = Transaction::where('user_id', Auth::id())
            ->whereBetween('transaction_date', [
                $startDate->toDateString(),
                $endDate->toDateString()
            ])
            ->with('category')
            ->orderBy('transaction_date', 'desc')
            ->get();

        $totalIncome = $transactions
            ->where('type', 'income')
            ->sum('amount');

        $totalExpenses = $transactions
            ->where('type', 'expense')
            ->sum('amount');

        $balance = $totalIncome - $totalExpenses;

        $expensesByCategory = $transactions
            ->where('type', 'expense')
            ->groupBy(function ($transaction) {
                return $transaction->category->name ?? 'Uncategorized';
            })
            ->map(function ($items) {
                return $items->sum('amount');
            });

        return Inertia::render('Reports/Index', [
            'month' => $month,
            'transactions' => $transactions,
            'totalIncome' => $totalIncome,
            'totalExpenses' => $totalExpenses,
            'balance' => $balance,
            'expensesByCategory' => $expensesByCategory,
        ]);
    }
}
