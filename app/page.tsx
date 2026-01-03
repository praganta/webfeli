"use client";

import React, { useMemo, useRef, useState } from "react";
import FinalHeart from "./components/FinalHeart";

type Scene = {
  title: string;
  body: string;
  photo: string;   // path di /public
  caption: string; // caption buat foto
};

export default function Page() {
  const girlName = "Felicia Audrey Pramana";

  // 5 foto: feli1.jpeg ... feli5.jpeg
  // saran: feli1 foto dia sendiri, sisanya foto kalian berdua
  const scenes: Scene[] = useMemo(
    () => [
      {
        title: `Halo Sayangku Cintaku Cantikuu, ${girlName}.`,
        body:
          "Aku bikin ini bukan buat gaya-gayaan. Aku cuma pengen kamu punya satu tempat kecil yang bisa kamu buka kapan aja saat kamu pengen merasa tenang, atau sekadar pengen diingetin kalau kamu disayang banget yaaa.",
        photo: "/feli1.jpeg",
        caption: "Kamu cantik banget di sini. Aku suka banget ituu.",
      },
      {
        title: "Aku Suka Caramu Ada.",
        body:
          "Kamu nggak ribut. Nggak maksa. Tapi entah kenapa, kehadiran kamu selalu kerasa. Dan itu cukup buat bikin aku nyaman.",
        photo: "/feli2.jpeg",
        caption: "”Yang sederhana, tapi berarti.”",
      },
      {
        title: "Kalau aku kelihatan jauh…",
        body:
          "Bukan karena aku nggak peduli. Kadang aku cuma lagi beresin kepala sendiri yang akhirnya malah marahin kamu :(. ).",
        photo: "/feli3.jpeg",
        caption: "Pelan-pelan, semuanya jadi rapi.",
      },
      {
        title: "Aku masih belajar.",
        body:
          "Aku janji belajar Lebih sabar, lebih peka, dan lebih ngerti cara mencintai kamu dengan benar. Pelan-pelan, tapi serius.",
        photo: "/feli4.jpeg",
        caption: "Yang penting bukan tempatnya. Tapi bareng kamu selalu berasa ‘cukup’.",
      },
      {
        title: "Yang paling penting...",
        body:
          `Aku sayang kamu, bukan karena momen tertentu. Tapi karena kamu apa adanya. Dan aku bersyukur bisa bareng kamu selalu.`,
        photo: "/feli5.jpeg",
        caption: "Kalau suatu hari kamu ragu, balik ke sini ya. felii tetep dihati aga selalu yaa.",
      },
    ],
    []
  );

  const total = scenes.length;

  // 0 = closed envelope
  // 1 = opening animation
  // 2 = reading scenes
  // 3 = halaman akhir (heart animation)
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [sceneIndex, setSceneIndex] = useState(0);

  const openingRef = useRef(false);
  const current = scenes[sceneIndex];

  function openEnvelope() {
    if (openingRef.current) return;
    openingRef.current = true;
    setPhase(1);
    window.setTimeout(() => setPhase(2), 900);
  }

  // ✅ tambahan penting: buat FinalHeart balik ke awal
  function restartToEnvelope() {
    openingRef.current = false;
    setSceneIndex(0);
    setPhase(0);
  }

  function advance() {
    if (phase !== 2) return;

    if (sceneIndex >= total - 1) {
      setPhase(3); // ⬅️ MASUK HALAMAN FINAL
      return;
    }
    setSceneIndex((i) => i + 1);
  }

  const bg = {
    background:
      "radial-gradient(900px 520px at 20% 10%, rgba(255,77,141,0.18) 0%, transparent 55%), radial-gradient(820px 520px at 80% 18%, rgba(138,180,255,0.16) 0%, transparent 55%), radial-gradient(900px 700px at 50% 120%, rgba(168,85,247,0.10) 0%, transparent 55%), linear-gradient(180deg, #05060a 0%, #070813 40%, #04050a 100%)",
  } as const;

  const stageStyle: React.CSSProperties = {
    width: "min(860px, 92vw)",
    minHeight: "min(86vh, 780px)",
    borderRadius: 26,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(10,12,20,0.55)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 26px 90px rgba(0,0,0,0.55)",
    overflow: "hidden",
    position: "relative",
  };

  const letterCardStyle: React.CSSProperties = {
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    padding: 18,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
  };

  const captionStyle: React.CSSProperties = {
    marginTop: 10,
    fontSize: 12.5,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.62)",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        ...bg,
        color: "rgba(255,255,255,0.92)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        display: "grid",
        placeItems: "center",
        padding: 18,
        overflow: "hidden",
      }}
    >
      {/* subtle grain */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\" opacity=\"0.55\"/></svg>')",
        }}
      />

      <div style={stageStyle}>
        {/* ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: -2,
            background:
              "radial-gradient(600px 220px at 20% 0%, rgba(255,77,141,0.22), transparent 60%), radial-gradient(640px 260px at 85% 15%, rgba(138,180,255,0.18), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "grid",
            gridTemplateRows: "1fr auto",
          }}
        >
          {/* CENTER */}
          <div style={{ padding: "26px 18px 10px", display: "grid", placeItems: "center" }}>
            {/* ✅ tambahan: FINAL PAGE */}
            {phase === 3 && <FinalHeart onRestart={restartToEnvelope} />}

            {/* ENVELOPE */}
            {(phase === 0 || phase === 1) && (
              <div
                onClick={phase === 0 ? openEnvelope : undefined}
                role={phase === 0 ? "button" : undefined}
                aria-label={phase === 0 ? "Open letter" : undefined}
                style={{
                  width: "min(580px, 90vw)",
                  aspectRatio: "16/11",
                  borderRadius: 22,
                  position: "relative",
                  overflow: "hidden",
                  cursor: phase === 0 ? "pointer" : "default",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.10)",
                  transform:
                    phase === 1
                      ? "perspective(900px) translateY(-6px) rotateX(8deg) scale(1.06)"
                      : "perspective(900px) rotateX(0deg) scale(1)",
                  transition: "transform 900ms cubic-bezier(.2,.9,.2,1)",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(255,77,141,0.16), rgba(138,180,255,0.10) 45%, rgba(168,85,247,0.10))",
                    opacity: 0.9,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 14,
                    background:
                      "repeating-linear-gradient(90deg, rgba(255,77,141,0.85) 0 12px, rgba(255,255,255,0.88) 12px 24px, rgba(138,180,255,0.88) 24px 36px)",
                    opacity: 0.72,
                  }}
                />

                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 18,
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(0,0,0,0.18)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    right: 26,
                    top: 32,
                    width: 64,
                    height: 78,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background:
                      "linear-gradient(180deg, rgba(255,77,141,0.18), rgba(138,180,255,0.14))",
                    display: "grid",
                    placeItems: "center",
                    transform: "rotate(6deg)",
                    boxShadow: "0 14px 26px rgba(0,0,0,0.35)",
                  }}
                >
                  <div style={{ fontSize: 18, opacity: 0.95 }}>💗</div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: 36,
                    top: 46,
                    width: "58%",
                    color: "rgba(255,255,255,0.80)",
                    fontSize: 12,
                    letterSpacing: 0.2,
                  }}
                >
                  <div style={{ opacity: 0.9, fontWeight: 800 }}>To:</div>
                  <div style={{ marginTop: 6, fontWeight: 750 }}>{girlName}</div>
                  <div style={{ marginTop: 10, opacity: 0.65 }}>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "8px 0" }} />
                    <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "8px 0" }} />
                    <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "8px 0" }} />
                  </div>
                </div>

                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "64%",
                    transformOrigin: "top center",
                    transform:
                      phase === 1
                        ? "perspective(900px) rotateX(72deg)"
                        : "perspective(900px) rotateX(0deg)",
                    transition: "transform 900ms cubic-bezier(.2,.9,.2,1)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 70%)",
                    opacity: 0.95,
                    boxShadow: "0 -20px 45px rgba(0,0,0,0.25)",
                  }}
                />

                {phase === 0 && (
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 20,
                      transform: "translateX(-50%)",
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "rgba(255,77,141,0.90)",
                      boxShadow: "0 0 0 0 rgba(255,77,141,0.35)",
                      animation: "pulse 1.8s ease-in-out infinite",
                    }}
                  />
                )}

                <style>{`
                  @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(255,77,141,0.28); transform: translateX(-50%) scale(1); }
                    50% { box-shadow: 0 0 0 14px rgba(255,77,141,0.00); transform: translateX(-50%) scale(1.06); }
                    100% { box-shadow: 0 0 0 0 rgba(255,77,141,0.00); transform: translateX(-50%) scale(1); }
                  }
                `}</style>
              </div>
            )}

            {/* LETTER */}
            {phase === 2 && (
              <div style={{ width: "min(820px, 92vw)", display: "grid", gap: 16 }}>
                {/* PAGE 1: special header + badge */}
                {sceneIndex === 0 ? (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: 14,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 22,
                          border: "1px solid rgba(255,255,255,0.14)",
                          background:
                            "linear-gradient(135deg, rgba(255,77,141,0.20), rgba(138,180,255,0.14), rgba(168,85,247,0.14))",
                          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          src={current.photo}
                          alt={girlName}
                          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "radial-gradient(80px 80px at 20% 20%, rgba(255,255,255,0.18), transparent 60%)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>

                      <div style={{ display: "grid", gap: 8 }}>
                        <div
                          style={{
                            display: "inline-flex",
                            width: "fit-content",
                            gap: 10,
                            alignItems: "center",
                            padding: "8px 12px",
                            borderRadius: 999,
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.72)",
                            fontSize: 12,
                            letterSpacing: 0.2,
                          }}
                        >
                          <span style={{ opacity: 0.85 }}>for</span>
                          <span style={{ color: "rgba(255,77,141,0.95)", fontWeight: 900 }}>
                            Felicia
                          </span>
                          <span aria-hidden>💗</span>
                        </div>

                        <h1 style={{ margin: 0, fontSize: 26, letterSpacing: -0.5, lineHeight: 1.15 }}>
                          {current.title}
                        </h1>
                        <div style={captionStyle}>{current.caption}</div>
                      </div>
                    </div>

                    <div style={letterCardStyle}>
                      <p style={{ margin: 0, lineHeight: 1.95, fontSize: 15.5, color: "rgba(255,255,255,0.86)" }}>
                        {current.body}
                      </p>
                    </div>
                  </>
                ) : (
                  // PAGES 2..N: text beside photo (beda layout)
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "260px 1fr",
                      gap: 18,
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: "100%",
                          height: 320,
                          borderRadius: 22,
                          border: "1px solid rgba(255,255,255,0.14)",
                          background:
                            "linear-gradient(135deg, rgba(138,180,255,0.16), rgba(168,85,247,0.14), rgba(255,77,141,0.10))",
                          boxShadow: "0 18px 46px rgba(0,0,0,0.45)",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          src={current.photo}
                          alt={girlName}
                          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.40) 100%)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                      <div style={captionStyle}>{current.caption}</div>
                    </div>

                    <div style={{ display: "grid", gap: 12 }}>
                      <h2 style={{ margin: 0, fontSize: 20, letterSpacing: -0.3, lineHeight: 1.2 }}>
                        {current.title}
                      </h2>

                      <div style={letterCardStyle}>
                        <p style={{ margin: 0, lineHeight: 1.95, fontSize: 15.5, color: "rgba(255,255,255,0.86)" }}>
                          {current.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* dots indicator */}
                <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingTop: 2 }} aria-hidden>
                  {Array.from({ length: total }).map((_, i) => {
                    const active = i === sceneIndex;
                    return (
                      <span
                        key={i}
                        style={{
                          width: active ? 18 : 7,
                          height: 7,
                          borderRadius: 999,
                          background: active
                            ? "linear-gradient(90deg, rgba(255,77,141,0.95), rgba(138,180,255,0.85))"
                            : "rgba(255,255,255,0.14)",
                          transition: "all 260ms ease",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM BAR */}
          <div
            style={{
              padding: "14px 16px 16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 12,
              position: "relative",
              zIndex: 3,
              minHeight: 84,
            }}
          >
            {/* tombol muncul hanya saat phase 2 */}
            {phase === 2 && (
              <button
                onClick={advance}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background:
                    "linear-gradient(135deg, rgba(255,77,141,0.92), rgba(168,85,247,0.70), rgba(138,180,255,0.80))",
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 18px 40px rgba(255,77,141,0.16)",
                  display: "grid",
                  placeItems: "center",
                }}
                aria-label="Continue"
              >
                {/* JANGAN DIUBAH: sesuai permintaan kamu */}
                <span style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 18 }}>
                  <span aria-hidden>💗</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
