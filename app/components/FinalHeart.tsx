"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function generateHeartPoints(countTarget = 5000) {
  const pts: { x: number; y: number }[] = [];
  const xs = 140;
  const ys = 140;

  // (x^2 + y^2 - 1)^3 - x^2*y^3 <= 0
  for (let j = 0; j < ys; j++) {
    const y = 1.25 - (j / (ys - 1)) * 2.35;
    for (let i = 0; i < xs; i++) {
      const x = -1.35 + (i / (xs - 1)) * 2.7;
      const a = x * x + y * y - 1;
      const eq = a * a * a - x * x * y * y * y;
      if (eq <= 0) pts.push({ x, y });
    }
  }

  for (let k = pts.length - 1; k > 0; k--) {
    const r = Math.floor(Math.random() * (k + 1));
    [pts[k], pts[r]] = [pts[r], pts[k]];
  }

  const take = clamp(countTarget, 120, 520);
  return pts.slice(0, take);
}

export default function FinalHeart({
  onRestart,
}: {
  onRestart: () => void;
}) {
  const points = React.useMemo(() => generateHeartPoints(280), []);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div style={{ width: "min(820px, 92vw)", display: "grid", gap: 16, padding: "8px 0 6px" }}>
      <div style={{ textAlign: "center", paddingTop: 6 }}>
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.6, color: "rgba(255,255,255,0.92)" }}>
          Heart Of Love
        </div>
        <div style={{ marginTop: 6, color: "rgba(255,255,255,0.60)", fontSize: 12 }}>
          (buat kamu 🤍)
        </div>
      </div>

      <div
        style={{
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
          overflow: "hidden",
          position: "relative",
          padding: 18,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "min(380px, 52vh)",
            borderRadius: 18,
            background:
              "radial-gradient(600px 260px at 50% 40%, rgba(255,77,141,0.12), transparent 60%), radial-gradient(520px 240px at 60% 55%, rgba(138,180,255,0.10), transparent 60%)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {points.map((p, idx) => {
              const nx = (p.x + 1.35) / 2.7;
              const ny = (1.25 - p.y) / 2.35;

              const delay = idx * 10;
              const size = 10 + (idx % 3);

              return (
                <span
                  key={idx}
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: `${nx * 100}%`,
                    top: `${ny * 100}%`,
                    transform: started ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)",
                    opacity: started ? 1 : 0,
                    transition: `transform 520ms cubic-bezier(.2,.9,.2,1) ${delay}ms, opacity 520ms ease ${delay}ms`,
                    fontSize: size,
                    filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
                    animation: started ? `floaty 2.8s ease-in-out ${delay}ms infinite` : "none",
                  }}
                >
                  💗
                </span>
              );
            })}
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              padding: "10px 12px",
              borderRadius: 16,
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.10)",
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 800ms ease 1100ms, transform 800ms ease 1100ms",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.4, color: "rgba(255,255,255,0.92)" }}>
              I Love You
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.68)" }}>
              (and always love you.)
            </div>
          </div>

          <style>{`
            @keyframes floaty {
              0%, 100% { transform: translate(-50%, -50%) scale(1) translateY(0px); }
              50% { transform: translate(-50%, -50%) scale(1) translateY(-3px); }
            }
          `}</style>
        </div>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
          <button
            onClick={onRestart}
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.86)",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
