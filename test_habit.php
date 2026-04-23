<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$user = \App\Models\User::first();
if (!$user) {
    echo "No users found\n";
    exit(1);
}

$habit = \App\Models\Habit::create([
    'user_id' => $user->id,
    'name' => 'Walk 10km',
    'description' => 'Daily morning walk',
    'target_per_day' => 1,
    'is_active' => true
]);

echo "Habit created:\n";
echo "ID: " . $habit->id . "\n";
echo "Name: " . $habit->name . "\n";
echo "User ID: " . $habit->user_id . "\n";
