<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Models\StockLog;

// 1. Root Route: Redirects authenticated users to dashboard, guest users to login
Route::get('/', function () {
    return Auth::check() ? redirect()->route('dashboard') : redirect()->route('login');
});

// 2. Guest Routes: Redirects logged-in users away from auth pages back to dashboard
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

// 3. Protected Application Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'metrics' => [
                'total_products' => Product::count(),
                'total_categories' => Category::count(),
                'low_stock_count' => Product::where('stock', '<=', 5)->count(),
                'total_logs' => StockLog::count(),
            ],
            'recent_logs' => StockLog::with(['product', 'user'])->latest()->take(5)->get(),
        ]);
    })->name('dashboard');
});

// 4. Modular Route Imports
require __DIR__.'/categories.php';
require __DIR__.'/products.php';
require __DIR__.'/stock-logs.php';
require __DIR__.'/users.php';