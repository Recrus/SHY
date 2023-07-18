<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //todo definitely needs request?
            'review_text' => ['nullable', 'string'],
            'reviewed_at' => ['nullable', 'string'],
            'is_accepted' => ['nullable', 'string'],
            'mark' => ['nullable', 'integer'],
            'junior_id' => ['nullable', 'integer'],
            'exam_id' => ['nullable', 'integer'],
        ];
    }
}
