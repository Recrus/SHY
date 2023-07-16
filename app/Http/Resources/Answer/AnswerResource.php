<?php

namespace App\Http\Resources\Answer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
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
            'text' => $this->text,
            'answer' => $this->answer,
            //todo id?
            'question_id' => $this->question,
        ];
    }
}
