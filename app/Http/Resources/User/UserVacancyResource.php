<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date_of_response' => $this->pivot->date_of_response,
            'vacancy_id' => $this->pivot->vacancy_id,
            'junior_id' => $this->pivot->junior_id,
            'cover_letter_id' => $this->pivot->cover_letter_id,
        ];
    }
}
