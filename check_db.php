<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "All users:\n";
$users = \App\Models\User::all();
foreach ($users as $user) {
    echo "- ID: {$user->id}, Name: {$user->name}, Email: {$user->email}\n";
}

echo "\nAll habits:\n";
$habits = \App\Models\Habit::all();
if ($habits->isEmpty()) {
    echo "(none)\n";
} else {
    foreach ($habits as $habit) {
        echo "- ID: {$habit->id}, User: {$habit->user_id}, Name: {$habit->name}\n";
    }
}
