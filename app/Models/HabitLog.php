<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class HabitLog extends Model
{
    protected $fillable = [
        'habit_id',
        'logged_for',
        'completed',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'logged_for' => 'date',
            'completed' => 'boolean',
        ];
    }

    public function habit(): BelongsTo
    {
        return $this->belongsTo(Habit::class);
    }
}
