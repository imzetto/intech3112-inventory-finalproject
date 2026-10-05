<?php

use App\Http\Controllers\StockLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('stock-logs')->name('stock-logs.')->group(function () {
    Route::get('/', [StockLogController::class, 'index'])->name('index');

    Route::middleware(['role:Admin|Manager'])->group(function () {
        Route::get('/create', [StockLogController::class, 'create'])->name('create');
        Route::post('/', [StockLogController::class, 'store'])->name('store');
    });
});