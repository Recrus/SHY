<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TestUser>
 */
class TestUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $mark = $this->faker->numberBetween(1, 5);

        return [
            'mark' => $mark,
            'is_passed' => $mark >= 4,
        ];
    }
}
