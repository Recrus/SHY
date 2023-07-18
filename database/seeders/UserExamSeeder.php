<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\User;
use App\Models\UserExam;
use Illuminate\Database\Seeder;

class UserExamSeeder extends Seeder
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
                UserExam::factory()->create([
                    'junior_id' => $user->id,
                    'exam_id' => $exam->id,
                ]);
            }
        }
    }
}
