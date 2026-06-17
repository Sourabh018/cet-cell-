import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resultApi } from '../api/result';
import type { ResultDTO, QuestionReviewDTO, TopicScoreDTO } from '../types';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rp-root {
    min-height: 100vh;
    background: #0b0f1a;
    font-family: 'DM Sans', sans-serif;
    color: #e8eaf0;
  }

  /* ── Navbar ── */
  .rp-nav {
    position: sticky; top: 0; z-index: 50;
    background: #111520;
    border-bottom: 0.5px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; height: 58px;
  }
  .rp-brand {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 18px; color: #fff;
  }
  .rp-brand span { color: #7F77DD; }
  .rp-nav-actions { display: flex; gap: 10px; }
  .rp-btn-ghost {
    padding: 7px 16px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    background: rgba(255,255,255,0.05);
    border: 0.5px solid rgba(255,255,255,0.1);
    color: rgba(232,234,240,0.7);
    transition: all 0.18s;
  }
  .rp-btn-ghost:hover { background: rgba(255,255,255,0.09); color: #fff; }
  .rp-btn-primary {
    padding: 7px 16px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    background: #534AB7; border: none; color: #fff;
    box-shadow: 0 4px 12px rgba(83,74,183,0.3);
    transition: all 0.18s;
  }
  .rp-btn-primary:hover { background: #6259c9; }

  /* ── Share button ── */
  .rp-btn-share {
    padding: 7px 16px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    background: #25D366; border: none; color: #fff;
    display: flex; align-items: center; gap: 6px;
    transition: background 0.18s;
  }
  .rp-btn-share:hover { background: #1fb855; }

  /* ── Page ── */
  .rp-page {
    max-width: 900px; margin: 0 auto;
    padding: 36px 20px 80px;
    display: flex; flex-direction: column; gap: 28px;
  }

  /* ── Center / loader ── */
  .rp-center {
    min-height: 100vh; background: #0b0f1a;
    display: flex; align-items: center; justify-content: center;
  }
  .rp-loader { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .rp-spinner {
    width: 36px; height: 36px;
    border: 2px solid rgba(83,74,183,0.2);
    border-top-color: #534AB7;
    border-radius: 50%;
    animation: rp-spin 0.8s linear infinite;
  }
  @keyframes rp-spin { to { transform: rotate(360deg); } }
  .rp-loader p { font-size: 14px; color: rgba(175,169,236,0.6); }

  /* error */
  .rp-error-card {
    background: rgba(226,75,74,0.08);
    border: 0.5px solid rgba(226,75,74,0.3);
    border-radius: 14px; padding: 36px; text-align: center;
    max-width: 420px; width: 100%;
  }
  .rp-error-card h2 {
    font-family: 'Syne', sans-serif; font-size: 20px;
    color: #E24B4A; margin-bottom: 8px;
  }
  .rp-error-card p { font-size: 14px; color: rgba(226,75,74,0.7); margin-bottom: 20px; }

  /* ── Scorecard ── */
  .rp-scorecard {
    background: #131825;
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 14px; overflow: hidden; position: relative;
  }
  .rp-scorecard-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(83,74,183,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(83,74,183,0.07) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .rp-scorecard-inner { position: relative; z-index: 1; }

  .rp-scorecard-top {
    padding: 32px; display: flex;
    align-items: center; gap: 32px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    flex-wrap: wrap;
  }
  .rp-score-circle {
    width: 110px; height: 110px; border-radius: 50%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    flex-shrink: 0; border: 2px solid;
    position: relative;
  }
  .rp-score-pct {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 800;
    line-height: 1;
  }
  .rp-score-label {
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-top: 3px; opacity: 0.7;
  }
  .rp-score-info { flex: 1; min-width: 180px; }
  .rp-score-final {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    color: rgba(255,255,255,0.5);
    margin-bottom: 6px;
  }
  .rp-score-final span {
    font-size: 36px; font-weight: 800; color: #fff;
  }
  .rp-score-verdict {
    font-size: 13px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.8px;
    padding: 4px 12px; border-radius: 20px;
    display: inline-block; margin-top: 8px;
  }

  .rp-scorecard-stats {
    display: grid; grid-template-columns: repeat(4,1fr);
    gap: 1px; background: rgba(255,255,255,0.04);
  }
  .rp-stat-cell {
    background: #131825; padding: 18px 20px; text-align: center;
  }
  .rp-stat-lbl {
    font-size: 11px; color: rgba(255,255,255,0.35);
    text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 5px;
  }
  .rp-stat-val {
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
  }

  /* ── Section header ── */
  .rp-section-hd {
    font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 700;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 12px;
  }

  /* ── Topic table ── */
  .rp-topic-card {
    background: #131825;
    border: 0.5px solid rgba(255,255,255,0.07);
    border-radius: 14px; overflow: hidden;
  }
  .rp-topic-hd {
    padding: 18px 24px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
  }
  .rp-topic-hd-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; color: #fff;
  }
  .rp-table { width: 100%; border-collapse: collapse; }
  .rp-table th {
    padding: 10px 20px;
    font-size: 11px; font-weight: 700;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase; letter-spacing: 0.7px;
    background: rgba(255,255,255,0.02);
    text-align: left;
  }
  .rp-table th:not(:first-child) { text-align: center; }
  .rp-table td {
    padding: 13px 20px;
    font-size: 14px; color: rgba(232,234,240,0.8);
    border-top: 0.5px solid rgba(255,255,255,0.05);
  }
  .rp-table td:not(:first-child) { text-align: center; }
  .rp-table tr:hover td { background: rgba(255,255,255,0.02); }
  .rp-acc-badge {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 3px 10px; border-radius: 20px;
    font-size: 12px; font-weight: 700;
    border: 0.5px solid;
  }

  /* ── Topic accuracy bar ── */
  .rp-bar-row {
    display: flex; align-items: center; gap: 12px; margin-bottom: 10px;
  }
  .rp-bar-name {
    font-size: 13px; color: rgba(232,234,240,0.7);
    width: 200px; flex-shrink: 0;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .rp-bar-track {
    flex: 1; height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 99px; overflow: hidden;
  }
  .rp-bar-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.6s ease;
  }
  .rp-bar-pct {
    font-family: 'DM Mono', monospace;
    font-size: 12px; font-weight: 500;
    width: 44px; text-align: right;
  }

  /* ── Review section ── */
  .rp-q-card {
    background: #131825;
    border: 0.5px solid rgba(255,255,255,0.07);
    border-radius: 14px; overflow: hidden;
    border-left-width: 3px;
  }
  .rp-q-card.correct { border-left-color: #1D9E75; }
  .rp-q-card.wrong   { border-left-color: #E24B4A; }
  .rp-q-card.skipped { border-left-color: rgba(255,255,255,0.15); }

  .rp-q-head {
    padding: 16px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    gap: 12px; flex-wrap: wrap;
  }
  .rp-q-meta { display: flex; align-items: center; gap: 10px; }
  .rp-q-num {
    width: 28px; height: 28px; border-radius: 8px;
    background: rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
    color: rgba(255,255,255,0.5);
    flex-shrink: 0;
  }
  .rp-topic-chip {
    background: rgba(83,74,183,0.15);
    border: 0.5px solid rgba(83,74,183,0.3);
    color: #AFA9EC;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.5px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px;
  }
  .rp-status-badge {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.6px; text-transform: uppercase;
    padding: 4px 12px; border-radius: 20px; border: 0.5px solid;
    white-space: nowrap;
  }
  .rp-status-badge.correct {
    background: rgba(29,158,117,0.15); border-color: rgba(29,158,117,0.35); color: #1D9E75;
  }
  .rp-status-badge.wrong {
    background: rgba(226,75,74,0.12); border-color: rgba(226,75,74,0.35); color: #E24B4A;
  }
  .rp-status-badge.skipped {
    background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4);
  }

  .rp-q-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
  .rp-q-text {
    font-size: 15px; line-height: 1.65;
    color: #e8eaf0; white-space: pre-wrap;
  }

  .rp-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

  .rp-opt {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 14px; border-radius: 10px;
    border: 0.5px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
  }
  .rp-opt.correct-ans {
    background: rgba(29,158,117,0.1);
    border-color: rgba(29,158,117,0.35);
  }
  .rp-opt.wrong-sel {
    background: rgba(226,75,74,0.08);
    border-color: rgba(226,75,74,0.3);
  }
  .rp-opt-key {
    width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
    background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.4);
  }
  .rp-opt.correct-ans .rp-opt-key { background: rgba(29,158,117,0.25); color: #1D9E75; }
  .rp-opt.wrong-sel .rp-opt-key   { background: rgba(226,75,74,0.2); color: #E24B4A; }
  .rp-opt-text {
    font-size: 13px; color: rgba(232,234,240,0.7); flex: 1; line-height: 1.4;
  }
  .rp-opt.correct-ans .rp-opt-text { color: #e8eaf0; }
  .rp-opt.wrong-sel .rp-opt-text   { color: rgba(226,75,74,0.8); }
  .rp-opt-icon { font-size: 14px; flex-shrink: 0; }

  /* explanation */
  .rp-explanation {
    background: rgba(83,74,183,0.08);
    border: 0.5px solid rgba(83,74,183,0.25);
    border-radius: 10px; padding: 14px 16px;
  }
  .rp-expl-title {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.7px;
    color: #AFA9EC; margin-bottom: 7px;
  }
  .rp-expl-text {
    font-size: 13px; line-height: 1.6;
    color: rgba(175,169,236,0.8);
    white-space: pre-wrap;
  }

  /* ── MOBILE ── */
  @media (max-width: 600px) {
    .rp-nav { padding: 0 16px; height: 52px; }
    .rp-brand { font-size: 16px; }
    .rp-btn-ghost { display: none; }
    .rp-btn-primary { padding: 6px 12px; font-size: 12px; }
    .rp-btn-share { padding: 6px 12px; font-size: 12px; }
    .rp-page { padding: 16px 12px 60px; gap: 16px; }
    .rp-scorecard-top {
      padding: 20px 16px;
      flex-direction: row;
      align-items: center;
      gap: 20px;
    }
    .rp-score-circle { width: 88px; height: 88px; }
    .rp-score-pct { font-size: 20px; }
    .rp-score-label { font-size: 10px; }
    .rp-score-final { font-size: 13px; margin-bottom: 4px; }
    .rp-score-final span { font-size: 26px; }
    .rp-score-verdict { font-size: 11px; padding: 3px 10px; margin-top: 6px; }
    .rp-score-info { min-width: 0; }
    .rp-scorecard-stats { grid-template-columns: repeat(2, 1fr); }
    .rp-stat-cell { padding: 14px 12px; }
    .rp-stat-lbl { font-size: 10px; }
    .rp-stat-val { font-size: 18px; }
    .rp-topic-card > div { padding: 14px 16px !important; }
    .rp-q-head { padding: 12px 14px; gap: 8px; }
    .rp-topic-chip { font-size: 10px; padding: 2px 8px; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .rp-q-body { padding: 14px; gap: 12px; }
    .rp-q-text { font-size: 14px; }
    .rp-opts { grid-template-columns: 1fr; gap: 6px; }
    .rp-opt { padding: 10px 12px; gap: 10px; }
    .rp-opt-text { font-size: 13px; }
    .rp-explanation { padding: 12px 14px; }
    .rp-expl-text { font-size: 13px; }
    .rp-section-hd { font-size: 11px; }
  }

  @media (max-width: 380px) {
    .rp-scorecard-top { flex-direction: column; align-items: flex-start; }
    .rp-score-circle { width: 80px; height: 80px; }
  }
`;

const scoreTheme = (pct: number) => {
  if (pct >= 60) return {
    circle: { border: '#1D9E75', bg: 'rgba(29,158,117,0.1)', color: '#1D9E75' },
    verdict: { bg: 'rgba(29,158,117,0.15)', border: 'rgba(29,158,117,0.3)', color: '#1D9E75', text: 'Good Performance' },
    bar: '#1D9E75', badge: { bg: 'rgba(29,158,117,0.12)', border: 'rgba(29,158,117,0.3)', color: '#1D9E75' }
  };
  if (pct >= 40) return {
    circle: { border: '#EF9F27', bg: 'rgba(239,159,39,0.1)', color: '#EF9F27' },
    verdict: { bg: 'rgba(239,159,39,0.12)', border: 'rgba(239,159,39,0.3)', color: '#EF9F27', text: 'Needs Improvement' },
    bar: '#EF9F27', badge: { bg: 'rgba(239,159,39,0.1)', border: 'rgba(239,159,39,0.3)', color: '#EF9F27' }
  };
  return {
    circle: { border: '#E24B4A', bg: 'rgba(226,75,74,0.1)', color: '#E24B4A' },
    verdict: { bg: 'rgba(226,75,74,0.1)', border: 'rgba(226,75,74,0.3)', color: '#E24B4A', text: 'Below Target' },
    bar: '#E24B4A', badge: { bg: 'rgba(226,75,74,0.1)', border: 'rgba(226,75,74,0.3)', color: '#E24B4A' }
  };
};

const topicBarColor = (pct: number) => {
  if (pct >= 60) return '#1D9E75';
  if (pct >= 40) return '#EF9F27';
  return '#E24B4A';
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const generateScoreCard = (
  percentage: number,
  finalScore: number,
  maxScore: number,
  correct: number,
  wrong: number,
  skipped: number,
  timeTakenSeconds: number,
  topicName: string
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#0b0f1a';
  ctx.fillRect(0, 0, 1080, 1080);

  // Grid pattern
  ctx.strokeStyle = 'rgba(83,74,183,0.1)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1080; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1080); ctx.stroke();
  }
  for (let y = 0; y < 1080; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1080, y); ctx.stroke();
  }

  // Purple glow top-right
  const glow = ctx.createRadialGradient(1080, 0, 0, 1080, 0, 600);
  glow.addColorStop(0, 'rgba(83,74,183,0.25)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1080);

  // Top accent bar
  ctx.fillStyle = '#534AB7';
  ctx.fillRect(0, 0, 1080, 8);

  // Brand
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CET', 80, 110);
  ctx.fillStyle = '#7F77DD';
  ctx.fillText('_CELL', 80 + ctx.measureText('CET').width, 110);

  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '28px sans-serif';
  ctx.fillText('MHT-CET Practice', 80, 150);

  // Score circle
  const cx = 540, cy = 420, r = 180;
  const scoreColor = percentage >= 60 ? '#1D9E75' : percentage >= 40 ? '#EF9F27' : '#E24B4A';

  // Circle bg
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = scoreColor.replace(')', ',0.1)').replace('rgb', 'rgba');
  ctx.fill();

  // Circle border
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * percentage / 100));
  ctx.strokeStyle = scoreColor;
  ctx.lineWidth = 8;
  ctx.stroke();

  // Score text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${percentage.toFixed(1)}%`, cx, cy + 20);

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '28px sans-serif';
  ctx.fillText('Score', cx, cy + 65);

  // Final score
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(`${finalScore.toFixed(2)} / ${maxScore} marks`, cx, cy + 120);

  // Stats row
  const stats = [
    { label: 'Correct', value: String(correct), color: '#1D9E75' },
    { label: 'Wrong', value: String(wrong), color: '#E24B4A' },
    { label: 'Skipped', value: String(skipped), color: 'rgba(255,255,255,0.4)' },
    { label: 'Time', value: formatTime(timeTakenSeconds), color: '#AFA9EC' },
  ];

  const statY = 700;
  const statW = 220;
  const startX = (1080 - statW * 4) / 2;

  stats.forEach((s, i) => {
    const sx = startX + i * statW + statW / 2;

    // Card bg
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    roundRect(ctx, sx - statW / 2 + 8, statY - 50, statW - 16, 120, 12);
    ctx.fill();

    ctx.fillStyle = s.color;
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(s.value, sx, statY + 16);

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '22px sans-serif';
    ctx.fillText(s.label, sx, statY + 48);
  });

  // Topic
  ctx.fillStyle = 'rgba(175,169,236,0.7)';
  ctx.font = '26px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(topicName, 540, 870);

  // CTA
  ctx.fillStyle = '#534AB7';
  roundRect(ctx, 340, 910, 400, 70, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Practice free at cet-cell.vercel.app', 540, 953);

  return canvas.toDataURL('image/png');
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function ResultPage() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const calcRequested = useRef(false);

  useEffect(() => {
    if (attemptId && !calcRequested.current) {
      calcRequested.current = true;
      resultApi.calculateResult(attemptId)
        .then((data) => { setResult(data); setLoading(false); })
        .catch((err) => { setError(err.response?.data?.error || err.message); setLoading(false); });
    }
  }, [attemptId]);

  const handleShare = () => {
    if (!result) return;
    const topicName = result.topicScores?.[0]?.topicName ?? 'MHT-CET Practice';
    const imgData = generateScoreCard(
      result.percentage,
      result.finalScore,
      result.maxScore,
      result.correct,
      result.wrong,
      result.skipped,
      result.timeTakenSeconds,
      topicName
    );
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'my-cet-score.png';
    a.click();
    const text = encodeURIComponent(
      `I scored ${result.percentage.toFixed(1)}% in MHT-CET ${topicName} practice! 🎯\nPractice free: https://cet-cell.vercel.app`
    );
    setTimeout(() => window.open(`https://wa.me/?text=${text}`, '_blank'), 300);
  };

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="rp-center">
        <div className="rp-loader">
          <div className="rp-spinner" />
          <p>Calculating result…</p>
        </div>
      </div>
    </>
  );

  if (error) return (
    <>
      <style>{styles}</style>
      <div className="rp-center">
        <div className="rp-error-card">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="rp-btn-ghost" style={{ width: '100%', padding: '11px' }} onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );

  if (!result) return null;

  const { percentage, finalScore, maxScore, correct, wrong, skipped, timeTakenSeconds, topicScores, review } = result;
  const theme = scoreTheme(percentage);
  const sortedTopics = [...topicScores].sort((a, b) => a.accuracyPercentage - b.accuracyPercentage);

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">
        {/* Navbar */}
        <nav className="rp-nav">
          <div className="rp-brand">CET<span>_</span>CELL</div>
          <div className="rp-nav-actions">
            <button className="rp-btn-ghost" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="rp-btn-share" onClick={handleShare}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.127 17.579c-.264.738-1.305 1.388-2.14 1.57-.572.124-1.318.223-3.831-.823-3.299-1.376-5.43-4.7-5.594-4.918C6.4 13.2 5.2 11.6 5.2 9.933c0-1.655.867-2.468 1.174-2.8.272-.294.593-.368.791-.368l.57.01c.183.008.431-.069.675.516.252.603.855 2.084.93 2.237.074.152.124.331.025.53-.099.198-.149.32-.298.494-.149.174-.314.388-.447.521-.149.148-.304.309-.13.607.173.297.769 1.268 1.652 2.055 1.135 1.011 2.091 1.323 2.39 1.472.297.148.472.124.645-.074.173-.198.74-.866.937-1.163.198-.298.397-.248.67-.149.273.1 1.73.816 2.028.965.297.148.496.223.57.347.074.124.074.719-.173 1.412z"/>
              </svg>
              Share
            </button>
            <button className="rp-btn-primary" onClick={() => navigate('/analytics')}>Analytics</button>
          </div>
        </nav>

        <div className="rp-page">

          {/* ── Scorecard ── */}
          <div className="rp-scorecard">
            <div className="rp-scorecard-grid" />
            <div className="rp-scorecard-inner">
              <div className="rp-scorecard-top">
                <div className="rp-score-circle" style={{
                  borderColor: theme.circle.border,
                  background: theme.circle.bg,
                }}>
                  <span className="rp-score-pct" style={{ color: theme.circle.color }}>
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="rp-score-label" style={{ color: theme.circle.color }}>Score</span>
                </div>

                <div className="rp-score-info">
                  <div className="rp-score-final">
                    <span>{finalScore.toFixed(2)}</span> / {maxScore}
                  </div>
                  <div className="rp-score-verdict" style={{
                    background: theme.verdict.bg,
                    border: `0.5px solid ${theme.verdict.border}`,
                    color: theme.verdict.color,
                  }}>
                    {theme.verdict.text}
                  </div>
                </div>
              </div>

              <div className="rp-scorecard-stats">
                <div className="rp-stat-cell">
                  <div className="rp-stat-lbl">Correct</div>
                  <div className="rp-stat-val" style={{ color: '#1D9E75' }}>{correct}</div>
                </div>
                <div className="rp-stat-cell">
                  <div className="rp-stat-lbl">Wrong</div>
                  <div className="rp-stat-val" style={{ color: '#E24B4A' }}>{wrong}</div>
                </div>
                <div className="rp-stat-cell">
                  <div className="rp-stat-lbl">Skipped</div>
                  <div className="rp-stat-val" style={{ color: 'rgba(255,255,255,0.4)' }}>{skipped}</div>
                </div>
                <div className="rp-stat-cell">
                  <div className="rp-stat-lbl">Time</div>
                  <div className="rp-stat-val" style={{ color: '#AFA9EC', fontSize: '18px' }}>{formatTime(timeTakenSeconds)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Topic Accuracy ── */}
          <div>
            <div className="rp-section-hd">Topic Breakdown</div>
            <div className="rp-topic-card">
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedTopics.map((t: TopicScoreDTO) => {
                  const color = topicBarColor(t.accuracyPercentage);
                  const tBadge = scoreTheme(t.accuracyPercentage).badge;
                  return (
                    <div key={t.topicId}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: 'rgba(232,234,240,0.75)', fontWeight: 500 }}>{t.topicName}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{t.correct}/{t.totalQuestions}</span>
                          <span className="rp-acc-badge" style={{
                            background: tBadge.bg,
                            borderColor: tBadge.border,
                            color: tBadge.color,
                          }}>{t.accuracyPercentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="rp-bar-track">
                        <div className="rp-bar-fill" style={{ width: `${t.accuracyPercentage}%`, background: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Question Review ── */}
          <div>
            <div className="rp-section-hd">Question Review ({review.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {review.map((q: QuestionReviewDTO, index: number) => {
                const derivedCorrect = q.selectedAnswer != null
                  && q.selectedAnswer.trim() !== ''
                  && q.selectedAnswer === q.correctAnswer;
                const derivedSkipped = q.selectedAnswer == null || q.selectedAnswer.trim() === '';

                const statusKey = derivedCorrect ? 'correct' : derivedSkipped ? 'skipped' : 'wrong';
                const statusLabel = derivedCorrect ? 'Correct' : derivedSkipped ? 'Skipped' : 'Wrong';

                return (
                  <div key={q.questionId} className={`rp-q-card ${statusKey}`}>
                    <div className="rp-q-head">
                      <div className="rp-q-meta">
                        <div className="rp-q-num">{index + 1}</div>
                        <div className="rp-topic-chip">{q.topicName}</div>
                      </div>
                      <span className={`rp-status-badge ${statusKey}`}>{statusLabel}</span>
                    </div>

                    <div className="rp-q-body">
                      <p className="rp-q-text">{q.questionText}</p>

                      <div className="rp-opts">
                        {(['A','B','C','D'] as const).map((opt) => {
                          const text = q[`option${opt}` as keyof typeof q] as string;
                          const isCorrectAns = q.correctAnswer === opt;
                          const isWrongSel = q.selectedAnswer === opt && !isCorrectAns;
                          let cls = 'rp-opt';
                          let icon = null;
                          if (isCorrectAns) { cls += ' correct-ans'; icon = '✓'; }
                          else if (isWrongSel) { cls += ' wrong-sel'; icon = '✗'; }
                          return (
                            <div key={opt} className={cls}>
                              <span className="rp-opt-key">{opt}</span>
                              <span className="rp-opt-text">{text}</span>
                              {icon && <span className="rp-opt-icon">{icon}</span>}
                            </div>
                          );
                        })}
                      </div>

                      {q.solution && (
                        <div className="rp-explanation">
                          <div className="rp-expl-title">Explanation</div>
                          <div className="rp-expl-text">{q.solution}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}