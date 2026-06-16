import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch {
      // Error handled by store
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

        .lp-root {
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
        .lp-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(83,74,183,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(83,74,183,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .lp-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(83,74,183,0.18) 0%, transparent 70%);
          top: -120px;
          right: -120px;
          pointer-events: none;
        }
        .lp-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          backdrop-filter: blur(12px);
        }
        .lp-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }
        .lp-logo {
          width: 36px;
          height: 36px;
          background: #534AB7;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .lp-brandname {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .lp-brandname span { color: #7F77DD; }
        .lp-tag {
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
        .lp-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
        }
        .lp-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin: 0 0 2rem;
        }
        .lp-error {
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
        .lp-field { margin-bottom: 1.25rem; }
        .lp-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .lp-input {
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
        .lp-input::placeholder { color: rgba(255,255,255,0.2); }
        .lp-input:focus { border-color: #534AB7; }
        .lp-btn {
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
        .lp-btn:hover { background: #6158c9; }
        .lp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .lp-divider {
          border: none;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          margin: 1.5rem 0;
        }
        .lp-footer {
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .lp-footer a {
          color: #7F77DD;
          text-decoration: none;
          font-weight: 500;
        }
        .lp-footer a:hover { color: #AFA9EC; }
        .lp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes lp-spin { to { transform: rotate(360deg); } }


        .lp-google-btn {
          width: 100%;
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1rem;
          text-decoration: none;
        }
        .lp-google-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }
        .lp-or-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 1rem;
        }
        .lp-or-divider::before,
        .lp-or-divider::after {
          content: '';
          flex: 1;
          border-top: 0.5px solid rgba(255,255,255,0.08);
        }
        .lp-or-text {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }
        /* ── MOBILE ── */
        @media (max-width: 480px) {
          .lp-root { padding: 1.25rem 1rem; align-items: flex-start; padding-top: 2rem; }
          .lp-card {
            padding: 1.75rem 1.25rem;
            border-radius: 16px;
          }
          .lp-title { font-size: 22px; }
          .lp-sub { font-size: 13px; margin-bottom: 1.5rem; }
          .lp-brand { margin-bottom: 1.5rem; }
          .lp-input { font-size: 16px; /* prevent iOS zoom */ padding: 11px 13px; }
          .lp-btn { font-size: 14px; padding: 12px; }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-grid" />
        <div className="lp-glow" />

        <div className="lp-card">
          {/* Brand */}
          <div className="lp-brand">
            <div className="lp-logo">
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="lp-brandname">CET<span>_CELL</span></div>
          </div>

          <div className="lp-tag">MHT-CET Prep</div>
          <h1 className="lp-title">Welcome back</h1>
          <p className="lp-sub">Sign in to continue your preparation</p>


          {/* Google Login */}
          <a
            href={`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/oauth2/authorization/google`}
            className="lp-google-btn"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.48-1.63.8-2.7.8-2.08 0-3.84-1.4-4.47-3.29H1.85v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.51 10.56A4.8 4.8 0 0 1 4.26 9c0-.54.1-1.06.25-1.56V5.37H1.85A8 8 0 0 0 .98 9c0 1.29.31 2.51.87 3.63l2.66-2.07z"/>
              <path fill="#EA4335" d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 8.98 1a8 8 0 0 0-7.13 4.37l2.66 2.07c.63-1.89 2.39-3.29 4.47-3.29z"/>
            </svg>
            Continue with Google
          </a>
          <div className="lp-or-divider"><span className="lp-or-text">or sign in with email</span></div>
          {/* Error */}
          {error && (
            <div className="lp-error">
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
            <div className="lp-field">
              <label className="lp-label" htmlFor="lp-email">Email</label>
              <input
                id="lp-email"
                className="lp-input"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="lp-field">
              <label className="lp-label" htmlFor="lp-pass">Password</label>
              <input
                id="lp-pass"
                className="lp-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="lp-btn" disabled={isLoading}>
              {isLoading ? (
                <><span className="lp-spinner" />Signing in…</>
              ) : "Sign in"}
            </button>
          </form>

          <hr className="lp-divider" />
          <p className="lp-footer">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
}