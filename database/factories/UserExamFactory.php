<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserExam>
 */
class UserExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //todo accept if mark is up 4
        return [
            'review_text' => fake()->text(),
            'reviewed_at' => now(),
            'is_accepted' => fake()->boolean(),
            'mark' => fake()->numberBetween(2, 5),
        ];
    }
}
