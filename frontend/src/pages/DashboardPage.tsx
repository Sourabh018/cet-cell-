import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface ExamSummary {
  id: string;
  title: string;
  subjectName: string;
  topicName: string;
  totalQuestions: number;
  status: string;
  attempt?: {
    id?: string;
    score?: number;
    percentage?: number;
    startedAt?: string;
  };
}

interface TopicScoreDTO {
  topicId: string;
  topicName: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracyPercentage: number;
}

interface AnalyticsDTO {
  totalExamsAttempted: number;
  averageScorePercentage: number;
  bestScorePercentage: number;
  weakTopics: TopicScoreDTO[];
  history: { examId: string; resultId: string; examTitle: string; percentage: number; date: string }[];
}

const CET_DATE: string | null = "2026-12-15";

function useCETCountdown(targetDate: string | null) {
  const [countdown, setCountdown] = useState<{ days: number; hours: number; mins: number } | null>(null);

  useEffect(() => {
    if (!targetDate) return;
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, mins: 0 }); return; }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setCountdown({ days, hours, mins });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return countdown;
}

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [exams, setExams] = useState<ExamSummary[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const countdown = useCETCountdown(CET_DATE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsRes, analyticsRes] = await Promise.allSettled([
          api.get("/exams/my"),
          api.get("/results/analytics"),
        ]);
        if (examsRes.status === "fulfilled") setExams(examsRes.value.data);
        if (analyticsRes.status === "fulfilled") setAnalytics(analyticsRes.value.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const totalExams = analytics?.totalExamsAttempted ?? 0;
  const avgScore = analytics?.averageScorePercentage ?? null;
  const bestScore = analytics?.bestScorePercentage ?? null;
  const weakTopics = analytics?.weakTopics ?? [];
  const weakTopic = weakTopics.length > 0 ? weakTopics[0] : null;

  const getScoreColor = (pct: number) => {
    if (pct >= 70) return "#1D9E75";
    if (pct >= 50) return "#EF9F27";
    return "#E24B4A";
  };

  const getSubjectIcon = (subject: string) => {
    const s = subject?.toLowerCase() || "";
    if (s.includes("physics")) return { icon: "⚛", color: "#7F77DD", bg: "rgba(83,74,183,0.15)" };
    if (s.includes("chem")) return { icon: "⚗", color: "#1D9E75", bg: "rgba(29,158,117,0.15)" };
    if (s.includes("math")) return { icon: "∑", color: "#EF9F27", bg: "rgba(186,117,23,0.15)" };
    return { icon: "📄", color: "#888780", bg: "rgba(136,135,128,0.15)" };
  };

  const firstName = user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const recentExams = [...exams].filter((e) => e.status === "SUBMITTED").slice(0, 5);
  const topicBars = weakTopics.slice(0, 4);

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .db-root { min-height: 100vh; background: #0b0f1a; font-family: 'DM Sans', sans-serif; color: #fff; }

        .db-nav {
          background: #111520;
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
          padding: 0 20px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .db-nav-brand { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #fff; }
        .db-nav-brand span { color: #7F77DD; }
        .db-nav-right { display: flex; align-items: center; gap: 12px; }
        .db-nav-name { font-size: 13px; color: rgba(255,255,255,0.5); }
        .db-nav-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: #534AB7;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; color: #fff; flex-shrink: 0;
        }
        .db-nav-signout {
          padding: 6px 14px; border-radius: 7px;
          border: 0.5px solid rgba(255,255,255,0.12);
          background: transparent; color: rgba(255,255,255,0.45);
          font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: color 0.2s, border-color 0.2s; white-space: nowrap;
        }
        .db-nav-signout:hover { color: #fff; border-color: rgba(255,255,255,0.3); }
        .db-hamburger {
          display: none; background: none; border: none;
          cursor: pointer; padding: 4px; flex-direction: column; gap: 5px;
        }
        .db-hamburger span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.6); border-radius: 2px;
        }
        .db-mobile-menu {
          display: none; position: absolute; top: 56px; left: 0; right: 0;
          background: #111520; border-bottom: 0.5px solid rgba(255,255,255,0.07);
          padding: 16px 20px; flex-direction: column; gap: 12px; z-index: 99;
        }
        .db-mobile-menu.open { display: flex; }
        .db-mobile-user {
          display: flex; align-items: center; gap: 10px;
          padding-bottom: 12px; border-bottom: 0.5px solid rgba(255,255,255,0.07);
        }
        .db-mobile-name { font-size: 14px; font-weight: 500; }
        .db-mobile-signout {
          padding: 10px 0; background: none; border: none;
          color: rgba(255,255,255,0.45); font-size: 14px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; text-align: left;
        }

        .db-body { padding: 20px 16px; max-width: 1200px; margin: 0 auto; }

        .db-countdown {
          background: rgba(83,74,183,0.12); border: 0.5px solid rgba(83,74,183,0.35);
          border-radius: 10px; padding: 10px 16px; margin-bottom: 14px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 8px;
        }
        .db-countdown-label { font-size: 12px; color: rgba(255,255,255,0.4); }
        .db-countdown-time { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #7F77DD; }
        .db-countdown-seg { display: inline-flex; align-items: baseline; gap: 3px; margin-left: 12px; }
        .db-countdown-num { font-size: 18px; }
        .db-countdown-unit { font-size: 10px; color: rgba(255,255,255,0.35); text-transform: uppercase; }

        .db-hero {
          background: #131825; border: 0.5px solid rgba(83,74,183,0.3);
          border-radius: 14px; padding: 20px; margin-bottom: 16px;
          position: relative; overflow: hidden;
        }
        .db-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(83,74,183,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(83,74,183,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .db-hero-inner {
          position: relative; z-index: 1;
          display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
        }
        .db-hero-text { flex: 1; min-width: 0; }
        .db-hero-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .db-hero-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 14px; line-height: 1.5; }
        .db-hero-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .db-btn-ghost {
          padding: 8px 14px; border-radius: 8px;
          border: 0.5px solid rgba(255,255,255,0.15);
          background: transparent; color: rgba(255,255,255,0.7);
          font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s; white-space: nowrap;
        }
        .db-btn-ghost:hover { background: rgba(255,255,255,0.05); }
        .db-btn-primary {
          padding: 8px 16px; border-radius: 8px; border: none;
          background: #534AB7; color: #fff; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 12px rgba(83,74,183,0.3); transition: background 0.2s; white-space: nowrap;
        }
        .db-btn-primary:hover { background: #6158c9; }
        .db-streak { text-align: center; flex-shrink: 0; }
        .db-streak-num { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 700; color: #7F77DD; line-height: 1; }
        .db-streak-label { font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; text-transform: uppercase; margin-top: 4px; }

        .db-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
        .db-stat { background: #131825; border: 0.5px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 14px 12px; }
        .db-stat-label { font-size: 10px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
        .db-stat-val { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; line-height: 1; }
        .db-stat-sub { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; }

        .db-cols { display: grid; grid-template-columns: 1fr 260px; gap: 16px; }
        .db-section-title {
          font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px;
        }

        .db-exam-card {
          background: #131825; border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 12px 14px;
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px; transition: border-color 0.2s; gap: 8px;
        }
        .db-exam-card.clickable { cursor: pointer; }
        .db-exam-card.clickable:hover { border-color: rgba(83,74,183,0.5); }
        .db-exam-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .db-exam-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }
        .db-exam-title { font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .db-exam-meta { font-size: 11px; color: rgba(255,255,255,0.3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .db-exam-score { text-align: right; flex-shrink: 0; }
        .db-score-val { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }
        .db-score-sub { font-size: 10px; color: rgba(255,255,255,0.3); }

        .db-empty {
          background: #131825; border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 32px; text-align: center;
          color: rgba(255,255,255,0.3); font-size: 13px;
        }

        .db-sidebar-card {
          background: #131825; border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 14px; margin-bottom: 14px;
        }
        .db-topic-row { margin-bottom: 12px; }
        .db-topic-row:last-child { margin-bottom: 0; }
        .db-topic-top { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .db-topic-name { font-size: 12px; color: rgba(255,255,255,0.6); }
        .db-topic-pct { font-size: 12px; font-weight: 500; }
        .db-bar-bg { height: 4px; background: rgba(255,255,255,0.07); border-radius: 2px; }
        .db-bar { height: 4px; border-radius: 2px; }

        .db-quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .db-quick-btn {
          background: #131825; border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 14px 10px;
          cursor: pointer; text-align: center;
          transition: border-color 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .db-quick-btn:hover { border-color: rgba(83,74,183,0.4); }
        .db-quick-icon { font-size: 20px; display: block; margin-bottom: 5px; }
        .db-quick-label { font-size: 11px; color: rgba(255,255,255,0.4); }

        .db-loading {
          display: flex; align-items: center; justify-content: center;
          min-height: 100vh; background: #0b0f1a;
          color: rgba(255,255,255,0.3); font-size: 14px;
        }

        @media (max-width: 768px) {
          .db-nav { padding: 0 16px; }
          .db-nav-right { display: none; }
          .db-hamburger { display: flex; }
          .db-body { padding: 16px 12px; }
          .db-hero { padding: 16px; }
          .db-hero-title { font-size: 17px; }
          .db-hero-sub { font-size: 12px; margin-bottom: 12px; }
          .db-streak-num { font-size: 28px; }
          .db-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .db-stat { padding: 12px 10px; }
          .db-stat-val { font-size: 20px; }
          .db-stat-val.topic-name { font-size: 13px; padding-top: 2px; line-height: 1.3; }
          .db-cols { grid-template-columns: 1fr; gap: 12px; }
          .db-exam-card { padding: 10px 12px; }
          .db-exam-icon { width: 32px; height: 32px; font-size: 15px; border-radius: 8px; }
          .db-exam-title { font-size: 13px; }
          .db-quick-grid { grid-template-columns: repeat(4, 1fr); }
          .db-quick-btn { padding: 10px 6px; }
          .db-quick-icon { font-size: 18px; margin-bottom: 4px; }
          .db-quick-label { font-size: 10px; }
          .db-countdown { flex-direction: column; gap: 4px; }
          .db-countdown-time { font-size: 14px; }
        }

        @media (max-width: 380px) {
          .db-hero-btns { flex-direction: column; }
          .db-btn-ghost, .db-btn-primary { width: 100%; text-align: center; }
          .db-quick-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {loading ? (
        <div className="db-loading">Loading…</div>
      ) : (
        <div className="db-root">
          <nav className="db-nav" style={{ position: "relative" }}>
            <div className="db-nav-brand">CET<span>_CELL</span></div>
            <div className="db-nav-right">
              <span className="db-nav-name">{user?.name}</span>
              <div className="db-nav-avatar">{initials}</div>
              <button className="db-nav-signout" onClick={handleLogout}>Sign out</button>
            </div>
            <button className="db-hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              <span /><span /><span />
            </button>
            <div className={`db-mobile-menu${menuOpen ? " open" : ""}`}>
              <div className="db-mobile-user">
                <div className="db-nav-avatar">{initials}</div>
                <span className="db-mobile-name">{user?.name}</span>
              </div>
              <button className="db-mobile-signout" onClick={handleLogout}>Sign out</button>
            </div>
          </nav>

          <div className="db-body">
            {countdown && (
              <div className="db-countdown">
                <span className="db-countdown-label">MHT-CET countdown</span>
                <div className="db-countdown-time">
                  <span className="db-countdown-seg">
                    <span className="db-countdown-num">{countdown.days}</span>
                    <span className="db-countdown-unit">d</span>
                  </span>
                  <span className="db-countdown-seg">
                    <span className="db-countdown-num">{countdown.hours}</span>
                    <span className="db-countdown-unit">h</span>
                  </span>
                  <span className="db-countdown-seg">
                    <span className="db-countdown-num">{countdown.mins}</span>
                    <span className="db-countdown-unit">m</span>
                  </span>
                </div>
              </div>
            )}

            <div className="db-hero">
              <div className="db-hero-grid" />
              <div className="db-hero-inner">
                <div className="db-hero-text">
                  <div className="db-hero-title">{greeting}, {firstName}</div>
                  <div className="db-hero-sub">
                    {weakTopic
                      ? `Focus on ${weakTopic.topicName} — weakest topic at ${Math.round(weakTopic.accuracyPercentage)}%.`
                      : "Ready to start your preparation? Take your first exam."}
                  </div>
                  <div className="db-hero-btns">
                    <button className="db-btn-ghost" onClick={() => navigate("/analytics")}>View analytics</button>
                    <button className="db-btn-primary" onClick={() => navigate("/exam/setup")}>Start new exam</button>
                  </div>
                </div>
                <div className="db-streak">
                  <div className="db-streak-num">{totalExams}</div>
                  <div className="db-streak-label">Exams done</div>
                </div>
              </div>
            </div>

            <div className="db-stats">
              <div className="db-stat">
                <div className="db-stat-label">Exams taken</div>
                <div className="db-stat-val">{totalExams}</div>
                <div className="db-stat-sub">Total submitted</div>
              </div>
              <div className="db-stat">
                <div className="db-stat-label">Avg score</div>
                <div className="db-stat-val" style={{ color: avgScore !== null ? getScoreColor(avgScore) : "#7F77DD" }}>
                  {avgScore !== null ? `${avgScore.toFixed(1)}%` : "—"}
                </div>
                <div className="db-stat-sub">Across all exams</div>
              </div>
              <div className="db-stat">
                <div className="db-stat-label">Best score</div>
                <div className="db-stat-val" style={{ color: "#1D9E75" }}>
                  {bestScore !== null && bestScore > 0 ? `${bestScore.toFixed(1)}%` : "—"}
                </div>
                <div className="db-stat-sub">{bestScore !== null && bestScore > 0 ? "Personal best" : "No data yet"}</div>
              </div>
              <div className="db-stat">
                <div className="db-stat-label">Weak topic</div>
                <div className="db-stat-val topic-name" style={{ fontSize: 14, paddingTop: 3, color: "#E24B4A" }}>
                  {weakTopic ? weakTopic.topicName : "—"}
                </div>
                <div className="db-stat-sub">
                  {weakTopic ? `${Math.round(weakTopic.accuracyPercentage)}% accuracy` : "No data yet"}
                </div>
              </div>
            </div>

            <div className="db-cols">
              <div>
                <div className="db-section-title">Recent exams</div>
                {recentExams.length === 0 ? (
                  <div className="db-empty">
                    No exams yet.{" "}
                    <span style={{ color: "#7F77DD", cursor: "pointer" }} onClick={() => navigate("/exam/setup")}>
                      Start your first one.
                    </span>
                  </div>
                ) : (
                  recentExams.map((exam) => {
                    const { icon, color, bg } = getSubjectIcon(exam.subjectName);
                    const scorePct = exam.attempt?.percentage != null
                      ? Math.round(exam.attempt.percentage)
                      : null;
                    const attemptId = exam.attempt?.id;
                    return (
                      <div
                        key={exam.id}
                        className={`db-exam-card${attemptId ? " clickable" : ""}`}
                        onClick={() => attemptId && navigate(`/result/${attemptId}`)}
                      >
                        <div className="db-exam-left">
                          <div className="db-exam-icon" style={{ background: bg }}>
                            <span style={{ color }}>{icon}</span>
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div className="db-exam-title">{exam.topicName}</div>
                            <div className="db-exam-meta">{exam.subjectName} • {exam.totalQuestions} Qs</div>
                          </div>
                        </div>
                        <div className="db-exam-score">
                          {scorePct !== null ? (
                            <>
                              <div className="db-score-val" style={{ color: getScoreColor(scorePct) }}>{scorePct}%</div>
                              <div className="db-score-sub">{exam.totalQuestions} Qs</div>
                            </>
                          ) : (
                            <div className="db-score-val" style={{ color: "rgba(255,255,255,0.3)" }}>—</div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div>
                {topicBars.length > 0 && (
                  <>
                    <div className="db-section-title">Weak topic accuracy</div>
                    <div className="db-sidebar-card">
                      {topicBars.map((t) => {
                        const pct = Math.round(t.accuracyPercentage);
                        const color = getScoreColor(pct);
                        return (
                          <div key={t.topicId} className="db-topic-row">
                            <div className="db-topic-top">
                              <span className="db-topic-name">{t.topicName}</span>
                              <span className="db-topic-pct" style={{ color }}>{pct}%</span>
                            </div>
                            <div className="db-bar-bg">
                              <div className="db-bar" style={{ width: `${pct}%`, background: color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="db-section-title">Quick actions</div>
                <div className="db-quick-grid">
                  <div className="db-quick-btn" onClick={() => navigate("/exam/setup")}>
                    <span className="db-quick-icon">✏️</span>
                    <span className="db-quick-label">New exam</span>
                  </div>
                  <div className="db-quick-btn" onClick={() => navigate("/analytics")}>
                    <span className="db-quick-icon">📊</span>
                    <span className="db-quick-label">Analytics</span>
                  </div>
                  <div className="db-quick-btn">
                    <span className="db-quick-icon">📝</span>
                    <span className="db-quick-label">Cheatsheets</span>
                  </div>
                  <div className="db-quick-btn">
                    <span className="db-quick-icon">🔁</span>
                    <span className="db-quick-label">Retry weak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}