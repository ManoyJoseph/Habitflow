<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $habits = $request->user()
            ->habits()
            ->withCount('logs')
            ->latest()
            ->get();

        return response()->json($habits);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'target_per_day' => ['required', 'integer', 'min:1', 'max:20'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $habit = $request->user()->habits()->create($validated);

        return response()->json($habit, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Habit $habit): JsonResponse
    {
        $this->ensureOwnership($request, $habit);

        $habit->load([
            'logs' => fn ($query) => $query->latest('logged_for')->latest('id')->limit(60),
        ]);

        return response()->json($habit);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Habit $habit): JsonResponse
    {
        $this->ensureOwnership($request, $habit);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'target_per_day' => ['sometimes', 'required', 'integer', 'min:1', 'max:20'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $habit->update($validated);

        return response()->json($habit->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Habit $habit): JsonResponse
    {
        $this->ensureOwnership($request, $habit);

        $habit->delete();

        return response()->json(status: 204);
    }

    /**
     * Mark a habit as complete for today.
     */
    public function complete(Request $request, Habit $habit): JsonResponse
    {
        $this->ensureOwnership($request, $habit);

        // Prevent duplicate log for today
        $alreadyDone = $habit->logs()
            ->whereDate('logged_for', today())
            ->exists();

        if (!$alreadyDone) {
            $habit->logs()->create([
                'logged_for' => today(),
                'completed' => true,
            ]);
        }

        return response()->json([
            'message' => $alreadyDone ? 'Already completed today!' : 'Habit completed!',
            'already_done' => $alreadyDone,
        ]);
    }

    private function ensureOwnership(Request $request, Habit $habit): void
    {
        abort_unless($habit->user_id === $request->user()->id, 403);
    }
}
