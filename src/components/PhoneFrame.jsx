import React from "react";
import StatusBar from "./StatusBar";

const isMobile = () => window.innerWidth <= 768;

export default function PhoneFrame({ children }) {
  if (isMobile()) {
    return (
      <>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { display: none; }
          html, body, #root { height: 100%; width: 100%; overflow: hidden; }
        `}</style>
        <div style={{
          width: "100%", height: "100vh",
          background: "linear-gradient(160deg, #1a0e00 0%, #110900 60%, #1a0e00 100%)",
          display: "flex", flexDirection: "column",
          fontFamily: "sans-serif", overflow: "hidden", position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `
              radial-gradient(ellipse at 20% 20%, rgba(245,166,35,0.07) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(245,166,35,0.05) 0%, transparent 50%)
            `,
          }} />
          <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
            <StatusBar />
          </div>
          <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "100vh", fontFamily: "sans-serif",
        background: "#111",
      }}>
        {/* Phone buttons */}
        <div style={{ position: "absolute", left: "calc(50% - 208px)", top: "180px", width: "4px", height: "32px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "calc(50% - 208px)", top: "230px", width: "4px", height: "56px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "calc(50% - 208px)", top: "300px", width: "4px", height: "56px", background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: "calc(50% - 208px)", top: "220px", width: "4px", height: "80px", background: "#333", borderRadius: "0 2px 2px 0" }} />

        {/* Phone frame */}
        <div style={{
          width: "390px", height: "844px",
          borderRadius: "50px",
          boxShadow: "0 0 0 2px #555, 0 0 0 12px #1a1a1a, 0 0 0 14px #444, 0 50px 100px rgba(0,0,0,0.9)",
          overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
          background: "linear-gradient(160deg, #1a0e00 0%, #110900 40%, #1a0e00 100%)",
        }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `
              radial-gradient(ellipse at 20% 20%, rgba(245,166,35,0.07) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(245,166,35,0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(180,80,0,0.04) 0%, transparent 60%)
            `,
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04,
            backgroundImage: "radial-gradient(circle, #f5a623 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />
          <div style={{
            position: "absolute", bottom: "80px", left: "50%",
            transform: "translateX(-50%)",
            zIndex: 0, pointerEvents: "none", textAlign: "center", opacity: 0.06,
          }}>
            <div style={{ color: "#f5a623", fontSize: "28px", fontWeight: 900, letterSpacing: "6px", whiteSpace: "nowrap" }}>MASTER EVENTS</div>
            <div style={{ color: "#f5a623", fontSize: "11px", letterSpacing: "4px", marginTop: "4px" }}>IF NOT NOW, WHEN?</div>
          </div>
          <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
            <StatusBar />
          </div>
          <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}