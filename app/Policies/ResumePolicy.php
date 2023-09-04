<?php

namespace App\Policies;

use App\Models\User;

class ResumePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role_id === 1;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ?int $requestUserId = null): bool
    {
        if ($user->role_id == 1 || $user->role_id == 2) {
            return true;
        }

        if ($user->role_id == 3) {
            return $user->id == $requestUserId;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, ?int $requestUserId = null): bool
    {
        if ($user->role_id == 1) {
            return true;
        }

        if ($user->role_id == 3) {
            return $user->id == $requestUserId;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ?int $requestUserId = null): bool
    {
        if ($user->role_id == 1) {
            return true;
        }

        if ($user->role_id == 3) {
            return $user->id == $requestUserId;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ?int $requestUserId = null): bool
    {
        if ($user->role_id == 1) {
            return true;
        }

        if ($user->role_id == 3) {
            return $user->id == $requestUserId;
        }

        return false;
    }
}
