<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::updateOrCreate(
            ['name' => 'Admin'],
            ['description' => 'System Administrator']
        );

        Role::updateOrCreate(
            ['name' => 'Moderator'],
            ['description' => 'Content Moderator']
        );
    }
}