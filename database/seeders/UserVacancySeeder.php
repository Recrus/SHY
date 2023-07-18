<?php

namespace Database\Seeders;

use App\Models\CoverLetter;
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
        //todo rewrite seed
        $juniors = User::where('role_id', 3)->get();
        $vacancies = Vacancy::all();

        foreach ($vacancies as $vacancy) {
            $coverLetters = CoverLetter::whereIn('junior_id', $juniors->pluck('id'))->get();

            foreach ($juniors as $junior) {
                $letter = $coverLetters->where('junior_id', $junior->id)->first();

                if ($letter) {
                    UserVacancy::factory()->create([
                        'junior_id' => $junior->id,
                        'vacancy_id' => $vacancy->id,
                        'cover_letter_id' => $letter->id,
                        'date_of_response' => now(),
                    ]);
                }
            }
        }
    }
}
