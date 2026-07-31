<?php

namespace App\Services;

use App\Models\Role;

class RoleService
{
    public function list(array $filters = [])
    {
        return Role::with('privileges')
            ->when(
                $filters['search'] ?? null,
                fn ($query, $search) =>
                    $query->where('name', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate($filters['per_page'] ?? 10);
    }

    public function find(Role $role)
    {
        return $role->load('privileges');
    }

    public function store(array $data)
    {
        $privileges = $data['privileges'] ?? [];

        unset($data['privileges']);

        $role = Role::create($data);

        $role->privileges()->sync($privileges);

        return $role->load('privileges');
    }

    public function update(Role $role, array $data)
    {
        $privileges = $data['privileges'] ?? null;

        unset($data['privileges']);

        $role->update($data);

        if ($privileges !== null) {
            $role->privileges()->sync($privileges);
        }

        return $role->load('privileges');
    }

    public function delete(Role $role)
    {
        $role->privileges()->detach();
        $role->users()->detach();

        return $role->delete();
    }
}