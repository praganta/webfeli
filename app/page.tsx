"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import FinalHeart from "./components/FinalHeart";

type Scene = {
  title: string;
  body: string;
  photo: string;
  caption: string;
};

export default function Page() {
  const girlName = "Felicia Audrey Pramana";

  const scenes: Scene[] = useMemo(
    () => [
      {
        title: `Halo Sayangku Cintaku Cantikuu, ${girlName}.`,
        body:
          "Aku bikin ini bukan buat gaya-gayaan. Aku cuma pengen kamu punya satu tempat kecil yang bisa kamu buka kapan aja saat kamu pengen merasa tenang, atau sekadar pengen diingetin kalau kamu disayang banget.",
        photo: "/feli1.jpeg",
        caption: "Kamu cantik banget di sini. Aku suka banget ituu.",
      },
      {
        title: "Aku Suka Caramu Ada.",
        body:
          "Kamu nggak ribut. Nggak maksa. Tapi entah kenapa, kehadiran kamu selalu kerasa. Dan itu cukup buat bikin aku nyaman.",
        photo: "/feli2.jpeg",
        caption: "Yang sederhana, tapi berarti.",
      },
      {
        title: "Kalau aku kelihatan jauh…",
        body:
          "Bukan karena aku nggak peduli. Kadang aku cuma lagi beresin kepala sendiri yang akhirnya malah marahin kamu.",
        photo: "/feli3.jpeg",
        caption: "Pelan-pelan, semuanya jadi rapi.",
      },
      {
        title: "Aku masih belajar.",
        body:
          "Aku janji belajar lebih sabar, lebih peka, dan lebih ngerti cara mencintai kamu dengan benar. Pelan-pelan, tapi serius.",
        photo: "/feli4.jpeg",
        caption: "Bareng kamu selalu berasa cukup.",
      },
      {
        title: "Yang paling penting…",
        body:
          "Aku sayang kamu, bukan karena momen tertentu. Tapi karena kamu apa adanya. Dan aku bersyukur bisa bareng kamu.",
        photo: "/feli5.jpeg",
        caption: "Kalau suatu hari kamu ragu, balik ke sini ya.",
      },
    ],
    []
  );

  const total = scenes.length;

  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const openingRef = useRef(false);

  const current = scenes[sceneIndex];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function openEnvelope() {
    if (openingRef.current) return;
    openingRef.current = true;
    setPhase(1);
    setTimeout(() => setPhase(2), 900);
  }

  function restart() {
    openingRef.current = false;
    setSceneIndex(0);
    setPhase(0);
  }

  function next() {
    if (sceneIndex >= total - 1) {
      setPhase(3);
    } else {
      setSceneIndex((i) => i + 1);
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg,#05060a,#070813,#04050a)",
        display: "flex",
        justifyContent: "center",
        padding: isMobile ? 12 : 18,
        color: "white",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 860,
          background: "rgba(10,12,20,0.55)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(14px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* CONTENT */}
        <div style={{ padding: isMobile ? 14 : 22 }}>
          {phase === 3 && <FinalHeart onRestart={restart} />}

          {(phase === 0 || phase === 1) && (
            <div
              onClick={phase === 0 ? openEnvelope : undefined}
              style={{
                aspectRatio: "16/11",
                borderRadius: 22,
                background:
                  "linear-gradient(135deg,rgba(255,77,141,.18),rgba(138,180,255,.14))",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 22 }}>💌</div>
            </div>
          )}

          {phase === 2 && (
            <div style={{ display: "grid", gap: 14 }}>
              <img
                src={current.photo}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: 18,
                  objectFit: "cover",
                }}
              />
              <div style={{ opacity: 0.7, fontSize: 13 }}>
                {current.caption}
              </div>
              <h2 style={{ margin: 0 }}>{current.title}</h2>
              <p style={{ lineHeight: 1.8 }}>{current.body}</p>
            </div>
          )}
        </div>

        {/* BOTTOM */}
        {phase === 2 && (
          <div
            style={{
              padding: "14px",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "calc(14px + env(safe-area-inset-bottom))",
            }}
          >
            <button
              onClick={next}
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background:
                  "linear-gradient(135deg,#ff4d8d,#a855f7)",
                border: "none",
                color: "white",
                fontSize: 20,
              }}
            >
              💗
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
