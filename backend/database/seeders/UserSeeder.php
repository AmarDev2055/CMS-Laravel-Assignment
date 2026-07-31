<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@example.com'
            ],
            [
                'name' => 'Admin',

                'password' => 'password123'
            ]
        );

        User::updateOrCreate(
            [
                'email' => 'moderator@example.com'
            ],
            [
                'name' => 'Moderator',

                'password' => 'password'
            ]
        );
    }
}