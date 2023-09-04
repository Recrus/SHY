<?php

namespace App\Policies;

use App\Models\CoverLetter;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CoverLetterPolicy
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
    public function view(User $user ,CoverLetter $coverLetter): bool
    {
        if ($user->role_id == 1) {
            return true;
        } elseif ($user->role_id == 3) {
            return $user->id == $coverLetter->junior_id;
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
            return $user->id === $requestUserId;
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
            return $user->id === $requestUserId;
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
            return $user->id === $requestUserId;
        }

        return false;
    }

    public function indexForUser(User $user): bool
    {
        return $user->role_id == 3;
    }
}
