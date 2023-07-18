<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserExam;
use Illuminate\Auth\Access\Response;

class UserExamPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1 || $currentUser->role_id == 2) {
            return true;
        }

        if ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role_id == 1;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user->role_id == 1;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user->role_id == 1;
    }
}
