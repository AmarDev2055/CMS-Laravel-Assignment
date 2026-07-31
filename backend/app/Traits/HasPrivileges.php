<?php

namespace App\Traits;

use App\Models\Role;

trait HasPrivileges
{
    /**
     * User roles relationship.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Check if the user has a specific role.
     */
    public function hasRole(string $role): bool
    {
        $this->loadMissing('roles');

        return $this->roles->contains('name', $role);
    }

    /**
     * Check if the user has a specific privilege.
     */
    public function hasPrivilege(string $slug): bool
    {
        $this->loadMissing('roles.privileges');

        return $this->roles
            ->flatMap(fn ($role) => $role->privileges)
            ->contains('slug', $slug);
    }

    /**
     * Check if user has ANY privilege.
     */
    public function hasAnyPrivilege(array $privileges): bool
    {
        foreach ($privileges as $privilege) {
            if ($this->hasPrivilege($privilege)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if user has ALL privileges.
     */
    public function hasAllPrivileges(array $privileges): bool
    {
        foreach ($privileges as $privilege) {
            if (! $this->hasPrivilege($privilege)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Assign a role to the user.
     */
    public function assignRole(string $roleName): void
    {
        $role = Role::where('name', $roleName)->first();

        if ($role && ! $this->roles->contains($role->id)) {
            $this->roles()->attach($role);
        }
    }

    /**
     * Remove a role from the user.
     */
    public function removeRole(string $roleName): void
    {
        $role = Role::where('name', $roleName)->first();

        if ($role) {
            $this->roles()->detach($role);
        }
    }
}