<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
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

            'sort_order' => $this->sort_order,

            'parent_id' => $this->parent_id,

            'parent' => new MenuResource(
                $this->whenLoaded('parent')
            ),

            'children' => MenuResource::collection(
                $this->whenLoaded('children')
            ),

            'pages' => PageResource::collection(
                $this->whenLoaded('pages')
            ),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}