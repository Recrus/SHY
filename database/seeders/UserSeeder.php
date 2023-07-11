<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create(['email' => 'owner@example.com', 'role_id' => 1]);
        $usersRole2 = User::factory(5)->create(['role_id' => 2]);
        $usersRole3 = User::factory(5)->create(['role_id' => 3]);

        $usersRole2->concat($usersRole3)->push($admin);
    }
}
