<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CoverLetter extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'junior_id',
        'user_vacancy_id',
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

    public function junior(): BelongsTo
    {
        return $this->belongsTo(User::class, 'junior_id');
    }

    public function userVacancy(): BelongsTo
    {
        return $this->belongsTo(UserVacancy::class, 'id');
    }
}
