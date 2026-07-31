<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Support\Str;

class MenuService
{
    /**
     * List all menus.
     */
    public function list(array $filters = [])
    {
       return Menu::whereNull('parent_id')
        ->with([
            'children',
            'children.children',
        ])
        ->orderBy('sort_order')
        ->get();
    }

    /**
     * Show one menu.
     */
    public function find(int $id): Menu
    {
        return Menu::with([
            'parent',
            'children',
            'pages'
        ])->findOrFail($id);
    }

    /**
     * Create menu.
     */
    public function store(array $data): Menu
    {
        $data['slug'] = $this->generateSlug($data['title']);

        return Menu::create($data);
    }

    /**
     * Update menu.
     */
    public function update(Menu $menu, array $data): Menu
    {
        if (
            isset($data['title']) &&
            $data['title'] != $menu->title
        ) {
            $data['slug'] = $this->generateSlug(
                $data['title'],
                $menu->id
            );
        }

        $menu->update($data);

        return $menu->fresh();
    }

    /**
     * Delete menu.
     */
    public function delete(Menu $menu): bool
    {
        return (bool) $menu->delete();
    }

    /**
     * Public tree.
     */
    public function tree()
    {
        return Menu::with([
                'children',
                'pages'
            ])
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->get();
    }

    /**
     * Reorder menu.
     */
    public function reorder(array $menus): void
    {
        foreach ($menus as $item) {

            Menu::where('id', $item['id'])
                ->update([
                    'sort_order' => $item['sort_order'],
                    'parent_id' => $item['parent_id'] ?? null
                ]);
        }
    }

    /**
     * Generate unique slug.
     */
    private function generateSlug(
        string $title,
        ?int $ignoreId = null
    ): string {

        $slug = Str::slug($title);

        $original = $slug;

        $counter = 1;

        while (
            Menu::where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn($q) => $q->where('id', '!=', $ignoreId)
                )
                ->exists()
        ) {

            $slug = $original . '-' . $counter;

            $counter++;
        }

        return $slug;
    }
}