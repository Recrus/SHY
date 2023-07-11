<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserRoles extends Enum
{
    const STUDENT = 'student';
    const TEACHER = 'teacher';
    const ADMIN = 'admin';
}
