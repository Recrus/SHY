<?php

namespace App\Http\Resources\Answer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerUserResource extends JsonResource
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
            'answer_id' => $this->pivot->answer_id,
            'user_id' => $this->pivot->user_id,
        ];
    }
}
