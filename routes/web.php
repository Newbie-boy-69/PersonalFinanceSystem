<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SavingsGoalController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

// Guest Routes
Route::middleware('guest')->group(function () {

    // Registration
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::post('/register', [AuthController::class, 'register'])
        ->name('register.store');

    // Login
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::post('/login', [AuthController::class, 'login'])
        ->name('login.store');
});

// Authenticated Routes
Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Account
    Route::get('/account', function () {
        return Inertia::render('Account');
    })->name('account');

    // How to Use
    Route::get('/how-to-use', function () {
        return Inertia::render('HowToUse');
    })->name('how-to-use');

    // Categories
    Route::get('/categories', [CategoryController::class, 'index'])
        ->name('categories.index');

    Route::post('/categories', [CategoryController::class, 'store'])
        ->name('categories.store');

    // Transactions
    Route::get('/transactions', [TransactionController::class, 'index'])
        ->name('transactions.index');

    Route::get('/transactions/create', [TransactionController::class, 'create'])
        ->name('transactions.create');

    Route::post('/transactions', [TransactionController::class, 'store'])
        ->name('transactions.store');

    Route::get('/transactions/{id}/edit', [TransactionController::class, 'edit'])
        ->name('transactions.edit');

    Route::put('/transactions/{id}', [TransactionController::class, 'update'])
        ->name('transactions.update');

    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy'])
        ->name('transactions.destroy');

    // Budgets
    Route::get('/budgets', [BudgetController::class, 'index'])
        ->name('budgets.index');

    Route::post('/budgets', [BudgetController::class, 'store'])
        ->name('budgets.store');

    // Savings Goals
    Route::get('/savings-goals', [SavingsGoalController::class, 'index'])
        ->name('savings-goals.index');

    Route::post('/savings-goals', [SavingsGoalController::class, 'store'])
        ->name('savings-goals.store');

    Route::post('/savings-goals/{id}/add', [SavingsGoalController::class, 'addSavings'])
        ->name('savings-goals.add');

    // Reports
    Route::get('/reports', [ReportController::class, 'index'])
        ->name('reports.index');

    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');
});
