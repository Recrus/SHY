<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Vacancy extends Model
{
    use HasFactory;

    //todo add more fields if will need
    protected $fillable = [
        'name',
        'description',
        'closed_at',
        'hr_id',
    ];

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'created_at',
        ];
    }

    public static function getAllowedFilters(): array
    {
        return [];
    }

    public function hr(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_vacancy', 'vacancy_id', 'junior_id')
            ->withPivot('date_of_response')
            ->using(UserVacancy::class)
            ->withTimestamps();
    }
}
