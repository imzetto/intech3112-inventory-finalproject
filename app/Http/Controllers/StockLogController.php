<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StockLogController extends Controller
{
    public function index()
    {
        $logs = StockLog::with(['product', 'user'])->latest()->get();
        return Inertia::render('StockLogs/Index', [
            'logs' => $logs,
        ]);
    }

    public function create()
    {
        $products = Product::all(['id', 'name', 'sku', 'stock']);
        return Inertia::render('StockLogs/Create', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_change' => 'required|integer|min:1',
            'type' => 'required|in:IN,OUT',
            'reason' => 'nullable|string|max:255',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if ($validated['type'] === 'OUT' && $product->stock < $validated['quantity_change']) {
            return back()->withErrors(['quantity_change' => 'Cannot reduce stock below 0. Available stock: ' . $product->stock]);
        }

        DB::transaction(function () use ($validated, $product, $request) {
            StockLog::create([
                'product_id' => $validated['product_id'],
                'user_id' => $request->user()->id,
                'quantity_change' => $validated['quantity_change'],
                'type' => $validated['type'],
                'reason' => $validated['reason'],
            ]);

            if ($validated['type'] === 'IN') {
                $product->increment('stock', $validated['quantity_change']);
            } else {
                $product->decrement('stock', $validated['quantity_change']);
            }
        });

        return redirect()->route('stock-logs.index');
    }
}