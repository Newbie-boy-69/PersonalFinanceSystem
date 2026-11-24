<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $budgets = Budget::where('user_id', $userId)
            ->with('category')
            ->orderBy('start_date', 'desc')
            ->get();

        foreach ($budgets as $budget) {
            $totalSpent = Transaction::where('user_id', $userId)
                ->where('category_id', $budget->category_id)
                ->where('type', 'expense')
                ->whereBetween('transaction_date', [
                    $budget->start_date,
                    $budget->end_date,
                ])
                ->sum('amount');

            $budget->total_spent = $totalSpent;
            $budget->remaining = $budget->amount - $totalSpent;
            $budget->is_exceeded = $totalSpent > $budget->amount;
        }

        $categories = Category::where('user_id', $userId)
            ->where('type', 'expense')
            ->orderBy('name')
            ->get();

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0.01',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $category = Category::where('user_id', Auth::id())
            ->findOrFail($validated['category_id']);

        if ($category->type !== 'expense') {
            return back()->withErrors([
                'category_id' => 'Budgets can only be created for expense categories.',
            ])->withInput();
        }

        Budget::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('budgets.index')
            ->with('success', 'Budget created successfully!');
    }
}
