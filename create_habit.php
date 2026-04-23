<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Create habit for Test User (ID 2)
$habit = \App\Models\Habit::create([
    'user_id' => 2,
    'name' => 'Morning Jog',
    'description' => 'Run 5km every morning',
    'target_per_day' => 1,
    'is_active' => true
]);

echo "Habit created for Test User:\n";
echo "ID: " . $habit->id . "\n";
echo "Name: " . $habit->name . "\n";
echo "User ID: " . $habit->user_id . "\n";
