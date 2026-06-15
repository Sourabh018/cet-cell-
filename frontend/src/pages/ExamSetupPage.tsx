import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { Subject, Topic } from "../types";

export default function ExamSetupPage() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedClass) {
      api.get<Subject[]>(`/subjects/class/${selectedClass}`)
        .then(res => setSubjects(res.data))
        .catch(console.error);
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSubject && selectedClass) {
      api.get<Topic[]>(`/topics/subject/${selectedSubject}/class/${selectedClass}`)
        .then(res => setTopics(res.data))
        .catch(console.error);
    } else {
      setTopics([]);
    }
  }, [selectedSubject, selectedClass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !selectedTopic) {
      setError("Select subject and topic to continue.");
      return;
    }
    setError("");
    const subjectName = subjects.find(s => s.id === selectedSubject)?.name || "";
    const topicName = topics.find(t => t.id === selectedTopic)?.name || "";
    navigate(`/exam/instructions?subjectId=${selectedSubject}&topicId=${selectedTopic}`, {
      state: { subjectName, topicName },
    });
  };

  const step = !selectedClass ? 1 : !selectedSubject ? 2 : !selectedTopic ? 3 : 4;
  const stepLabel = ["Pick class", "Pick subject", "Pick topic", "Ready!"][step - 1];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .esp-wrap {
          min-height: 100vh;
          background: #0b0f1a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'DM Sans', sans-serif;
        }
        .esp-card {
          background: #131825;
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 440px;
          position: relative;
          overflow: hidden;
        }
        .esp-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(83,74,183,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(83,74,183,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .esp-inner { position: relative; z-index: 1; }
        .esp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(83,74,183,0.15);
          border: 0.5px solid rgba(83,74,183,0.35);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 12px; color: #AFA9EC;
          margin-bottom: 1.25rem;
        }
        .esp-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px; font-weight: 700; color: #fff;
          margin: 0 0 0.25rem;
        }
        .esp-sub {
          font-size: 13px; color: rgba(255,255,255,0.4);
          margin: 0 0 1.75rem;
        }
        .esp-steps {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: rgba(255,255,255,0.3);
          margin-bottom: 1.75rem;
        }
        .esp-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.15); flex-shrink: 0;
          transition: background 0.2s;
        }
        .esp-dot.esp-dot-active { background: #534AB7; }
        .esp-line {
          flex: 1; height: 0.5px;
          background: rgba(255,255,255,0.08);
          transition: background 0.2s;
        }
        .esp-line.esp-line-done { background: #534AB7; }
        .esp-error {
          background: rgba(226,75,74,0.1);
          border: 0.5px solid rgba(226,75,74,0.4);
          border-radius: 8px; padding: 0.6rem 0.9rem;
          color: #E24B4A; font-size: 13px;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 6px;
        }
        .esp-field { margin-bottom: 1.25rem; }
        .esp-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase; letter-spacing: 0.07em;
          margin-bottom: 0.45rem;
        }
        .esp-select {
          width: 100%;
          background: #0b0f1a;
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0.65rem 2.2rem 0.65rem 1rem;
          color: #fff; font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .esp-select:focus {
          outline: none;
          border-color: rgba(83,74,183,0.7);
          box-shadow: 0 0 0 3px rgba(83,74,183,0.12);
        }
        .esp-select:disabled { opacity: 0.35; cursor: not-allowed; }
        .esp-select option { background: #131825; }
        .esp-divider { height: 0.5px; background: rgba(255,255,255,0.06); margin: 1.5rem 0; }
        .esp-btn {
          width: 100%; padding: 0.8rem 1rem;
          background: #534AB7; border: none; border-radius: 10px;
          color: #fff; font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.15s, transform 0.1s;
        }
        .esp-btn:hover:not(:disabled) { background: #6158c9; }
        .esp-btn:active:not(:disabled) { transform: scale(0.98); }
        .esp-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .esp-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          cursor: pointer; padding: 0; margin-bottom: 1.75rem;
          transition: color 0.15s;
        }
        .esp-back:hover { color: rgba(255,255,255,0.7); }
        .esp-back-arrow {
          width: 26px; height: 26px; border-radius: 8px;
          border: 0.5px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; transition: border-color 0.15s, background 0.15s;
        }
        .esp-back:hover .esp-back-arrow {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
        }

        /* ── Mobile tweaks ── */
        @media (max-width: 480px) {
          .esp-wrap { padding: 1rem 0.75rem; align-items: flex-start; padding-top: 1.5rem; }
          .esp-card { padding: 1.75rem 1.25rem; border-radius: 12px; }
          .esp-title { font-size: 19px; }
          .esp-select { font-size: 15px; padding: 0.7rem 2.2rem 0.7rem 0.9rem; }
          .esp-btn { font-size: 14px; padding: 0.85rem 1rem; }
        }
      `}</style>

      <div className="esp-wrap">
        <div className="esp-card">
          <div className="esp-grid-bg" />
          <div className="esp-inner">
            <button className="esp-back" onClick={() => navigate("/dashboard")}>
              <span className="esp-back-arrow">←</span>
              Dashboard
            </button>
            <div className="esp-badge">✦ New Exam</div>
            <h1 className="esp-title">Choose Your Topic</h1>
            <p className="esp-sub">Select class, subject, and chapter to begin</p>

            <div className="esp-steps">
              <div className={`esp-dot ${step >= 1 ? "esp-dot-active" : ""}`} />
              <div className={`esp-line ${step >= 2 ? "esp-line-done" : ""}`} />
              <div className={`esp-dot ${step >= 2 ? "esp-dot-active" : ""}`} />
              <div className={`esp-line ${step >= 3 ? "esp-line-done" : ""}`} />
              <div className={`esp-dot ${step >= 3 ? "esp-dot-active" : ""}`} />
              <div className={`esp-line ${step >= 4 ? "esp-line-done" : ""}`} />
              <div className={`esp-dot ${step >= 4 ? "esp-dot-active" : ""}`} />
              <span style={{ marginLeft: 4 }}>{stepLabel}</span>
            </div>

            {error && <div className="esp-error">⚠ {error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="esp-field">
                <label className="esp-label">Class Level</label>
                <select
                  className="esp-select"
                  value={selectedClass}
                  onChange={e => {
                    setSelectedClass(e.target.value);
                    setSelectedSubject("");
                    setSelectedTopic("");
                  }}
                >
                  <option value="">Select class</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>

              <div className="esp-field">
                <label className="esp-label">Subject</label>
                <select
                  className="esp-select"
                  value={selectedSubject}
                  disabled={!selectedClass}
                  onChange={e => {
                    setSelectedSubject(e.target.value);
                    setSelectedTopic("");
                  }}
                >
                  <option value="">{selectedClass ? "Select a subject" : "Select class first"}</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="esp-field">
                <label className="esp-label">Topic / Chapter</label>
                <select
                  className="esp-select"
                  value={selectedTopic}
                  disabled={!selectedSubject}
                  onChange={e => setSelectedTopic(e.target.value)}
                >
                  <option value="">{selectedSubject ? "Select a topic" : "Select subject first"}</option>
                  {topics.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="esp-divider" />

              <button
                type="submit"
                className="esp-btn"
                disabled={!selectedSubject || !selectedTopic}
              >
                Continue to Instructions →
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}