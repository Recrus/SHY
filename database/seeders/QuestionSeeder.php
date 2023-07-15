<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = Subject::all();

        foreach ($subjects as $subject){
            Question::factory(5)->create([
                'subject_id' => $subject->id,
            ]);
        }
    }
}
