<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function list(array $filters = [])
    {
        return User::with('roles')
            ->when(
                $filters['search'] ?? null,
                fn ($q, $search) =>
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate($filters['per_page'] ?? 10);
    }

    public function find(User $user)
    {
        return $user->load('roles');
    }

    public function store(array $data)
    {
        $roles = $data['roles'] ?? [];

        unset($data['roles']);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $user->roles()->sync($roles);

        return $user->load('roles');
    }

    public function update(User $user, array $data)
    {
        $roles = $data['roles'] ?? null;

        unset($data['roles']);

        if (!empty($data['password'])) {

            $data['password'] = Hash::make($data['password']);

        } else {

            unset($data['password']);

        }

        $user->update($data);

        if ($roles !== null) {

            $user->roles()->sync($roles);

        }

        return $user->load('roles');
    }

    public function delete(User $user)
    {
        return $user->delete();
    }
}