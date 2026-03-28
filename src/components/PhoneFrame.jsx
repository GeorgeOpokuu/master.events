import React, { useEffect, useState } from "react";

function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#0a0600", color: "#fff",
      fontFamily: "sans-serif", overflowX: "hidden",
    }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", borderBottom: "1px solid rgba(245,166,35,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🎟️</span>
          <span style={{ fontWeight: 900, fontSize: "20px", color: "#f5a623" }}>Master Events</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px" }}>Features</a>
          <a href="#how" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px" }}>How it Works</a>
          <a href="#organizers" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px" }}>Organizers</a>
          <a href="https://master-events-bi7m.vercel.app" style={{ padding: "10px 24px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "50px", textDecoration: "none", fontWeight: 700, fontSize: "14px" }}>Open App</a>
        </div>
      </nav>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "80px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ flex: 1, maxWidth: "560px" }}>
          <div style={{ display: "inline-block", background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: "50px", padding: "6px 16px", fontSize: "12px", color: "#f5a623", fontWeight: 700, letterSpacing: "2px", marginBottom: "24px" }}>
            🇬🇭 GHANA'S PREMIER TICKETING PLATFORM
          </div>
          <h1 style={{ fontSize: "64px", fontWeight: 900, lineHeight: 1.1, marginBottom: "24px" }}>
            If Not Now,<br />
            <span style={{ background: "linear-gradient(135deg, #f5a623, #ff6b00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>When?</span>
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "40px" }}>
            Buy, sell and transfer event tickets secured by blockchain technology. Every ticket is an NFT on Polygon — unfakeable, verifiable, yours forever.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="https://master-events-bi7m.vercel.app" style={{ padding: "16px 32px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "50px", textDecoration: "none", fontWeight: 800, fontSize: "16px", boxShadow: "0 8px 32px rgba(245,166,35,0.4)" }}>🎟️ Get Tickets</a>
            <a href="#organizers" style={{ padding: "16px 32px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "50px", textDecoration: "none", fontWeight: 700, fontSize: "16px" }}>🎪 Create Event</a>
          </div>
          <div style={{ display: "flex", gap: "32px", marginTop: "48px" }}>
            {[["10K+", "Tickets Sold"], ["50+", "Events"], ["99%", "Verified"], ["0%", "Fake Tickets"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: "24px", fontWeight: 900, color: "#f5a623" }}>{val}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <div style={{ position: "absolute", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ width: "280px", height: "580px", background: "linear-gradient(160deg, #1a0e00, #110900)", borderRadius: "40px", boxShadow: "0 0 0 2px #555, 0 0 0 10px #1a1a1a, 0 0 0 12px #444, 0 40px 80px rgba(0,0,0,0.8)", overflow: "hidden", position: "relative", zIndex: 1 }}>
            <div style={{ background: "rgba(245,166,35,0.1)", padding: "40px 20px", textAlign: "center", borderBottom: "1px solid rgba(245,166,35,0.1)" }}>
              <div style={{ fontSize: "40px", marginBottom: "8px" }}>🎟️</div>
              <div style={{ fontWeight: 900, fontSize: "18px", color: "#f5a623" }}>Master Events</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>IF NOT NOW, WHEN?</div>
            </div>
            <div style={{ padding: "16px" }}>
              {["Afrobeats Carnival", "Tech Summit Ghana", "Accra Jazz Night"].map((name, i) => (
                <div key={name} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `hsl(${i * 40 + 20}, 70%, 40%)`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>{name}</div>
                    <div style={{ fontSize: "10px", color: "#f5a623" }}>🎫 Tickets Available</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="features" style={{ padding: "80px 60px", background: "rgba(245,166,35,0.03)", borderTop: "1px solid rgba(245,166,35,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "42px", fontWeight: 900, marginBottom: "16px" }}>Why Master Events?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>Built for Ghana, secured by blockchain</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "⛓️", title: "NFT Tickets", desc: "Every ticket is a real NFT on Polygon blockchain. Impossible to fake, easy to verify." },
              { icon: "📱", title: "MoMo Payments", desc: "Pay with MTN MoMo or VISA. Instant confirmation, automatic wallet split." },
              { icon: "🔍", title: "QR Verification", desc: "Door staff scan QR codes instantly. Real-time blockchain verification." },
              { icon: "💸", title: "95% to Organizers", desc: "Keep 95% of every ticket sale. Withdraw to MoMo anytime." },
              { icon: "🔄", title: "Ticket Transfer", desc: "Transfer tickets to friends securely. Full blockchain transfer history." },
              { icon: "🏷️", title: "Resale Market", desc: "List tickets for resale at fair prices. Platform takes just 5%." },
            ].map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,166,35,0.1)", borderRadius: "20px", padding: "32px" }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>{f.title}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="how" style={{ padding: "80px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "42px", fontWeight: 900, textAlign: "center", marginBottom: "60px" }}>How It Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {[
            { step: "01", icon: "🔍", title: "Browse Events", desc: "Find events happening across Ghana" },
            { step: "02", icon: "💳", title: "Buy Ticket", desc: "Pay with MoMo or VISA securely" },
            { step: "03", icon: "🎟️", title: "Get NFT", desc: "Ticket minted to blockchain instantly" },
            { step: "04", icon: "✅", title: "Show & Scan", desc: "Scan QR at door for instant entry" },
          ].map(s => (
            <div key={s.step} style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px" }}>{s.icon}</div>
              <div style={{ fontSize: "11px", color: "#f5a623", fontWeight: 700, letterSpacing: "2px", marginBottom: "8px" }}>STEP {s.step}</div>
              <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: "8px" }}>{s.title}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="organizers" style={{ padding: "80px 60px", background: "linear-gradient(135deg, rgba(245,166,35,0.1), rgba(245,166,35,0.05))", borderTop: "1px solid rgba(245,166,35,0.15)", borderBottom: "1px solid rgba(245,166,35,0.15)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "42px", fontWeight: 900, marginBottom: "16px" }}>Are You an Event Organizer?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1.8, marginBottom: "40px" }}>
            Create events, manage ticket sales, generate door staff codes and withdraw earnings directly to your MoMo — all from one dashboard.
          </p>
          <a href="https://master-events-bi7m.vercel.app" style={{ padding: "18px 48px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "50px", textDecoration: "none", fontWeight: 800, fontSize: "18px", boxShadow: "0 8px 32px rgba(245,166,35,0.4)", display: "inline-block" }}>
            🎪 Start Selling Tickets
          </a>
        </div>
      </div>
      <div style={{ padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>🎟️</span>
          <span style={{ fontWeight: 900, color: "#f5a623" }}>Master Events</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>© 2026 Master Events Ghana. Secured by Polygon Blockchain.</div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="mailto:mastereventgh@gmail.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>Contact</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>Privacy</a>
        </div>
      </div>
    </div>
  );
}

export default function PhoneFrame({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { display: none; }
          html, body, #root { height: 100%; width: 100%; overflow: hidden; background: #110900; }
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
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0600; }
        ::-webkit-scrollbar-thumb { background: #f5a623; border-radius: 3px; }
      `}</style>
      <LandingPage />
    </>
  );
}