<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserVacancy extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'date_of_response',
        'cover_letter_id',
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

    public function coverLetter(): HasMany
    {
        return $this->hasMany(CoverLetter::class, 'id');
    }
}
