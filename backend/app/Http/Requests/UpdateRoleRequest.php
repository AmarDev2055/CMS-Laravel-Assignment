<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => [
                'sometimes',
                'string',
                Rule::unique('roles')->ignore($this->role)
            ],

            'description' => [
                'nullable',
                'string'
            ],

            'privileges' => [
                'nullable',
                'array'
            ],

            'privileges.*' => [
                'exists:privileges,id'
            ]

        ];
    }
}