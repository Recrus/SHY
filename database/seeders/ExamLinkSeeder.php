<?php

namespace Database\Seeders;

use App\Models\ExamLink;
use Illuminate\Database\Seeder;

class ExamLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExamLink::factory()->count(10)->create();
    }
}
