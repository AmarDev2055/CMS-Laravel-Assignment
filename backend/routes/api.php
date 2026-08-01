<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PrivilegeController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TranslationController;

Route::get('/user', [AuthController::class, 'me'])
    ->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']);

Route::get(
    '/translations/{locale}',
    [TranslationController::class, 'index']
);

Route::prefix('public')->group(function () {
    Route::get('/menus', [MenuController::class, 'publicMenus']);
    // Route::get('/pages', [PageController::class, 'publicPages']);
    Route::get('/pages/{slug}', [PageController::class, 'showPublic']);
});

// Route::middleware('auth:sanctum')->get('/test-permission', [AuthController::class, 'testPermission']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::post('/logout', [AuthController::class, 'logout']);

    // Pages — only index/show open to any authenticated user;
    // store/update/destroy require specific privileges
    Route::get('/pages/trash', [PageController::class, 'trash'])
        ->middleware('privilege:restore-pages');
    Route::get('/pages', [PageController::class, 'index']);
    Route::get('/pages/{page}', [PageController::class, 'show']);
    Route::post('/pages', [PageController::class, 'store'])
        ->middleware('privilege:create-pages');
    Route::put('/pages/{page}', [PageController::class, 'update'])
        ->middleware('privilege:edit-pages');
    Route::delete('/pages/{page}', [PageController::class, 'destroy'])
        ->middleware('privilege:delete-pages');
    Route::post('/pages/{id}/restore', [PageController::class, 'restore'])
        ->middleware('privilege:restore-pages');
    Route::delete('/pages/{id}/force', [PageController::class, 'forceDelete'])
        ->middleware('privilege:restore-pages');

    // Menus
    Route::apiResource('menus', MenuController::class)
        ->middleware('privilege:manage-menus');

    Route::post('/menus/reorder', [MenuController::class, 'reorder'])
        ->middleware('privilege:manage-menus');

    // Users, Roles, Privileges — fully gated by privilege
    Route::apiResource('users', UserController::class)->middleware('privilege:manage-users');
    Route::apiResource('roles', RoleController::class)->middleware('privilege:manage-roles');
    Route::apiResource('privileges', PrivilegeController::class)->middleware('privilege:manage-privileges');
});


// Public endpoint
Route::get('/public/pages', [PageController::class, 'published']);
Route::get('/public/menus', [MenuController::class, 'publicMenus']
);

// Route::middleware(['auth:sanctum'])->group(function () {

//     Route::get('/pages', [PageController::class, 'index'])
//         ->middleware('privilege:list-pages');

//     Route::post('/pages', [PageController::class, 'store'])
//         ->middleware('privilege:create-pages');

//     Route::get('/pages/{page}', [PageController::class, 'show'])
//         ->middleware('privilege:list-pages');

//     Route::put('/pages/{page}', [PageController::class, 'update'])
//         ->middleware('privilege:edit-pages');

//     Route::delete('/pages/{page}', [PageController::class, 'destroy'])
//         ->middleware('privilege:delete-pages');

//     Route::post('/pages/{id}/restore', [PageController::class, 'restore'])
//         ->middleware('privilege:restore-pages');
// });

// Route::middleware('auth:sanctum')->get('/test-privilege', function () {

//     return [

//         'Admin' => auth()->user()->hasRole('Admin'),

//         'Moderator' => auth()->user()->hasRole('Moderator'),

//         'Can Create' => auth()->user()->hasPrivilege('create-pages'),

//         'Can Delete' => auth()->user()->hasPrivilege('delete-pages'),

//         'Any' => auth()->user()->hasAnyPrivilege([
//             'delete-pages',
//             'manage-users'
//         ]),

//         'All' => auth()->user()->hasAllPrivileges([
//             'list-pages',
//             'create-pages'
//         ]),

//     ];

// });