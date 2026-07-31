<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'title' => [
                'required',
                'string',
                'max:255'
            ],

            'parent_id' => [
                'nullable',
                'exists:menus,id'
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0'
            ],

        ];
    }
}