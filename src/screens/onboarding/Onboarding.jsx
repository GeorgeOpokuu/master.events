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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#110900", position: "relative", overflow: "hidden" }}>
      {!isLast && (
        <div onClick={() => setScreen("login")} style={{ position: "absolute", top: "20px", right: "20px", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, cursor: "pointer", zIndex: 10, background: "rgba(0,0,0,0.35)", padding: "6px 14px", borderRadius: "20px" }}>Skip</div>
      )}

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img src={slide.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(17,9,0,0.3) 0%, rgba(17,9,0,0.85) 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", fontSize: "90px", filter: "drop-shadow(0 8px 32px rgba(245,166,35,0.3))" }}>{slide.icon}</div>

        {/* Orange glow behind icon */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      </div>

      <div style={{ background: "rgba(20,10,0,0.85)", backdropFilter: "blur(24px)", borderRadius: "28px 28px 0 0", padding: "28px 28px 36px", borderTop: "1px solid rgba(245,166,35,0.15)" }}>
        <div style={{ fontSize: "26px", fontWeight: 900, color: "#fff", marginBottom: "10px", lineHeight: 1.2 }}>{slide.title}</div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "28px" }}>{slide.subtitle}</div>

        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
          {ONBOARDING.map((_, i) => (
            <div key={i} onClick={() => setOnboardSlide(i)} style={{ width: i === onboardSlide ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === onboardSlide ? "#f5a623" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>

        {isLast ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={() => setScreen("signup")} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", border: "none", borderRadius: "50px", fontSize: "15px", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(245,166,35,0.35)" }}>GET STARTED</button>
            <button onClick={() => setScreen("login")} style={{ width: "100%", padding: "16px", background: "transparent", border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", borderRadius: "50px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>LOG IN</button>
          </div>
        ) : (
          <button onClick={() => setOnboardSlide(onboardSlide + 1)} style={{ width: "100%", padding: "16px", background: "rgba(245,166,35,0.15)", border: "2px solid rgba(245,166,35,0.4)", color: "#f5a623", borderRadius: "50px", fontSize: "15px", fontWeight: 800, cursor: "pointer" }}>NEXT →</button>
        )}
      </div>
    </div>
  );
}