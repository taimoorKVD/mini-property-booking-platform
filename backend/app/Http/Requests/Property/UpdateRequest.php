<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price_per_night' => 'sometimes|numeric|min:1',
            'location' => 'sometimes|string|max:255',
            'amenities' => 'nullable|array',
            'images' => 'nullable|array'
        ];
    }
}
