<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TestUser extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'mark',
        'is_passed',
    ];
}
