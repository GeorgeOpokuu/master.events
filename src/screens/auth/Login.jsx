import React, { useState } from "react";
import useStore from "../../store/useStore";

const API = "https://master-events-backend.onrender.com";

const S = {
  wrap: {
    width: "100vw", minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "#f9f7f4", padding: "32px 20px", boxSizing: "border-box",
  },
  card: {
    background: "#fff", borderRadius: 20, border: "1.5px solid #ececec",
    padding: "36px", boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
    width: "100%", boxSizing: "border-box",
  },
  h2:    { fontSize: 22, fontWeight: 900, color: "#111", margin: "0 0 4px" },
  sub:   { color: "#aaa", fontSize: 13, margin: "0 0 24px" },
  label: { display: "block", fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 7 },
  input: {
    width: "100%", padding: "13px 15px", borderRadius: 11,
    border: "1.5px solid #ececec", fontSize: 14, outline: "none",
    background: "#fafafa", boxSizing: "border-box", marginBottom: 16,
    caretColor: "#f5a623", fontFamily: "inherit", color: "#111",
  },
  btn: {
    width: "100%", padding: "14px", borderRadius: 13, fontWeight: 700,
    color: "#fff", fontSize: 15, border: "none", cursor: "pointer",
    background: "linear-gradient(135deg, #f5a623, #e8920f)",
    boxShadow: "0 6px 20px rgba(245,166,35,0.28)", fontFamily: "inherit",
  },
  errBox: {
    background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10,
    padding: "11px 15px", color: "#dc2626", fontSize: 13, marginBottom: 14,
  },
};

function ForgotPassword({ onBack }) {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const handleSend = async () => {
    if (!email) { setError("Please enter your email"); return; }
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${API}/api/auth/forgot-password/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setSent(true);
      else setError(data.error || "Something went wrong");
    } catch { setError("Connection error. Try again."); }
    setLoading(false);
  };

  if (sent) return (
    <div style={S.wrap}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
        <h2 style={S.h2}>Check your email</h2>
        <p style={{ color: "#888", fontSize: 14, margin: "8px 0 24px" }}>
          Reset link sent to <strong>{email}</strong>
        </p>
        <button onClick={onBack} style={S.btn}>Back to Login</button>
      </div>
    </div>
  );

  return (
    <div style={S.wrap}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#f5a623", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 20, padding: 0 }}>
          ← Back to Login
        </button>
        <div style={S.card}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>🔐</div>
          <h2 style={S.h2}>Forgot Password?</h2>
          <p style={S.sub}>We'll send a reset link to your email</p>
          <label style={S.label}>Email Address</label>
          <input placeholder="you@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            style={S.input} />
          {error && <div style={S.errBox}>⚠️ {error}</div>}
          <button onClick={handleSend} disabled={loading}
            style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const email       = useStore(s => s.email);
  const password    = useStore(s => s.password);
  const loginError  = useStore(s => s.loginError);
  const setEmail    = useStore(s => s.setEmail);
  const setPassword = useStore(s => s.setPassword);
  const handleLogin = useStore(s => s.handleLogin);
  const setScreen   = useStore(s => s.setScreen);
  const [loading, setLoading]       = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const onLogin = async () => { setLoading(true); await handleLogin(); setLoading(false); };

  if (showForgot) return <ForgotPassword onBack={() => setShowForgot(false)} />;

  return (
    <div style={S.wrap}>
      <div style={{ width: "100%", maxWidth: 440 }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 12px", boxShadow: "0 6px 20px rgba(245,166,35,0.3)" }}>🎟️</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111", margin: 0 }}>Master Events</h1>
          <p style={{ color: "#bbb", fontSize: 11, letterSpacing: "0.14em", marginTop: 4 }}>GHANA'S #1 NFT TICKETING</p>
        </div>

        <div style={S.card}>
          <h2 style={S.h2}>Welcome back</h2>
          <p style={S.sub}>Enter your credentials to continue</p>

          <label style={S.label}>Username or Email</label>
          <input placeholder="username or you@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            style={S.input} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <label style={{ ...S.label, marginBottom: 0 }}>Password</label>
            <span onClick={() => setShowForgot(true)}
              style={{ fontSize: 12, fontWeight: 700, color: "#f5a623", cursor: "pointer" }}>
              Forgot password?
            </span>
          </div>
          <input placeholder="••••••••" type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onLogin()}
            style={S.input} />

          {loginError && <div style={S.errBox}>⚠️ {loginError}</div>}
          {loading && (
            <div style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: 10, padding: "11px 15px", color: "#e8920f", fontSize: 13, marginBottom: 14, textAlign: "center" }}>
              ⏳ Logging in... first load may take ~30s
            </div>
          )}

          <button onClick={onLogin} disabled={loading}
            style={{ ...S.btn, marginBottom: 20, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Logging in..." : "Log In →"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
            <span style={{ color: "#ccc", fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "#999", margin: "0 0 8px" }}>
            No account?{" "}
            <span onClick={() => setScreen("signup")}
              style={{ fontWeight: 700, color: "#f5a623", cursor: "pointer" }}>
              Sign up free
            </span>
          </p>
          <p style={{ textAlign: "center", fontSize: 12, color: "#ccc", margin: 0 }}>
            Door staff?{" "}
            <span onClick={() => setScreen("doorStaffLogin")}
              style={{ fontWeight: 600, color: "#999", cursor: "pointer" }}>
              Enter with invite code
            </span>
          </p>
        </div>

        <div style={{ marginTop: 12, background: "#fff", borderRadius: 14, border: "1.5px solid #f0f0f0", padding: "14px 18px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8, color: "#f5a623" }}>⚡ QUICK LOGIN (DEV)</div>
          <div onClick={() => { setEmail("jude@test.com"); setPassword("test1234"); }}
            style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: "#aaa" }}>jude@test.com / test1234</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#f5a623" }}>Organizer</span>
          </div>
        </div>

      </div>
    </div>
  );
}