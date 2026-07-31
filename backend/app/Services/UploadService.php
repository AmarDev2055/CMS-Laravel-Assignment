<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadService 
{
    /**
     * Store an uploaded file on the given disk/directory and return its path.
     */
    public function store(UploadedFile $file, string $directory = 'uploads', string $disk = 'public'): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

        return $file->storeAs($directory, $filename, $disk);
    }

    /**
     * Replace an existing file: deletes the old one (if present) and stores the new one.
     */
    public function replace(?string $oldPath, UploadedFile $file, string $directory = 'uploads', string $disk = 'public'): string
    {
        $this->delete($oldPath, $disk);

        return $this->store($file, $directory, $disk);
    }

    /**
     * Delete a file from storage if it exists.
     */
    public function delete(?string $path, string $disk = 'public'): bool
    {
        if ($path && Storage::disk($disk)->exists($path)) {
            return Storage::disk($disk)->delete($path);
        }

        return false;
    }
}