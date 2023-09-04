<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\AnswerUser;
use App\Models\Test;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnswerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Retrieve existing users, tests, and answers from the database
        $users = User::where('role_id', 3)->inRandomOrder()->take(5)->get();
        $tests = Test::inRandomOrder()->take(5)->get();
        $answers = Answer::inRandomOrder()->get();

        // Create seed data for AnswerUser table
        foreach ($users as $user) {
            foreach ($tests as $test) {
                $randomAnswer = $answers->random();
                AnswerUser::create([
                    'test_id' => $test->id,
                    'user_id' => $user->id,
                    'answer_id' => $randomAnswer->id,
                ]);
            }
        }
    }
}
