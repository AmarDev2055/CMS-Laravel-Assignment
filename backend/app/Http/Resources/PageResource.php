<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'title' => $this->title,

            'slug' => $this->slug,

            'body' => $this->body,

            'cover_image' => $this->cover_image
                ? asset('storage/' . $this->cover_image)
                : null,

            'status' => $this->status,

            'publish_date' => $this->publish_date,

            'menu' => [
                'id' => $this->menu?->id,
                'title' => $this->menu?->title,
            ],

            'created_by' => [
                'id' => $this->creator?->id,
                'name' => $this->creator?->name,
            ],

            'updated_by' => [
                'id' => $this->updater?->id,
                'name' => $this->updater?->name,
            ],

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}