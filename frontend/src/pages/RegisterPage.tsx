import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }
    setConfirmError("");
    try {
      await register({ name, email, password });
      navigate("/dashboard");
    } catch {
      // Error handled by store
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

        .rp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b0f1a;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }
        .rp-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(83,74,183,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(83,74,183,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .rp-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(83,74,183,0.18) 0%, transparent 70%);
          top: -120px;
          right: -120px;
          pointer-events: none;
        }
        .rp-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          backdrop-filter: blur(12px);
        }
        .rp-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }
        .rp-logo {
          width: 36px;
          height: 36px;
          background: #534AB7;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rp-brandname {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .rp-brandname span { color: #7F77DD; }
        .rp-tag {
          display: inline-block;
          background: rgba(83,74,183,0.2);
          border: 0.5px solid rgba(83,74,183,0.4);
          color: #AFA9EC;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 1.25rem;
          letter-spacing: 0.3px;
        }
        .rp-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
        }
        .rp-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin: 0 0 2rem;
        }
        .rp-error {
          background: rgba(226,75,74,0.12);
          border: 0.5px solid rgba(226,75,74,0.3);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #f09595;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rp-field { margin-bottom: 1.25rem; }
        .rp-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .rp-input {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .rp-input::placeholder { color: rgba(255,255,255,0.2); }
        .rp-input:focus { border-color: #534AB7; }
        .rp-input.rp-input-err { border-color: rgba(226,75,74,0.5); }
        .rp-field-err {
          font-size: 12px;
          color: #E24B4A;
          margin-top: 6px;
        }
        .rp-btn {
          width: 100%;
          padding: 13px;
          background: #534AB7;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 0.5rem;
          letter-spacing: 0.3px;
        }
        .rp-btn:hover { background: #6158c9; }
        .rp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .rp-divider {
          border: none;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          margin: 1.5rem 0;
        }
        .rp-footer {
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .rp-footer a {
          color: #7F77DD;
          text-decoration: none;
          font-weight: 500;
        }
        .rp-footer a:hover { color: #AFA9EC; }
        .rp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rp-spin 0.7s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes rp-spin { to { transform: rotate(360deg); } }

        /* ── MOBILE ── */
        @media (max-width: 480px) {
          .rp-root { padding: 1.25rem 1rem; align-items: flex-start; padding-top: 2rem; }
          .rp-card {
            padding: 1.75rem 1.25rem;
            border-radius: 16px;
          }
          .rp-title { font-size: 22px; }
          .rp-sub { font-size: 13px; margin-bottom: 1.5rem; }
          .rp-brand { margin-bottom: 1.5rem; }
          .rp-field { margin-bottom: 1rem; }
          .rp-input { font-size: 16px; /* prevent iOS zoom */ padding: 11px 13px; }
          .rp-btn { font-size: 14px; padding: 12px; }
        }
      `}</style>

      <div className="rp-root">
        <div className="rp-grid" />
        <div className="rp-glow" />

        <div className="rp-card">
          {/* Brand */}
          <div className="rp-brand">
            <div className="rp-logo">
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="rp-brandname">CET<span>_CELL</span></div>
          </div>

          <div className="rp-tag">MHT-CET Prep</div>
          <h1 className="rp-title">Create account</h1>
          <p className="rp-sub">Start your free CET preparation today</p>

          {/* Store error */}
          {error && (
            <div className="rp-error">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span style={{ flex: 1 }}>{error}</span>
              <button onClick={clearError} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f09595', padding: 0, lineHeight: 1 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-name">Full Name</label>
              <input
                id="rp-name"
                className="rp-input"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-email">Email</label>
              <input
                id="rp-email"
                className="rp-input"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-pass">Password</label>
              <input
                id="rp-pass"
                className="rp-input"
                type="password"
                required
                placeholder="Min. 6 characters"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="rp-field">
              <label className="rp-label" htmlFor="rp-confirm">Confirm Password</label>
              <input
                id="rp-confirm"
                className={`rp-input${confirmError ? ' rp-input-err' : ''}`}
                type="password"
                required
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setConfirmError(""); }}
              />
              {confirmError && <div className="rp-field-err">{confirmError}</div>}
            </div>

            <button type="submit" className="rp-btn" disabled={isLoading}>
              {isLoading ? (
                <><span className="rp-spinner" />Creating account…</>
              ) : "Create Account"}
            </button>
          </form>

          <hr className="rp-divider" />
          <p className="rp-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}