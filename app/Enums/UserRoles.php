<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserRoles extends Enum
{
    //todo create superAdmin, reviewer and change policies

    const SUPER_ADMIN = "super_admin";
    const EMPLOYEE = 'employee';
    const HR = 'hr';
    const REVIEWER = 'reviewer';
    //todo created for future use
    const ADMIN = 'admin';
}
