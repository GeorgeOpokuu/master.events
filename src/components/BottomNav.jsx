import React from "react";
import useStore from "../store/useStore";

export default function BottomNav() {
  const activeTab = useStore(s => s.activeTab);
  const setActiveTab = useStore(s => s.setActiveTab);
  const setScreen = useStore(s => s.setScreen);
  const role = useStore(s => s.role);

  const attendeeTabs = [
    { id: "home",    icon: "🏠", label: "Home" },
    { id: "tickets", icon: "🎟️", label: "Tickets" },
    { id: "alerts",  icon: "🔔", label: "Alerts" },
  ];

  const organizerTabs = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "events",    icon: "🎪", label: "Events" },
    { id: "wallet",    icon: "💰", label: "Wallet" },
    { id: "alerts",    icon: "🔔", label: "Alerts" },
  ];

  const tabs = role === "organizer" ? organizerTabs : attendeeTabs;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 300,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid #f0f0f0",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "64px",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      {tabs.map(item => {
        const active = activeTab === item.id;
        return (
          <div
            key={item.id}
            className="nav-item"
            onClick={() => { setActiveTab(item.id); setScreen("app"); }}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "3px", flex: 1, height: "100%",
              cursor: "pointer",
              background: active ? "rgba(245,166,35,0.07)" : "transparent",
              borderRadius: "12px",
              margin: "6px 4px",
            }}>
            <div style={{
              fontSize: "22px", lineHeight: 1,
              transform: active ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
            }}>
              {item.icon}
            </div>
            <div style={{
              fontSize: "10px",
              fontWeight: active ? 700 : 500,
              color: active ? "#f5a623" : "#bbb",
              letterSpacing: "0.2px",
              transition: "color 0.2s, font-weight 0.2s",
            }}>
              {item.label}
            </div>
            {/* Active indicator */}
            <div style={{
              width: active ? "18px" : "0px",
              height: "3px",
              borderRadius: "2px",
              background: "#f5a623",
              transition: "width 0.25s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </div>
        );
      })}
    </div>
  );
}