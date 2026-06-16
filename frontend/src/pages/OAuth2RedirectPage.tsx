import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function OAuth2RedirectPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");

    if (token && refreshToken) {
      // Decode user info from JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));

      localStorage.setItem("refreshToken", refreshToken);

      setAuth({
        accessToken: token,
        refreshToken,
        user: {
          id: payload.userId || payload.sub,
          name: payload.name || "",
          email: payload.sub,
          role: payload.role || "STUDENT",
        },
      });

      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login?error=oauth_failed", { replace: true });
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0f1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 36, height: 36,
          border: "2px solid rgba(83,74,183,0.2)",
          borderTopColor: "#534AB7",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "rgba(175,169,236,0.6)", fontSize: 14, fontFamily: "DM Sans, sans-serif" }}>
          Signing you in…
        </p>
      </div>
    </div>
  );
}