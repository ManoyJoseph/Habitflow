import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";

export default function Dashboard({ habits = [] }) {
    const { auth } = usePage().props;
    const [completedIds, setCompletedIds] = useState(
        habits.filter(h => h.completed_today).map(h => h.id)
    );

    const handleComplete = async (habitId) => {
        if (completedIds.includes(habitId)) return;
        try {
            await axios.post(`/api/habits/${habitId}/complete`);
            setCompletedIds([...completedIds, habitId]);
        } catch (error) {
            console.error("Error completing habit:", error);
            alert("Error completing habit. Check console.");
        }
    };

    const completedCount = completedIds.length;
    const totalCount = habits.length;
    const progressPercent = totalCount > 0
        ? Math.round((completedCount / totalCount) * 100)
        : 0;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    {/* HERO BANNER */}
                    <div className="dash-banner mb-8">
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Welcome back 👋
                            </p>
                            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                                {auth.user.name}!
                            </h1>
                            <p style={{ marginTop: '0.5rem', opacity: 0.85, fontSize: '1rem' }}>
                                Here are your habits for today. Keep the streak alive! 🔥
                            </p>
                        </div>
                        <div style={{ position: 'relative', zIndex: 1, textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>🌊</div>
                            <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', opacity: 0.75, fontWeight: 600 }}>
                                HabitFlow
                            </p>
                        </div>
                    </div>

                    {/* PROGRESS CARD */}
                    {totalCount > 0 && (
                        <div className="mb-8 rounded-lg bg-indigo-50 p-6 border border-indigo-200">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-gray-800">Today's Progress</span>
                                <span className="text-sm font-medium text-indigo-600">
                                    {completedCount}/{totalCount} completed
                                </span>
                            </div>
                            <div className="h-3 bg-indigo-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <p className="mt-3 text-right text-sm font-semibold text-indigo-600">
                                {progressPercent}%
                            </p>
                        </div>
                    )}

                    {/* HABITS LIST */}
                    <div className="space-y-3">
                        {habits.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center border border-gray-200">
                                <p className="text-gray-600 text-lg">🌱 No habits yet!</p>
                                <a
                                    href="/habits"
                                    className="mt-3 inline-block text-indigo-600 font-medium hover:text-indigo-700"
                                >
                                    Create your first habit →
                                </a>
                            </div>
                        ) : (
                            habits.map((habit) => {
                                const isDone = completedIds.includes(habit.id);
                                return (
                                    <div
                                        key={habit.id}
                                        className={`flex items-center justify-between rounded-lg p-4 border transition ${
                                            isDone
                                                ? "bg-emerald-50 border-emerald-200"
                                                : "bg-white border-gray-200 hover:shadow-md"
                                        }`}
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">
                                                {habit.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                🔥 Streak: {habit.streak ?? 0} days
                                            </p>
                                        </div>
                                        <button
                                            className={`px-4 py-2 rounded-md font-semibold transition ${
                                                isDone
                                                    ? "bg-emerald-200 text-emerald-800 cursor-default"
                                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                            }`}
                                            onClick={() => handleComplete(habit.id)}
                                            disabled={isDone}
                                        >
                                            {isDone ? "✅ Done!" : "Mark Done"}
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
