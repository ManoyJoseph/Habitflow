<?php

use App\Http\Controllers\ProfileController;
use App\Models\Habit;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    $habits = request()->user()->habits()->with('logs')->latest()->get();

    $habits = $habits->map(function ($habit) {
        $habit->completed_today = $habit->logs()
            ->whereDate('logged_for', today())
            ->exists();

        // Calculate streak: count consecutive days with logs
        $streakCount = 0;
        $currentDate = today();
        
        $sortedLogs = $habit->logs()
            ->orderByDesc('logged_for')
            ->get()
            ->pluck('logged_for')
            ->map(fn($date) => $date instanceof \DateTime ? $date : \Carbon\Carbon::parse($date))
            ->unique();

        foreach ($sortedLogs as $logDate) {
            if ($currentDate->diffInDays($logDate) === 0 || $currentDate->diffInDays($logDate) === 1) {
                $streakCount++;
                $currentDate = $logDate->copy()->subDay();
            } else {
                break;
            }
        }

        $habit->streak = $streakCount;

        return $habit;
    });

    return Inertia::render('Dashboard', ['habits' => $habits]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/habits', function () {
        return Inertia::render('Habits/Index', [
            'habits' => request()->user()->habits()->latest()->get(),
        ]);
    })->name('habits.index');

    Route::get('/habits/{habit}', function (Habit $habit) {
        abort_unless($habit->user_id === request()->user()->id, 403);

        $habit->load([
            'logs' => fn ($query) => $query->latest('logged_for')->latest('id')->limit(30),
        ]);

        return Inertia::render('Habits/Show', [
            'habit' => $habit,
        ]);
    })->name('habits.show');

    Route::get('/stats', function () {
        $user = auth()->user();
        $habits = $user->habits()->with('logs')->get();

        $stats = $habits->map(function ($habit) {
            $logs = $habit->logs()->orderByDesc('logged_for')->get();

            // Total completions
            $totalCompletions = $logs->count();

            // This month completions
            $thisMonth = $logs->filter(fn($log) =>
                $log->logged_for->month === now()->month &&
                $log->logged_for->year === now()->year
            )->count();

            // Best streak calculation
            $dates = $logs->map(fn($log) =>
                $log->logged_for->toDateString()
            )->unique()->sort()->values();

            $bestStreak = 0;
            $currentStreak = 0;
            $prevDate = null;

            foreach ($dates as $date) {
                if ($prevDate && Carbon::parse($date)->diffInDays($prevDate) === 1) {
                    $currentStreak++;
                } else {
                    $currentStreak = 1;
                }
                $bestStreak = max($bestStreak, $currentStreak);
                $prevDate = $date;
            }

            // Last 7 days completions
            $last7Days = [];
            for ($i = 6; $i >= 0; $i--) {
                $date = now()->subDays($i)->toDateString();
                $last7Days[] = [
                    'date' => now()->subDays($i)->format('D'),
                    'count' => $logs->filter(fn($log) =>
                        $log->logged_for->toDateString() === $date
                    )->count(),
                ];
            }

            return [
                'id' => $habit->id,
                'name' => $habit->name,
                'total_completions' => $totalCompletions,
                'this_month' => $thisMonth,
                'best_streak' => $bestStreak,
                'last7days' => $last7Days,
            ];
        });

        $overallRate = $habits->count() > 0
            ? round($stats->avg('this_month') / max(now()->day, 1) * 100)
            : 0;

        return Inertia::render('Stats', [
            'stats' => $stats,
            'overall_rate' => min($overallRate, 100),
            'total_habits' => $habits->count(),
            'total_completions' => $stats->sum('total_completions'),
        ]);
    })->middleware(['auth'])->name('stats');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
