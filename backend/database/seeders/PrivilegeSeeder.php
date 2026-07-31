<?php

namespace Database\Seeders;

use App\Models\Privilege;
use Illuminate\Database\Seeder;

class PrivilegeSeeder extends Seeder
{
    public function run(): void
    {
        $privileges = [

            ['name' => 'List Pages', 'slug' => 'list-pages'],
            ['name' => 'Create Pages', 'slug' => 'create-pages'],
            ['name' => 'Edit Pages', 'slug' => 'edit-pages'],
            ['name' => 'Delete Pages', 'slug' => 'delete-pages'],
            ['name' => 'Restore Pages', 'slug' => 'restore-pages'],

            ['name' => 'Manage Users', 'slug' => 'manage-users'],
            ['name' => 'Manage Roles', 'slug' => 'manage-roles'],
            ['name' => 'Manage Privileges', 'slug' => 'manage-privileges'],

            ['name' => 'Manage Menus', 'slug' => 'manage-menus'],
        ];

        foreach ($privileges as $privilege) {
            Privilege::updateOrCreate(
                ['slug' => $privilege['slug']],
                $privilege
            );
        }
    }
}