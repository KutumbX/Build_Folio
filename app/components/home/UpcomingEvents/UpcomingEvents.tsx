"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { upcomingEventsData } from "./data";
import EventCard from "./EventCard";

const LIME = "#c6f806";

// Crosshair + marks for Upcoming Events background
const EVENT_PLUS_MARKS = [
  { x: "5%", y: "15%" }, { x: "12%", y: "75%" },
  { x: "24%", y: "35%" }, { x: "36%", y: "85%" },
  { x: "48%", y: "18%" }, { x: "58%", y: "65%" },
  { x: "72%", y: "28%" }, { x: "85%", y: "80%" },
  { x: "94%", y: "22%" }, { x: "18%", y: "50%" },
  { x: "64%", y: "92%" }, { x: "88%", y: "55%" },
];

// Ambient 4-point star sparkles for Upcoming Events
const EVENT_SPARKLES = [
  { x: "8%", y: "22%", size: 14, opacity: 0.8, delay: "0s", duration: "3.2s" },
  { x: "22%", y: "68%", size: 12, opacity: 0.7, delay: "1.2s", duration: "2.8s" },
  { x: "38%", y: "14%", size: 16, opacity: 0.85, delay: "0.5s", duration: "4.0s" },
  { x: "54%", y: "78%", size: 10, opacity: 0.65, delay: "2.1s", duration: "3.5s" },
  { x: "70%", y: "32%", size: 18, opacity: 0.9, delay: "1.8s", duration: "3.1s" },
  { x: "86%", y: "62%", size: 14, opacity: 0.75, delay: "0.8s", duration: "3.8s" },
  { x: "92%", y: "18%", size: 12, opacity: 0.7, delay: "1.5s", duration: "3.4s" },
  { x: "44%", y: "48%", size: 15, opacity: 0.8, delay: "0.3s", duration: "4.2s" },
];

// Glowing dot particles clustered for Upcoming Events background
const EVENT_DOT_PARTICLES = [
  { x: "15%", y: "30%", size: 3, opacity: 0.85, delay: "0s", duration: "3.1s" },
  { x: "28%", y: "55%", size: 2, opacity: 0.7, delay: "0.8s", duration: "2.5s" },
  { x: "42%", y: "22%", size: 4, opacity: 0.9, delay: "1.4s", duration: "3.8s" },
  { x: "50%", y: "68%", size: 3, opacity: 0.75, delay: "0.3s", duration: "2.9s" },
  { x: "65%", y: "40%", size: 5, opacity: 0.95, delay: "1.9s", duration: "4.2s" },
  { x: "78%", y: "75%", size: 3, opacity: 0.8, delay: "0.6s", duration: "3.0s" },
  { x: "85%", y: "28%", size: 2, opacity: 0.7, delay: "2.1s", duration: "3.3s" },
  { x: "92%", y: "52%", size: 4, opacity: 0.85, delay: "1.0s", duration: "2.7s" },
  { x: "35%", y: "82%", size: 3, opacity: 0.75, delay: "1.7s", duration: "3.6s" },
  { x: "60%", y: "15%", size: 2, opacity: 0.65, delay: "0.4s", duration: "2.8s" },
];

interface LoadMoreButtonProps {
  onClick: () => void;
}

// Magnetic Load More Button component matching Hero JOIN COMMUNITY button style
function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Motion values for magnetic tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull calculations
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{
        x: springX,
        y: springY,
        backgroundColor: LIME,
        border: `1px solid ${LIME}`,
        boxShadow: `0 0 22px rgba(198, 248, 6, 0.38)`,
      }}
      className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 text-black font-mono text-[11px] md:text-[12px] font-black uppercase tracking-widest cursor-pointer hover:shadow-[0_0_35px_rgba(198,248,6,0.65)] transition-all duration-300 select-none z-30 outline-none"
    >
      {/* Corner bracket accents matching cyber aesthetic */}
      <div className="absolute top-[-1px] left-[-1px] w-2.5 h-2.5 border-t border-l border-black/40" />
      <div className="absolute bottom-[-1px] right-[-1px] w-2.5 h-2.5 border-b border-r border-black/40" />

      <span>LOAD MORE EVENTS</span>
      <span className="text-[14px] font-bold transform group-hover:translate-y-0.5 transition-transform duration-300">
        ↓
      </span>
    </motion.button>
  );
}

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // visibleCount state: initially 8, increments to 12
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin safely
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger character reveal for the heading
      const chars = headingRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 15, skewX: 10 },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Initial stagger entry reveal for Cards on Scroll
      const cards = gridRef.current?.querySelectorAll(".event-card-wrapper:not(.card-reveal-new)");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    // Disable hovers during active scroll to avoid CPU blocking and Canvas instantiation lags
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      document.body.classList.add("is-scrolling");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // GSAP animation for revealing the next 4 events
  useEffect(() => {
    if (visibleCount > 8) {
      const newCards = gridRef.current?.querySelectorAll(".card-reveal-new");
      if (newCards && newCards.length > 0) {
        gsap.fromTo(
          newCards,
          {
            opacity: 0,
            y: 45,
            scale: 0.95,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }
    }
  }, [visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(12);
  };

  const headingText = "UPCOMING EVENTS";
  const visibleEvents = upcomingEventsData.slice(0, visibleCount);

  return (
    <section
      ref={sectionRef}
      id="upcoming-events"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#000000] select-none font-mono"
    >
      {/* ─── Global keyframes for Hero-style background ─── */}
      <style>{`
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0.8; }
          90%  { top: 100%; opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glowBreath {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.04); }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { transform: scale(0.7) rotate(0deg); opacity: 0.35; }
          50%      { transform: scale(1.3) rotate(12deg); opacity: 1; filter: drop-shadow(0 0 12px rgba(198,248,6,0.95)); }
        }
        @keyframes dotFloat {
          0%, 100% { transform: translateY(0px) scale(0.85); opacity: 0.45; }
          50%      { transform: translateY(-6px) scale(1.25); opacity: 1; filter: drop-shadow(0 0 8px rgba(198,248,6,0.95)); }
        }
      `}</style>

      {/* ─── Fine lime dot grid texture matching Hero ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(198,248,6,0.11) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
          opacity: 0.55,
        }}
      />

      {/* ─── Large lime glow bloom — left anchor ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "10%", top: "20%",
          width: "45%", height: "50%",
          background: `radial-gradient(ellipse at center,
            rgba(198,248,6,0.25) 0%,
            rgba(198,248,6,0.10) 30%,
            transparent 70%)`,
          filter: "blur(65px)",
          animation: "glowBreath 6s ease-in-out infinite",
        }}
      />

      {/* ─── Large lime glow bloom — right anchor ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "10%", bottom: "15%",
          width: "45%", height: "50%",
          background: `radial-gradient(ellipse at center,
            rgba(198,248,6,0.20) 0%,
            rgba(198,248,6,0.08) 35%,
            transparent 70%)`,
          filter: "blur(70px)",
          animation: "glowBreath 8s ease-in-out infinite 2s",
        }}
      />

      {/* ─── Noise film grain ─── */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── Scattered + crosshair marks ─── */}
      {EVENT_PLUS_MARKS.map((p, i) => (
        <svg
          key={`plus-${i}`}
          className="absolute pointer-events-none z-[1]"
          style={{
            left: p.x, top: p.y,
            width: 10, height: 10,
            opacity: 0.25 + (i % 3) * 0.08,
          }}
          viewBox="0 0 10 10"
        >
          <line x1="5" y1="0" x2="5" y2="10" stroke={LIME} strokeWidth="0.8" />
          <line x1="0" y1="5" x2="10" y2="5" stroke={LIME} strokeWidth="0.8" />
          <circle cx="5" cy="5" r="1" fill={LIME} />
        </svg>
      ))}

      {/* ─── Scattered 4-pointed star sparkles ─── */}
      {EVENT_SPARKLES.map((s, i) => (
        <svg
          key={`sparkle-${i}`}
          className="absolute pointer-events-none z-[2]"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `sparkleTwinkle ${s.duration} ease-in-out infinite ${s.delay}`,
          }}
          viewBox="0 0 20 20"
        >
          <path
            d="M10 0 Q10 10 20 10 Q10 10 10 20 Q10 10 0 10 Q10 10 10 0 Z"
            fill={LIME}
          />
        </svg>
      ))}

      {/* ─── Glowing dot particles ─── */}
      {EVENT_DOT_PARTICLES.map((d, i) => (
        <div
          key={`dot-${i}`}
          className="absolute rounded-full pointer-events-none z-[2]"
          style={{
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            backgroundColor: LIME,
            boxShadow: `0 0 ${d.size * 2}px ${LIME}, 0 0 ${d.size * 4}px rgba(198,248,6,0.8)`,
            opacity: d.opacity,
            animation: `dotFloat ${d.duration} ease-in-out infinite ${d.delay}`,
          }}
        />
      ))}

      {/* ─── Horizontal scan line animation ─── */}
      <div
        className="absolute left-0 w-full h-[1px] z-[2] pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${LIME}55, ${LIME}88, ${LIME}55, transparent)`,
          boxShadow: `0 0 6px ${LIME}55`,
          animation: "scanLine 11s linear infinite",
        }}
      />

      {/* Main Section Content Wrapper */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col gap-12">
        
        {/* ─── Premium Heading Row (KUTUMBX Typography Style) ─── */}
        <div
          className="flex items-center gap-4 pb-6"
          style={{
            borderBottom: `1px solid rgba(198, 248, 6, 0.22)`,
            boxShadow: `0 1px 12px rgba(198, 248, 6, 0.08)`,
          }}
        >
          <span 
            className="text-base md:text-xl font-black tracking-widest"
            style={{
              color: LIME,
              textShadow: `0 0 12px rgba(198, 248, 6, 0.65)`,
            }}
          >
            /02
          </span>
          
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider flex flex-wrap"
            style={{
              color: "#000000",
              WebkitTextStroke: `1.8px ${LIME}`,
              textShadow: `0 0 18px rgba(198,248,6,0.25), 0 0 35px rgba(198,248,6,0.1)`,
            }}
          >
            {headingText.split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block select-none whitespace-pre"
              >
                {char}
              </span>
            ))}
          </h2>

          <div className="ml-auto hidden sm:flex items-center gap-4 text-zinc-400 text-[10px] tracking-widest font-semibold">
            <span>SYS_VIEW: ENAB</span>
            <span style={{ color: LIME, textShadow: `0 0 8px ${LIME}` }} className="font-black">+</span>
          </div>
        </div>

        {/* ─── Responsive Grid ─── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
        >
          {visibleEvents.map((event, index) => {
            const isNew = index >= 8;
            return (
              <div 
                key={event.id} 
                className={`event-card-wrapper h-full ${isNew ? "card-reveal-new opacity-0" : ""}`}
              >
                <EventCard event={event} />
              </div>
            );
          })}
        </div>

        {/* ─── Load More Controls Container ─── */}
        <div className="flex items-center justify-center mt-12 py-4">
          {visibleCount < 12 ? (
            <LoadMoreButton onClick={handleLoadMore} />
          ) : (
            // Subtle glass badge shown when all 12 events are loaded
            <div className="relative px-6 py-3.5 bg-zinc-950/70 border border-white/5 rounded-[16px] text-zinc-400 font-mono text-[10px] uppercase tracking-[0.2em] shadow-[0_4px_30px_rgba(255,255,255,0.02)] backdrop-blur-md flex items-center gap-2 select-none animate-fade-in">
              <span className="text-[#39FF14] font-black">✓</span>
              <span>All Events Loaded</span>
            </div>
          )}
        </div>
      </div>

      {/* Global CSS animations for scrolling tech grid */}
      <style jsx global>{`
        .is-scrolling .event-card-wrapper {
          pointer-events: none !important;
        }
        @keyframes gridScroll {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 500px 500px;
          }
        }
      `}</style>
    </section>
  );
}
