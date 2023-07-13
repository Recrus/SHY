<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\User;
use App\Models\UserExams;
use Illuminate\Database\Seeder;

class UserExamsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exams = Exam::all();
        $users = User::where('role_id', 3)->get();

        foreach ($users as $user) {
            $examsCount = rand(1, 2);
            $randomExam = $exams->random($examsCount);

            foreach ($randomExam as $exam) {
                UserExams::create([
                    'junior_id' => $user->id,
                    'exam_id' => $exam->id,
                    'review_text' => fake()->text(),
                    'reviewed_at' => now(),
                    'is_accepted' => fake()->boolean(),
                    'mark' => fake()->numberBetween(2, 5),
                ]);
            }
        }
    }
}
