import { Link } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

  .land-root {
    min-height: 100vh;
    background: #0b0f1a;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    overflow-x: hidden;
  }

  /* ── BG ── */
  .land-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(83,74,183,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(83,74,183,0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }
  .land-glow1 {
    position: fixed;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(83,74,183,0.18) 0%, transparent 70%);
    top: -160px; right: -160px;
    pointer-events: none; z-index: 0;
  }
  .land-glow2 {
    position: fixed;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(83,74,183,0.10) 0%, transparent 70%);
    bottom: -100px; left: -100px;
    pointer-events: none; z-index: 0;
  }

  /* ── NAV ── */
  .land-nav {
    position: relative; z-index: 10;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2rem;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
  }
  .land-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none;
  }
  .land-logo {
    width: 34px; height: 34px;
    background: #534AB7; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .land-brandname {
    font-family: 'Syne', sans-serif;
    font-size: 17px; font-weight: 700; color: #fff;
  }
  .land-brandname span { color: #7F77DD; }
  .land-nav-btns { display: flex; gap: 10px; align-items: center; }
  .land-btn-ghost {
    padding: 8px 18px;
    background: transparent;
    border: 0.5px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    color: rgba(255,255,255,0.7);
    font-size: 13px; font-weight: 500;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .land-btn-ghost:hover { border-color: #534AB7; color: #fff; }
  .land-btn-primary {
    padding: 8px 20px;
    background: #534AB7;
    border: none; border-radius: 8px;
    color: #fff;
    font-size: 13px; font-weight: 600;
    font-family: 'Syne', sans-serif;
    text-decoration: none;
    transition: background 0.2s;
  }
  .land-btn-primary:hover { background: #6158c9; }

  /* ── HERO ── */
  .land-hero {
    position: relative; z-index: 1;
    text-align: center;
    padding: 5rem 1.5rem 4rem;
    max-width: 760px; margin: 0 auto;
  }
  .land-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(83,74,183,0.2);
    border: 0.5px solid rgba(83,74,183,0.4);
    color: #AFA9EC;
    font-size: 12px; font-weight: 500;
    padding: 5px 14px; border-radius: 20px;
    margin-bottom: 1.5rem;
    letter-spacing: 0.3px;
  }
  .land-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #7F77DD;
    animation: land-pulse 2s ease-in-out infinite;
  }
  @keyframes land-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .land-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 800;
    line-height: 1.15;
    color: #fff;
    margin: 0 0 1.25rem;
    letter-spacing: -0.5px;
  }
  .land-h1 .accent { color: #7F77DD; }
  .land-hero-sub {
    font-size: clamp(14px, 2vw, 17px);
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    max-width: 540px; margin: 0 auto 2.5rem;
  }
  .land-cta-row {
    display: flex; gap: 12px;
    justify-content: center; flex-wrap: wrap;
  }
  .land-cta-main {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: #534AB7; border: none; border-radius: 12px;
    color: #fff; font-size: 15px; font-weight: 600;
    font-family: 'Syne', sans-serif;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
  }
  .land-cta-main:hover { background: #6158c9; transform: translateY(-1px); }
  .land-cta-sec {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: rgba(255,255,255,0.05);
    border: 0.5px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    color: rgba(255,255,255,0.75); font-size: 15px;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .land-cta-sec:hover { border-color: #534AB7; color: #fff; }

  /* ── STATS ── */
  .land-stats {
    position: relative; z-index: 1;
    display: flex; justify-content: center; gap: 0;
    flex-wrap: wrap;
    border-top: 0.5px solid rgba(255,255,255,0.06);
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    margin: 0 0 5rem;
  }
  .land-stat {
    flex: 1; min-width: 160px;
    padding: 2rem 1.5rem;
    text-align: center;
    border-right: 0.5px solid rgba(255,255,255,0.06);
  }
  .land-stat:last-child { border-right: none; }
  .land-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem; font-weight: 700;
    color: #fff; margin-bottom: 4px;
  }
  .land-stat-num .acc { color: #7F77DD; }
  .land-stat-label { font-size: 13px; color: rgba(255,255,255,0.4); }

  /* ── SUBJECTS ── */
  .land-section {
    position: relative; z-index: 1;
    max-width: 1000px; margin: 0 auto 5rem;
    padding: 0 1.5rem;
  }
  .land-section-label {
    font-size: 11px; font-weight: 600;
    color: #7F77DD; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 0.75rem;
  }
  .land-section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 700; color: #fff;
    margin: 0 0 0.5rem;
  }
  .land-section-sub {
    font-size: 14px; color: rgba(255,255,255,0.4);
    margin: 0 0 2.5rem;
  }
  .land-subjects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .land-subject-card {
    background: rgba(255,255,255,0.03);
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 1.75rem 1.5rem;
    transition: border-color 0.2s, background 0.2s;
  }
  .land-subject-card:hover {
    border-color: rgba(83,74,183,0.5);
    background: rgba(83,74,183,0.06);
  }
  .land-subj-icon {
    width: 44px; height: 44px;
    background: rgba(83,74,183,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
    font-size: 22px;
  }
  .land-subj-name {
    font-family: 'Syne', sans-serif;
    font-size: 16px; font-weight: 700;
    color: #fff; margin-bottom: 4px;
  }
  .land-subj-count {
    font-size: 12px; color: rgba(255,255,255,0.35);
    margin-bottom: 1rem;
  }
  .land-subj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .land-subj-tag {
    font-size: 11px;
    background: rgba(255,255,255,0.05);
    border: 0.5px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    padding: 3px 9px; border-radius: 6px;
  }

  /* ── FEATURES ── */
  .land-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .land-feat {
    background: rgba(255,255,255,0.03);
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex; gap: 1rem; align-items: flex-start;
    transition: border-color 0.2s;
  }
  .land-feat:hover { border-color: rgba(83,74,183,0.4); }
  .land-feat-icon {
    width: 40px; height: 40px; flex-shrink: 0;
    background: rgba(83,74,183,0.15);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .land-feat-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    color: #fff; margin-bottom: 4px;
  }
  .land-feat-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.6; }

  /* ── CTA BANNER ── */
  .land-banner {
    position: relative; z-index: 1;
    max-width: 1000px; margin: 0 auto 5rem;
    padding: 0 1.5rem;
  }
  .land-banner-inner {
    background: rgba(83,74,183,0.12);
    border: 0.5px solid rgba(83,74,183,0.35);
    border-radius: 20px;
    padding: 3rem 2rem;
    text-align: center;
  }
  .land-banner h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-weight: 700; color: #fff;
    margin: 0 0 0.75rem;
  }
  .land-banner p { font-size: 14px; color: rgba(255,255,255,0.45); margin: 0 0 2rem; }

  /* ── FOOTER ── */
  .land-footer {
    position: relative; z-index: 1;
    border-top: 0.5px solid rgba(255,255,255,0.06);
    padding: 1.75rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
  }
  .land-footer-left { font-size: 13px; color: rgba(255,255,255,0.25); }
  .land-footer-right { display: flex; gap: 1.5rem; }
  .land-footer-right a {
    font-size: 13px; color: rgba(255,255,255,0.35);
    text-decoration: none;
  }
  .land-footer-right a:hover { color: #7F77DD; }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .land-nav { padding: 1rem 1.25rem; }
    .land-hero { padding: 3.5rem 1.25rem 3rem; }
    .land-subjects { grid-template-columns: 1fr; }
    .land-features { grid-template-columns: 1fr; }
    .land-stat { min-width: 120px; padding: 1.5rem 1rem; }
    .land-stat-num { font-size: 1.6rem; }
    .land-section { margin-bottom: 3.5rem; }
    .land-banner-inner { padding: 2rem 1.25rem; }
    .land-footer { flex-direction: column; align-items: flex-start; }
    .land-btn-ghost { display: none; }
  }
`;

export default function LandingPage() {
    return (
        <>
            <style>{CSS}</style>
            <div className="land-root">
                <div className="land-grid" />
                <div className="land-glow1" />
                <div className="land-glow2" />

                {/* NAV */}
                <nav className="land-nav">
                    <a href="/" className="land-brand">
                        <div className="land-logo">
                            <svg width="17" height="17" fill="none" stroke="white" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div className="land-brandname">CET<span>_CELL</span></div>
                    </a>
                    <div className="land-nav-btns">
                        <Link to="/login" className="land-btn-ghost">Sign in</Link>
                        <Link to="/register" className="land-btn-primary">Start Free →</Link>
                    </div>
                </nav>

                {/* HERO */}
                <section className="land-hero">
                    <div className="land-badge">
                        <span className="land-badge-dot" />
                        Free MHT-CET Practice Platform
                    </div>
                    <h1 className="land-h1">
                        Crack MHT-CET with<br />
                        <span className="accent">3800+ free MCQs</span>
                    </h1>
                    <p className="land-hero-sub">
                        Syllabus-exact questions for Physics, Chemistry &amp; Mathematics.
                        Chapter-wise practice, timed mock tests, per-question explanations —
                        100% free for Maharashtra HSC students.
                    </p>
                    <div className="land-cta-row">
                        <Link to="/register" className="land-cta-main">
                            Start Practising Free
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/login" className="land-cta-sec">
                            Already have account
                        </Link>
                    </div>
                </section>

                {/* STATS */}
                <div className="land-stats">
                    {[
                        { num: "3800", acc: "+", label: "Total MCQs" },
                        { num: "30", acc: "+", label: "Chapters covered" },
                        { num: "3", acc: "", label: "Subjects" },
                        { num: "100", acc: "%", label: "Free forever" },
                    ].map(s => (
                        <div className="land-stat" key={s.label}>
                            <div className="land-stat-num">{s.num}<span className="acc">{s.acc}</span></div>
                            <div className="land-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* SUBJECTS */}
                <section className="land-section">
                    <div className="land-section-label">Subjects</div>
                    <h2 className="land-section-title">Physics, Chemistry &amp; Mathematics MCQ</h2>
                    <p className="land-section-sub">Class 11 &amp; 12 — MHT-CET syllabus mapped</p>
                    <div className="land-subjects">
                        <div className="land-subject-card">
                            <div className="land-subj-icon">⚡</div>
                            <div className="land-subj-name">Physics MCQ</div>
                            <div className="land-subj-count">Class 11 + 12 · 1200+ questions</div>
                            <div className="land-subj-tags">
                                {["Electrostatics", "Mechanics", "Optics", "Modern Physics", "Thermodynamics"].map(t => (
                                    <span className="land-subj-tag" key={t}>{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="land-subject-card">
                            <div className="land-subj-icon">🧪</div>
                            <div className="land-subj-name">Chemistry MCQ</div>
                            <div className="land-subj-count">Class 11 + 12 · 1400+ questions</div>
                            <div className="land-subj-tags">
                                {["Organic", "Inorganic", "Physical", "Electrochemistry", "Polymers"].map(t => (
                                    <span className="land-subj-tag" key={t}>{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="land-subject-card">
                            <div className="land-subj-icon">📐</div>
                            <div className="land-subj-name">Mathematics MCQ</div>
                            <div className="land-subj-count">Class 11 + 12 · 1200+ questions</div>
                            <div className="land-subj-tags">
                                {["Calculus", "Algebra", "Trigonometry", "Vectors", "Statistics"].map(t => (
                                    <span className="land-subj-tag" key={t}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="land-section">
                    <div className="land-section-label">Features</div>
                    <h2 className="land-section-title">Everything you need to prepare</h2>
                    <p className="land-section-sub">Built for MHT-CET. No bloat, no paywalls.</p>
                    <div className="land-features">
                        {[
                            { icon: "📚", title: "Chapter-wise Practice", desc: "Drill individual chapters. Master weak topics before moving on." },
                            { icon: "⏱️", title: "Timed Mock Tests", desc: "Simulate real CET conditions. 50 questions, 90 minutes, auto-submit." },
                            { icon: "📊", title: "Instant Results & Analytics", desc: "Score breakdown, topic-wise accuracy, question review after every attempt." },
                            { icon: "🎯", title: "CET-level Difficulty", desc: "Questions classified as CET and Above-CET difficulty. Practice what matters." },
                        ].map(f => (
                            <div className="land-feat" key={f.title}>
                                <div className="land-feat-icon">{f.icon}</div>
                                <div>
                                    <div className="land-feat-title">{f.title}</div>
                                    <div className="land-feat-desc">{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA BANNER */}
                <div className="land-banner">
                    <div className="land-banner-inner">
                        <h2>Start your MHT-CET preparation today</h2>
                        <p>Free signup. No credit card. No ads. Just practice.</p>
                        <Link to="/register" className="land-cta-main" style={{ display: "inline-flex" }}>
                            Create Free Account →
                        </Link>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="land-footer">
                    <div className="land-footer-left">© 2026 CET_CELL · Free MHT-CET Practice for Maharashtra HSC Students</div>
                    <div className="land-footer-right">
                        <a href="mailto:hello@cetcell.in">Contact</a>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </footer>
            </div>
        </>
    );
}