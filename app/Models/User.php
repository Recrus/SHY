<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'user_name',
        'phone',
        'email',
        'password',
        'role_id',
        'permission_for_email',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function resume(): HasOne
    {
        return $this->hasOne(Resume::class, 'junior_id');
    }

    public function review(): hasOne
    {
        return $this->hasOne(Exam::class, 'reviewer_id');
    }

    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class, 'user_exam', 'junior_id')
            ->withPivot(
                'mark',
                'review_text',
                'reviewed_at',
                'is_accepted',
            )
            ->using(UserExam::class)
            ->withTimestamps();
    }

    public function vacancies(): HasMany
    {
        return $this->hasMany(Vacancy::class, 'hr_id');
    }

    //todo check related pivot key
    public function responses(): BelongsToMany
    {
        return $this->belongsToMany(Vacancy::class, 'user_vacancy', 'junior_id')
            ->withPivot('date_of_response', 'cover_letter_id')
            ->using(UserVacancy::class)
            ->withTimestamps();
    }

    public function coverLetter(): HasMany
    {
        return $this->hasMany(CoverLetter::class, 'junior_id');
    }

    public function answers(): BelongsToMany
    {
        return $this->belongsToMany(Answer::class, 'answer_user', 'user_id')
            ->withPivot('test_id')
            ->using(AnswerUser::class)
            ->withTimestamps();
    }

    public function tests(): BelongsToMany
    {
        return $this->belongsToMany(Test::class, 'test_user', 'student_id')
            ->withPivot('mark', 'is_passed')
            ->using(TestUser::class)
            ->withTimestamps();
    }
}
