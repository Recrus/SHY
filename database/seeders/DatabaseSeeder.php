<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ResumeSeeder::class,
            ExamSeeder::class,
            UserExamSeeder::class,
            SubjectSeeder::class,
            VacancySeeder::class,
            CoverLetterSeeder::class,
            UserVacancySeeder::class,
            QuestionSeeder::class,
            TestSeeder::class,
        ]);
    }
}
