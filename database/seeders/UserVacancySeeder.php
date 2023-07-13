<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserVacancy;
use App\Models\Vacancy;
use Illuminate\Database\Seeder;

class UserVacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $juniors = User::where('role_id', 3)->get();
        $vacancies = Vacancy::all();

        foreach ($vacancies as $vacancy) {
            $rand = rand(1, 3);

            $selectedJuniors = $juniors->random($rand);

            foreach ($selectedJuniors as $junior) {
                UserVacancy::factory()->create([
                    'junior_id' => $junior->id,
                    'vacancy_id' => $vacancy->id,
                ]);
            }
        }
    }
}
