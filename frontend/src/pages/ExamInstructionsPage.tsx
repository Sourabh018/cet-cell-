import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExamService } from "../services/ExamService";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .eip-root {
    min-height: 100vh;
    background-color: #0b0f1a;
    font-family: 'DM Sans', sans-serif;
    color: #e8eaf0;
    overflow-x: hidden;
  }

  .eip-nav {
    position: sticky; top: 0; z-index: 50;
    background: #111520;
    border-bottom: 0.5px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; height: 58px;
  }
  .eip-nav-brand { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
  .eip-nav-brand span { color: #7F77DD; }
  .eip-nav-right { display: flex; align-items: center; gap: 12px; }
  .eip-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: rgba(83,74,183,0.25); border: 1.5px solid rgba(83,74,183,0.4);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #AFA9EC;
  }
  .eip-signout {
    background: none; border: none; cursor: pointer;
    font-size: 13px; font-family: 'DM Sans', sans-serif;
    color: rgba(175,169,236,0.6); transition: color 0.2s;
  }
  .eip-signout:hover { color: #E24B4A; }

  .eip-page { max-width: 780px; margin: 0 auto; padding: 32px 20px 60px; }

  .eip-back {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: 0.5px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 7px 14px; cursor: pointer;
    color: rgba(175,169,236,0.7); font-family: 'DM Sans', sans-serif; font-size: 13px;
    transition: all 0.2s; margin-bottom: 28px;
  }
  .eip-back:hover { color: #fff; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

  .eip-steps { display: flex; align-items: center; margin-bottom: 32px; }
  .eip-step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; font-family: 'Syne', sans-serif; flex-shrink: 0;
  }
  .eip-step-dot.done { background: #534AB7; color: #fff; }
  .eip-step-dot.active { background: #534AB7; color: #fff; box-shadow: 0 0 0 3px rgba(83,74,183,0.25); }
  .eip-step-dot.idle { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); }
  .eip-step-line { flex: 1; height: 2px; background: rgba(255,255,255,0.08); }
  .eip-step-line.done { background: #534AB7; }
  .eip-step-labels { display: flex; justify-content: space-between; margin-bottom: 32px; margin-top: -4px; }
  .eip-step-label { font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 500; flex: 1; text-align: center; }
  .eip-step-label:first-child { text-align: left; }
  .eip-step-label:last-child { text-align: right; }
  .eip-step-label.active { color: #AFA9EC; }

  .eip-card { background: #131825; border: 0.5px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; position: relative; }
  .eip-grid-bg {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image: linear-gradient(rgba(83,74,183,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(83,74,183,0.07) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .eip-card-inner { position: relative; z-index: 1; }

  .eip-header {
    padding: 24px 28px 20px;
    border-bottom: 0.5px solid rgba(255,255,255,0.06);
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  }
  .eip-header-text h1 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 5px; }
  .eip-header-text p { font-size: 13px; color: rgba(175,169,236,0.7); margin: 0; }
  .eip-badge-chip {
    flex-shrink: 0; background: rgba(83,74,183,0.15); border: 0.5px solid rgba(83,74,183,0.35);
    color: #AFA9EC; font-size: 11px; font-weight: 600; letter-spacing: 0.6px;
    text-transform: uppercase; padding: 5px 12px; border-radius: 20px; white-space: nowrap;
    align-self: flex-start;
  }

  .eip-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.04); border-bottom: 0.5px solid rgba(255,255,255,0.06); }
  .eip-meta-cell { background: #131825; padding: 16px; text-align: center; }
  .eip-meta-label { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 4px; }
  .eip-meta-value { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; }

  .eip-body { padding: 24px 28px; }
  .eip-section-title { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }

  .eip-instructions { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .eip-instr-row {
    display: flex; align-items: flex-start; gap: 12px;
    background: rgba(255,255,255,0.03); border: 0.5px solid rgba(255,255,255,0.06);
    border-radius: 10px; padding: 12px 14px; transition: border-color 0.2s;
  }
  .eip-instr-row:hover { border-color: rgba(83,74,183,0.3); }
  .eip-instr-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .eip-instr-text { font-size: 13px; color: rgba(232,234,240,0.8); line-height: 1.55; padding-top: 3px; }

  .eip-error { background: rgba(226,75,74,0.1); border: 0.5px solid rgba(226,75,74,0.35); color: #E24B4A; border-radius: 10px; padding: 12px 16px; font-size: 13px; margin-bottom: 16px; }

  .eip-gate {
    display: flex; align-items: center; gap: 12px;
    background: rgba(83,74,183,0.08); border: 0.5px solid rgba(83,74,183,0.25);
    border-radius: 10px; padding: 13px 15px; margin-bottom: 20px; cursor: pointer;
  }
  .eip-gate input[type="checkbox"] { width: 18px; height: 18px; accent-color: #534AB7; cursor: pointer; flex-shrink: 0; }
  .eip-gate label { font-size: 13px; color: rgba(175,169,236,0.85); cursor: pointer; user-select: none; line-height: 1.5; }

  .eip-cta { width: 100%; padding: 14px; border-radius: 10px; border: none; cursor: pointer; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.3px; transition: all 0.2s; }
  .eip-cta.active { background: #534AB7; color: #fff; box-shadow: 0 6px 24px rgba(83,74,183,0.35); }
  .eip-cta.active:hover { background: #6259c9; box-shadow: 0 8px 28px rgba(83,74,183,0.45); transform: translateY(-1px); }
  .eip-cta.disabled { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.25); cursor: not-allowed; }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .eip-nav { padding: 0 16px; height: 52px; }
    .eip-nav-brand { font-size: 16px; }
    .eip-page { padding: 20px 14px 48px; }
    .eip-back { margin-bottom: 20px; }
    .eip-steps { margin-bottom: 20px; }
    .eip-step-labels { margin-bottom: 20px; }
    .eip-header { flex-direction: column; padding: 18px 16px 14px; gap: 10px; }
    .eip-header-text h1 { font-size: 17px; }
    .eip-badge-chip { align-self: flex-start; }
    .eip-body { padding: 18px 16px; }
    .eip-meta-cell { padding: 13px 8px; }
    .eip-meta-value { font-size: 13px; }
  }

  @media (max-width: 380px) {
    .eip-step-labels { display: none; }
  }
`;

const INSTRUCTIONS = [
  { icon: "🔄", bg: "rgba(83,74,183,0.15)", text: "Questions drawn fresh from topic bank each session." },
  { icon: "⏳", bg: "rgba(29,158,117,0.15)", text: "60-minute timer starts the moment exam loads. Manage your time." },
  { icon: "⚠️", bg: "rgba(239,159,39,0.15)", text: "Negative marking applies. Wrong answers cost marks." },
  { icon: "🎯", bg: "rgba(83,74,183,0.15)", text: "Attempt all questions. Skipped questions count as unanswered." },
  { icon: "🚫", bg: "rgba(226,75,74,0.15)", text: "Do not switch tabs or windows mid-attempt." },
];

export default function ExamInstructionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subjectId = searchParams.get("subjectId");
  const topicId = searchParams.get("topicId");
  const subjectName = location.state?.subjectName || "Selected Subject";
  const topicName = location.state?.topicName || "Selected Topic";

  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!subjectId || !topicId) { setError("Missing subject or topic. Go back and select again."); return; }
    setIsLoading(true); setError("");
    try {
      const exam = await ExamService.createExam(subjectId, topicId);
      navigate(`/exam/${exam.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create exam.");
      setIsLoading(false);
    }
  };

  const initials = subjectName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <style>{styles}</style>
      <div className="eip-root">
        <nav className="eip-nav">
          <div className="eip-nav-brand">CET<span>_</span>CELL</div>
          <div className="eip-nav-right">
            <div className="eip-avatar">{initials}</div>
            <button className="eip-signout" onClick={() => navigate("/login")}>Sign out</button>
          </div>
        </nav>

        <div className="eip-page">
          <button className="eip-back" onClick={() => navigate("/exam/setup")}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Setup
          </button>

          <div className="eip-steps">
            {["done","done","done","active"].map((state, i) => (
              <>
                {i > 0 && <div className={`eip-step-line${i <= 2 ? " done" : ""}`} />}
                <div key={i} className={`eip-step-dot ${state}`}>{state === "done" ? "✓" : i + 1}</div>
              </>
            ))}
          </div>
          <div className="eip-step-labels">
            <span className="eip-step-label">Class</span>
            <span className="eip-step-label">Subject</span>
            <span className="eip-step-label">Topic</span>
            <span className="eip-step-label active">Instructions</span>
          </div>

          <div className="eip-card">
            <div className="eip-grid-bg" />
            <div className="eip-card-inner">
              <div className="eip-header">
                <div className="eip-header-text">
                  <h1>{topicName}</h1>
                  <p>{subjectName}</p>
                </div>
                <div className="eip-badge-chip">Ready to Start</div>
              </div>

              <div className="eip-meta">
                {[["Questions","Full Bank"],["Marking","Negative"],["Duration","60 min"]].map(([label, value]) => (
                  <div className="eip-meta-cell" key={label}>
                    <div className="eip-meta-label">{label}</div>
                    <div className="eip-meta-value">{value}</div>
                  </div>
                ))}
              </div>

              <div className="eip-body">
                {error && <div className="eip-error">{error}</div>}
                <div className="eip-section-title">Before you begin</div>
                <div className="eip-instructions">
                  {INSTRUCTIONS.map((instr, idx) => (
                    <div className="eip-instr-row" key={idx}>
                      <div className="eip-instr-icon" style={{ background: instr.bg }}>{instr.icon}</div>
                      <div className="eip-instr-text">{instr.text}</div>
                    </div>
                  ))}
                </div>

                <div className="eip-gate" onClick={() => setAccepted(v => !v)}>
                  <input type="checkbox" id="eip-accept" checked={accepted} onChange={e => setAccepted(e.target.checked)} onClick={e => e.stopPropagation()} />
                  <label htmlFor="eip-accept">I've read the instructions and am ready to begin.</label>
                </div>

                <button className={`eip-cta ${accepted && !isLoading ? "active" : "disabled"}`} onClick={handleStart} disabled={!accepted || isLoading}>
                  {isLoading ? "Creating Exam…" : "Start Exam →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}