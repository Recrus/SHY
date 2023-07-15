<?php

namespace App\Http\Requests\CoverLetter;

use Illuminate\Foundation\Http\FormRequest;

class CoverLetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //todo auth?
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'text' => ['required', 'string'],
            'junior_id' => ['required', 'integer'],
        ];
    }
}
