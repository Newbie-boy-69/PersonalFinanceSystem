<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())
            ->with('category')
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        $categories = Category::where('user_id', Auth::id())
            ->orderBy('name')
            ->get();

        return Inertia::render('Transactions/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0.01',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        if (!empty($validated['category_id'])) {
            $category = Category::where('user_id', Auth::id())
                ->findOrFail($validated['category_id']);

            if ($category->type !== $validated['type']) {
                return back()->withErrors([
                    'category_id' => 'Please select a category matching the transaction type.',
                ])->withInput();
            }
        }

        Transaction::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction added successfully!');
    }

    public function edit($id)
    {
        $transaction = Transaction::where('user_id', Auth::id())
            ->findOrFail($id);

        $categories = Category::where('user_id', Auth::id())
            ->orderBy('name')
            ->get();

        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::where('user_id', Auth::id())
            ->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0.01',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        if (!empty($validated['category_id'])) {
            $category = Category::where('user_id', Auth::id())
                ->findOrFail($validated['category_id']);

            if ($category->type !== $validated['type']) {
                return back()->withErrors([
                    'category_id' => 'Please select a category matching the transaction type.',
                ])->withInput();
            }
        }

        $transaction->update($validated);

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction updated successfully!');
    }

    public function destroy($id)
    {
        $transaction = Transaction::where('user_id', Auth::id())
            ->findOrFail($id);

        $transaction->delete();

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction deleted successfully!');
    }
}
