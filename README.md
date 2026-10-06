# InventoryCore - Inventory Management System

A modern, role-based inventory management platform built with **Laravel 12**, **Inertia.js**, and **React**.

## 🚀 Key Features

- **Role-Based Access Control (Spatie RBAC)**:
  - **Admin**: Full access, User Management (promote/demote roles, activate/deactivate accounts).
  - **Manager**: Add & Edit products, categories, and stock adjustment logs.
  - **Regular User**: Read-only catalogue access.
- **Safe Public Registration**: All self-registered users are automatically assigned the `User` role server-side.
- **Stock Movement Safety Flow**: Two-step adjustment modal with calculated projections and negative-stock prevention.
- **Responsive UI/UX**: Minimalist corporate blue design with collapsible mobile navigation and touch-friendly data tables.
- **Headless Authentication**: Laravel Fortify with custom active-status enforcement.

## 🛠 Tech Stack

- **Backend**: Laravel 12, PHP 8.2+, MySQL
- **Frontend**: React, Inertia.js, Tailwind CSS / Vanilla CSS
- **Authentication & Security**: Laravel Fortify, Spatie Laravel-Permission

## ⚡ Quick Start

```bash
# Clone repository
git clone [https://github.com/imzetto/laravel-inventory-capstone.git](https://github.com/imzetto/laravel-inventory-capstone.git)
cd laravel-inventory-capstone

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database migrations & seeders
php artisan migrate --seed

👥 Demo Accounts
Admin: admin@example.com / password123

Manager: manager@example.com / password123

User: user@example.com / password123

# Run dev servers
npm run dev
php artisan serve
