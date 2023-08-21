<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExamLink>
 */
class ExamLinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $employee = User::where('role_id', 3)->inRandomOrder()->first();
        $exam = Exam::inRandomOrder()->first();

        $existingLink = DB::table('exam_links')
            ->where('employee_id', $employee->id)
            ->where('exam_id', $exam->id)
            ->first();

        if ($existingLink) {
            return [];
        }

        return [
            'link' => fake()->url,
            'reviewer_id' => User::where('role_id', 4)->inRandomOrder()->first()->id,
            'employee_id' => $employee->id,
            'exam_id' => $exam->id,
        ];
    }
}
