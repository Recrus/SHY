<?php

namespace Database\Seeders;

use App\Enums\UserRoles;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(["name" => "Админ", "key" => UserRoles::ADMIN]);
        Role::create(["name" => "Учитель", "key" => UserRoles::TEACHER]);
        Role::create(["name" => "Студент", "key" => UserRoles::STUDENT]);
    }
}
