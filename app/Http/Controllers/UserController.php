<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->role($request->input('role'));
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->input('status') === 'active');
        }

        $users = $query->latest()->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'is_active' => (bool)$u->is_active,
                'roles' => $u->getRoleNames(),
                'created_at' => $u->created_at->format('M d, Y'),
            ];
        });

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status']),
            'availableRoles' => Role::whereIn('name', ['Manager', 'User'])->pluck('name'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'availableRoles' => ['User', 'Manager', 'Admin'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'role' => 'required|in:User,Manager,Admin',
            'password' => ['required', 'confirmed', Password::defaults()],
            'is_active' => 'required|boolean',
        ], [
            'email.unique' => 'An account with this email already exists.',
            'role.in' => 'Invalid role selected. Only Manager and Regular User roles can be assigned directly.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_active' => $validated['is_active'],
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('users.index')->with('success', "User account for {$user->name} created successfully as a {$validated['role']}.");
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'managedUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => (bool)$user->is_active,
                'role' => $user->roles->first()?->name ?? 'User',
            ],
            'availableRoles' => ['User', 'Manager', 'Admin'],
        ]);
    }

    public function update(Request $request, User $user)
    {
        // Prevent Admin from modifying their own account via this endpoint to avoid accidental lockouts
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot alter your own administrative role or status.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:User,Manager,Admin',
            'is_active' => 'required|boolean',
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ], [
            'email.unique' => 'An account with this email address already exists.',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->is_active = $validated['is_active'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        $previousRole = $user->roles->first()?->name;
        $user->syncRoles([$validated['role']]);

        $roleChanged = $previousRole !== $validated['role'];
        $message = $roleChanged
            ? "{$user->name}'s role was updated from {$previousRole} to {$validated['role']}."
            : "User {$user->name} updated successfully.";

        return redirect()->route('users.index')->with('success', $message);
    }

    public function toggleStatus(Request $request, User $user)
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot disable your own administrator account.');
        }

        $user->is_active = !$user->is_active;
        $user->save();

        $statusText = $user->is_active ? 'activated' : 'deactivated';
        return redirect()->route('users.index')->with('success', "Account for {$user->name} has been {$statusText}.");
    }
}