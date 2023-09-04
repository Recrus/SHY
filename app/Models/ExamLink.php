<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'link',
        'reviewer_id',
        'employee_id',
        'exam_id',
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

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
