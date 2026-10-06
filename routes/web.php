<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use App\Models\StockLog;

Route::get('/', function () {
    return Auth::check() ? redirect()->route('dashboard') : redirect('/login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
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

require __DIR__.'/categories.php';
require __DIR__.'/products.php';
require __DIR__.'/stock-logs.php';
require __DIR__.'/users.php';