<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Privilege;
use Illuminate\Database\Seeder;

class RolePrivilegeSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::where('name', 'Admin')->first();
        $moderator = Role::where('name', 'Moderator')->first();

        // Admin gets all privileges
        $admin->privileges()->sync(
            Privilege::pluck('id')->toArray()
        );

        // Moderator privileges
        $moderatorPrivileges = Privilege::whereIn('slug', [
            'list-pages',
            'create-pages',
            'edit-pages',
            'manage-menus',
        ])->pluck('id')->toArray();

        $moderator->privileges()->sync($moderatorPrivileges);
    }
}