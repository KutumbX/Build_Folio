"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { upcomingEventsData } from "./data";
import EventCard from "./EventCard";

interface LoadMoreButtonProps {
  onClick: () => void;
}

// Magnetic Load More Button component
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
      style={{ x: springX, y: springY }}
      className="group relative w-[220px] h-[60px] bg-cyan-950/5 backdrop-blur-md border border-[#00F5FF]/25 rounded-[16px] text-[#00F5FF] font-mono text-[11px] font-black uppercase tracking-widest cursor-pointer shadow-[0_0_15px_rgba(0,245,255,0.08)] hover:shadow-[0_0_25px_rgba(0,245,255,0.3)] hover:border-[#00F5FF]/50 transition-all duration-300 flex items-center justify-center gap-2 select-none z-30 outline-none"
    >
      {/* Green neon accent highlights (Corner brackets) */}
      <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-2 border-l-2 border-[#39FF14] rounded-tl-[16px] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-2 border-r-2 border-[#39FF14] rounded-br-[16px] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      <span>LOAD MORE EVENTS</span>
      <span className="text-[12px] transform group-hover:translate-y-0.5 transition-transform duration-300">
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
      className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#04070C] select-none font-mono"
    >
      {/* ─── Cyberpunk Living Background Canvas ─── */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(0, 245, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          backgroundPosition: "center",
          animation: "gridScroll 45s linear infinite",
        }}
      />

      {/* Cyberpunk Scanlines */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #00F5FF 3px, #00F5FF 6px)",
        }}
      />

      {/* Slow drifting holographic glow spots (bloom anchors) */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/10 to-[#00F5FF]/5 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#39FF14]/5 to-transparent blur-[140px] pointer-events-none animate-pulse duration-[10000ms]" />

      {/* Main Section Content Wrapper */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col gap-12">
        
        {/* ─── Premium Heading Row ─── */}
        <div className="flex items-center gap-4 border-b border-blue-500/10 pb-6">
          <span 
            className="text-base md:text-lg font-black text-[#39FF14] tracking-widest"
            style={{ textShadow: "0 0 10px rgba(57, 255, 20, 0.5)" }}
          >
            /03
          </span>
          
          <h2
            ref={headingRef}
            className="text-2xl md:text-3xl font-black uppercase text-white tracking-widest flex flex-wrap"
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

          <div className="ml-auto hidden sm:flex items-center gap-4 text-zinc-500 text-[10px] tracking-widest font-semibold">
            <span>SYS_VIEW: ENAB</span>
            <span className="text-[#39FF14] font-black">+</span>
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
