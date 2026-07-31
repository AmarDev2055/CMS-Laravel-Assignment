<?php

namespace App\Services;

use App\Models\Privilege;
use Illuminate\Support\Str;

class PrivilegeService
{
    /**
     * List all privileges.
     */
    public function list(array $filters = [])
    {
       return Privilege::withCount('roles')
        ->orderBy('name')
        ->paginate(
            $filters['per_page'] ?? 10
        );
    }

    /**
     * Find a privilege.
     */
    public function find(int $id): Privilege
    {
        return Privilege::findOrFail($id);
    }

    /**
     * Create a privilege.
     */
    public function store(array $data): Privilege
    {
        $data['slug'] = $this->generateSlug($data['name']);

        return Privilege::create($data);
    }

    /**
     * Update a privilege.
     */
    public function update(
        Privilege $privilege,
        array $data
    ): Privilege {

        if (
            isset($data['name']) &&
            $data['name'] !== $privilege->name
        ) {
            $data['slug'] = $this->generateSlug(
                $data['name'],
                $privilege->id
            );
        }

        $privilege->update($data);

        return $privilege->fresh();
    }

    /**
     * Delete a privilege.
     */
    public function delete(
        Privilege $privilege
    ): bool {

        return (bool) $privilege->delete();

    }

    /**
     * Generate unique slug.
     */
    private function generateSlug(
        string $name,
        ?int $ignoreId = null
    ): string {

        $slug = Str::slug($name);

        $original = $slug;

        $counter = 1;

        while (
            Privilege::where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn($q) => $q->where('id', '!=', $ignoreId)
                )
                ->exists()
        ) {

            $slug = "{$original}-{$counter}";

            $counter++;
        }

        return $slug;
    }
}