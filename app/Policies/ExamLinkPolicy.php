<?php

namespace App\Policies;

use App\Models\ExamLink;
use App\Models\User;

class ExamLinkPolicy
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
    public function view(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, User $currentUser): bool
    {
        if ($currentUser->role_id === 1) {
            return true;
        }

        if ($currentUser->role_id === 3 && $user->id === $currentUser->id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user->role_id === 1;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user->role_id === 1;
    }
}
