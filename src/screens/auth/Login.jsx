import React, { useState } from "react";
import useStore from "../../store/useStore";

const API = "https://master-events-backend.onrender.com";

const inputStyle = {
  width: "100%", padding: "14px 18px", marginBottom: "14px",
  background: "#fff", border: "1.5px solid #f0f0f0",
  borderRadius: "14px", fontSize: "15px", color: "#1a1a1a",
  outline: "none", fontFamily: "sans-serif", boxSizing: "border-box",
  caretColor: "#f5a623", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const btnStyle = {
  width: "100%", padding: "16px",
  background: "linear-gradient(135deg, #f5a623, #e8920f)",
  color: "#fff", border: "none", borderRadius: "16px",
  fontSize: "15px", fontWeight: 700, cursor: "pointer",
  boxShadow: "0 8px 24px rgba(245,166,35,0.28)", marginBottom: "12px",
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
      const res = await fetch(`${API}/api/auth/forgot-password/`, {
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
    <div style={{ minHeight: "100%", background: "#f8f8f6", padding: "60px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "22px", background: "rgba(39,174,96,0.1)", border: "2px solid rgba(39,174,96,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", marginBottom: "20px" }}>📧</div>
      <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a1a1a", marginBottom: "10px" }}>Check your email</h2>
      <p style={{ color: "#6b6b6b", fontSize: "15px", lineHeight: 1.6, marginBottom: "28px", maxWidth: "280px" }}>
        We sent a password reset link to <strong>{email}</strong>
      </p>
      <button onClick={onBack} style={{ ...btnStyle, width: "auto", padding: "14px 32px" }}>Back to Login</button>
    </div>
  );

  return (
    <div style={{ minHeight: "100%", background: "#f8f8f6", padding: "60px 28px 40px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#f5a623", fontSize: "16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px", padding: 0, fontWeight: 600 }}>← Back</button>
      <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", marginBottom: "16px", boxShadow: "0 8px 24px rgba(245,166,35,0.3)" }}>🔐</div>
      <h1 style={{ color: "#1a1a1a", fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>Forgot Password?</h1>
      <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.5, marginBottom: "28px" }}>Enter your email and we'll send a reset link</p>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b6b6b", marginBottom: "8px" }}>Email Address</div>
      <input placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()} style={inputStyle} autoComplete="email" />
      {error && <div style={{ background: "#fff5f5", border: "1px solid #ffd6d6", borderRadius: "12px", padding: "12px 16px", marginBottom: "14px", color: "#e74c3c", fontSize: "13px" }}>⚠️ {error}</div>}
      <button onClick={handleSend} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
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
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 pt-8 px-6">

      {/* ── Left — Branding ── 
      <div className="hidden lg:flex flex-col justify-center px-16 py-12"
        style={{ background: "linear-gradient(160deg, #fffcf5 0%, #fff8f0 60%, #fff 100%)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg"
          style={{ background: "linear-gradient(135deg, #f5a623, #e8920f)" }}>🎟️</div>

        <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#f5a623" }}>MASTER EVENTS GHANA</div>

        <h1 className="font-black text-gray-900 leading-none mb-4" style={{ fontSize: "52px", letterSpacing: "-2px" }}>
          Welcome<br />
          <span style={{ background: "linear-gradient(135deg, #f5a623, #e8920f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            back.
          </span>
        </h1>

        <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-sm">
          Your NFT tickets and events are waiting. Every ticket is secured on Polygon blockchain — yours forever.
        </p>

        <div className="space-y-4">
          {[
            ["⛓️", "NFT on Polygon",     "Every ticket blockchain-verified and unfakeable"],
            ["💰", "95% to organizers",  "Only 5% platform fee, withdraw via MoMo"],
            ["📱", "MoMo & VISA",        "Pay the Ghanaian way — mobile money or card"],
          ].map(([icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 border"
                style={{ background: "rgba(245,166,35,0.1)", borderColor: "rgba(245,166,35,0.2)" }}>{icon}</div>
              <div>
                <div className="font-bold text-sm text-gray-900">{title}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats 
        <div className="flex gap-8 mt-12">
          {[["10K+","Tickets Sold"],["50+","Events"],["0%","Fake Tickets"]].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-black" style={{ background: "linear-gradient(135deg, #f5a623, #e8920f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
              <div className="text-xs text-gray-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
      */}
      {/* ── Right — Login Form ── */}
      <div className="flex justify-center px-6 py-5">
        <div className="w-full max-w-md">
=======
    <div style={{ minHeight: "100%", background: "#f8f8f6", padding: "60px 28px 40px", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(245,166,35,0.3)" }}>🎟️</div>
        <h1 style={{ color: "#1a1a1a", fontSize: "28px", fontWeight: 800, marginBottom: "4px", letterSpacing: "-0.5px" }}>Master Events</h1>
        <p style={{ color: "#aaa", fontSize: "13px", letterSpacing: "2px", fontWeight: 500 }}>IF NOT NOW, WHEN?</p>
      </div>

      <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b6b6b", marginBottom: "8px" }}>Email</div>
      <input placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)}
        style={inputStyle} autoComplete="email" />
>>>>>>> 4a1880d78d1f37fa9a36d67021a33cc7a1e0a0df

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#6b6b6b" }}>Password</div>
        <div onClick={() => setShowForgot(true)} style={{ fontSize: "13px", color: "#f5a623", fontWeight: 600, cursor: "pointer" }}>Forgot password?</div>
      </div>
      <input placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onLogin()} style={inputStyle} autoComplete="current-password" />

<<<<<<< HEAD
          {/* Card */}
          {/* <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8"> */}
            <h2 className="text-center text-4xl font-black text-gray-900 mb-1">LOGIN</h2>
            {/* <p className="text-gray-400 text-sm mb-6">Enter your username and password to continue</p> */}

            {/* Username */}
            <div className="mb-4 pt-5">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Username or Email
              </label>
              <input
                placeholder="username or you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 text-sm outline-none bg-gray-50 transition-all"
                style={{ caretColor: "#f5a623" }}
              />
            </div>
=======
      {loginError && (
        <div style={{ background: "#fff5f5", border: "1px solid #ffd6d6", borderRadius: "12px", padding: "12px 16px", marginBottom: "14px", color: "#e74c3c", fontSize: "13px" }}>
          ⚠️ {loginError}
        </div>
      )}
      {loading && (
        <div style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.15)", borderRadius: "14px", padding: "12px", marginBottom: "14px", textAlign: "center" }}>
          <div style={{ color: "#f5a623", fontSize: "13px", fontWeight: 600 }}>⏳ Logging in...</div>
          <div style={{ color: "#aaa", fontSize: "11px", marginTop: "4px" }}>First load may take ~30s</div>
        </div>
      )}

      <button onClick={onLogin} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1, marginTop: "8px" }}>
        {loading ? "Logging in..." : "Log In"}
      </button>
>>>>>>> 4a1880d78d1f37fa9a36d67021a33cc7a1e0a0df

      <p style={{ color: "#aaa", fontSize: "13px", textAlign: "center" }}>
        No account?{" "}
        <span onClick={() => setScreen("signup")} style={{ color: "#f5a623", fontWeight: 700, cursor: "pointer" }}>Sign up free</span>
      </p>
      <p style={{ color: "#bbb", fontSize: "12px", marginTop: "10px", textAlign: "center" }}>
        Door staff?{" "}
        <span onClick={() => setScreen("doorStaffLogin")} style={{ color: "#6b6b6b", fontWeight: 600, cursor: "pointer" }}>Enter with invite code</span>
      </p>

<<<<<<< HEAD
            {/* Errors */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm mb-4">
                ⚠️ {loginError}
              </div>
            )}
            {loading && (
              <div className="rounded-xl px-4 py-3 text-sm mb-4 text-center border"
                style={{ background: "rgba(245,166,35,0.06)", borderColor: "rgba(245,166,35,0.2)", color: "#f5a623" }}>
                ⏳ Logging in... first load may take ~30s
              </div>
            )}

            {/* Login button */}
            <button onClick={onLogin} disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-base border-none cursor-pointer mb-4 transition-all"
              style={{ background: "linear-gradient(135deg, #f5a623, #e8920f)", boxShadow: "0 8px 28px rgba(245,166,35,0.35)", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Logging in..." : "Log In →"}
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-300 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <p className="text-center text-sm text-gray-400 mb-2">
              No account?{" "}
              <span onClick={() => setScreen("signup")} className="font-bold cursor-pointer" style={{ color: "#f5a623" }}>
                Sign up free
              </span>
            </p>
            <p className="text-center text-xs text-gray-400">
              Door staff?{" "}
              <span onClick={() => setScreen("doorStaffLogin")} className="font-semibold cursor-pointer" style={{ color: "#f5a620" }}>
                Enter with invite code
              </span>
            </p>
          {/* </div> */}

          {/* Dev quick login */}
          <div className="mt-4 bg-white rounded-xl border-2 border-gray-100 p-4 shadow-sm">
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "#f5a623" }}>⚡ QUICK LOGIN (DEV)</div>
            <div onClick={() => { setEmail("jude@test.com"); setPassword("test1234"); }}
              className="flex justify-between items-center cursor-pointer py-1">
              <span className="text-xs text-gray-400">jude@test.com / test1234</span>
              <span className="text-xs font-bold" style={{ color: "#f5a623" }}>Organizer</span>
            </div>
          </div>
=======
      <div style={{ marginTop: "32px", background: "#fff", border: "1px solid #f0f0f0", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: "11px", color: "#f5a623", fontWeight: 700, marginBottom: "10px", letterSpacing: "1px" }}>⚡ QUICK LOGIN (DEV)</div>
        <div onClick={() => { setEmail("jude@test.com"); setPassword("test1234"); }}
          style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", cursor: "pointer" }}>
          <span style={{ fontSize: "12px", color: "#aaa" }}>jude@test.com / test1234</span>
          <span style={{ fontSize: "11px", color: "#f5a623", fontWeight: 700 }}>Organizer</span>
>>>>>>> 4a1880d78d1f37fa9a36d67021a33cc7a1e0a0df
        </div>
      </div>
    </div>
  );
}