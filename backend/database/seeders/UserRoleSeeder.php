<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $moderator = User::where('email', 'moderator@example.com')->first();

        $adminRole = Role::where('name', 'Admin')->first();
        $moderatorRole = Role::where('name', 'Moderator')->first();

        $admin->roles()->sync([$adminRole->id]);
        $moderator->roles()->sync([$moderatorRole->id]);
    }
}