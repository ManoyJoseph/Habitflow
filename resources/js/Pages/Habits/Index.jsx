import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";

export default function HabitsIndex({ habits = [] }) {
    const { auth } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        target_per_day: 1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.patch(`/api/habits/${editing}`, form);
            } else {
                await axios.post("/api/habits", form);
            }
            setShowForm(false);
            setEditing(null);
            setForm({ name: "", description: "", target_per_day: 1 });
            router.reload();
        } catch (error) {
            console.error("Error saving habit:", error);
            alert("Error saving habit. Check console.");
        }
    };

    const handleEdit = (habit) => {
        setEditing(habit.id);
        setForm({
            name: habit.name,
            description: habit.description || "",
            target_per_day: habit.target_per_day,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this habit?")) {
            try {
                await axios.delete(`/api/habits/${id}`);
                router.reload();
            } catch (error) {
                console.error("Error deleting habit:", error);
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Habits
                </h2>
            }
        >
            <Head title="Habits" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">My Habits</h1>
                        <button
                            className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition"
                            onClick={() => {
                                setShowForm(!showForm);
                                setEditing(null);
                                setForm({ name: "", description: "", target_per_day: 1 });
                            }}
                        >
                            {showForm ? "Cancel" : "+ New Habit"}
                        </button>
                    </div>

                    {/* CREATE / EDIT FORM */}
                    {showForm && (
                        <form className="mb-6 rounded-lg bg-white p-6 shadow-sm border border-gray-200" onSubmit={handleSubmit}>
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                {editing ? "Edit Habit" : "Create New Habit"}
                            </h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Habit Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Read for 30 minutes"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Why is this habit important?"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    rows="3"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Target per Day
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={form.target_per_day}
                                    onChange={(e) => setForm({ ...form, target_per_day: parseInt(e.target.value) })}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <button type="submit" className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition">
                                {editing ? "Update Habit" : "Create Habit"}
                            </button>
                        </form>
                    )}

                    {/* HABITS LIST */}
                    <div className="space-y-3">
                        {habits.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center border border-gray-200">
                                <p className="text-gray-600 text-lg">🌱 No habits yet. Create your first one!</p>
                            </div>
                        ) : (
                            habits.map((habit) => (
                                <div
                                    key={habit.id}
                                    className="flex items-center justify-between rounded-lg bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                                        {habit.description && (
                                            <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-2">
                                            🎯 Target: {habit.target_per_day}x per day
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            className="rounded-md bg-amber-100 px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-200 transition"
                                            onClick={() => handleEdit(habit)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition"
                                            onClick={() => handleDelete(habit.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
