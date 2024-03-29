<?php

namespace App\Http\Requests\Exam;

use Illuminate\Foundation\Http\FormRequest;

class ExamLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'employee_id' => 'required|integer',
            'exam_id' => 'required|integer',
        ];

        if (auth()->user()->role_id === 1) {
            $rules['reviewer_id'] = 'required|integer';
            $rules['link'] = 'required|string';
        }

        return $rules;
    }
}
