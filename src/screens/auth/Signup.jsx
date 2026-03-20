import React, { useState } from "react";
import useStore from "../../store/useStore";

const darkInput = {
  width: "100%", padding: "14px 18px", marginBottom: "14px",
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(245,166,35,0.2)",
  borderRadius: "14px", fontSize: "14px", color: "#fff",
  outline: "none", fontFamily: "sans-serif", boxSizing: "border-box",
  caretColor: "#f5a623",
};

const darkBtn = {
  width: "100%", padding: "16px",
  background: "linear-gradient(135deg, #f5a623, #e8920f)",
  color: "#fff", border: "none", borderRadius: "50px", fontSize: "15px",
  fontWeight: 800, cursor: "pointer", marginBottom: "8px",
  boxShadow: "0 8px 24px rgba(245,166,35,0.35)",
};

export function Signup() {
  const fullName = useStore(s => s.fullName);
  const signupEmail = useStore(s => s.signupEmail);
  const signupPassword = useStore(s => s.signupPassword);
  const setFullName = useStore(s => s.setFullName);
  const setSignupEmail = useStore(s => s.setSignupEmail);
  const setSignupPassword = useStore(s => s.setSignupPassword);
  const handleSignup = useStore(s => s.handleSignup);
  const setSignupData = useStore(s => s.setSignupData);
  const setScreen = useStore(s => s.setScreen);
  const signupError = useStore(s => s.signupError);
  const [selectedRole, setSelectedRole] = useState("attendee");

  const handleCreate = () => {
    setSignupData({ role: selectedRole });
    handleSignup();
  };

  return (
    <div style={{ minHeight: "100%", background: "linear-gradient(160deg, #1a0e00 0%, #110900 60%, #1a0e00 100%)", padding: "50px 28px 40px", overflowY: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🎫</div>
        <h1 style={{ color: "#f5a623", fontSize: "26px", fontWeight: 900, marginBottom: "6px" }}>Create Account</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "1px" }}>Join thousands of event-goers in Ghana</p>
      </div>

      <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} style={darkInput} />
      <input placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} style={darkInput} />
      <input placeholder="Password (min 6 characters)" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} style={darkInput} />

      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: "10px" }}>
        I am joining as:
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {[
          { role: "attendee", icon: "🎟️", label: "Attendee", sub: "Buy & transfer tickets" },
          { role: "organizer", icon: "🎪", label: "Organizer", sub: "Create & manage events" },
        ].map(item => (
          <div key={item.role} onClick={() => setSelectedRole(item.role)} style={{
            flex: 1, padding: "14px 10px", borderRadius: "16px", cursor: "pointer",
            textAlign: "center",
            border: "2px solid " + (selectedRole === item.role ? "#f5a623" : "rgba(255,255,255,0.1)"),
            background: selectedRole === item.role ? "rgba(245,166,35,0.12)" : "rgba(255,255,255,0.04)",
            boxShadow: selectedRole === item.role ? "0 4px 20px rgba(245,166,35,0.2)" : "none",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>{item.icon}</div>
            <div style={{ fontWeight: 800, fontSize: "13px", color: selectedRole === item.role ? "#f5a623" : "rgba(255,255,255,0.7)" }}>{item.label}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "3px", lineHeight: 1.4 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {signupError && (
        <div style={{ background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", color: "#ff6b6b", fontSize: "13px", textAlign: "center" }}>
          ⚠️ {signupError}
        </div>
      )}

      <button onClick={handleCreate} style={darkBtn}>CREATE ACCOUNT</button>

      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "20px", textAlign: "center" }}>
        Already have an account?{" "}
        <span onClick={() => setScreen("login")} style={{ color: "#f5a623", fontWeight: 700, cursor: "pointer" }}>Log in</span>
      </p>
    </div>
  );
}

export function RoleSelect() {
  const handleSelectRole = useStore(s => s.handleSelectRole);
  return (
    <div style={{ minHeight: "100%", background: "linear-gradient(160deg, #1a0e00 0%, #110900 60%, #1a0e00 100%)", padding: "60px 28px", textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
      <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>You are in!</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "40px" }}>How will you use Master Events?</p>
      {[
        { role: "attendee", icon: "🎟️", title: "I am an Attendee", sub: "Browse events, buy tickets, resell and transfer" },
        { role: "organizer", icon: "🎪", title: "I am an Organizer", sub: "Create events, sell tickets, manage door access" },
      ].map(item => (
        <div key={item.role} onClick={() => handleSelectRole(item.role)}
          style={{
            background: "rgba(255,255,255,0.05)", border: "2px solid rgba(245,166,35,0.3)",
            borderRadius: "20px", padding: "20px", marginBottom: "14px",
            cursor: "pointer", textAlign: "left", display: "flex", gap: "16px", alignItems: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}>
          <div style={{ width: "52px", height: "52px", background: "rgba(245,166,35,0.15)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>{item.icon}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "16px", color: "#fff", marginBottom: "4px" }}>{item.title}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}