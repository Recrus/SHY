<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'link',
        'reviewer_id',
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

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_exams', 'exam_id', 'junior_id')
            ->withPivot(
                'mark',
                'review_text',
                'reviewed_at',
                'is_accepted',
            )
            ->using(UserExams::class)
            ->withTimestamps();
    }
}
