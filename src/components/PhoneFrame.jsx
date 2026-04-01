import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";

// ── About Page ──────────────────────────────────────────────
function AboutPage({ onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <nav style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🎟️</div>
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#1a1a1a" }}>Master Events</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <span onClick={() => onNavigate("home")} style={{ color: "#6b6b6b", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>Home</span>
          <span onClick={() => onNavigate("login")} style={{ color: "#1a1a1a", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Log in</span>
          <span onClick={() => onNavigate("signup")} style={{ padding: "10px 22px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>Sign up free</span>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "24px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(245,166,35,0.3)" }}>🎟️</div>
          <h1 style={{ fontSize: "42px", fontWeight: 900, color: "#1a1a1a", marginBottom: "16px", letterSpacing: "-1px" }}>About Master Events</h1>
          <p style={{ fontSize: "18px", color: "#6b6b6b", lineHeight: 1.7 }}>Ghana's first blockchain-powered event ticketing platform, built to eliminate fake tickets and empower event organizers.</p>
        </div>

        {[
          { icon: "🎯", title: "Our Mission", body: "We believe every event experience should start with trust. Master Events uses blockchain technology to ensure every ticket is authentic, verifiable, and owned by the rightful buyer." },
          { icon: "⛓️", title: "Blockchain Technology", body: "Every ticket purchased on Master Events is minted as an NFT on the Polygon blockchain — the same technology used by major global platforms, now available in Ghana." },
          { icon: "💰", title: "Fair for Organizers", body: "We take only 5% per transaction. 95% of every ticket sale goes directly to the organizer's wallet, withdrawable via MTN MoMo or VISA." },
          { icon: "🇬🇭", title: "Built for Ghana", body: "From Afrobeats concerts in Accra to tech summits in Kumasi — Master Events is designed specifically for Ghana's vibrant events scene." },
          { icon: "👥", title: "The Team", body: "Master Events was built by students at Ghana Communication Technology University (GCTU) as a final-year Computer Science project, combining blockchain, mobile development, and payments." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "20px", padding: "28px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", gap: "20px", alignItems: "flex-start" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(245,166,35,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "18px", color: "#1a1a1a", marginBottom: "8px" }}>{item.title}</div>
              <div style={{ fontSize: "15px", color: "#6b6b6b", lineHeight: 1.7 }}>{item.body}</div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <div style={{ fontSize: "16px", color: "#6b6b6b", marginBottom: "20px" }}>Have questions? Reach us at</div>
          <a href="mailto:mastereventgh@gmail.com" style={{ color: "#f5a623", fontWeight: 700, fontSize: "18px", textDecoration: "none" }}>mastereventgh@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

// ── Login Page (Desktop wrapper) ────────────────────────────
function DesktopAuthPage({ type, onNavigate }) {
  const setScreen = useStore(s => s.setScreen);

  const handleEnterApp = (screen) => {
    setScreen(screen);
    onNavigate("app");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      <nav style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🎟️</div>
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#1a1a1a" }}>Master Events</span>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span onClick={() => onNavigate("login")} style={{ color: type === "login" ? "#f5a623" : "#6b6b6b", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Log in</span>
          <span onClick={() => onNavigate("signup")} style={{ padding: "10px 22px", background: type === "signup" ? "linear-gradient(135deg, #f5a623, #e8920f)" : "#f8f8f6", color: type === "signup" ? "#fff" : "#6b6b6b", borderRadius: "12px", fontWeight: 700, fontSize: "14px", cursor: "pointer", border: "1.5px solid #f0f0f0" }}>Sign up</span>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ display: "flex", gap: "60px", alignItems: "center", maxWidth: "1000px", width: "100%" }}>
          {/* Left side info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", color: "#f5a623", fontWeight: 700, letterSpacing: "1px", marginBottom: "16px" }}>🇬🇭 MASTER EVENTS GHANA</div>
            <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#1a1a1a", marginBottom: "16px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              {type === "login" ? "Welcome back!" : "Join Ghana's #1 ticketing platform"}
            </h1>
            <p style={{ color: "#6b6b6b", fontSize: "16px", lineHeight: 1.7, marginBottom: "32px" }}>
              {type === "login" ? "Log in to access your tickets, manage your events, and connect with Ghana's best events." : "Create an account to buy NFT-secured tickets or start selling tickets for your own events."}
            </p>
            {[
              ["🎟️", "NFT tickets on Polygon blockchain"],
              ["💰", "95% payouts to organizers via MoMo"],
              ["🔍", "QR verification at the door"],
              ["📱", "Works on any mobile device"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(245,166,35,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{icon}</div>
                <span style={{ fontSize: "14px", color: "#6b6b6b" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Right side - phone frame with app */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: "320px", height: "620px", background: "#1a1a1a", borderRadius: "44px", padding: "12px", boxShadow: "0 0 0 2px #555, 0 0 0 8px #1a1a1a, 0 0 0 10px #444, 0 40px 80px rgba(0,0,0,0.4)", overflow: "hidden", position: "relative" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "34px", overflow: "hidden", background: "#f8f8f6" }}>
                {/* Notch */}
                <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", width: "100px", height: "24px", background: "#1a1a1a", borderRadius: "0 0 16px 16px", zIndex: 10 }} />
                {/* App content inside phone */}
                <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                  <iframe
                    src={window.location.href}
                    style={{ width: "390px", height: "844px", border: "none", transform: "scale(0.82)", transformOrigin: "top left", pointerEvents: "none" }}
                    title="App Preview"
                  />
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button onClick={() => handleEnterApp(type === "login" ? "login" : "signup")}
                style={{ padding: "12px 32px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "15px", cursor: "pointer", boxShadow: "0 6px 20px rgba(245,166,35,0.3)" }}>
                {type === "login" ? "Open Login →" : "Open Signup →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Landing Page ────────────────────────────────────────────
function LandingPage({ onNavigate }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://master-events-backend.onrender.com/api/events/")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setEvents(data.slice(0, 8)); })
      .catch(() => {});
  }, []);

  const categoryImages = {
    music: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
    tech: "https://images.unsplash.com/photo-1488229297570-58520851e868?w=600",
    food: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    arts: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
    sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
    business: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600",
    other: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a1a" }}>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 60px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🎟️</div>
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#1a1a1a", letterSpacing: "-0.3px" }}>Master Events</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="#events" style={{ color: "#6b6b6b", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>Events</a>
          <a href="#organizers" style={{ color: "#6b6b6b", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>Organizers</a>
          <span onClick={() => onNavigate("about")} style={{ color: "#6b6b6b", textDecoration: "none", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>About</span>
          <span onClick={() => onNavigate("login")} style={{ color: "#1a1a1a", textDecoration: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Log in</span>
          <span onClick={() => onNavigate("signup")} style={{ padding: "10px 22px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "14px", boxShadow: "0 4px 12px rgba(245,166,35,0.3)", cursor: "pointer" }}>Sign up free</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fff 100%)", padding: "80px 60px 60px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ display: "inline-block", background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: "50px", padding: "6px 18px", fontSize: "13px", color: "#f5a623", fontWeight: 700, letterSpacing: "1px", marginBottom: "24px" }}>
          🇬🇭 GHANA'S PREMIER TICKETING PLATFORM
        </div>
        <h1 style={{ fontSize: "56px", fontWeight: 900, lineHeight: 1.1, marginBottom: "20px", letterSpacing: "-1px" }}>
          Find events that<br />
          <span style={{ background: "linear-gradient(135deg, #f5a623, #e8920f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>move you</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#6b6b6b", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.6 }}>
          Discover and buy tickets to the best events in Ghana. Every ticket is an NFT — unfakeable and yours forever.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#events" style={{ padding: "16px 36px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "14px", textDecoration: "none", fontWeight: 700, fontSize: "16px", boxShadow: "0 8px 24px rgba(245,166,35,0.35)" }}>
            🎟️ Browse Events
          </a>
          <span onClick={() => onNavigate("signup")} style={{ padding: "16px 36px", background: "#fff", border: "1.5px solid #f0f0f0", color: "#1a1a1a", borderRadius: "14px", fontWeight: 700, fontSize: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", cursor: "pointer" }}>
            🎪 Create Event
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "48px", justifyContent: "center", marginTop: "60px" }}>
          {[["10K+", "Tickets Sold"], ["50+", "Events"], ["99%", "Verified"], ["0%", "Fakes"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#f5a623" }}>{val}</div>
              <div style={{ fontSize: "13px", color: "#aaa", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div id="events" style={{ padding: "60px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "6px" }}>Upcoming Events</h2>
            <p style={{ color: "#aaa", fontSize: "15px" }}>Discover what's happening across Ghana</p>
          </div>
          <span onClick={() => onNavigate("signup")} style={{ color: "#f5a623", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>See all →</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {(events.length > 0 ? events : Array(8).fill(null)).map((ev, i) => (
            <div key={i}
              onClick={() => onNavigate("signup")}
              style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}>
              <div style={{ height: "160px", position: "relative", background: "#f0f0f0" }}>
                <img
                  src={ev?.image || categoryImages[ev?.category] || categoryImages.other}
                  alt={ev?.name || "Event"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.src = categoryImages.other; }}
                />
                {!ev && <div className="skeleton" style={{ position: "absolute", inset: 0 }} />}
                {ev && <div style={{ position: "absolute", top: "10px", left: "10px", background: "#f5a623", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px" }}>{ev.category}</div>}
              </div>
              <div style={{ padding: "14px" }}>
                {ev ? (
                  <>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a1a", marginBottom: "6px", lineHeight: 1.3 }}>{ev.name}</div>
                    <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "10px" }}>📅 {ev.date} · 📍 {ev.venue}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 800, color: "#f5a623", fontSize: "15px" }}>{parseFloat(ev.price) === 0 ? "FREE" : `Ghc ${ev.price}`}</span>
                      <button onClick={e => { e.stopPropagation(); onNavigate("signup"); }} style={{ padding: "6px 14px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Get Tickets</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="skeleton" style={{ height: "14px", width: "80%", marginBottom: "8px" }} />
                    <div className="skeleton" style={{ height: "12px", width: "60%", marginBottom: "10px" }} />
                    <div className="skeleton" style={{ height: "14px", width: "40%" }} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizer CTA */}
      <div id="organizers" style={{ margin: "0 60px 60px", background: "linear-gradient(135deg, #fff8f0, #fff)", border: "1px solid rgba(245,166,35,0.15)", borderRadius: "24px", padding: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 24px rgba(245,166,35,0.08)" }}>
        <div style={{ maxWidth: "520px" }}>
          <div style={{ fontSize: "13px", color: "#f5a623", fontWeight: 700, letterSpacing: "1px", marginBottom: "16px" }}>🎪 FOR ORGANIZERS</div>
          <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>Ready to host your event?</h2>
          <p style={{ color: "#6b6b6b", fontSize: "16px", lineHeight: 1.7, marginBottom: "28px" }}>
            Create events, sell tickets with blockchain verification, manage door staff, and receive 95% of every sale directly to your MoMo wallet.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <span onClick={() => onNavigate("signup")} style={{ padding: "14px 28px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", borderRadius: "14px", fontWeight: 700, fontSize: "15px", boxShadow: "0 6px 20px rgba(245,166,35,0.3)", cursor: "pointer" }}>
              Start Selling Tickets
            </span>
            <span onClick={() => onNavigate("about")} style={{ padding: "14px 28px", background: "#fff", border: "1.5px solid #f0f0f0", color: "#1a1a1a", borderRadius: "14px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
              Learn More
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", flexShrink: 0 }}>
          {[["95%", "Payout to Organizers"], ["⛓️", "NFT Tickets"], ["📱", "MoMo Payments"], ["🔍", "QR Verification"]].map(([icon, label]) => (
            <div key={label} style={{ background: "#fff", borderRadius: "16px", padding: "20px 16px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", width: "130px" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b6b6b", lineHeight: 1.3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div id="about" style={{ background: "#fff", borderTop: "1px solid #f0f0f0", padding: "32px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #f5a623, #e8920f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🎟️</div>
          <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: "14px" }}>Master Events</span>
        </div>
        <div style={{ color: "#bbb", fontSize: "13px" }}>© 2026 Master Events Ghana · Secured by Polygon Blockchain</div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="mailto:mastereventgh@gmail.com" style={{ color: "#aaa", textDecoration: "none", fontSize: "13px" }}>Contact</a>
          <span onClick={() => onNavigate("about")} style={{ color: "#aaa", fontSize: "13px", cursor: "pointer" }}>About</span>
          <span onClick={() => onNavigate("signup")} style={{ color: "#aaa", fontSize: "13px", cursor: "pointer" }}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

// ── Phone Frame (main export) ────────────────────────────────
export default function PhoneFrame({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [desktopPage, setDesktopPage] = useState("home"); // home | login | signup | about | app
  const setScreen = useStore(s => s.setScreen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (page) => {
    if (page === "app") {
      setDesktopPage("app");
    } else if (page === "login") {
      setDesktopPage("login");
    } else if (page === "signup") {
      setDesktopPage("signup");
    } else if (page === "about") {
      setDesktopPage("about");
    } else {
      setDesktopPage("home");
    }
  };

  // ── Mobile: fullscreen app ──────────────────────────────────
  if (isMobile) {
    return (
      <>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html, body, #root { height: 100%; width: 100%; overflow: hidden; background: #f8f8f6; }
        `}</style>
        <div style={{ width: "100%", height: "100vh", background: "#f8f8f6", display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", overflow: "hidden", position: "relative" }}>
          <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </div>
      </>
    );
  }

  // ── Desktop: landing / auth pages ──────────────────────────
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-y: auto; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f8f8f6; }
        ::-webkit-scrollbar-thumb { background: #f5a623; border-radius: 3px; }
        .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 10px; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .screen-enter { animation: fadeSlideUp 0.25s ease forwards; }
      `}</style>

      {desktopPage === "home" && <LandingPage onNavigate={handleNavigate} />}
      {desktopPage === "about" && <AboutPage onNavigate={handleNavigate} />}
      {(desktopPage === "login" || desktopPage === "signup") && (
        <DesktopAuthPage type={desktopPage} onNavigate={handleNavigate} />
      )}
      {desktopPage === "app" && (
        <div style={{ width: "100vw", height: "100vh", background: "#f8f8f6", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      )}
    </>
  );
}