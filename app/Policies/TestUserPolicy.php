<?php

namespace App\Policies;

use App\Models\TestUser;
use App\Models\User;

class TestUserPolicy
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
    public function create(User $currentUser, User $user): bool
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
     * Determine whether the user can update the model.
     */
    public function update(User $currentUser, User $user): bool
    {
        //todo add logic to count try of passing for update and delete
        if ($currentUser->role_id == 1 || $currentUser->role_id == 2) {
            return true;
        }

        if ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1 || $currentUser->role_id == 2) {
            return true;
        }

        if ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }

    public function checkAnswers(User $user): bool
    {
        return ($user->role_id == 1 || $user->role_id == 3);
    }
}
