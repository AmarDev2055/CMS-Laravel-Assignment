<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'menu_id' => [
                'sometimes',
                'exists:menus,id'
            ],

            'title' => [
                'sometimes',
                'string',
                'max:255'
            ],

            'body' => [
                'sometimes',
                'string'
            ],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048'
            ],

            'status' => [
                'sometimes',
                'in:draft,published'
            ],

            'publish_date' => [
                'nullable',
                'date'
            ]

        ];
    }
}