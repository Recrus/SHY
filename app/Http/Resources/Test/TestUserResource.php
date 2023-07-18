<?php

namespace App\Http\Resources\Test;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestUserResource extends JsonResource
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
            'mark' => $this->pivot->mark,
            'is_passed' => $this->pivot->is_passed,
            //todo junior_id?
            'student_id' => $this->pivot->student_id,
            'test_id' => $this->pivot->test_id,
        ];
    }
}
