<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

if (! function_exists('slugify')) {
    /**
     * Generate a URL-friendly slug from a string.
     */
    function slugify(string $value): string
    {
        return Str::slug($value);
    }
}


if (! function_exists('uploadImage')) {

    function uploadImage(UploadedFile $file, string $folder = 'pages'): string
    {
        return $file->store($folder, 'public');
    }
}


if (! function_exists('asset_url')) {
    /**
     * Get the public URL for a stored file (e.g. uploaded images).
     */
    function asset_url(?string $path, string $disk = 'public'): ?string
    {
        if (! $path) {
            return null;
        }

        return Storage::disk($disk)->url($path);
    }
}

if (! function_exists('format_bytes')) {
    /**
     * Convert a byte count into a human-readable string (e.g. "1.5 MB").
     */
    function format_bytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= (1 << (10 * $pow));

        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}

if (! function_exists('format_date')) {
    /**
     * Format a date/datetime value consistently across the app.
     */
    function format_date($date, string $format = 'M d, Y'): ?string
    {
        if (! $date) {
            return null;
        }

        return \Carbon\Carbon::parse($date)->format($format);
    }
}

if (! function_exists('excerpt')) {
    /**
     * Return a shortened plain-text excerpt from HTML/body content.
     */
    function excerpt(?string $html, int $length = 150): string
    {
        if (! $html) {
            return '';
        }

        return Str::limit(strip_tags($html), $length);
    }
}

if (! function_exists('status_badge')) {
    /**
     * Return a Bootstrap-style badge class for a given status string.
     */
    function status_badge(string $status): string
    {
        return match ($status) {
            'published' => 'badge-success',
            'draft' => 'badge-secondary',
            default => 'badge-light',
        };
    }
}

if (! function_exists('current_user_id')) {
    /**
     * Shortcut for the authenticated user's ID, or null if guest.
     */
    function current_user_id(): ?int
    {
        return auth()->id();
    }
}