import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function HabitsShow({ habit }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Habit Details
                </h2>
            }
        >
            <Head title={habit.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="text-2xl font-bold">{habit.name}</p>
                            <p className="mt-2 text-sm text-gray-600">
                                {habit.description || 'No description provided.'}
                            </p>
                            <p className="mt-3 text-sm text-gray-700">
                                Target per day: <span className="font-semibold">{habit.target_per_day}</span>
                            </p>
                            <p className="mt-1 text-sm text-gray-700">
                                Status:{' '}
                                <span className={habit.is_active ? 'font-semibold text-emerald-700' : 'font-semibold text-gray-500'}>
                                    {habit.is_active ? 'Active' : 'Paused'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold">Recent History</h3>

                            {habit.logs.length === 0 ? (
                                <p className="mt-3 text-gray-600">No logs yet for this habit.</p>
                            ) : (
                                <ul className="mt-4 space-y-2">
                                    {habit.logs.map((log) => (
                                        <li
                                            key={log.id}
                                            className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3"
                                        >
                                            <span>{log.logged_for}</span>
                                            <span
                                                className={
                                                    log.completed
                                                        ? 'rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700'
                                                        : 'rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700'
                                                }
                                            >
                                                {log.completed ? 'Completed' : 'Missed'}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div>
                        <Link href={route('habits.index')} className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            Back to habits
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
