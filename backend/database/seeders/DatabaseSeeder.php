<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RoleSeeder::class,
            PrivilegeSeeder::class,
            RolePrivilegeSeeder::class,
            UserRoleSeeder::class,
            MenuSeeder::class,
        ]);
    }
}