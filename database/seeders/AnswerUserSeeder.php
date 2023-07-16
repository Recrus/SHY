<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnswerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::where('role_id', 3)->get();
        $answers = Answer::all();

        $users->each(function ($user) use ($answers) {
            $questionIds = $answers->random(rand(1, 5))->pluck('id')->toArray();

            foreach ($questionIds as $questionId) {
                $user->answers()->attach($questionId, ['created_at' => now(), 'updated_at' => now()]);
            }
        });
    }
}
