// 🔥 FIXED: TicketView (main error was here)

export function TicketView() {
  const viewingTicket = useStore((s) => s.viewingTicket);
  const setScreen = useStore((s) => s.setScreen);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const setResaleTicket = useStore((s) => s.setResaleTicket);
  const setResalePrice = useStore((s) => s.setResalePrice);
  const setResaleError = useStore((s) => s.setResaleError);
  const setTransferTicket = useStore((s) => s.setTransferTicket);
  const setTransferEmail = useStore((s) => s.setTransferEmail);
  const setTransferName = useStore((s) => s.setTransferName);
  const setTransferDone = useStore((s) => s.setTransferDone);

  const [qrLoaded, setQrLoaded] = useState(false);
  const [qrError, setQrError] = useState(false);

  if (!viewingTicket) return null;

  const ev = viewingTicket.event;

  const formatTime = (t) => {
    if (!t) return "TBA";
    return t.substring(0, 5);
  };

  const qrSrc = viewingTicket.qr_base64
    ? "data:image/png;base64," + viewingTicket.qr_base64
    : viewingTicket.qr_image
    ? viewingTicket.qr_image.startsWith("http")
      ? viewingTicket.qr_image
      : API + viewingTicket.qr_image
    : null;

  const polygonscanUrl = viewingTicket.nft_tx_hash
    ? "https://polygonscan.com/tx/" + viewingTicket.nft_tx_hash
    : null;

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: "40px" }}>
      
      {/* HEADER */}
      <div style={{ height: "220px", position: "relative" }}>
        {ev?.image ? (
          <img
            src={ev.image}
            alt={ev.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #f5a623, #e8920f)" }} />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        <div style={{ position: "absolute", top: "16px", left: "16px" }}>
          <BackBtn
            onClick={() => {
              setScreen("app");
              setActiveTab("tickets");
            }}
          />
        </div>

        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "2px",
              marginBottom: "4px",
            }}
          >
            YOUR TICKET
          </div>
          <div style={{ color: "#fff", fontSize: "22px", fontWeight: 800 }}>
            {ev?.name}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          background: "#fff",
          margin: "16px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
        }}
      >
        {/* INFO */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-around",
            borderBottom: "1px dashed #f0f0f0",
          }}
        >
          {[
            ["📅 DATE", ev?.date || "TBA"],
            ["🕐 TIME", formatTime(ev?.time)],
            ["💺 QTY", viewingTicket.qty || 1],
          ].map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "10px",
                  color: "#bbb",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                {k}
              </div>
              <div style={{ fontWeight: 800 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* QR */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {qrSrc ? (
            <img
              src={qrSrc}
              alt="QR Code"
              onLoad={() => setQrLoaded(true)}
              onError={() => setQrError(true)}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "16px",
                border: "3px solid #f5a623",
              }}
            />
          ) : (
            <div>No QR</div>
          )}

          {/* ✅ FIXED POLYGON LINK */}
          {polygonscanUrl ? (
            <a
              href={polygonscanUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "rgba(39,174,96,0.08)",
                border: "1px solid rgba(39,174,96,0.2)",
                padding: "8px 20px",
                borderRadius: "20px",
                textDecoration: "none",
              }}
            >
              View on Polygonscan
            </a>
          ) : (
            <div>Verified on Polygon</div>
          )}
        </div>
      </div>
    </div>
  );
}