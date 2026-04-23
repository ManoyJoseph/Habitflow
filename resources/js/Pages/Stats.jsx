import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useRef } from "react";

function MiniBarChart({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const max = Math.max(...data.map((d) => d.count), 1);
        const width = canvas.width;
        const height = canvas.height;
        const barWidth = width / data.length - 4;

        ctx.clearRect(0, 0, width, height);

        data.forEach((d, i) => {
            const barHeight = (d.count / max) * (height - 20);
            const x = i * (barWidth + 4);
            const y = height - barHeight - 20;

            // Bar
            ctx.fillStyle = d.count > 0 ? "#6366f1" : "#e0e7ff";
            ctx.fillRect(x, y, barWidth, barHeight || 4);

            // Label
            ctx.fillStyle = "#9ca3af";
            ctx.font = "10px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(d.date, x + barWidth / 2, height - 4);
        });
    }, [data]);

    return <canvas ref={canvasRef} width={220} height={80} />;
}

export default function Stats({
    auth,
    stats,
    overall_rate,
    total_habits,
    total_completions,
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Stats
                </h2>
            }
        >
            <Head title="Stats" />
            <div className="stats-container">
                <div className="stats-header">
                    <h1>📊 Your Stats</h1>
                    <p>Track your progress and celebrate your wins!</p>
                </div>

                {/* SUMMARY CARDS */}
                <div className="stats-summary">
                    <div className="summary-card">
                        <span className="summary-icon">🎯</span>
                        <h2>{total_habits}</h2>
                        <p>Total Habits</p>
                    </div>
                    <div className="summary-card">
                        <span className="summary-icon">✅</span>
                        <h2>{total_completions}</h2>
                        <p>Total Check-ins</p>
                    </div>
                    <div className="summary-card">
                        <span className="summary-icon">💯</span>
                        <h2>{overall_rate}%</h2>
                        <p>This Month's Rate</p>
                    </div>
                </div>

                {/* PER HABIT STATS */}
                {stats.length === 0 ? (
                    <div className="empty-state">
                        <p>🌱 No habits yet. Create some to see your stats!</p>
                    </div>
                ) : (
                    <div className="habit-stats-list">
                        {stats.map((habit) => (
                            <div key={habit.id} className="habit-stat-card">
                                <div className="habit-stat-header">
                                    <div>
                                        <h3>{habit.name}</h3>
                                    </div>
                                    <div className="habit-stat-numbers">
                                        <div className="stat-pill">
                                            🔥 Best:{" "}
                                            <strong>
                                                {habit.best_streak} days
                                            </strong>
                                        </div>
                                        <div className="stat-pill">
                                            📅 This month:{" "}
                                            <strong>{habit.this_month}x</strong>
                                        </div>
                                        <div className="stat-pill">
                                            ✅ Total:{" "}
                                            <strong>{habit.total_completions}x</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* MINI BAR CHART */}
                                <div className="chart-section">
                                    <p className="chart-label">
                                        Last 7 Days
                                    </p>
                                    <MiniBarChart data={habit.last7days} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
