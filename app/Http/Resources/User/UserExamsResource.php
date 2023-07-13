<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Exam\ExamResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserExamsResource extends JsonResource
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
            'review_text' => $this->pivot->review_text,
            'reviewed_at' => $this->pivot->reviewed_at,
            'is_accepted' => $this->pivot->is_accepted,
            'mark' => $this->pivot->mark,
            'exam_id' => $this->pivot->exam_id,
            'junior_id' => $this->pivot->junior_id,
        ];
    }
}
