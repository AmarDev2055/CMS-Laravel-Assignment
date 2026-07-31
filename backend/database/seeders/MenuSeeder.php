<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menu::truncate();
        Menu::query()->delete();

        Menu::create([
            'title' => 'Home',
            'sort_order' => 1,
        ]);

        Menu::create([
            'title' => 'About',
            'sort_order' => 2,
        ]);

        $services = Menu::create([
            'title' => 'Services',
            'sort_order' => 3,
        ]);

        Menu::create([
            'title' => 'Web Development',
            'parent_id' => $services->id,
            'sort_order' => 1,
        ]);

        Menu::create([
            'title' => 'Mobile Development',
            'parent_id' => $services->id,
            'sort_order' => 2,
        ]);

        Menu::create([
            'title' => 'UI/UX Design',
            'parent_id' => $services->id,
            'sort_order' => 3,
        ]);

        Menu::create([
            'title' => 'Blog',
            'sort_order' => 4,
        ]);

        Menu::create([
            'title' => 'Contact',
            'sort_order' => 5,
        ]);
    }
}