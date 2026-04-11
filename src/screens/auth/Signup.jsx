import React, { useState } from "react";
import useStore from "../../store/useStore";

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

export function Signup() {
  const fullName          = useStore(s => s.fullName);
  const signupEmail       = useStore(s => s.signupEmail);
  const signupPassword    = useStore(s => s.signupPassword);
  const setFullName       = useStore(s => s.setFullName);
  const setSignupEmail    = useStore(s => s.setSignupEmail);
  const setSignupPassword = useStore(s => s.setSignupPassword);
  const handleSignup      = useStore(s => s.handleSignup);
  const setSignupData     = useStore(s => s.setSignupData);
  const setScreen         = useStore(s => s.setScreen);
  const signupError       = useStore(s => s.signupError);

  const [username, setUsername]         = useState("");
  const [selectedRole, setSelectedRole] = useState("attendee");
  const [loading, setLoading]           = useState(false);
  const [pwErrors, setPwErrors]         = useState([]);

  const validatePassword = (pw) => {
    const e = [];
    if (pw.length < 8) e.push("8+ chars");
    if (!/[A-Z]/.test(pw)) e.push("Uppercase");
    if (!/[0-9]/.test(pw)) e.push("Number");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) e.push("Special char");
    return e;
  };

  const handleCreate = async () => {
    const errors = validatePassword(signupPassword);
    if (errors.length > 0) { setPwErrors(errors); return; }
    setPwErrors([]);
    setLoading(true);
    setSignupData({ role: selectedRole, username });
    await handleSignup();
    setLoading(false);
  };

  const pwChecks = [
    ["8+ chars",     signupPassword.length >= 8],
    ["Uppercase",    /[A-Z]/.test(signupPassword)],
    ["Number",       /[0-9]/.test(signupPassword)],
    ["Special char", /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(signupPassword)],
  ];

  return (
    <div style={S.wrap}>
      <div style={{ width: "100%", maxWidth: 460 }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 12px", boxShadow: "0 6px 20px rgba(245,166,35,0.3)" }}>🎫</div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111", margin: 0 }}>Master Events</h1>
          <p style={{ color: "#bbb", fontSize: 11, letterSpacing: "0.14em", marginTop: 4 }}>GHANA'S #1 NFT TICKETING</p>
        </div>

        <div style={S.card}>
          <h2 style={S.h2}>Create your account</h2>
          <p style={S.sub}>Join Ghana's #1 blockchain ticketing platform — it's free</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={S.label}>Full Name</label>
              <input placeholder="Kwame Mensah" value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={S.input} />
            </div>
            <div>
              <label style={S.label}>Username</label>
              <input placeholder="kwame23" value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                style={S.input} autoCapitalize="none" />
            </div>
          </div>

          <label style={S.label}>Email Address</label>
          <input placeholder="you@email.com" value={signupEmail}
            onChange={e => setSignupEmail(e.target.value)}
            style={S.input} autoComplete="email" />

          <label style={S.label}>Password</label>
          <input placeholder="Min 8 chars, uppercase, number, special"
            type="password" value={signupPassword}
            onChange={e => { setSignupPassword(e.target.value); if (pwErrors.length) setPwErrors(validatePassword(e.target.value)); }}
            style={{ ...S.input, borderColor: pwErrors.length ? "#fecaca" : "#ececec" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16, marginTop: -8 }}>
            {pwChecks.map(([lbl, met]) => (
              <span key={lbl} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: met ? "rgba(39,174,96,0.1)" : "#f5f5f5", color: met ? "#27ae60" : "#bbb" }}>
                {met ? "✓" : "·"} {lbl}
              </span>
            ))}
          </div>

          <label style={S.label}>I am joining as</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { role: "attendee",  icon: "🎟️", label: "Attendee",  sub: "Buy & transfer tickets" },
              { role: "organizer", icon: "🎪", label: "Organizer", sub: "Create & manage events" },
            ].map(item => (
              <div key={item.role} onClick={() => setSelectedRole(item.role)}
                style={{
                  padding: "14px 12px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                  border: `2px solid ${selectedRole === item.role ? "#f5a623" : "#ececec"}`,
                  background: selectedRole === item.role ? "rgba(245,166,35,0.06)" : "#fff",
                  boxShadow: selectedRole === item.role ? "0 4px 16px rgba(245,166,35,0.15)" : "none",
                }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: selectedRole === item.role ? "#f5a623" : "#111" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {signupError && <div style={S.errBox}>⚠️ {signupError}</div>}

          <button onClick={handleCreate} disabled={loading}
            style={{ ...S.btn, marginBottom: 20, opacity: loading ? 0.7 : 1 }}>
            {loading ? "⏳ Creating account..." : "Create Account →"}
          </button>

          <p style={{ textAlign: "center", fontSize: 14, color: "#999", margin: 0 }}>
            Already have an account?{" "}
            <span onClick={() => setScreen("login")}
              style={{ fontWeight: 700, color: "#f5a623", cursor: "pointer" }}>
              Log in
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export function RoleSelect() {
  const handleSelectRole = useStore(s => s.handleSelectRole);

  return (
    <div style={S.wrap}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 16px", boxShadow: "0 6px 20px rgba(245,166,35,0.3)" }}>🎉</div>
          <h2 style={S.h2}>You're in!</h2>
          <p style={{ color: "#aaa", fontSize: 13, margin: "6px 0 0" }}>How will you use Master Events?</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { role: "attendee",  icon: "🎟️", title: "I'm an Attendee",  sub: "Browse events, buy tickets, resell and transfer" },
            { role: "organizer", icon: "🎪", title: "I'm an Organizer", sub: "Create events, sell tickets, manage door access" },
          ].map(item => (
            <div key={item.role} onClick={() => handleSelectRole(item.role)}
              style={{ background: "#fff", borderRadius: 18, padding: "20px", cursor: "pointer", display: "flex", gap: 16, alignItems: "center", border: "1.5px solid #ececec", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, background: "rgba(245,166,35,0.1)" }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{item.sub}</div>
              </div>
              <div style={{ fontSize: 18, color: "#f5a623" }}>→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}