<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\HasPrivileges;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasPrivileges;

    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function createdPages()
    {
        return $this->hasMany(Page::class, 'created_by');
    }

    public function updatedPages()
    {
        return $this->hasMany(Page::class, 'updated_by');
    }

    public function hasPrivilege(string $slug): bool
    {
        $this->loadMissing('roles.privileges');

        return $this->roles
            ->flatMap(fn ($role) => $role->privileges)
            ->contains('slug', $slug);
    }
}