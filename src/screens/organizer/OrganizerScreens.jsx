import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { eventsAPI } from "../../api";

const BG = "#f8f8f6";
const CARD = "#ffffff";
const BORDER = "#f0f0f0";

const input = {
  width: "100%", padding: "14px 18px", marginBottom: "14px",
  background: "#fff", border: "1.5px solid #f0f0f0",
  borderRadius: "14px", fontSize: "14px", color: "#1a1a1a",
  outline: "none", fontFamily: "sans-serif", boxSizing: "border-box",
  caretColor: "#f5a623", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const btn = {
  width: "100%", padding: "16px",
  background: "linear-gradient(135deg, #f5a623, #e8920f)",
  color: "#fff", border: "none", borderRadius: "16px",
  fontSize: "15px", fontWeight: 700, cursor: "pointer",
  boxShadow: "0 8px 24px rgba(245,166,35,0.28)",
  marginBottom: "12px",
};

const categoryImages = {
  music:    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
  tech:     "https://images.unsplash.com/photo-1488229297570-58520851e868?w=600",
  food:     "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
  arts:     "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
  sports:   "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
  business: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600",
  other:    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
};

const CATEGORIES = ["music", "tech", "food", "arts", "sports", "business", "other"];

const mapEvent = e => ({
  id: e.id, name: e.name, date: e.date, venue: e.venue,
  category: e.category || "other", price: parseFloat(e.price),
  totalTickets: e.total_tickets, ticketsSold: e.tickets_sold,
  salesOpen: e.sales_open,
  image: e.image || categoryImages[e.category] || categoryImages.other,
});

// ── Detect desktop ────────────────────────────────────────────
const isDesktop = () => window.innerWidth > 768;

export function OrganizerHome() {
  const orgEvents          = useStore(s => s.orgEvents);
  const setOrgEvents       = useStore(s => s.setOrgEvents);
  const setScreen          = useStore(s => s.setScreen);
  const setViewingOrgEvent = useStore(s => s.setViewingOrgEvent);
  const currentUser        = useStore(s => s.currentUser);
  const [loading, setLoading] = useState(true);
  const desktop = isDesktop();

  useEffect(() => {
    eventsAPI.myEvents().then(data => {
      if (Array.isArray(data)) setOrgEvents(data.map(mapEvent));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalRevenue = orgEvents.reduce((sum, e) => sum + (e.ticketsSold * e.price * 0.95), 0);
  const totalSold    = orgEvents.reduce((sum, e) => sum + e.ticketsSold, 0);

  return (
    <div style={{ background: BG, minHeight: "100%", padding: desktop ? "32px 40px 60px" : "20px 20px 120px" }}>

      {/* Header — only show on mobile (desktop has sidebar) */}
      {!desktop && (
        <>
          <div style={{ marginBottom: "4px" }}>
            <div style={{ fontWeight: 800, fontSize: "22px", color: "#1a1a1a", letterSpacing: "-0.3px" }}>Dashboard</div>
            <div style={{ color: "#aaa", fontSize: "13px", marginTop: "2px" }}>{"Welcome back, " + currentUser?.first_name + " 👋"}</div>
          </div>
          <div style={{ height: "1px", background: BORDER, margin: "16px 0" }} />
        </>
      )}

      {/* Desktop welcome */}
      {desktop && (
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "13px", color: "#f5a623", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>OVERVIEW</div>
          <div style={{ fontWeight: 800, fontSize: "28px", color: "#1a1a1a", letterSpacing: "-0.5px" }}>
            {"Good day, " + currentUser?.first_name + " 👋"}
          </div>
          <div style={{ color: "#aaa", fontSize: "14px", marginTop: "4px" }}>Here's what's happening with your events</div>
        </div>
      )}

      {loading ? (
        <div className={desktop ? "grid grid-cols-3 gap-5" : "stagger"}>
          {[1,2,3].map(i => (
            <div key={i} style={{ background: CARD, borderRadius: "20px", marginBottom: desktop ? 0 : "14px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="skeleton" style={{ height: "110px" }} />
              <div style={{ padding: "12px 16px" }}>
                <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "8px" }} />
                <div className="skeleton" style={{ height: "12px", width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(4, 1fr)" : "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
            {[
              { label: "Total Revenue", value: "Ghc " + Math.round(totalRevenue).toLocaleString(), icon: "💰", color: "#27ae60", bg: "rgba(39,174,96,0.08)" },
              { label: "Tickets Sold",  value: totalSold,                                           icon: "🎟️", color: "#5dade2", bg: "rgba(93,173,226,0.08)" },
              { label: "Active Events", value: orgEvents.filter(e => e.salesOpen).length,           icon: "🎪", color: "#f5a623", bg: "rgba(245,166,35,0.08)" },
              { label: "Platform Fee",  value: "5%",                                                icon: "🔗", color: "#a29bfe", bg: "rgba(162,155,254,0.08)" },
            ].map(card => (
              <div key={card.label} className="stat-card"
                style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "12px" }}>{card.icon}</div>
                <div style={{ fontSize: desktop ? "24px" : "20px", fontWeight: 800, color: card.color, letterSpacing: "-0.3px" }}>{card.value}</div>
                <div style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>{card.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.15)", borderRadius: "16px", padding: "14px 20px", marginBottom: "28px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#f5a623", marginBottom: "4px" }}>💡 How Payouts Work</div>
            <div style={{ fontSize: "13px", color: "#6b6b6b", lineHeight: 1.6 }}>
              Attendees pay via MoMo or VISA. <span style={{ color: "#27ae60", fontWeight: 700 }}>95% goes to your wallet</span>, 5% platform fee.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ fontWeight: 800, fontSize: "18px", color: "#1a1a1a" }}>Your Events</div>
            {desktop && (
              <button onClick={() => setScreen("addEvent")}
                style={{ padding: "10px 20px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(245,166,35,0.3)" }}>
                + New Event
              </button>
            )}
          </div>

          {orgEvents.length === 0 && (
            <div className="fade-in" style={{ textAlign: "center", padding: "60px 40px", color: "#aaa", background: CARD, borderRadius: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎪</div>
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>No events yet</div>
              <div style={{ fontSize: "14px" }}>Create your first event to get started</div>
            </div>
          )}

          {/* ✅ 3-column on desktop, 1-column on mobile */}
          <div style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(3, 1fr)" : "1fr", gap: desktop ? "20px" : "14px" }}>
            {orgEvents.map(ev => (
              <div key={ev.id}
                onClick={() => { setViewingOrgEvent(ev); setScreen("orgEventDetail"); }}
                className="event-card"
                style={{ background: CARD, borderRadius: "20px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <div style={{ height: "160px", position: "relative" }}>
                  <img src={ev.image} alt={ev.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.src = categoryImages.other; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.7))" }} />
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: ev.salesOpen ? "#27ae60" : "#aaa", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
                    {ev.salesOpen && <div className="pulse" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#fff" }} />}
                    {ev.salesOpen ? "LIVE" : "CLOSED"}
                  </div>
                  <div style={{ position: "absolute", top: "10px", left: "10px", background: "#f5a623", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "10px" }}>{ev.category}</div>
                  <div style={{ position: "absolute", bottom: "10px", left: "12px", right: "12px" }}>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: "14px", marginBottom: "2px" }}>{ev.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>{"📍 " + ev.venue + " · " + ev.date}</div>
                  </div>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#27ae60", fontWeight: 700 }}>{"Ghc " + Math.round(ev.ticketsSold * ev.price * 0.95).toLocaleString()}</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>{ev.ticketsSold + "/" + ev.totalTickets + " sold"}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function OrganizerEvents() {
  const orgEvents          = useStore(s => s.orgEvents);
  const setOrgEvents       = useStore(s => s.setOrgEvents);
  const setViewingOrgEvent = useStore(s => s.setViewingOrgEvent);
  const setScreen          = useStore(s => s.setScreen);
  const [loading, setLoading] = useState(true);
  const desktop = isDesktop();

  useEffect(() => {
    eventsAPI.myEvents().then(data => {
      if (Array.isArray(data)) setOrgEvents(data.map(mapEvent));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100%", padding: desktop ? "32px 40px 60px" : "20px 20px 120px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          {desktop && <div style={{ fontSize: "12px", color: "#f5a623", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>EVENTS</div>}
          <div style={{ fontWeight: 800, fontSize: desktop ? "28px" : "22px", color: "#1a1a1a", letterSpacing: "-0.3px" }}>My Events</div>
        </div>
        <button onClick={() => setScreen("addEvent")}
          style={{ padding: "10px 20px", background: "linear-gradient(135deg, #f5a623, #e8920f)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(245,166,35,0.3)" }}>
          + New Event
        </button>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(3, 1fr)" : "1fr", gap: desktop ? "20px" : "14px" }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ background: CARD, borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="skeleton" style={{ height: "160px" }} />
              <div style={{ padding: "12px 16px" }}>
                <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "8px" }} />
                <div className="skeleton" style={{ height: "12px", width: "40%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {orgEvents.length === 0 && (
            <div className="fade-in" style={{ textAlign: "center", padding: "60px 40px", color: "#aaa", background: CARD, borderRadius: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎪</div>
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>No events yet</div>
              <div style={{ fontSize: "14px" }}>Click + New Event to get started</div>
            </div>
          )}
          {/* ✅ 3-column on desktop */}
          <div style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(3, 1fr)" : "1fr", gap: desktop ? "20px" : "14px" }}>
            {orgEvents.map(ev => (
              <div key={ev.id}
                onClick={() => { setViewingOrgEvent(ev); setScreen("orgEventDetail"); }}
                className="event-card"
                style={{ background: CARD, borderRadius: "20px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <div style={{ height: "160px", position: "relative" }}>
                  <img src={ev.image} alt={ev.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.src = categoryImages.other; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.75))" }} />
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: ev.salesOpen ? "#27ae60" : "#aaa", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "10px" }}>
                    {ev.salesOpen ? "LIVE" : "CLOSED"}
                  </div>
                  <div style={{ position: "absolute", top: "10px", left: "10px", background: "#f5a623", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "10px" }}>{ev.category}</div>
                  <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px" }}>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: "15px", marginBottom: "2px" }}>{ev.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>{"📍 " + ev.venue + " · " + ev.date}</div>
                  </div>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#27ae60", fontWeight: 700 }}>{"Ghc " + Math.round(ev.ticketsSold * ev.price * 0.95).toLocaleString()}</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>{ev.ticketsSold + "/" + ev.totalTickets + " sold"}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function OrganizerAlerts() {
  const orgEvents = useStore(s => s.orgEvents);
  const desktop = isDesktop();
  const alerts = orgEvents.length > 0 ? [
    { icon: "💰", color: "#27ae60", title: "Revenue Update",  body: "Your events have generated Ghc " + Math.round(orgEvents.reduce((s, e) => s + e.ticketsSold * e.price * 0.95, 0)).toLocaleString() + " in total revenue.", time: "Just now" },
    { icon: "🎟️", color: "#5dade2", title: "Tickets Sold",   body: orgEvents.reduce((s, e) => s + e.ticketsSold, 0) + " tickets sold across " + orgEvents.length + " events.", time: "Today" },
    { icon: "🎪", color: "#f5a623", title: "Active Events",   body: "You have " + orgEvents.filter(e => e.salesOpen).length + " active events with sales open.", time: "Today" },
  ] : [
    { icon: "🔔", color: "#f5a623", title: "No alerts yet", body: "Create an event and start selling tickets to see your alerts here.", time: "Now" },
  ];

  return (
    <div style={{ background: BG, minHeight: "100%", padding: desktop ? "32px 40px 60px" : "20px 20px 120px" }}>
      {desktop && <div style={{ fontSize: "12px", color: "#f5a623", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>NOTIFICATIONS</div>}
      <div style={{ fontWeight: 800, fontSize: desktop ? "28px" : "22px", color: "#1a1a1a", marginBottom: "20px", letterSpacing: "-0.3px" }}>Alerts</div>
      <div style={{ maxWidth: desktop ? "640px" : "100%" }} className="stagger">
        {alerts.map((a, i) => (
          <div key={i} className="fade-in"
            style={{ background: CARD, borderRadius: "16px", padding: "18px", marginBottom: "12px", display: "flex", gap: "16px", alignItems: "flex-start", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: a.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a1a", marginBottom: "4px" }}>{a.title}</div>
              <div style={{ fontSize: "13px", color: "#6b6b6b", lineHeight: 1.5, marginBottom: "6px" }}>{a.body}</div>
              <div style={{ fontSize: "11px", color: "#bbb" }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AddEvent() {
  const addEventForm    = useStore(s => s.addEventForm);
  const setAddEventForm = useStore(s => s.setAddEventForm);
  const handleAddEvent  = useStore(s => s.handleAddEvent);
  const setScreen       = useStore(s => s.setScreen);
  const [imageType, setImageType] = useState("upload");
  const desktop = isDesktop();

  const fields = [
    ["name",         "Event Name *",         "text",   "e.g. Afrobeats Night 2026"],
    ["subtitle",     "Subtitle",             "text",   "e.g. The biggest night in Accra"],
    ["date",         "Date *",               "date",   ""],
    ["time",         "Time *",               "time",   ""],
    ["venue",        "Venue *",              "text",   "e.g. Accra Sports Stadium"],
    ["city",         "City",                 "text",   "e.g. Accra"],
    ["price",        "Ticket Price (Ghc) *", "number", "e.g. 150"],
    ["totalTickets", "Total Tickets *",      "number", "e.g. 500"],
    ["description",  "Description",          "text",   "Short description of the event"],
  ];

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: "60px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "20px 24px", gap: "14px", background: "#fff", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => setScreen("app")}
          style={{ width: "38px", height: "38px", borderRadius: "12px", background: "#f8f8f6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>←</button>
        <div style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a" }}>Create Event</div>
      </div>

      <div style={{ padding: desktop ? "32px 40px" : "20px", maxWidth: desktop ? "800px" : "100%" }}>
        {/* Category */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", color: "#6b6b6b", fontWeight: 600, marginBottom: "10px" }}>Category *</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {CATEGORIES.map(cat => (
              <div key={cat} onClick={() => setAddEventForm({ ...addEventForm, category: cat })}
                className="chip"
                style={{ padding: "8px 18px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: 600,
                  border: "1.5px solid " + (addEventForm.category === cat ? "#f5a623" : "#f0f0f0"),
                  background: addEventForm.category === cat ? "rgba(245,166,35,0.08)" : "#fff",
                  color: addEventForm.category === cat ? "#f5a623" : "#6b6b6b",
                }}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", color: "#6b6b6b", fontWeight: 600, marginBottom: "10px" }}>Event Image</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {[["upload", "📷 Upload"], ["url", "🔗 URL"]].map(([t, label]) => (
              <div key={t} onClick={() => setImageType(t)} className="chip"
                style={{ flex: 1, padding: "10px", borderRadius: "12px", textAlign: "center", cursor: "pointer", fontSize: "13px", fontWeight: 600,
                  border: "1.5px solid " + (imageType === t ? "#f5a623" : "#f0f0f0"),
                  background: imageType === t ? "rgba(245,166,35,0.08)" : "#fff",
                  color: imageType === t ? "#f5a623" : "#6b6b6b",
                }}>
                {label}
              </div>
            ))}
          </div>
          {imageType === "upload" ? (
            <div>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/jpg" id="event-image-upload" style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => setAddEventForm({ ...addEventForm, image: ev.target.result });
                  reader.readAsDataURL(file);
                }} />
              <label htmlFor="event-image-upload"
                style={{ display: "block", padding: "28px 20px", background: "#fff", border: "2px dashed #f0f0f0", borderRadius: "16px", textAlign: "center", cursor: "pointer" }}>
                {addEventForm.image?.startsWith("data:") || addEventForm.image?.startsWith("http") ? (
                  <div>
                    <img src={addEventForm.image} alt="preview"
                      style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} />
                    <div style={{ color: "#27ae60", fontSize: "13px", fontWeight: 700 }}>✅ Image selected — click to change</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>📷</div>
                    <div style={{ color: "#6b6b6b", fontSize: "14px", fontWeight: 600 }}>Click to upload JPG or PNG</div>
                    <div style={{ color: "#bbb", fontSize: "12px", marginTop: "4px" }}>Max 5MB</div>
                  </div>
                )}
              </label>
            </div>
          ) : (
            <div>
              <input type="text" placeholder="https://..."
                value={addEventForm.image?.startsWith("data:") ? "" : (addEventForm.image || "")}
                onChange={e => setAddEventForm({ ...addEventForm, image: e.target.value })}
                style={input} />
              {addEventForm.category && !addEventForm.image?.startsWith("http") && (
                <div style={{ marginTop: "-8px", marginBottom: "10px" }}>
                  <img src={categoryImages[addEventForm.category]} alt="preview"
                    style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px", opacity: 0.7 }} />
                  <div style={{ fontSize: "11px", color: "#bbb", marginTop: "4px" }}>Auto image for {addEventForm.category}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fields — 2 columns on desktop */}
        <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: desktop ? "0 24px" : "0" }}>
          {fields.map(([key, label, type, placeholder]) => (
            <div key={key} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", color: "#6b6b6b", fontWeight: 600, marginBottom: "8px" }}>{label}</div>
              <input type={type} placeholder={placeholder} value={addEventForm[key] || ""}
                onChange={e => setAddEventForm({ ...addEventForm, [key]: e.target.value })}
                style={{ ...input, marginBottom: 0, colorScheme: "light" }} />
            </div>
          ))}
        </div>

        <button onClick={handleAddEvent} style={{ ...btn, marginTop: "16px", maxWidth: desktop ? "320px" : "100%" }}>
          🎪 Create Event
        </button>
      </div>
    </div>
  );
}

export function OrganizerEventDetail() {
  const viewingOrgEvent    = useStore(s => s.viewingOrgEvent);
  const setViewingOrgEvent = useStore(s => s.setViewingOrgEvent);
  const toggleSales        = useStore(s => s.toggleSales);
  const generateDoorCode   = useStore(s => s.generateDoorCode);
  const doorStaffInvites   = useStore(s => s.doorStaffInvites);
  const setScreen          = useStore(s => s.setScreen);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editImageType, setEditImageType] = useState("upload");
  const desktop = isDesktop();

  if (!viewingOrgEvent) return null;
  const ev = viewingOrgEvent;
  const revenue = Math.round(ev.ticketsSold * ev.price * 0.95);
  const fee     = Math.round(ev.ticketsSold * ev.price * 0.05);
  const invites = doorStaffInvites[ev.id] || [];
  const soldPct = ev.totalTickets > 0 ? Math.round((ev.ticketsSold / ev.totalTickets) * 100) : 0;
  const coverImage = ev.image || categoryImages[ev.category] || categoryImages.other;

  const startEdit = () => {
    setEditForm({ name: ev.name, venue: ev.venue, date: ev.date, time: ev.time, price: ev.price, description: ev.description || "", image: ev.image || "" });
    setEditing(true);
  };
  const saveEdit = () => {
    setViewingOrgEvent({ ...ev, ...editForm, price: parseFloat(editForm.price) });
    setEditing(false);
  };

  if (editing) return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: "60px" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "20px 24px", gap: "14px", background: "#fff", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => setEditing(false)}
          style={{ width: "38px", height: "38px", borderRadius: "12px", background: "#f8f8f6", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>←</button>
        <div style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a" }}>Edit Event</div>
      </div>
      <div style={{ padding: desktop ? "32px 40px" : "20px", maxWidth: desktop ? "700px" : "100%" }}>

        {/* ✅ Image upload in edit */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", color: "#6b6b6b", fontWeight: 600, marginBottom: "10px" }}>Event Image</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {[["upload", "📷 Upload"], ["url", "🔗 URL"]].map(([t, label]) => (
              <div key={t} onClick={() => setEditImageType(t)} className="chip"
                style={{ flex: 1, padding: "10px", borderRadius: "12px", textAlign: "center", cursor: "pointer", fontSize: "13px", fontWeight: 600,
                  border: "1.5px solid " + (editImageType === t ? "#f5a623" : "#f0f0f0"),
                  background: editImageType === t ? "rgba(245,166,35,0.08)" : "#fff",
                  color: editImageType === t ? "#f5a623" : "#6b6b6b",
                }}>
                {label}
              </div>
            ))}
          </div>
          {editImageType === "upload" ? (
            <div>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/jpg" id="edit-image-upload" style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => setEditForm({ ...editForm, image: ev.target.result });
                  reader.readAsDataURL(file);
                }} />
              <label htmlFor="edit-image-upload"
                style={{ display: "block", padding: "24px 20px", background: "#fff", border: "2px dashed #f0f0f0", borderRadius: "16px", textAlign: "center", cursor: "pointer" }}>
                {editForm.image ? (
                  <div>
                    <img src={editForm.image} alt="preview"
                      style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} />
                    <div style={{ color: "#27ae60", fontSize: "13px", fontWeight: 700 }}>✅ Click to change image</div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>📷</div>
                    <div style={{ color: "#6b6b6b", fontSize: "13px", fontWeight: 600 }}>Click to upload new image</div>
                  </div>
                )}
              </label>
            </div>
          ) : (
            <input type="text" placeholder="https://..."
              value={editForm.image?.startsWith("data:") ? "" : (editForm.image || "")}
              onChange={e => setEditForm({ ...editForm, image: e.target.value })}
              style={input} />
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: desktop ? "0 24px" : "0" }}>
          {[["name","Event Name","text"],["venue","Venue","text"],["date","Date","date"],["time","Time","time"],["price","Ticket Price (Ghc)","number"],["description","Description","text"]].map(([key, label, type]) => (
            <div key={key} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", color: "#6b6b6b", fontWeight: 600, marginBottom: "8px" }}>{label}</div>
              <input type={type} value={editForm[key] || ""}
                onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                style={{ ...input, marginBottom: 0, colorScheme: "light" }} />
            </div>
          ))}
        </div>
        <button onClick={saveEdit} style={{ ...btn, marginTop: "16px", maxWidth: desktop ? "280px" : "100%" }}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: "60px" }}>
      {/* Hero */}
      <div style={{ height: desktop ? "280px" : "220px", position: "relative" }}>
        <img src={coverImage} alt={ev.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.src = categoryImages.other; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))" }} />
        <button onClick={() => setScreen("app")}
          style={{ position: "absolute", top: "16px", left: "16px", width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>←</button>
        <button onClick={startEdit}
          style={{ position: "absolute", top: "16px", right: "16px", padding: "8px 18px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "20px", color: "#1a1a1a", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
          ✏️ Edit
        </button>
        <div style={{ position: "absolute", bottom: "20px", left: "24px", right: "24px" }}>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>{(ev.category || "").toUpperCase()}</div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: desktop ? "28px" : "20px" }}>{ev.name}</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "4px" }}>{"📍 " + ev.venue + " · " + ev.date}</div>
        </div>
      </div>

      <div style={{ padding: desktop ? "32px 40px" : "20px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(4, 1fr)" : "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          {[
            ["Revenue (95%)", "Ghc " + revenue.toLocaleString(), "#27ae60"],
            ["Platform Fee",  "Ghc " + fee.toLocaleString(),     "#e74c3c"],
            ["Tickets Sold",  ev.ticketsSold + " / " + ev.totalTickets, "#5dade2"],
            ["Admitted",      (ev.admittedCount || 0) + " people", "#f5a623"],
          ].map(([k, v, c]) => (
            <div key={k} className="stat-card"
              style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: "14px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "18px", fontWeight: 800, color: c }}>{v}</div>
              <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{k}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ background: CARD, borderRadius: "14px", padding: "16px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6b6b6b" }}>Ticket Sales</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: soldPct > 80 ? "#e74c3c" : "#27ae60" }}>{soldPct + "% sold"}</span>
          </div>
          <div style={{ height: "6px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: soldPct + "%", height: "100%", background: soldPct > 80 ? "linear-gradient(90deg,#e74c3c,#c0392b)" : "linear-gradient(90deg,#f5a623,#e8920f)", borderRadius: "3px", transition: "width 0.6s ease" }} />
          </div>
          <div style={{ fontSize: "12px", color: "#aaa", marginTop: "6px" }}>{(ev.totalTickets - ev.ticketsSold) + " tickets remaining"}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: "12px", marginBottom: "20px" }}>
          <button onClick={() => toggleSales(ev.id)}
            style={{ ...btn, marginBottom: 0, background: ev.salesOpen ? "linear-gradient(135deg,#e74c3c,#c0392b)" : "linear-gradient(135deg,#27ae60,#1e8449)" }}>
            {ev.salesOpen ? "⏸ Pause Ticket Sales" : "▶ Resume Ticket Sales"}
          </button>
          <button onClick={() => setScreen("scanTicket")}
            style={{ ...btn, marginBottom: 0, background: "#f8f8f6", border: "1.5px solid #f0f0f0", boxShadow: "none", color: "#1a1a1a" }}>
            🔍 Scan Tickets at Door
          </button>
        </div>

        {/* Door staff */}
        <div style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: "16px", padding: "20px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a1a", marginBottom: "14px" }}>🚪 Door Staff Access</div>
          <button onClick={() => generateDoorCode(ev.id, ev.name)}
            style={{ width: "100%", padding: "12px", background: "rgba(245,166,35,0.06)", color: "#f5a623", border: "2px dashed rgba(245,166,35,0.3)", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: "pointer", marginBottom: "12px" }}>
            + Generate Door Staff Invite Code
          </button>
          {invites.map(inv => (
            <div key={inv.code}
              style={{ background: inv.used ? "#f8f8f6" : "rgba(245,166,35,0.05)", border: "1px solid " + (inv.used ? "#f0f0f0" : "rgba(245,166,35,0.2)"), borderRadius: "10px", padding: "10px 14px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: inv.used ? "#bbb" : "#f5a623", fontSize: "14px" }}>{inv.code}</span>
              <span style={{ fontSize: "11px", color: inv.used ? "#bbb" : "#27ae60", fontWeight: 600 }}>{inv.used ? "USED" : "ACTIVE"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}