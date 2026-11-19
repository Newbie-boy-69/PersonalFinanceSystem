<?php

namespace App\Http\Controllers;

use App\Models\SavingsGoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavingsGoalController extends Controller
{
    public function index()
    {
        $goals = SavingsGoal::where('user_id', Auth::id())
            ->orderBy('deadline')
            ->get();

        foreach ($goals as $goal) {
            $goal->progress = $goal->target_amount > 0
                ? min(100, ($goal->current_amount / $goal->target_amount) * 100)
                : 0;
        }

        return view('savings-goals.index', compact('goals'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0.01',
            'deadline' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        SavingsGoal::create([
            ...$validated,
            'user_id' => Auth::id(),
            'current_amount' => 0,
        ]);

        return redirect()->route('savings-goals.index')
            ->with('success', 'Savings goal created successfully!');
    }

    public function addSavings(Request $request, $id)
    {
        $goal = SavingsGoal::where('user_id', Auth::id())
            ->findOrFail($id);

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ]);

        $goal->increment('current_amount', $validated['amount']);

        return redirect()->route('savings-goals.index')
            ->with('success', 'Savings added successfully!');
    }

}
