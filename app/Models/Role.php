<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'key',
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

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
