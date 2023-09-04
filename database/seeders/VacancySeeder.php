<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hrs = User::where('role_id', 2)->get();

        foreach ($hrs as $hr) {
            $vacancyCount = rand(1, 2);

            for ($i = 0; $i < $vacancyCount; $i++) {
                Vacancy::factory()->create([
                    'hr_id' => $hr->id,
                ]);
            }
        }
    }
}
