<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'answer',
        'question_id',
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

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
