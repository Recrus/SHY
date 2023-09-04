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
        Role::create(["name" => "Супер админ", "key" => UserRoles::SUPER_ADMIN]);
        Role::create(["name" => "Рекрутер", "key" => UserRoles::HR]);
        Role::create(["name" => "Сотрудник", "key" => UserRoles::EMPLOYEE]);
        Role::create(["name" => "Ревьюер", "key" => UserRoles::REVIEWER]);
        Role::create(["name" => "Админ", "key" => UserRoles::ADMIN]);
    }
}
