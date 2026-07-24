"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────────────────────
const LIME = "#c6f806";

// Crosshair + marks — positions extracted from bg.png
const PLUS_MARKS = [
  { x: "7%", y: "55%" }, { x: "12%", y: "82%" },
  { x: "22%", y: "42%" }, { x: "32%", y: "75%" },
  { x: "38%", y: "34%" }, { x: "44%", y: "65%" },
  { x: "52%", y: "28%" }, { x: "60%", y: "80%" },
  { x: "68%", y: "42%" }, { x: "78%", y: "25%" },
  { x: "84%", y: "70%" }, { x: "15%", y: "68%" },
  { x: "55%", y: "90%" }, { x: "25%", y: "22%" },
  { x: "90%", y: "48%" }, { x: "48%", y: "85%" },
];

// Waveform bar heights for AI_UPLINK
const WAVE_BARS = [0.5, 0.8, 1, 0.6, 0.9, 0.4, 0.7, 1, 0.5, 0.85, 0.6, 0.9, 0.45, 0.7, 0.8, 1, 0.5, 0.65, 0.9, 0.4];

// ─────────────────────────────────────────────────────────────
// Custom hook: Removes fake checkerboard grid pixels automatically
// ─────────────────────────────────────────────────────────────
function useCleanRobotImage(src: string) {
  const [cleanedSrc, setCleanedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Identify neutral gray/white checkerboard pixels
      const isCheckerboard = (r: number, g: number, b: number) => {
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const sat = maxC - minC;
        return sat < 24 && minC > 115;
      };

      const visited = new Uint8Array(w * h);
      const queue: number[] = [];

      // Add all outer border pixels to start flood fill
      for (let x = 0; x < w; x++) {
        queue.push(x, 0);
        queue.push(x, h - 1);
      }
      for (let y = 0; y < h; y++) {
        queue.push(0, y);
        queue.push(w - 1, y);
      }

      let head = 0;
      while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];
        const idx = cy * w + cx;

        if (visited[idx]) continue;
        visited[idx] = 1;

        const p = idx * 4;
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        if (isCheckerboard(r, g, b)) {
          data[p + 3] = 0; // Set alpha to 0

          if (cx > 0) queue.push(cx - 1, cy);
          if (cx < w - 1) queue.push(cx + 1, cy);
          if (cy > 0) queue.push(cx, cy - 1);
          if (cy < h - 1) queue.push(cx, cy + 1);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setCleanedSrc(canvas.toDataURL("image/png"));
    };
  }, [src]);

  return cleanedSrc;
}

// ─────────────────────────────────────────────────────────────
// MAIN HERO SECTION
// ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const kutumbxRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const cleanedRobotSrc = useCleanRobotImage("/images/New folder/robot.png");

  const [coords, setCoords] = useState({ x: "-1.5104", y: "60.3076", z: "-27.9331" });

  // Live coordinate updates
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      frame++;
      if (frame % 4 !== 0) return;
      const t = frame * 0.016;
      const { x: mx, y: my } = mouseRef.current;
      setCoords({
        x: (mx * 52.17 + Math.sin(t * 0.3) * 2).toFixed(4),
        y: (my * -88.77 + Math.cos(t * 0.2) * 2).toFixed(4),
        z: (Math.sin(t * 0.5) * 46.68).toFixed(4),
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Mouse parallax on KUTUMBX and Robot
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
    if (kutumbxRef.current) {
      const tx = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
      const ty = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
      kutumbxRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
    }
    if (robotRef.current) {
      const tx = ((e.clientX - rect.left) / rect.width - 0.5) * -5;
      const ty = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
      robotRef.current.style.transform = `translate(calc(-50% + ${tx}px), ${ty}px)`;
    }
  }, []);

  // GSAP cinematic entrance
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(kutumbxRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }, 0);
      tl.fromTo(robotRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.25);
      tl.fromTo(statusRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.5);
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.7);
      tl.fromTo(statsRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.85);
      tl.fromTo(hudRef.current,
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0.9);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Global keyframes */}
      <style>{`
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0.8; }
          90%  { top: 100%; opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes blinkDot {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes glowBreath {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.04); }
        }
        @keyframes wavePulse {
          0%, 100% { transform: scaleY(0.3); }
          50%      { transform: scaleY(1); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="hero"
        aria-label="KutumbX Hero"
        onMouseMove={handleMouseMove}
        className="relative w-full overflow-hidden font-mono select-none"
        style={{ height: "100vh", minHeight: "600px", background: "#000" }}
      >

        {/* ══════════════════════════════════════════
            LAYER 0 — BACKGROUND SCENE
        ══════════════════════════════════════════ */}

        {/* Fine lime dot grid — matches bg.png texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(198,248,6,0.11) 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
            opacity: 0.55,
          }}
        />

        {/* Large lime glow bloom — the main light source */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "28%", top: "38%",
            width: "52%", height: "58%",
            background: `radial-gradient(ellipse at center,
              rgba(198,248,6,0.45) 0%,
              rgba(198,248,6,0.18) 22%,
              rgba(198,248,6,0.07) 45%,
              transparent 70%)`,
            filter: "blur(55px)",
            animation: "glowBreath 5s ease-in-out infinite",
          }}
        />

        {/* Intense hot-spot core — bright center */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "50%", top: "62%",
            width: "16%", height: "18%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at center,
              rgba(230,255,30,0.95) 0%,
              rgba(198,248,6,0.55) 35%,
              transparent 70%)`,
            filter: "blur(28px)",
          }}
        />

        {/* Noise film grain */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scattered + crosshair marks */}
        {PLUS_MARKS.map((p, i) => (
          <svg
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: p.x, top: p.y,
              width: 10, height: 10,
              opacity: 0.18 + (i % 4) * 0.05,
            }}
            viewBox="0 0 10 10"
          >
            <line x1="5" y1="0" x2="5" y2="10" stroke={LIME} strokeWidth="0.8" />
            <line x1="0" y1="5" x2="10" y2="5" stroke={LIME} strokeWidth="0.8" />
          </svg>
        ))}

        {/* Horizontal scan line animation */}
        <div
          className="absolute left-0 w-full h-[1px] z-[2] pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${LIME}55, ${LIME}88, ${LIME}55, transparent)`,
            boxShadow: `0 0 6px ${LIME}55`,
            animation: "scanLine 9s linear infinite",
          }}
        />


        {/* ══════════════════════════════════════════
            LAYER 3 — KUTUMBX TYPOGRAPHY (UPPER HERO)
        ══════════════════════════════════════════ */}
        <div
          ref={kutumbxRef}
          className="absolute left-0 right-0 z-[5] pointer-events-none"
          style={{
            top: "13%",
            opacity: 0,
            willChange: "transform",
            transition: "transform 0.35s ease-out",
          }}
        >
          <span
            className="w-full font-black uppercase inline-flex items-center justify-center"
            style={{
              fontSize: "clamp(88px, 18.2vw, 258px)",
              color: "#000000ff",
              WebkitTextStroke: `2px ${LIME}`,
              /* Subtle halo only — letters stay dark/hollow like bg.png */
              textShadow: `0 0 18px rgba(198,248,6,0.18), 0 0 40px rgba(198,248,6,0.08)`,
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              textAlign: "center",
              paddingLeft: "1.5%",
              paddingRight: "1.5%",
            }}
          >
            <svg
              viewBox="0 0 90 120"
              className="inline-block"
              style={{
                height: "0.78em",
                width: "auto",
                marginRight: "-0.02em",
                marginTop: "-0.04em",
                verticalAlign: "middle",
                filter: `drop-shadow(0 0 18px rgba(198,248,6,0.18)) drop-shadow(0 0 40px rgba(198,248,6,0.08))`,
              }}
            >
              <path
                d="M0 0 H22 V46 L54 0 H86 L46 56 L88 120 H56 L22 66 V120 H0 Z"
                fill="#000000"
                stroke={LIME}
                strokeWidth="2.5"
                strokeLinejoin="miter"
              />
            </svg>
            <span>UTUMBX</span>
          </span>
        </div>

        {/* ══════════════════════════════════════════
            LAYER 4 — ROBOT CHARACTER (CENTERED CUTOUT)
        ══════════════════════════════════════════ */}
        <div
          ref={robotRef}
          className="absolute z-[6] pointer-events-none flex items-end justify-center"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "clamp(460px, 80vh, 960px)",
            opacity: 0,
            willChange: "transform",
            transition: "transform 0.35s ease-out",
          }}
        >
          {/* Lime aura glow behind robot character */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: 0,
              background: `radial-gradient(ellipse 55% 65% at 50% 60%, rgba(198,248,6,0.15) 0%, transparent 70%)`,
              filter: "blur(25px)",
            }}
          />
          <Image
            src={cleanedRobotSrc || "/images/New folder/robot.png"}
            alt="KutumbX Cyberpunk Robot Character"
            width={720}
            height={980}
            priority
            unoptimized
            className="h-full w-auto max-w-none object-contain object-bottom"
            style={{
              filter: `drop-shadow(0 0 35px rgba(198,248,6,0.32)) drop-shadow(0 0 80px rgba(198,248,6,0.12)) drop-shadow(0 40px 30px rgba(0,0,0,0.85))`,
            }}
          />
        </div>


        {/* ══════════════════════════════════════════
            LAYER 10 — UI ELEMENTS
        ══════════════════════════════════════════ */}

        {/* ── STATUS BADGE — top-left ── */}
        <div
          ref={statusRef}
          className="absolute z-[10]"
          style={{
            top: "clamp(76px, 11vh, 118px)",
            left: "clamp(16px, 3%, 48px)",
            opacity: 0,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: LIME,
                boxShadow: `0 0 8px ${LIME}, 0 0 16px ${LIME}55`,
                animation: "blinkDot 1.4s step-end infinite",
              }}
            />
            <span
              className="tracking-[0.28em] uppercase"
              style={{ color: "#777", fontSize: 11 }}
            >
              [ STATUS: ACTIVE ]
            </span>
          </div>
        </div>

        {/* ── LIVE / SYS_01 — top-right ── */}
        <div
          className="absolute z-[10] hidden sm:block"
          style={{
            top: "clamp(76px, 11vh, 118px)",
            right: "clamp(16px, 3%, 48px)",
          }}
        >
          <div className="relative inline-flex flex-col items-end gap-1">
            {/* Corner bracket top-right */}
            <div
              className="absolute -top-2 -right-2 w-5 h-5 border-t border-r"
              style={{ borderColor: LIME + "50" }}
            />
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: LIME,
                      boxShadow: `0 0 8px ${LIME}`,
                      animation: "blinkDot 1.2s step-end infinite",
                    }}
                  />
                  <span
                    className="font-bold tracking-widest"
                    style={{ color: LIME, fontSize: 12 }}
                  >
                    LIVE
                  </span>
                </div>
                <span className="tracking-widest" style={{ color: "#555", fontSize: 9 }}>
                  //SYS_01
                </span>
              </div>
              {/* Globe icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.42 }}>
                <circle cx="12" cy="12" r="9" stroke={LIME} strokeWidth="0.8" />
                <circle cx="12" cy="12" r="4.5" stroke={LIME} strokeWidth="0.6" />
                <line x1="3" y1="12" x2="21" y2="12" stroke={LIME} strokeWidth="0.6" />
                <line x1="12" y1="3" x2="12" y2="21" stroke={LIME} strokeWidth="0.6" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── CONTENT BLOCK — bottom-left ── */}
        <div
          ref={contentRef}
          className="absolute z-[10]"
          style={{
            bottom: "clamp(165px, 24vh, 230px)",
            left: "clamp(16px, 3%, 48px)",
            maxWidth: "clamp(240px, 30vw, 390px)",
            opacity: 0,
          }}
        >
          <p
            className="text-white leading-snug mb-1"
            style={{ fontSize: "clamp(14px, 1.45vw, 20px)", fontWeight: 700 }}
          >
            Building India&apos;s largest<br />developer ecosystem
          </p>
          <p
            className="leading-relaxed mb-5"
            style={{ fontSize: "clamp(11px, 1vw, 14px)", color: "#777" }}
          >
            powered by{" "}
            <span style={{ color: LIME, fontWeight: 600 }}>AI, Web3</span>
            {" "}and<br />immersive technology.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.a
              href="#community"
              id="hero-join-community"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 uppercase tracking-widest font-black text-black cursor-pointer"
              style={{
                backgroundColor: LIME,
                border: `1px solid ${LIME}`,
                boxShadow: `0 0 22px rgba(198,248,6,0.38)`,
                padding: "10px 20px",
                fontSize: "clamp(9px, 0.85vw, 11px)",
              }}
            >
              JOIN COMMUNITY
              <span style={{ fontSize: 13 }}>→</span>
            </motion.a>

            <motion.a
              href="#labs"
              id="hero-explore-labs"
              whileHover={{ scale: 1.04, borderColor: LIME }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 uppercase tracking-widest font-black text-white cursor-pointer"
              style={{
                background: "transparent",
                border: `1px solid rgba(198,248,6,0.45)`,
                padding: "10px 20px",
                fontSize: "clamp(9px, 0.85vw, 11px)",
                transition: "border-color 0.2s",
              }}
            >
              EXPLORE LABS
              <span style={{ fontSize: 12 }}>↗</span>
            </motion.a>
          </div>
        </div>

        {/* ── STATS ROW — bottom-left, below content ── */}
        <div
          ref={statsRef}
          className="absolute z-[10] flex items-end gap-8"
          style={{
            bottom: "clamp(75px, 11vh, 100px)",
            left: "clamp(16px, 3%, 48px)",
            opacity: 0,
          }}
        >
          {[
            { value: "12K+", label: "DEVELOPERS" },
            { value: "50+", label: "PROJECTS" },
            { value: "AI³", label: "POWERED" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(24px, 2.8vw, 40px)",
                  color: LIME,
                  textShadow: `0 0 18px rgba(198,248,6,0.5)`,
                }}
              >
                {value}
              </span>
              <span
                className="tracking-widest uppercase mt-0.5"
                style={{ fontSize: 9, color: "#555" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Circle sonar badge — bottom-far-left ── */}
        <div
          className="absolute z-[10] hidden sm:block"
          style={{
            bottom: "clamp(36px, 5vh, 55px)",
            left: "clamp(16px, 3%, 48px)",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" style={{ opacity: 0.45 }}>
            <circle cx="19" cy="19" r="17" stroke={LIME} strokeWidth="0.8" />
            <circle cx="19" cy="19" r="11" stroke={LIME} strokeWidth="0.5" opacity="0.6" />
            <circle cx="19" cy="19" r="5" stroke={LIME} strokeWidth="0.5" opacity="0.5" />
            <circle cx="19" cy="19" r="2" fill={LIME} />
          </svg>
        </div>

        {/* ── RIGHT HUD PANELS ── */}
        <div
          ref={hudRef}
          className="absolute z-[10] hidden md:flex flex-col gap-2.5"
          style={{
            right: "clamp(14px, 2.5%, 38px)",
            top: "50%",
            transform: "translateY(-12%)",
            width: "clamp(190px, 18vw, 240px)",
            opacity: 0,
          }}
        >
          {/* ── SYS_RENDER panel ── */}
          <div
            style={{
              border: `1px solid ${LIME}30`,
              background: "rgba(0,0,0,0.78)",
              backdropFilter: "blur(12px)",
              padding: "12px 14px",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2.5">
              <span style={{ color: LIME, fontSize: 10 }}>▶</span>
              <span
                className="font-bold tracking-[0.22em]"
                style={{ color: LIME, fontSize: 10 }}
              >
                SYS_RENDER
              </span>
            </div>
            <div style={{ borderTop: `1px solid ${LIME}20`, marginBottom: 10 }} />

            {/* NET_LATENCY */}
            <div className="flex justify-between items-center mb-1.5">
              <span className="tracking-widest" style={{ color: LIME + "60", fontSize: 8 }}>
                NET_LATENCY
              </span>
              <span className="font-bold" style={{ color: LIME, fontSize: 9 }}>100%</span>
            </div>

            {/* Progress bar */}
            <div
              className="w-full mb-3"
              style={{ height: 2, background: `${LIME}18` }}
            >
              <div
                style={{
                  height: "100%",
                  background: LIME,
                  boxShadow: `0 0 8px ${LIME}`,
                  animation: "progressFill 1.8s ease-out forwards",
                }}
              />
            </div>

            {/* 12ms */}
            <div
              className="font-black mb-3"
              style={{
                color: LIME,
                fontSize: "clamp(16px, 1.6vw, 22px)",
                textShadow: `0 0 10px ${LIME}50`,
              }}
            >
              12ms
            </div>

            {/* /01 + barcode lines */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-black tracking-widest"
                style={{ color: LIME, fontSize: 13 }}
              >
                /01
              </span>
              <div className="flex items-end gap-[2px]">
                {[14, 22, 10, 18, 26, 8, 20, 14, 22, 10, 18, 24, 12, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 2,
                      height: h * 0.55,
                      backgroundColor: LIME,
                      opacity: 0.45,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ≡ three bars */}
            <div className="flex flex-col gap-[3px]">
              {[1, 0.5, 0.72].map((op, i) => (
                <div
                  key={i}
                  className="w-full"
                  style={{ height: 1.5, background: LIME, opacity: op * 0.5 }}
                />
              ))}
            </div>
          </div>

          {/* ── AI_UPLINK + SYS_REF_POS side by side ── */}
          <div className="flex gap-2">

            {/* AI_UPLINK */}
            <div
              style={{
                flex: 1,
                border: `1px solid ${LIME}28`,
                background: "rgba(0,0,0,0.78)",
                backdropFilter: "blur(12px)",
                padding: "10px 10px",
              }}
            >
              <div
                className="tracking-widest mb-2"
                style={{ color: LIME + "60", fontSize: 8 }}
              >
                AI_UPLINK
              </div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span
                  className="font-black"
                  style={{ color: LIME, fontSize: 11 }}
                >
                  LIVE
                </span>
                <span
                  className="rounded-full"
                  style={{
                    width: 6, height: 6,
                    backgroundColor: LIME,
                    boxShadow: `0 0 5px ${LIME}`,
                    animation: "blinkDot 1s step-end infinite",
                    display: "inline-block",
                  }}
                />
              </div>
              {/* EQ waveform bars */}
              <div
                className="flex items-end gap-[1.5px]"
                style={{ height: 22 }}
              >
                {WAVE_BARS.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: `${h * 100}%`,
                      backgroundColor: LIME,
                      opacity: 0.85,
                      transformOrigin: "bottom",
                      animation: `wavePulse ${0.48 + i * 0.055}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* SYS_REF_POS */}
            <div
              style={{
                flex: 1,
                border: `1px solid ${LIME}32`,
                background: "rgba(0,0,0,0.82)",
                backdropFilter: "blur(12px)",
                padding: "10px 10px",
              }}
            >
              <div
                className="font-bold tracking-widest mb-2.5"
                style={{ color: LIME + "60", fontSize: 8 }}
              >
                SYS_REF_POS
              </div>
              <div className="space-y-1.5">
                {[
                  ["X_", coords.x],
                  ["Y_", coords.y],
                  ["Z_", coords.z],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span style={{ color: LIME + "55", fontSize: 9 }}>{label}</span>
                    <span
                      className="font-bold tabular-nums"
                      style={{ color: LIME, fontSize: 9 }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom lime accent line ── */}
        <div
          className="absolute bottom-0 left-0 w-full z-[15]"
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, rgba(198,248,6,0.28), rgba(198,248,6,0.55), rgba(198,248,6,0.28), transparent)`,
          }}
        />

        {/* ── Bottom-right hatch marks //// ── */}
        <svg
          className="absolute z-[10] pointer-events-none"
          style={{ bottom: 10, right: 16, opacity: 0.28 }}
          width="80" height="10" viewBox="0 0 80 10"
        >
          {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72].map((x) => (
            <line
              key={x}
              x1={x} y1="0" x2={x + 6} y2="10"
              stroke={LIME} strokeWidth="1.3"
            />
          ))}
        </svg>

        {/* ── Accessibility skip link ── */}
        <a
          href="#community"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-sm"
        >
          Skip to main content
        </a>

      </section>
    </>
  );
}
