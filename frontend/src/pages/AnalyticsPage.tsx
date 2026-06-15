import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resultApi } from '../api/result';
import type { AnalyticsDTO, TopicScoreDTO } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ap-root { min-height: 100vh; background: #0b0f1a; font-family: 'DM Sans', sans-serif; color: #e8eaf0; }

  .ap-nav {
    position: sticky; top: 0; z-index: 50;
    background: #111520; border-bottom: 0.5px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px; height: 56px;
  }
  .ap-brand { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px; color: #fff; }
  .ap-brand span { color: #7F77DD; }
  .ap-nav-actions { display: flex; gap: 8px; }
  .ap-btn-ghost {
    padding: 6px 13px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.1);
    color: rgba(232,234,240,0.7); transition: all 0.18s; white-space: nowrap;
  }
  .ap-btn-ghost:hover { background: rgba(255,255,255,0.09); color: #fff; }
  .ap-btn-primary {
    padding: 6px 13px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    background: #534AB7; border: none; color: #fff;
    box-shadow: 0 4px 12px rgba(83,74,183,0.3); transition: all 0.18s; white-space: nowrap;
  }
  .ap-btn-primary:hover { background: #6259c9; }

  .ap-page { max-width: 960px; margin: 0 auto; padding: 32px 20px 80px; display: flex; flex-direction: column; gap: 24px; }

  .ap-center { min-height: 100vh; background: #0b0f1a; display: flex; align-items: center; justify-content: center; }
  .ap-loader { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .ap-spinner { width: 36px; height: 36px; border: 2px solid rgba(83,74,183,0.2); border-top-color: #534AB7; border-radius: 50%; animation: ap-spin 0.8s linear infinite; }
  @keyframes ap-spin { to { transform: rotate(360deg); } }
  .ap-loader p { font-size: 14px; color: rgba(175,169,236,0.6); }

  .ap-error-card { background: rgba(226,75,74,0.08); border: 0.5px solid rgba(226,75,74,0.3); border-radius: 14px; padding: 36px; text-align: center; max-width: 420px; width: 100%; }
  .ap-error-card h2 { font-family: 'Syne', sans-serif; font-size: 20px; color: #E24B4A; margin-bottom: 8px; }
  .ap-error-card p { font-size: 14px; color: rgba(226,75,74,0.7); margin-bottom: 20px; }

  .ap-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .ap-header-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #fff; }
  .ap-header-sub { font-size: 13px; color: rgba(255,255,255,0.35); margin-top: 3px; }

  .ap-section-hd { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }

  .ap-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

  .ap-stat-card { background: #131825; border: 0.5px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 20px; position: relative; overflow: hidden; }
  .ap-stat-card-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(83,74,183,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(83,74,183,0.05) 1px, transparent 1px); background-size: 40px 40px; }
  .ap-stat-card-inner { position: relative; z-index: 1; }
  .ap-stat-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.7px; color: rgba(255,255,255,0.3); margin-bottom: 8px; }
  .ap-stat-val { font-family: 'Syne', sans-serif; font-size: 34px; font-weight: 800; line-height: 1; }
  .ap-stat-unit { font-size: 16px; font-weight: 600; opacity: 0.4; margin-left: 2px; }

  .ap-chart-card { background: #131825; border: 0.5px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; }
  .ap-chart-hd { padding: 18px 20px; border-bottom: 0.5px solid rgba(255,255,255,0.06); font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; }
  .ap-chart-body { padding: 20px; }
  .ap-chart-empty { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(255,255,255,0.2); }

  .ap-weak-card { background: #131825; border: 0.5px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; }
  .ap-weak-hd { padding: 18px 20px; border-bottom: 0.5px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 10px; }
  .ap-weak-hd-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; }
  .ap-weak-hd-badge { background: rgba(226,75,74,0.12); border: 0.5px solid rgba(226,75,74,0.3); color: #E24B4A; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }

  .ap-weak-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 16px 20px; }

  .ap-weak-item { background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .ap-weak-name { font-size: 13px; font-weight: 500; color: #e8eaf0; margin-bottom: 3px; }
  .ap-weak-sub { font-size: 11px; color: rgba(255,255,255,0.25); }
  .ap-weak-right { text-align: right; flex-shrink: 0; }
  .ap-weak-pct { font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 500; color: #E24B4A; margin-bottom: 5px; }
  .ap-weak-bar-track { width: 72px; height: 4px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; margin-left: auto; }
  .ap-weak-bar-fill { height: 100%; border-radius: 99px; background: #E24B4A; }

  .ap-all-good { padding: 40px 20px; text-align: center; }
  .ap-all-good-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(29,158,117,0.12); border: 0.5px solid rgba(29,158,117,0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; }
  .ap-all-good-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #1D9E75; margin-bottom: 5px; }
  .ap-all-good-sub { font-size: 13px; color: rgba(255,255,255,0.25); max-width: 280px; margin: 0 auto; }

  .ap-history-card { background: #131825; border: 0.5px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; }
  .ap-history-hd { padding: 18px 20px; border-bottom: 0.5px solid rgba(255,255,255,0.06); font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; }
  .ap-history-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; gap: 10px; border-top: 0.5px solid rgba(255,255,255,0.05); transition: background 0.15s; }
  .ap-history-row:hover { background: rgba(255,255,255,0.02); }
  .ap-history-title { font-size: 13px; font-weight: 500; color: rgba(232,234,240,0.85); flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ap-history-date { font-size: 11px; color: rgba(255,255,255,0.25); flex-shrink: 0; }
  .ap-history-pct { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; flex-shrink: 0; min-width: 48px; text-align: right; }
  .ap-history-empty { padding: 32px 20px; text-align: center; font-size: 13px; color: rgba(255,255,255,0.2); }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .ap-nav { padding: 0 14px; }
    /* collapse nav to icon buttons on tiny screens */
    .ap-btn-ghost { padding: 6px 10px; font-size: 12px; }
    .ap-btn-primary { padding: 6px 10px; font-size: 12px; }

    .ap-page { padding: 20px 12px 60px; gap: 18px; }
    .ap-header-title { font-size: 20px; }

    /* stats: 3-col stays but shrinks */
    .ap-stats-grid { gap: 8px; }
    .ap-stat-card { padding: 14px 12px; }
    .ap-stat-val { font-size: 26px; }

    /* chart */
    .ap-chart-body { padding: 14px 10px; }

    /* weak grid: 1 col */
    .ap-weak-grid { grid-template-columns: 1fr; padding: 12px 14px; gap: 8px; }
    .ap-weak-bar-track { width: 60px; }

    /* history */
    .ap-history-row { padding: 11px 14px; gap: 8px; }
    .ap-history-date { display: none; } /* hide date on tiny screens — title + pct enough */
  }
`;

const pctColor = (pct: number) => pct >= 60 ? '#1D9E75' : pct >= 40 ? '#EF9F27' : '#E24B4A';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a2035', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px' }}>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '16px', fontWeight: 500, color: pctColor(payload[0].value) }}>
        {payload[0].value.toFixed(1)}%
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<AnalyticsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    resultApi.getAnalytics()
      .then((data) => { setAnalytics(data); setLoading(false); })
      .catch((err) => { setError(err.response?.data?.error || err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <><style>{styles}</style>
    <div className="ap-center"><div className="ap-loader"><div className="ap-spinner" /><p>Loading analytics…</p></div></div></>
  );

  if (error) return (
    <><style>{styles}</style>
    <div className="ap-center"><div className="ap-error-card">
      <h2>Error</h2><p>{error}</p>
      <button className="ap-btn-ghost" style={{ width: '100%', padding: '11px' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div></div></>
  );

  if (!analytics) return null;

  const { totalExamsAttempted, averageScorePercentage, bestScorePercentage, history, weakTopics } = analytics;

  const chartData = [...history].reverse().map(h => {
    const d = new Date(h.date);
    return { name: `${d.getDate()}/${d.getMonth() + 1}`, percentage: parseFloat(h.percentage.toFixed(1)), title: h.examTitle };
  });

  return (
    <><style>{styles}</style>
    <div className="ap-root">
      <nav className="ap-nav">
        <div className="ap-brand">CET<span>_</span>CELL</div>
        <div className="ap-nav-actions">
          <button className="ap-btn-ghost" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="ap-btn-primary" onClick={() => navigate('/exam/setup')}>New Exam</button>
        </div>
      </nav>

      <div className="ap-page">
        <div className="ap-header">
          <div>
            <div className="ap-header-title">Analytics</div>
            <div className="ap-header-sub">Track progress · Identify weak spots</div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="ap-section-hd">Overview</div>
          <div className="ap-stats-grid">
            {[
              { label: 'Exams Taken', val: totalExamsAttempted, color: '#7F77DD', unit: false },
              { label: 'Avg Score', val: averageScorePercentage, color: pctColor(averageScorePercentage), unit: true },
              { label: 'Best Score', val: bestScorePercentage, color: '#EF9F27', unit: true },
            ].map(({ label, val, color, unit }) => (
              <div className="ap-stat-card" key={label}>
                <div className="ap-stat-card-grid" />
                <div className="ap-stat-card-inner">
                  <div className="ap-stat-lbl">{label}</div>
                  <div className="ap-stat-val" style={{ color }}>
                    {unit ? (val as number).toFixed(1) : val}
                    {unit && <span className="ap-stat-unit">%</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div>
          <div className="ap-section-hd">Performance Trend</div>
          <div className="ap-chart-card">
            <div className="ap-chart-hd">Score over time</div>
            <div className="ap-chart-body">
              {chartData.length > 1 ? (
                <div style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="ap-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#534AB7" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#534AB7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.15)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.15)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="percentage" stroke="#7F77DD" strokeWidth={2} fillOpacity={1} fill="url(#ap-grad)"
                        dot={{ fill: '#534AB7', stroke: '#7F77DD', strokeWidth: 1.5, r: 3 }}
                        activeDot={{ r: 5, fill: '#7F77DD', stroke: '#fff', strokeWidth: 1.5 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="ap-chart-empty">Take at least 2 exams to see trend</div>
              )}
            </div>
          </div>
        </div>

        {/* Weak Topics */}
        <div>
          <div className="ap-section-hd">Areas to Improve</div>
          <div className="ap-weak-card">
            <div className="ap-weak-hd">
              <div className="ap-weak-hd-title">Weak Topics</div>
              {weakTopics.length > 0 && (
                <span className="ap-weak-hd-badge">{weakTopics.length} topic{weakTopics.length > 1 ? 's' : ''} below 60%</span>
              )}
            </div>
            {weakTopics.length > 0 ? (
              <div className="ap-weak-grid">
                {weakTopics.map((topic: TopicScoreDTO) => (
                  <div key={topic.topicId} className="ap-weak-item">
                    <div>
                      <div className="ap-weak-name">{topic.topicName}</div>
                      <div className="ap-weak-sub">{topic.correct} / {topic.totalQuestions} correct</div>
                    </div>
                    <div className="ap-weak-right">
                      <div className="ap-weak-pct">{topic.accuracyPercentage.toFixed(1)}%</div>
                      <div className="ap-weak-bar-track">
                        <div className="ap-weak-bar-fill" style={{ width: `${topic.accuracyPercentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ap-all-good">
                <div className="ap-all-good-icon">✓</div>
                <div className="ap-all-good-title">All topics above 60%</div>
                <div className="ap-all-good-sub">Keep practising to maintain your accuracy.</div>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div>
          <div className="ap-section-hd">Exam History</div>
          <div className="ap-history-card">
            <div className="ap-history-hd">Recent exams</div>
            {history.length > 0 ? history.map((h, i) => {
              const d = new Date(h.date);
              return (
                <div key={i} className="ap-history-row">
                  <div className="ap-history-title">{h.examTitle}</div>
                  <div className="ap-history-date">{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()}</div>
                  <div className="ap-history-pct" style={{ color: pctColor(h.percentage) }}>{h.percentage.toFixed(1)}%</div>
                </div>
              );
            }) : (
              <div className="ap-history-empty">No exams yet</div>
            )}
          </div>
        </div>
      </div>
    </div></>
  );
}