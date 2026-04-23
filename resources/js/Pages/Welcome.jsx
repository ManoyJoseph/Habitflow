import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="HabitFlow — Build Better Habits" />
            <div className="landing">

                {/* NAVBAR */}
                <nav className="landing-nav">
                    <div className="landing-logo">
                        🌊 HabitFlow
                    </div>
                    <div className="landing-nav-links">
                        {auth?.user ? (
                            <Link href="/dashboard" className="btn-primary">
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="btn-ghost">
                                    Login
                                </Link>
                                <Link href="/register" className="btn-primary">
                                    Get Started Free
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* HERO SECTION */}
                <section className="hero">
                    <div className="hero-badge">✨ Free to use — no credit card needed</div>
                    <h1 className="hero-title">
                        Build habits that
                        <span className="hero-highlight"> actually stick.</span>
                    </h1>
                    <p className="hero-subtitle">
                        HabitFlow helps you track daily habits, visualize your
                        progress, and build unstoppable streaks — one day at a time.
                    </p>
                    <div className="hero-actions">
                        <Link href="/register" className="btn-primary btn-lg">
                            Start Building Habits 🚀
                        </Link>
                        <Link href="/login" className="btn-outline btn-lg">
                            I already have an account
                        </Link>
                    </div>

                    {/* HERO STATS */}
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <strong>100%</strong>
                            <span>Free to use</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <strong>🔥 Streaks</strong>
                            <span>Stay motivated</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <strong>📊 Charts</strong>
                            <span>See your progress</span>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="features">
                    <h2 className="section-title">Everything you need to stay consistent</h2>
                    <p className="section-subtitle">
                        Simple, powerful tools designed to help you build lasting habits.
                    </p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">✅</div>
                            <h3>Daily Check-ins</h3>
                            <p>Mark habits as done each day with a single tap. Simple and satisfying.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔥</div>
                            <h3>Streak Tracking</h3>
                            <p>Watch your streaks grow. Don't break the chain — stay motivated every day.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Progress Charts</h3>
                            <p>Visualize your weekly activity with beautiful bar charts and completion rates.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Goal Setting</h3>
                            <p>Set streak goals for each habit and track how close you are to achieving them.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🗂️</div>
                            <h3>Categories</h3>
                            <p>Organize habits by Health, Study, Work, Fitness, and more.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>Daily &amp; Weekly</h3>
                            <p>Set habits as daily or weekly depending on your lifestyle and goals.</p>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="how-it-works">
                    <h2 className="section-title">How it works</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Create your habits</h3>
                            <p>Add the habits you want to build with a name, category, and goal.</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Check in daily</h3>
                            <p>Visit your dashboard each day and mark habits as complete.</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Track your growth</h3>
                            <p>Watch your streaks and stats improve over time in the Stats page.</p>
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="cta-section">
                    <h2>Ready to build better habits?</h2>
                    <p>Join HabitFlow today — it's completely free.</p>
                    <Link href="/register" className="btn-primary btn-lg">
                        Get Started Now →
                    </Link>
                </section>

                {/* FOOTER */}
                <footer className="landing-footer">
                    <p>🌊 HabitFlow — Built with Laravel, React &amp; Vite</p>
                    <p className="footer-sub">Made with ❤️ by Joseph Pujida</p>
                </footer>

            </div>
        </>
    );
}
