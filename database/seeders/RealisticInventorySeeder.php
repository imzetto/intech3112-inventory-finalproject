<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\StockLog;
use App\Models\User;
use Illuminate\Database\Seeder;

class RealisticInventorySeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $manager = User::where('email', 'manager@example.com')->first();

        // 1. Realistic Categories
        $laptops = Category::updateOrCreate(
            ['name' => 'Laptops & Workstations'],
            ['description' => 'Business and enterprise laptops, mobile workstations, and accessories.']
        );

        $peripherals = Category::updateOrCreate(
            ['name' => 'Peripherals & Accessories'],
            ['description' => 'Keyboards, wireless mice, webcams, and docking stations.']
        );

        $networking = Category::updateOrCreate(
            ['name' => 'Networking Hardware'],
            ['description' => 'Routers, gigabit switches, access points, and patch cables.']
        );

        $furniture = Category::updateOrCreate(
            ['name' => 'Office Ergonomics'],
            ['description' => 'Adjustable standing desks, mesh chairs, and monitor mounts.']
        );

        // 2. Realistic Products
        $productsData = [
            [
                'category_id' => $laptops->id,
                'name' => 'ThinkPad T14s Gen 4 (AMD Ryzen 7, 32GB RAM)',
                'sku' => 'TP-T14S-G4',
                'price' => 1249.99,
                'stock' => 14,
            ],
            [
                'category_id' => $laptops->id,
                'name' => 'Dell Latitude 5540 (Intel Core i7, 16GB RAM)',
                'sku' => 'DEL-LAT-5540',
                'price' => 1099.00,
                'stock' => 2, // Low stock item
            ],
            [
                'category_id' => $peripherals->id,
                'name' => 'Logitech MX Master 3S Wireless Mouse',
                'sku' => 'LOG-MXM-3S',
                'price' => 99.99,
                'stock' => 25,
            ],
            [
                'category_id' => $peripherals->id,
                'name' => 'Keychron K2 Pro Mechanical Keyboard (Brown Switch)',
                'sku' => 'KCH-K2P-BR',
                'price' => 119.50,
                'stock' => 4, // Low stock item
            ],
            [
                'category_id' => $networking->id,
                'name' => 'Ubiquiti UniFi 24-Port PoE Switch',
                'sku' => 'UBI-USW-24POE',
                'price' => 379.00,
                'stock' => 6,
            ],
            [
                'category_id' => $networking->id,
                'name' => 'Cat6 Ethernet Patch Cable 3m (Pack of 10)',
                'sku' => 'CAB-CAT6-3M',
                'price' => 24.95,
                'stock' => 40,
            ],
            [
                'category_id' => $furniture->id,
                'name' => 'Ergonomic High-Back Mesh Desk Chair',
                'sku' => 'FUR-MSH-CHR',
                'price' => 289.00,
                'stock' => 8,
            ],
            [
                'category_id' => $furniture->id,
                'name' => 'Dual Monitor Steel Gas Spring Arm',
                'sku' => 'MNT-ARM-DUAL',
                'price' => 65.00,
                'stock' => 3, // Low stock item
            ],
        ];

        $createdProducts = [];
        foreach ($productsData as $data) {
            $createdProducts[] = Product::updateOrCreate(
                ['sku' => $data['sku']],
                $data
            );
        }

        // 3. Realistic Stock Logs (Audit Trail)
        if ($admin && $manager && count($createdProducts) >= 4) {
            StockLog::updateOrCreate(
                ['reason' => 'Q3 bulk hardware procurement received from supplier'],
                [
                    'product_id' => $createdProducts[0]->id, // ThinkPad
                    'user_id' => $admin->id,
                    'quantity_change' => 10,
                    'type' => 'IN',
                ]
            );

            StockLog::updateOrCreate(
                ['reason' => 'Assigned to new engineering hires'],
                [
                    'product_id' => $createdProducts[1]->id, // Dell Latitude
                    'user_id' => $manager->id,
                    'quantity_change' => 3,
                    'type' => 'OUT',
                ]
            );

            StockLog::updateOrCreate(
                ['reason' => 'Restocked via Logitech regional distributor'],
                [
                    'product_id' => $createdProducts[2]->id, // MX Master 3S
                    'user_id' => $manager->id,
                    'quantity_change' => 15,
                    'type' => 'IN',
                ]
            );

            StockLog::updateOrCreate(
                ['reason' => 'Damaged during server rack transit; discarded'],
                [
                    'product_id' => $createdProducts[4]->id, // Ubiquiti Switch
                    'user_id' => $admin->id,
                    'quantity_change' => 1,
                    'type' => 'OUT',
                ]
            );
        }
    }
}