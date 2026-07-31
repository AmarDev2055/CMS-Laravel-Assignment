<?php

namespace App\Services;

use App\Models\Menu;
use App\Models\Page;
use App\Models\Role;
use App\Models\User;
use App\Models\Privilege;

class DashboardService
{
    public function getDashboardData(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Statistics
            |--------------------------------------------------------------------------
            */

            'statistics' => [

                'pages' => Page::count(),

                'published_pages' => Page::where('status', 'published')->count(),

                'draft_pages' => Page::where('status', 'draft')->count(),

                'trashed_pages' => method_exists(Page::class, 'onlyTrashed')
                    ? Page::onlyTrashed()->count()
                    : 0,

                'menus' => Menu::count(),

                'users' => User::count(),

                'roles' => Role::count(),

                'privileges' => Privilege::count(),
            ],

            /*
            |--------------------------------------------------------------------------
            | Recent Pages
            |--------------------------------------------------------------------------
            */

            'recent_pages' => Page::latest()
                ->take(5)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'status',
                    'created_at',
                ]),

            /*
            |--------------------------------------------------------------------------
            | Recent Users
            |--------------------------------------------------------------------------
            */

            'recent_users' => User::latest()
                ->take(5)
                ->get([
                    'id',
                    'name',
                    'email',
                    'created_at',
                ]),
        ];
    }
}