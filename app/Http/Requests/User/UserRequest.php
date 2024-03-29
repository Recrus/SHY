<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $method = $this->method();

        //todo patch scheme
        if ($method == 'PUT') {
            return [
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'user_name' => ['nullable', 'string'],
                'phone' => ['nullable', 'string'],
                'email' => ['required', 'email'],
                'role_id' => ['required'],
                'password' => ['nullable', 'string'],
                'permission_for_email' => ['required', 'boolean'],
            ];
        } else {
            return [
                'first_name' => ['sometimes', 'required', 'string'],
                'last_name' => ['sometimes', 'required', 'string'],
                'user_name' => ['sometimes', 'nullable', 'string'],
                'phone' => ['sometimes', 'nullable', 'string'],
                'email' => ['sometimes', 'required', 'email'],
                'role_id' => ['sometimes', 'required'],
                'password' => ['sometimes', 'required', 'string'],
                'permission_for_email' => ['sometimes', 'required', 'boolean'],
            ];
        }
    }
}
