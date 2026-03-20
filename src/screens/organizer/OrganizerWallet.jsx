import React, { useState, useEffect } from "react";
import { paymentsAPI } from "../../api";

const BG = "linear-gradient(160deg, #1a0e00 0%, #110900 60%, #1a0e00 100%)";
const CARD = "rgba(255,255,255,0.05)";
const BORDER = "rgba(245,166,35,0.15)";

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
  color: "#fff", border: "none", borderRadius: "50px",
  fontSize: "15px", fontWeight: 800, cursor: "pointer",
  boxShadow: "0 8px 24px rgba(245,166,35,0.35)",
};

export default function OrganizerWallet() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("momo");
  const [momoNumber, setMomoNumber] = useState("");
  const [txRef, setTxRef] = useState("");
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    paymentsAPI.wallet().then(data => {
      if (data.balance !== undefined) {
        setWallet(data);
        setTransactions(data.transactions || []);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const balance = wallet ? parseFloat(wallet.balance) : 0;
  const totalEarned = wallet ? parseFloat(wallet.total_earned) : 0;
  const totalWithdrawn = wallet ? parseFloat(wallet.total_withdrawn) : 0;
  const feesPaid = wallet ? parseFloat(wallet.fees_paid || 0) : 0;

  const handleWithdraw = async () => {
    try {
      const data = await paymentsAPI.withdraw({ amount: parseFloat(amount), method, account: momoNumber });
      if (data.reference) {
        setTxRef(data.reference);
        setWallet(prev => ({ ...prev, balance: data.new_balance }));
        setStep(3);
      } else {
        alert(data.error || "Withdrawal failed");
      }
    } catch (e) {
      alert("Connection error.");
    }
  };

  const getTxColor = (type) => {
    if (type === "sale") return "#27ae60";
    if (type === "withdrawal") return "#5dade2";
    if (type === "fee") return "#e74c3c";
    return "#aaa";
  };

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: "100px" }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontWeight: 800, fontSize: "22px", color: "#fff", marginBottom: "4px" }}>Wallet</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "20px" }}>Your earnings & payouts</div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.3)" }}>Loading wallet...</div>
      ) : (
        <>
          <div style={{ margin: "0 20px 20px", background: "linear-gradient(135deg, #f5a623 0%, #e8920f 100%)", borderRadius: "24px", padding: "24px", color: "#fff", boxShadow: "0 8px 40px rgba(245,166,35,0.3)" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, opacity: 0.85, letterSpacing: "1px", marginBottom: "8px" }}>AVAILABLE BALANCE</div>
            <div style={{ fontSize: "42px", fontWeight: 900, marginBottom: "4px" }}>Ghc {Math.round(balance).toLocaleString()}</div>
            <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "20px" }}>Updated live from sales</div>
            <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.15)", borderRadius: "14px", padding: "12px 16px", marginBottom: "16px" }}>
              {[
                ["Lifetime", "Ghc " + Math.round(totalEarned).toLocaleString()],
                ["Fees Paid", "Ghc " + Math.round(feesPaid).toLocaleString()],
                ["Withdrawn", "Ghc " + Math.round(totalWithdrawn).toLocaleString()],
              ].map(([k, v]) => (
                <div key={k} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>{v}</div>
                  <div style={{ fontSize: "10px", opacity: 0.75 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", opacity: 0.85, marginBottom: "6px" }}>Revenue Split</div>
              <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
                <div style={{ width: "95%", height: "100%", background: "#fff", borderRadius: "4px" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700 }}>95% You</span>
                <span style={{ fontSize: "11px", opacity: 0.75 }}>5% Platform · Paystack Split</span>
              </div>
            </div>
            <button onClick={() => { setShowModal(true); setStep(1); }} style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", borderRadius: "50px", fontWeight: 800, fontSize: "15px", cursor: "pointer" }}>
              💸 WITHDRAW FUNDS
            </button>
          </div>

          <div style={{ padding: "0 20px" }}>
            <div style={{ fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "14px" }}>Transaction History</div>
            {transactions.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>💸</div>
                <div>No transactions yet</div>
              </div>
            )}
            {transactions.map((t, i) => {
              const color = getTxColor(t.type);
              const sign = t.type === "sale" ? "+" : "-";
              return (
                <div key={i} style={{ background: CARD, border: "1px solid " + BORDER, borderRadius: "16px", padding: "14px 16px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "#fff", marginBottom: "3px" }}>{t.description}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{new Date(t.created_at).toLocaleDateString()}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: "14px", color }}>{sign}Ghc {parseFloat(t.amount).toLocaleString()}</div>
                    <div style={{ fontSize: "10px", color, fontWeight: 600, background: color + "22", padding: "2px 8px", borderRadius: "10px", marginTop: "3px" }}>{t.status}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {showModal && (
        <>
          <div onClick={() => setShowModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(160deg, #1e1200 0%, #150d00 100%)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: "28px 28px 0 0", zIndex: 201, padding: "28px 24px 40px" }}>
            {step === 1 && (
              <>
                <div style={{ fontWeight: 800, fontSize: "18px", color: "#fff", marginBottom: "20px" }}>Withdraw Funds</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: "8px" }}>Amount (Ghc)</div>
                <input type="number" placeholder="Min: Ghc 10" value={amount} onChange={e => setAmount(e.target.value)} style={darkInput} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: "8px" }}>Method</div>
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                  {[["momo", "📱 MoMo"], ["bank", "🏦 Bank"]].map(([id, label]) => (
                    <button key={id} onClick={() => setMethod(id)} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid " + (method === id ? "#f5a623" : "rgba(255,255,255,0.1)"), background: method === id ? "rgba(245,166,35,0.15)" : "rgba(255,255,255,0.04)", color: method === id ? "#f5a623" : "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>{label}</button>
                  ))}
                </div>
                <input placeholder={method === "momo" ? "MoMo number e.g. 0241234567" : "Bank account number"} value={momoNumber} onChange={e => setMomoNumber(e.target.value)} style={darkInput} />
                <button onClick={() => { if (amount >= 10 && momoNumber) setStep(2); }} style={darkBtn}>CONTINUE</button>
              </>
            )}
            {step === 2 && (
              <>
                <div style={{ fontWeight: 800, fontSize: "18px", color: "#fff", marginBottom: "20px" }}>Confirm Withdrawal</div>
                {[["Amount", "Ghc " + amount], ["Method", method === "momo" ? "MTN MoMo" : "Bank Transfer"], ["To", momoNumber], ["Processing", "5–10 minutes"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>{k}</span>
                    <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", fontWeight: 700, cursor: "pointer" }}>BACK</button>
                  <button onClick={handleWithdraw} style={{ ...darkBtn, flex: 2 }}>CONFIRM</button>
                </div>
              </>
            )}
            {step === 3 && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
                <div style={{ fontWeight: 800, fontSize: "20px", color: "#fff", marginBottom: "8px" }}>Withdrawal Initiated!</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "20px" }}>
                  Ghc {amount} will arrive in your {method === "momo" ? "MoMo" : "bank"} within 5–10 minutes.
                </div>
                <div style={{ background: "rgba(39,174,96,0.1)", border: "1px solid rgba(39,174,96,0.3)", borderRadius: "14px", padding: "14px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: "#27ae60", fontWeight: 700, marginBottom: "4px" }}>Transaction Reference</div>
                  <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#f5a623" }}>{txRef}</div>
                </div>
                <button onClick={() => { setShowModal(false); setStep(1); setAmount(""); setMomoNumber(""); }} style={darkBtn}>DONE</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}