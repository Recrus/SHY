<?php

namespace Database\Seeders;

use App\Models\CoverLetter;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoverLetterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $juniors = User::where('role_id', 3)->get();

        foreach ($juniors as $junior) {
            CoverLetter::factory()->create([
                'junior_id' => $junior->id,
            ]);

            CoverLetter::factory()->create([
                'junior_id' => $junior->id,
            ]);
        }
    }
}
