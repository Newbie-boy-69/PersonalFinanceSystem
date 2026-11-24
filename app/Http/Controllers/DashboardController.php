<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\SavingsGoal;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $totalIncome = Transaction::where('user_id', $userId)
            ->where('type', 'income')
            ->sum('amount');

        $totalExpenses = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->sum('amount');

        $currentBalance = $totalIncome - $totalExpenses;

        $totalSavings = SavingsGoal::where('user_id', $userId)
            ->sum('current_amount');

        return Inertia::render('Dashboard', [
            'totalIncome' => $totalIncome,
            'totalExpenses' => $totalExpenses,
            'currentBalance' => $currentBalance,
            'totalSavings' => $totalSavings,
        ]);
    }
}
