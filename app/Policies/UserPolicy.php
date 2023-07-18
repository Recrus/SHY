<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role_id == 1;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1) {
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
    public function update(User $currentUser, User $user): bool
    {
        if ($currentUser->role_id == 1) {
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
        if ($currentUser->role_id == 1) {
            return true;
        }

        if ($currentUser->role_id == 3) {
            return $currentUser->id == $user->id;
        }

        return false;
    }
}
