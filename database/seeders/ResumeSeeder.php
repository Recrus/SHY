<?php

namespace Database\Seeders;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Database\Seeder;

class ResumeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role_id', 3)->get();


        foreach ($users as $user) {
                Resume::factory()->create([
                    'junior_id' => $user->id,
                ]);
        }
    }
}
