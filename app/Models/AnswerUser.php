<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class AnswerUser extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'test_id'
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

    public function tests(): HasMany
    {
        return $this->hasMany(Test::class, 'id');
    }
}
