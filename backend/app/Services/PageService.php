<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PageService
{
    public function __construct(
        protected UploadService $uploadService
    ) {}

    /**
     * List pages with filters.
     */
    public function list(array $filters = [])
    {
        $query = Page::with([
            'menu',
            'creator',
            'updater',
        ]);

        // Search
        if (!empty($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        // Status
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Menu
        if (!empty($filters['menu_id'])) {
            $query->where('menu_id', $filters['menu_id']);
        }

        return $query
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }

    /**
     * Public pages.
     */
    public function published()
    {
        return Page::with('menu')
            ->where('status', 'published')
            ->where(function ($query) {
                $query->whereNull('publish_date')
                    ->orWhere('publish_date', '<=', now());
            })
            ->latest()
            ->paginate(10);
    }

    /**
     * Find page.
     */
    public function find(int $id): Page
    {
        return Page::with([
            'menu',
            'creator',
            'updater',
        ])->findOrFail($id);
    }

    /**
     * Store page.
     */
    public function store(array $data, ?UploadedFile $coverImage = null): Page
    {
        $data['slug'] = $this->generateUniqueSlug($data['title']);

        $data['created_by'] = Auth::id();

        $data['updated_by'] = Auth::id();

        if ($coverImage) {
            $data['cover_image'] = $this->uploadService
                ->store($coverImage, 'pages');
        }

        return Page::create($data);
    }

    /**
     * Update page.
     */
    public function update(
        Page $page,
        array $data,
        ?UploadedFile $coverImage = null
    ): Page {

        if (
            isset($data['title']) &&
            $data['title'] !== $page->title
        ) {
            $data['slug'] = $this->generateUniqueSlug(
                $data['title'],
                $page->id
            );
        }

        $data['updated_by'] = Auth::id();

        if ($coverImage) {
            $data['cover_image'] = $this->uploadService
                ->replace(
                    $page->cover_image,
                    $coverImage,
                    'pages'
                );
        }

        $page->update($data);

        return $page->fresh([
            'menu',
            'creator',
            'updater',
        ]);
    }

    /**
     * Soft delete.
     */
    public function delete(Page $page): bool
    {
        return (bool) $page->delete();
    }

    /**
     * Restore page.
     */
    public function restore(int $id): Page
    {
        $page = Page::onlyTrashed()->findOrFail($id);

        $page->restore();

        return $page->fresh();
    }

    /**
     * Publish page.
     */
    public function publish(Page $page): Page
    {
        if ($page->status === 'published') {
            return $page;
        }

        $page->update([
            'status' => 'published',
            'publish_date' => $page->publish_date ?? now(),
            'updated_by' => Auth::id(),
        ]);

        return $page->fresh();
    }

    /**
     * Generate unique slug.
     */
    private function generateUniqueSlug(
        string $title,
        ?int $ignoreId = null
    ): string {

        $slug = Str::slug($title);

        $originalSlug = $slug;

        $counter = 1;

        while (
            Page::where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn($q) => $q->where('id', '!=', $ignoreId)
                )
                ->exists()
        ) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    public function trash(array $filters = [])
    {
        return Page::onlyTrashed()
            ->with([
                'menu',
                'creator',
                'updater',
            ])
            ->latest('deleted_at')
            ->paginate($filters['per_page'] ?? 15);
    }

    public function forceDelete(int $id): bool
    {
        $page = Page::onlyTrashed()->findOrFail($id);

        if ($page->cover_image) {
            $this->uploadService->delete($page->cover_image);
        }

        return (bool) $page->forceDelete();
    }
}