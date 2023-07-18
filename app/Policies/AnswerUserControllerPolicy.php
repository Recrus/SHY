<?php

namespace App\Policies;

use App\Models\User;

class AnswerUserControllerPolicy
{
    /**
     * Create a new policy instance.
     */
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        } elseif ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        } elseif ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        } elseif ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        } elseif ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }
}
