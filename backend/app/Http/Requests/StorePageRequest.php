<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'menu_id' => [
                'required',
                'exists:menus,id'
            ],

            'title' => [
                'required',
                'string',
                'max:255'
            ],

            'body' => [
                'required',
                'string'
            ],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048'
            ],

            'status' => [
                'required',
                'in:draft,published'
            ],

            'publish_date' => [
                'nullable',
                'date'
            ]

        ];
    }
}