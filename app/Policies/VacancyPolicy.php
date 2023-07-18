<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Auth\Access\Response;

class VacancyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $currentUser, ?int $requestUserId = null): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        }

        if ($currentUser->role_id == 2) {
            return $currentUser->id == $requestUserId;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $currentUser, ?int $requestUserId = null): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        }

        if ($currentUser->role_id == 2) {
            return $currentUser->id == $requestUserId;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $currentUser, ?int $requestUserId = null): bool
    {
        if ($currentUser->role_id == 1) {
            return true;
        }

        if ($currentUser->role_id == 2) {
            return $currentUser->id == $requestUserId;
        }

        return false;
    }
}
