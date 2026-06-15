import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import api from "../api/axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ep-root {
    min-height: 100vh;
    background: #0b0f1a;
    font-family: 'DM Sans', sans-serif;
    color: #e8eaf0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── Topbar ── */
  .ep-topbar {
    height: 56px;
    background: #111520;
    border-bottom: 0.5px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    flex-shrink: 0;
    z-index: 30;
    position: relative;
  }
  .ep-brand {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 17px; color: #fff;
    flex-shrink: 0;
  }
  .ep-brand span { color: #7F77DD; }

  .ep-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700;
    color: rgba(255,255,255,0.5);
    position: absolute; left: 50%; transform: translateX(-50%);
    white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis; max-width: 300px;
    pointer-events: none;
  }

  .ep-timer {
    font-family: 'DM Mono', monospace;
    font-size: 17px; font-weight: 500;
    padding: 5px 12px;
    border-radius: 8px;
    background: rgba(29,158,117,0.12);
    border: 0.5px solid rgba(29,158,117,0.3);
    color: #1D9E75;
    letter-spacing: 1px;
    transition: all 0.3s;
    flex-shrink: 0;
  }
  .ep-timer.warn {
    background: rgba(239,159,39,0.12);
    border-color: rgba(239,159,39,0.35);
    color: #EF9F27;
  }
  .ep-timer.danger {
    background: rgba(226,75,74,0.15);
    border-color: rgba(226,75,74,0.4);
    color: #E24B4A;
    animation: ep-pulse 1s ease-in-out infinite;
  }
  .ep-timer.infinite {
    background: rgba(83,74,183,0.12);
    border-color: rgba(83,74,183,0.3);
    color: #AFA9EC;
  }
  @keyframes ep-pulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  /* ── Body layout ── */
  .ep-body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  /* ── Main ── */
  .ep-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px 28px;
    overflow-y: auto;
    gap: 18px;
  }

  /* progress bar */
  .ep-progress-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ep-q-label {
    font-size: 12px; font-weight: 600;
    color: rgba(175,169,236,0.6);
    text-transform: uppercase; letter-spacing: 0.8px;
    white-space: nowrap;
  }
  .ep-progress-bar {
    flex: 1; height: 3px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .ep-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #534AB7, #7F77DD);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* question card */
  .ep-q-card {
    background: #131825;
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 22px;
    position: relative;
    overflow: hidden;
  }
  .ep-q-card-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(83,74,183,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(83,74,183,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .ep-q-number-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(83,74,183,0.15);
    border: 0.5px solid rgba(83,74,183,0.3);
    color: #AFA9EC;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.6px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 20px;
    margin-bottom: 12px;
  }
  .ep-q-text {
    font-size: 15px; line-height: 1.65;
    color: #e8eaf0;
    white-space: pre-wrap;
    position: relative; z-index: 1;
  }

  /* options */
  .ep-options { display: flex; flex-direction: column; gap: 9px; }
  .ep-option {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.03);
    border: 0.5px solid rgba(255,255,255,0.08);
    border-radius: 11px;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.18s;
    text-align: left; width: 100%;
    font-family: 'DM Sans', sans-serif;
  }
  .ep-option:hover:not(.ep-option-selected) {
    border-color: rgba(83,74,183,0.4);
    background: rgba(83,74,183,0.06);
  }
  .ep-option-selected {
    background: rgba(83,74,183,0.15);
    border-color: rgba(83,74,183,0.5);
  }
  .ep-opt-key {
    width: 28px; height: 28px;
    border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 700;
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.4);
    transition: all 0.18s;
  }
  .ep-option-selected .ep-opt-key {
    background: #534AB7; color: #fff;
  }
  .ep-opt-text {
    font-size: 14px; color: rgba(232,234,240,0.8);
    line-height: 1.5;
    transition: color 0.18s;
  }
  .ep-option-selected .ep-opt-text { color: #fff; }

  /* action row */
  .ep-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 2px;
    flex-wrap: wrap;
  }
  .ep-actions-left { display: flex; gap: 8px; }
  .ep-actions-right { display: flex; gap: 8px; }

  .ep-btn {
    padding: 9px 18px;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer; border: none;
    transition: all 0.18s;
    white-space: nowrap;
  }
  .ep-btn-ghost {
    background: rgba(255,255,255,0.05);
    border: 0.5px solid rgba(255,255,255,0.1);
    color: rgba(232,234,240,0.65);
  }
  .ep-btn-ghost:hover { background: rgba(255,255,255,0.09); color: #fff; }
  .ep-btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; }

  .ep-btn-mark {
    background: rgba(239,159,39,0.1);
    border: 0.5px solid rgba(239,159,39,0.3);
    color: #EF9F27;
  }
  .ep-btn-mark:hover { background: rgba(239,159,39,0.18); }
  .ep-btn-mark.active {
    background: rgba(239,159,39,0.2);
    border-color: rgba(239,159,39,0.5);
  }

  .ep-btn-primary {
    background: #534AB7; color: #fff;
    box-shadow: 0 4px 14px rgba(83,74,183,0.3);
  }
  .ep-btn-primary:hover { background: #6259c9; }
  .ep-btn-primary:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }

  /* ── Sidebar (desktop) ── */
  .ep-sidebar {
    width: 260px;
    background: #111520;
    border-left: 0.5px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }
  .ep-sidebar-head {
    padding: 18px 18px 14px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
  }
  .ep-sidebar-title {
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 12px;
  }
  .ep-stat-row {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 6px;
  }
  .ep-stat-pill {
    border-radius: 8px; padding: 7px 6px;
    text-align: center;
  }
  .ep-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
  }
  .ep-stat-lbl {
    font-size: 10px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.4px;
    margin-top: 2px;
  }
  .ep-stat-ans { background: rgba(29,158,117,0.12); border: 0.5px solid rgba(29,158,117,0.2); }
  .ep-stat-ans .ep-stat-num { color: #1D9E75; }
  .ep-stat-ans .ep-stat-lbl { color: rgba(29,158,117,0.7); }
  .ep-stat-mrk { background: rgba(239,159,39,0.1); border: 0.5px solid rgba(239,159,39,0.2); }
  .ep-stat-mrk .ep-stat-num { color: #EF9F27; }
  .ep-stat-mrk .ep-stat-lbl { color: rgba(239,159,39,0.7); }
  .ep-stat-rem { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.07); }
  .ep-stat-rem .ep-stat-num { color: rgba(255,255,255,0.5); }
  .ep-stat-rem .ep-stat-lbl { color: rgba(255,255,255,0.3); }

  /* palette grid */
  .ep-palette {
    flex: 1; overflow-y: auto;
    padding: 14px 18px;
  }
  .ep-palette::-webkit-scrollbar { width: 4px; }
  .ep-palette::-webkit-scrollbar-track { background: transparent; }
  .ep-palette::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

  .ep-palette-grid {
    display: grid; grid-template-columns: repeat(5,1fr);
    gap: 6px;
  }
  .ep-pq {
    height: 34px; border-radius: 7px;
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700;
    cursor: pointer; border: none;
    transition: all 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .ep-pq-idle { background: rgba(255,255,255,0.05); border: 0.5px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.35); }
  .ep-pq-idle:hover { border-color: rgba(83,74,183,0.4); color: #AFA9EC; background: rgba(83,74,183,0.08); }
  .ep-pq-ans { background: rgba(29,158,117,0.2); border: 0.5px solid rgba(29,158,117,0.35); color: #1D9E75; }
  .ep-pq-mrk { background: rgba(239,159,39,0.2); border: 0.5px solid rgba(239,159,39,0.35); color: #EF9F27; }
  .ep-pq-curr { box-shadow: 0 0 0 2px #534AB7; background: rgba(83,74,183,0.2) !important; color: #fff !important; border-color: transparent !important; }

  /* legend */
  .ep-legend {
    padding: 12px 18px;
    border-top: 0.5px solid rgba(255,255,255,0.06);
    display: flex; flex-direction: column; gap: 6px;
  }
  .ep-legend-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: rgba(232,234,240,0.5);
  }
  .ep-legend-dot {
    width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0;
  }

  /* submit footer */
  .ep-submit-area {
    padding: 14px 18px;
    border-top: 0.5px solid rgba(255,255,255,0.06);
  }
  .ep-submit-btn {
    width: 100%; padding: 11px;
    border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    background: #1D9E75; color: #fff;
    box-shadow: 0 4px 16px rgba(29,158,117,0.3);
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }
  .ep-submit-btn:hover { background: #22b586; box-shadow: 0 6px 20px rgba(29,158,117,0.4); transform: translateY(-1px); }

  /* ── Mobile palette FAB + drawer ── */
  .ep-palette-fab {
    display: none;
    position: fixed;
    bottom: 80px; right: 16px;
    width: 52px; height: 52px;
    border-radius: 14px;
    background: #534AB7;
    border: none; cursor: pointer;
    box-shadow: 0 4px 20px rgba(83,74,183,0.5);
    z-index: 50;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2px;
    transition: transform 0.2s;
  }
  .ep-palette-fab:active { transform: scale(0.94); }
  .ep-palette-fab-num {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; color: #fff; line-height: 1;
  }
  .ep-palette-fab-lbl {
    font-size: 9px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.5px;
  }

  /* mobile submit bar */
  .ep-mobile-submit {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #111520;
    border-top: 0.5px solid rgba(255,255,255,0.07);
    padding: 10px 16px;
    z-index: 40;
  }
  .ep-mobile-submit .ep-submit-btn { margin: 0; }

  /* drawer overlay */
  .ep-drawer-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 60;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
  }
  .ep-drawer-overlay.open { display: block; }

  /* drawer panel */
  .ep-drawer {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 70;
    background: #111520;
    border-top: 0.5px solid rgba(255,255,255,0.1);
    border-radius: 16px 16px 0 0;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    max-height: 85vh;
    display: flex; flex-direction: column;
  }
  .ep-drawer.open { transform: translateY(0); }
  .ep-drawer-handle {
    width: 36px; height: 4px; border-radius: 2px;
    background: rgba(255,255,255,0.15);
    margin: 12px auto 0;
    flex-shrink: 0;
  }
  .ep-drawer-head {
    padding: 14px 18px 12px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .ep-drawer-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700; color: #fff;
    margin-bottom: 10px;
  }
  .ep-drawer-body {
    overflow-y: auto; flex: 1;
    padding: 14px 18px;
  }
  .ep-drawer-palette-grid {
    display: grid; grid-template-columns: repeat(8,1fr);
    gap: 6px;
    margin-bottom: 16px;
  }
  .ep-drawer-legend {
    display: flex; flex-wrap: wrap; gap: 10px;
    padding-top: 10px;
    border-top: 0.5px solid rgba(255,255,255,0.06);
    margin-bottom: 14px;
  }
  .ep-drawer-submit {
    width: 100%; padding: 13px;
    border-radius: 11px; border: none; cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    background: #1D9E75; color: #fff;
    box-shadow: 0 4px 16px rgba(29,158,117,0.3);
    margin-bottom: 8px;
  }

  /* ── Modal ── */
  .ep-modal-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .ep-modal {
    background: #131825;
    border: 0.5px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 28px;
    max-width: 400px; width: 100%;
    position: relative; overflow: hidden;
  }
  .ep-modal-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(83,74,183,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(83,74,183,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .ep-modal-inner { position: relative; z-index: 1; }
  .ep-modal h3 {
    font-family: 'Syne', sans-serif;
    font-size: 19px; font-weight: 800;
    color: #fff; margin-bottom: 6px;
  }
  .ep-modal p {
    font-size: 13px; color: rgba(232,234,240,0.6);
    line-height: 1.6; margin-bottom: 18px;
  }
  .ep-modal-stats {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 8px; margin-bottom: 20px;
  }
  .ep-modal-stat { border-radius: 10px; padding: 11px; text-align: center; }
  .ep-modal-stat-num { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; }
  .ep-modal-stat-lbl { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 3px; }
  .ep-modal-btns { display: flex; gap: 10px; }
  .ep-modal-cancel {
    flex: 1; padding: 11px;
    border-radius: 10px; border: 0.5px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.18s;
  }
  .ep-modal-cancel:hover { background: rgba(255,255,255,0.09); color: #fff; }
  .ep-modal-confirm {
    flex: 1; padding: 11px;
    border-radius: 10px; border: none;
    background: #1D9E75; color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.18s;
    box-shadow: 0 4px 14px rgba(29,158,117,0.3);
  }
  .ep-modal-confirm:hover { background: #22b586; }
  .ep-modal-confirm:disabled { opacity: 0.5; cursor: not-allowed; }

  /* loading */
  .ep-center {
    min-height: 100vh;
    background: #0b0f1a;
    display: flex; align-items: center; justify-content: center;
  }
  .ep-loader { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .ep-spinner {
    width: 36px; height: 36px;
    border: 2px solid rgba(83,74,183,0.2);
    border-top-color: #534AB7;
    border-radius: 50%;
    animation: ep-spin 0.8s linear infinite;
  }
  @keyframes ep-spin { to { transform: rotate(360deg); } }
  .ep-loader p { font-family: 'DM Sans', sans-serif; font-size: 14px; color: rgba(175,169,236,0.6); }

  /* ══════════════════════════════════
     MOBILE — ≤ 768px
  ══════════════════════════════════ */
  @media (max-width: 768px) {
    /* topbar: hide absolute title, reduce padding */
    .ep-topbar { padding: 0 14px; height: 52px; }
    .ep-title { display: none; }
    .ep-timer { font-size: 15px; padding: 4px 10px; letter-spacing: 0.5px; }

    /* hide desktop sidebar */
    .ep-sidebar { display: none; }

    /* show mobile FAB + submit bar */
    .ep-palette-fab { display: flex; }
    .ep-mobile-submit { display: block; }

    /* main: less padding, add bottom space for submit bar */
    .ep-main { padding: 14px 14px 90px; gap: 14px; }

    /* question card */
    .ep-q-card { padding: 16px; }
    .ep-q-text { font-size: 14px; }

    /* options */
    .ep-option { padding: 11px 13px; gap: 10px; }
    .ep-opt-text { font-size: 13px; }

    /* actions — stack into 2 rows */
    .ep-actions { flex-direction: column; align-items: stretch; gap: 8px; }
    .ep-actions-left { justify-content: stretch; }
    .ep-actions-right { justify-content: stretch; }
    .ep-actions-left .ep-btn,
    .ep-actions-right .ep-btn { flex: 1; text-align: center; justify-content: center; display: flex; align-items: center; }
  }

  /* ══════════════════════════════════
     SMALL — ≤ 380px
  ══════════════════════════════════ */
  @media (max-width: 380px) {
    .ep-drawer-palette-grid { grid-template-columns: repeat(6,1fr); }
    .ep-brand { font-size: 15px; }
  }
`;

export default function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const store = useExamStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const startRequested = useRef(false);

  useEffect(() => {
    const loadExam = async () => {
      try {
        const res = await api.get(`/exams/${examId}`);
        const examData = res.data;
        if (examData.status === "PENDING") {
          if (startRequested.current) return;
          startRequested.current = true;
          await api.post(`/exams/${examId}/start`);
          const startedRes = await api.get(`/exams/${examId}`);
          store.setExam(startedRes.data);
        } else if (examData.status === "SUBMITTED") {
          navigate(`/result/${examData.attempt.id}`);
        } else {
          store.setExam(examData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (examId) loadExam();
    return () => { store.clearStore(); };
  }, [examId, navigate]);

  useEffect(() => {
    if (store.timeRemaining === null || store.exam?.status === "SUBMITTED") return;
    const interval = setInterval(() => {
      if (store.timeRemaining! <= 0) {
        clearInterval(interval);
        store.submitExam().then(() => navigate(`/result/${store.exam?.attempt?.id}`));
      } else {
        store.decrementTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [store.timeRemaining, store.exam?.status, examId, navigate]);

  useEffect(() => {
    if (!store.exam || store.exam.status === "SUBMITTED") return;
    const interval = setInterval(() => { store.autoSave(); }, 15000);
    return () => clearInterval(interval);
  }, [store.exam]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (store.exam && store.exam.status === "ACTIVE") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [store.exam]);

  // close drawer on navigate to question
  const navigateAndClose = (idx: number) => {
    store.navigate(idx);
    setDrawerOpen(false);
  };

  if (!store.exam) {
    return (
      <>
        <style>{styles}</style>
        <div className="ep-center">
          <div className="ep-loader">
            <div className="ep-spinner" />
            <p>Loading exam…</p>
          </div>
        </div>
      </>
    );
  }

  if (store.exam.status === "SUBMITTED") {
    return (
      <>
        <style>{styles}</style>
        <div className="ep-center">
          <div className="ep-loader">
            <div className="ep-spinner" />
            <p>Redirecting to results…</p>
          </div>
        </div>
      </>
    );
  }

  const currentQ = store.exam.questions[store.currentIndex];
  const answered = store.answers[currentQ.id];
  const isMarked = store.markedForReview.has(currentQ.id);
  const totalQ = store.exam.totalQuestions;
  const answeredCount = Object.keys(store.answers).length;
  const markedCount = store.markedForReview.size;
  const remaining = totalQ - answeredCount;
  const progress = ((store.currentIndex + 1) / totalQ) * 100;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const timerClass =
    store.timeRemaining === null ? "ep-timer infinite"
    : store.timeRemaining < 120 ? "ep-timer danger"
    : store.timeRemaining < 600 ? "ep-timer warn"
    : "ep-timer";

  const PaletteGrid = ({ cols, onNav }: { cols: number; onNav: (i: number) => void }) => (
    <div className="ep-palette-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {store.exam!.questions.map((q, idx) => {
        const isAns = !!store.answers[q.id];
        const isMrk = store.markedForReview.has(q.id);
        const isCurr = store.currentIndex === idx;
        let cls = "ep-pq ep-pq-idle";
        if (isMrk) cls = "ep-pq ep-pq-mrk";
        else if (isAns) cls = "ep-pq ep-pq-ans";
        if (isCurr) cls += " ep-pq-curr";
        return (
          <button key={q.id} className={cls} onClick={() => onNav(idx)}>
            {idx + 1}
          </button>
        );
      })}
    </div>
  );

  const StatRow = () => (
    <div className="ep-stat-row">
      <div className="ep-stat-pill ep-stat-ans">
        <div className="ep-stat-num">{answeredCount}</div>
        <div className="ep-stat-lbl">Done</div>
      </div>
      <div className="ep-stat-pill ep-stat-mrk">
        <div className="ep-stat-num">{markedCount}</div>
        <div className="ep-stat-lbl">Marked</div>
      </div>
      <div className="ep-stat-pill ep-stat-rem">
        <div className="ep-stat-num">{remaining}</div>
        <div className="ep-stat-lbl">Left</div>
      </div>
    </div>
  );

  const LegendItems = () => (
    <>
      <div className="ep-legend-row">
        <div className="ep-legend-dot" style={{ background: "rgba(29,158,117,0.5)", border: "0.5px solid #1D9E75" }} />
        Answered
      </div>
      <div className="ep-legend-row">
        <div className="ep-legend-dot" style={{ background: "rgba(239,159,39,0.4)", border: "0.5px solid #EF9F27" }} />
        Marked
      </div>
      <div className="ep-legend-row">
        <div className="ep-legend-dot" style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.1)" }} />
        Unanswered
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="ep-root">
        {/* Topbar */}
        <header className="ep-topbar">
          <div className="ep-brand">CET<span>_</span>CELL</div>
          <div className="ep-title">{store.exam.title}</div>
          <div className={timerClass}>
            {store.timeRemaining !== null ? formatTime(store.timeRemaining) : "∞"}
          </div>
        </header>

        <div className="ep-body">
          {/* Main */}
          <main className="ep-main">
            <div className="ep-progress-row">
              <span className="ep-q-label">Q {store.currentIndex + 1} / {totalQ}</span>
              <div className="ep-progress-bar">
                <div className="ep-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="ep-q-card">
              <div className="ep-q-card-grid" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="ep-q-number-badge">Question {store.currentIndex + 1}</div>
                <p className="ep-q-text">{currentQ.questionText}</p>
              </div>
            </div>

            <div className="ep-options">
              {(["A", "B", "C", "D"] as const).map((opt) => {
                const text = currentQ[`option${opt}` as keyof typeof currentQ];
                const isSelected = answered === opt;
                return (
                  <button
                    key={opt}
                    className={`ep-option ${isSelected ? "ep-option-selected" : ""}`}
                    onClick={() => store.setAnswer(currentQ.id, opt)}
                  >
                    <span className="ep-opt-key">{opt}</span>
                    <span className="ep-opt-text">{String(text)}</span>
                  </button>
                );
              })}
            </div>

            <div className="ep-actions">
              <div className="ep-actions-left">
                <button
                  className={`ep-btn ep-btn-mark ${isMarked ? "active" : ""}`}
                  onClick={() => store.toggleMark(currentQ.id)}
                >
                  {isMarked ? "★ Marked" : "☆ Mark"}
                </button>
                <button
                  className="ep-btn ep-btn-ghost"
                  onClick={() => store.clearResponse(currentQ.id)}
                  disabled={!answered}
                >
                  Clear
                </button>
              </div>
              <div className="ep-actions-right">
                <button
                  className="ep-btn ep-btn-ghost"
                  onClick={() => store.navigate(store.currentIndex - 1)}
                  disabled={store.currentIndex === 0}
                >
                  ← Prev
                </button>
                <button
                  className="ep-btn ep-btn-primary"
                  onClick={() => store.navigate(store.currentIndex + 1)}
                  disabled={store.currentIndex === totalQ - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          </main>

          {/* Desktop Sidebar */}
          <aside className="ep-sidebar">
            <div className="ep-sidebar-head">
              <div className="ep-sidebar-title">Question Palette</div>
              <StatRow />
            </div>
            <div className="ep-palette">
              <PaletteGrid cols={5} onNav={(i) => store.navigate(i)} />
            </div>
            <div className="ep-legend">
              <LegendItems />
            </div>
            <div className="ep-submit-area">
              <button className="ep-submit-btn" onClick={() => setShowConfirm(true)}>
                Submit Exam
              </button>
            </div>
          </aside>
        </div>

        {/* Mobile: FAB to open palette drawer */}
        <button className="ep-palette-fab" onClick={() => setDrawerOpen(true)}>
          <span className="ep-palette-fab-num">{answeredCount}</span>
          <span className="ep-palette-fab-lbl">done</span>
        </button>

        {/* Mobile: fixed submit bar */}
        <div className="ep-mobile-submit">
          <button className="ep-submit-btn" onClick={() => setShowConfirm(true)}>
            Submit Exam
          </button>
        </div>

        {/* Mobile: palette drawer */}
        <div
          className={`ep-drawer-overlay${drawerOpen ? " open" : ""}`}
          onClick={() => setDrawerOpen(false)}
        />
        <div className={`ep-drawer${drawerOpen ? " open" : ""}`}>
          <div className="ep-drawer-handle" />
          <div className="ep-drawer-head">
            <div className="ep-drawer-title">Question Palette</div>
            <StatRow />
          </div>
          <div className="ep-drawer-body">
            <PaletteGrid cols={8} onNav={navigateAndClose} />
            <div className="ep-drawer-legend">
              <LegendItems />
            </div>
            <button className="ep-drawer-submit" onClick={() => { setDrawerOpen(false); setShowConfirm(true); }}>
              Submit Exam
            </button>
          </div>
        </div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className="ep-modal-overlay">
            <div className="ep-modal">
              <div className="ep-modal-grid" />
              <div className="ep-modal-inner">
                <h3>Submit Exam?</h3>
                <p>You cannot change answers after submission.</p>
                <div className="ep-modal-stats">
                  <div className="ep-modal-stat ep-stat-ans">
                    <div className="ep-modal-stat-num" style={{ color: "#1D9E75" }}>{answeredCount}</div>
                    <div className="ep-modal-stat-lbl" style={{ color: "rgba(29,158,117,0.7)" }}>Answered</div>
                  </div>
                  <div className="ep-modal-stat ep-stat-mrk">
                    <div className="ep-modal-stat-num" style={{ color: "#EF9F27" }}>{markedCount}</div>
                    <div className="ep-modal-stat-lbl" style={{ color: "rgba(239,159,39,0.7)" }}>Marked</div>
                  </div>
                  <div className="ep-modal-stat ep-stat-rem">
                    <div className="ep-modal-stat-num" style={{ color: "rgba(255,255,255,0.5)" }}>{remaining}</div>
                    <div className="ep-modal-stat-lbl" style={{ color: "rgba(255,255,255,0.3)" }}>Unanswered</div>
                  </div>
                </div>
                <div className="ep-modal-btns">
                  <button className="ep-modal-cancel" onClick={() => setShowConfirm(false)} disabled={store.isLoading}>
                    Cancel
                  </button>
                  <button
                    className="ep-modal-confirm"
                    disabled={store.isLoading}
                    onClick={async () => {
                      await store.submitExam();
                      navigate(`/result/${store.exam?.attempt?.id}`);
                    }}
                  >
                    {store.isLoading ? "Submitting…" : "Confirm →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}