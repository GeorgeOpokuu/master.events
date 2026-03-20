import React, { useState, useEffect, useRef } from "react";
import useStore from "../../store/useStore";
import { Html5Qrcode } from "html5-qrcode";

const BG = "linear-gradient(160deg, #1a0e00 0%, #110900 60%, #1a0e00 100%)";
const CARD = "rgba(255,255,255,0.05)";
const BORDER = "rgba(245,166,35,0.15)";

const darkBtn = {
  width: "100%", padding: "16px",
  background: "linear-gradient(135deg, #f5a623, #e8920f)",
  color: "#fff", border: "none", borderRadius: "50px",
  fontSize: "15px", fontWeight: 800, cursor: "pointer",
  boxShadow: "0 8px 24px rgba(245,166,35,0.35)",
};

async function verifyTicketAPI(qr_data, event_id) {
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://localhost:8000/api/tickets/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ qr_data, event_id: event_id || 1 }),
    });
    const data = await res.json();
    if (data.valid) {
      return {
        status: "valid", color: "#27ae60", icon: "✅",
        title: "Valid — Admit!",
        msg: data.is_transfer ? "Transferred — verified on blockchain." : "NFT verified on Polygon.",
        holder: data.holder, seat: data.ticket_id,
      };
    } else {
      if (data.reason?.includes("redeemed") || data.reason?.includes("Already")) {
        return { status: "redeemed", color: "#e74c3c", icon: "🚫", title: "Already Redeemed", msg: "Do not admit. Already scanned.", holder: data.holder };
      }
      if (data.reason?.includes("Wrong event")) {
        return { status: "wrong_event", color: "#f5a623", icon: "⚠️", title: "Wrong Event", msg: data.reason, holder: data.holder };
      }
      return { status: "not_found", color: "#e74c3c", icon: "❌", title: "Ticket Not Found", msg: data.reason || "This QR code is not in our system." };
    }
  } catch (e) {
    return { status: "error", color: "#e74c3c", icon: "❌", title: "Connection Error", msg: "Could not reach server." };
  }
}

function QRScanner({ onScan }) {
  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);
  const [camError, setCamError] = useState(false);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    const scannerId = "qr-" + Math.random().toString(36).substr(2, 5);
    if (scannerRef.current) scannerRef.current.id = scannerId;
    const scanner = new Html5Qrcode(scannerId);
    html5QrRef.current = scanner;
    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 200, height: 200 } },
      (text) => { onScanRef.current(text); },
      () => {}
    ).catch(() => setCamError(true));
    return () => {
      if (html5QrRef.current && html5QrRef.current.isScanning) {
        html5QrRef.current.stop().catch(() => {});
      }
    };
  }, []);

  if (camError) return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid " + BORDER, borderRadius: "16px", padding: "40px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>📷</div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Camera unavailable. Use manual entry below.</div>
    </div>
  );

  return (
    <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative" }}>
      <div ref={scannerRef} style={{ width: "100%", background: "#000" }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "200px", height: "200px",
        border: "3px solid #f5a623", borderRadius: "12px",
        pointerEvents: "none",
        boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)"
      }} />
    </div>
  );
}

function TabToggle({ cameraMode, setCameraMode }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
      {[["📷 Camera", true], ["⌨️ Manual", false]].map(([label, mode]) => (
        <button key={label} onClick={() => setCameraMode(mode)} style={{
          flex: 1, padding: "10px", borderRadius: "12px",
          fontWeight: 700, fontSize: "13px", cursor: "pointer",
          border: cameraMode === mode ? "2px solid #f5a623" : "1px solid rgba(255,255,255,0.1)",
          background: cameraMode === mode ? "rgba(245,166,35,0.15)" : "rgba(255,255,255,0.04)",
          color: cameraMode === mode ? "#f5a623" : "rgba(255,255,255,0.4)",
        }}>{label}</button>
      ))}
    </div>
  );
}

function ResultCard({ result }) {
  if (!result) return null;
  return (
    <div style={{
      background: result.color + "15",
      border: "2px solid " + result.color + "44",
      borderRadius: "20px", padding: "20px",
      marginBottom: "14px", textAlign: "center"
    }}>
      <div style={{ fontSize: "48px", marginBottom: "10px" }}>{result.icon}</div>
      <div style={{ color: result.color, fontWeight: 800, fontSize: "20px", marginBottom: "6px" }}>{result.title}</div>
      {result.holder && <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginBottom: "4px" }}>👤 {result.holder}</div>}
      {result.seat && <div style={{ color: "#f5a623", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>🎫 {result.seat}</div>}
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{result.msg}</div>
    </div>
  );
}

export function DoorStaffLogin() {
  const setScreen = useStore(s => s.setScreen);
  const handleDoorStaffLogin = useStore(s => s.handleDoorStaffLogin);
  const doorCode = useStore(s => s.doorCode);
  const setDoorCode = useStore(s => s.setDoorCode);
  const doorCodeError = useStore(s => s.doorCodeError);

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", background: BG }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎫</div>
      <div style={{ fontSize: "24px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>Door Staff Access</div>
      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "32px", textAlign: "center" }}>Enter your invite code from the event organizer</div>
      <input
        value={doorCode}
        onChange={e => setDoorCode(e.target.value.toUpperCase())}
        placeholder="e.g. DOOR-A7K9M2"
        style={{
          width: "100%", padding: "16px 20px", outline: "none", marginBottom: "12px",
          border: "2px solid " + (doorCodeError ? "#e74c3c" : "rgba(245,166,35,0.5)"),
          borderRadius: "14px", fontSize: "18px", fontWeight: 700,
          textAlign: "center", fontFamily: "monospace", boxSizing: "border-box",
          letterSpacing: "2px", background: "rgba(255,255,255,0.06)",
          color: "#fff", caretColor: "#f5a623",
        }}
      />
      {doorCodeError && (
        <div style={{ color: "#ff6b6b", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>⚠️ {doorCodeError}</div>
      )}
      <button onClick={handleDoorStaffLogin} style={{ ...darkBtn, marginBottom: "16px" }}>ENTER EVENT</button>
      <div onClick={() => setScreen("login")} style={{ fontSize: "13px", color: "#f5a623", fontWeight: 600, cursor: "pointer" }}>
        Are you an attendee? Log in here
      </div>
    </div>
  );
}

export function DoorStaffScan() {
  const handleLogout = useStore(s => s.handleLogout);
  const doorStaffUser = useStore(s => s.doorStaffUser);
  const [scanInput, setScanInput] = useState("");
  const [result, setResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [admittedList, setAdmittedList] = useState([]);
  const [cameraMode, setCameraMode] = useState(true);

  const processId = async (id) => {
    if (!id || verifying) return;
    setVerifying(true);
    setResult(null);
    const res = await verifyTicketAPI(id, doorStaffUser?.eventId);
    setResult(res);
    if (res.status === "valid") {
      setAdmittedList(prev => [
        { id, holder: res.holder, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) },
        ...prev.slice(0, 9)
      ]);
    }
    setVerifying(false);
    setScanInput("");
  };

  return (
    <div style={{ background: "linear-gradient(160deg, #0d0700 0%, #080500 100%)", minHeight: "100%", paddingBottom: "40px" }}>
      <div style={{ background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(245,166,35,0.2)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#f5a623", fontWeight: 800, fontSize: "16px" }}>🔍 Door Scanner</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{doorStaffUser?.eventName || "Event"} · {admittedList.length} admitted</div>
        </div>
        <button onClick={handleLogout} style={{ padding: "8px 14px", background: "rgba(231,76,60,0.15)", color: "#ff6b6b", border: "1px solid rgba(231,76,60,0.3)", borderRadius: "20px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Exit</button>
      </div>

      <div style={{ padding: "16px" }}>
        <TabToggle cameraMode={cameraMode} setCameraMode={setCameraMode} />

        {cameraMode ? (
          <div style={{ marginBottom: "14px" }}>
            <QRScanner onScan={processId} />
            {verifying && <div style={{ color: "#f5a623", textAlign: "center", marginTop: "12px", fontSize: "13px" }}>⛓ Verifying on blockchain...</div>}
          </div>
        ) : (
          <div style={{ background: CARD, borderRadius: "16px", padding: "16px", marginBottom: "14px", border: "1px solid " + BORDER }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
              Paste the full QR data from the ticket
            </div>
            <input
              value={scanInput}
              onChange={e => setScanInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && processId(scanInput)}
              placeholder="MASTER-EVENTS:uuid:event_id:user_id"
              style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.06)", border: "2px solid rgba(245,166,35,0.4)", borderRadius: "12px", color: "#fff", fontSize: "13px", fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: "10px", caretColor: "#f5a623" }}
            />
            <button onClick={() => processId(scanInput)} style={{ ...darkBtn, opacity: verifying ? 0.7 : 1 }}>
              {verifying ? "⛓ Verifying..." : "VERIFY TICKET"}
            </button>
          </div>
        )}

        <ResultCard result={result} />

        {admittedList.length > 0 && (
          <div style={{ background: CARD, borderRadius: "16px", padding: "16px", border: "1px solid " + BORDER }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", marginBottom: "10px" }}>✅ Admitted ({admittedList.length})</div>
            {admittedList.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{a.holder}</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{a.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function OrganizerScan() {
  const setScreen = useStore(s => s.setScreen);
  const [scanInput, setScanInput] = useState("");
  const [result, setResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [admittedList, setAdmittedList] = useState([]);
  const [cameraMode, setCameraMode] = useState(true);

  const processId = async (id) => {
    if (!id || verifying) return;
    setVerifying(true);
    setResult(null);
    const res = await verifyTicketAPI(id, null);
    setResult(res);
    if (res.status === "valid") {
      setAdmittedList(prev => [
        { id, holder: res.holder, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) },
        ...prev.slice(0, 9)
      ]);
    }
    setVerifying(false);
    setScanInput("");
  };

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "20px", gap: "14px" }}>
        <button onClick={() => setScreen("orgEventDetail")} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(245,166,35,0.15)", border: "none", cursor: "pointer", color: "#f5a623", fontSize: "18px" }}>←</button>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>Scan Tickets</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <TabToggle cameraMode={cameraMode} setCameraMode={setCameraMode} />

        {cameraMode ? (
          <div style={{ marginBottom: "14px" }}>
            <QRScanner onScan={processId} />
            {verifying && <div style={{ color: "#f5a623", textAlign: "center", marginTop: "12px", fontSize: "13px" }}>⛓ Verifying...</div>}
          </div>
        ) : (
          <div style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: "16px", padding: "16px", marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
              Paste the full QR data from the ticket
            </div>
            <input
              value={scanInput}
              onChange={e => setScanInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && processId(scanInput)}
              placeholder="MASTER-EVENTS:uuid:event_id:user_id"
              style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.06)", border: "2px solid rgba(245,166,35,0.4)", borderRadius: "12px", color: "#fff", fontSize: "13px", fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: "10px", caretColor: "#f5a623" }}
            />
            <button onClick={() => processId(scanInput)} style={{ ...darkBtn, opacity: verifying ? 0.7 : 1 }}>
              {verifying ? "⛓ Verifying..." : "🔍 VERIFY"}
            </button>
          </div>
        )}

        <ResultCard result={result} />

        {admittedList.length > 0 && (
          <div style={{ background: CARD, borderRadius: "16px", padding: "16px", border: "1px solid " + BORDER }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", marginBottom: "10px" }}>✅ Admitted ({admittedList.length})</div>
            {admittedList.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{a.holder}</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{a.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}