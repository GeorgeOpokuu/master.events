import React from "react";
import useStore from "../../store/useStore";
import { ONBOARDING } from "../../constants/data";

export default function Onboarding() {
  const onboardSlide = useStore(s => s.onboardSlide);
  const setOnboardSlide = useStore(s => s.setOnboardSlide);
  const setScreen = useStore(s => s.setScreen);

  const slide = ONBOARDING[onboardSlide] || ONBOARDING[0];
  const isLast = onboardSlide === ONBOARDING.length - 1;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#f8f8f6", position: "relative", overflow: "hidden" }}>
      {!isLast && (
        <div onClick={() => setScreen("login")} style={{ position: "absolute", top: "20px", right: "20px", color: "#6b6b6b", fontSize: "13px", fontWeight: 600, cursor: "pointer", zIndex: 10, background: "#fff", padding: "6px 16px", borderRadius: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          Skip
        </div>
      )}

      {/* Image area */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img src={slide.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(248,248,246,0.1) 0%, rgba(248,248,246,0.85) 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", fontSize: "90px", filter: "drop-shadow(0 8px 32px rgba(245,166,35,0.2))" }}>{slide.icon}</div>
      </div>

      {/* Bottom card */}
      <div style={{ background: "#fff", borderRadius: "28px 28px 0 0", padding: "28px 28px 36px", boxShadow: "0 -4px 32px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: "24px", fontWeight: 800, color: "#1a1a1a", marginBottom: "10px", lineHeight: 1.2, letterSpacing: "-0.3px" }}>{slide.title}</div>
        <div style={{ fontSize: "14px", color: "#6b6b6b", lineHeight: 1.7, marginBottom: "28px" }}>{slide.subtitle}</div>

        {/* Dots */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
          {ONBOARDING.map((_, i) => (
            <div key={i} onClick={() => setOnboardSlide(i)} style={{
              width: i === onboardSlide ? "24px" : "8px", height: "8px",
              borderRadius: "4px", background: i === onboardSlide ? "#f5a623" : "#f0f0f0",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>

        {isLast ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={() => setScreen("signup")} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", border: "none", borderRadius: "16px", fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(245,166,35,0.3)" }}>
              Get Started
            </button>
            <button onClick={() => setScreen("login")} style={{ width: "100%", padding: "16px", background: "#f8f8f6", border: "1.5px solid #f0f0f0", color: "#6b6b6b", borderRadius: "16px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>
              Log In
            </button>
          </div>
        ) : (
          <button onClick={() => setOnboardSlide(onboardSlide + 1)} style={{ width: "100%", padding: "16px", background: "#f8f8f6", border: "1.5px solid #f5a623", color: "#f5a623", borderRadius: "16px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}