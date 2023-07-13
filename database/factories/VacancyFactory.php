<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vacancy>
 */
class VacancyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $closedAt = fake()->boolean(30) ? null : Carbon::now();

        return [
            'name' => fake()->word(),
            'description' => fake()->text(),
            'closed_at' => $closedAt,
        ];
    }
}
