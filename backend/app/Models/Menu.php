<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Menu extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'parent_id',
        'sort_order',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Menu $menu) {
            if (empty($menu->slug)) {
                $menu->slug = static::generateUniqueSlug($menu->title);
            }
        });

        static::updating(function (Menu $menu) {
            if ($menu->isDirty('title') && empty($menu->slug)) {
                $menu->slug = static::generateUniqueSlug($menu->title, $menu->id);
            }
        });
    }

    protected static function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        $query = static::where('slug', $slug);

        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        while ($query->exists()) {
            $slug = "{$original}-{$count}";
            $count++;

            $query = static::where('slug', $slug);
            if ($ignoreId) {
                $query->where('id', '!=', $ignoreId);
            }
        }

        return $slug;
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')
            ->orderBy('sort_order');
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}