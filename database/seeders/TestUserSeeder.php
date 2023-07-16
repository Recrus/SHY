<?php

namespace Database\Seeders;

use App\Models\Test;
use App\Models\TestUser;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tests = Test::all();
        $users = User::where('role_id', 3)->get();

        foreach ($users as $user) {
            $testsCount = rand(1, 2);
            $randomTest = $tests->random($testsCount);

            foreach ($randomTest as $test) {
                TestUser::factory()->create([
                    'student_id' => $user->id,
                    'test_id' => $test->id,
                ]);
            }
        }
    }
}
