<?php

use App\Http\Controllers\Api\HabitController;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Support\Facades\Route;

// API routes with session middleware for authenticated requests
Route::middleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    SubstituteBindings::class,
])->group(function () {
    Route::apiResource('habits', HabitController::class)->names('api.habits');
    Route::post('/habits/{habit}/complete', [HabitController::class, 'complete'])->name('api.habits.complete');
});
