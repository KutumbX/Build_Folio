"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JoinModal from "./JoinModal";
import CommunityParticles from "./CommunityParticles";

const LIME = "#c6f806";

// Crosshair + marks for Community Hub background
const COMMUNITY_PLUS_MARKS = [
  { x: "6%", y: "18%" }, { x: "14%", y: "82%" },
  { x: "28%", y: "30%" }, { x: "40%", y: "78%" },
  { x: "52%", y: "22%" }, { x: "62%", y: "70%" },
  { x: "76%", y: "25%" }, { x: "88%", y: "84%" },
  { x: "95%", y: "15%" }, { x: "20%", y: "60%" },
  { x: "68%", y: "88%" }, { x: "84%", y: "45%" },
];

// Ambient 4-point star sparkles for Community Hub
const COMMUNITY_SPARKLES = [
  { x: "10%", y: "25%", size: 14, opacity: 0.8, delay: "0s", duration: "3.2s" },
  { x: "24%", y: "72%", size: 12, opacity: 0.7, delay: "1.2s", duration: "2.8s" },
  { x: "40%", y: "18%", size: 16, opacity: 0.85, delay: "0.5s", duration: "4.0s" },
  { x: "58%", y: "82%", size: 10, opacity: 0.65, delay: "2.1s", duration: "3.5s" },
  { x: "72%", y: "35%", size: 18, opacity: 0.9, delay: "1.8s", duration: "3.1s" },
  { x: "88%", y: "65%", size: 14, opacity: 0.75, delay: "0.8s", duration: "3.8s" },
  { x: "94%", y: "20%", size: 12, opacity: 0.7, delay: "1.5s", duration: "3.4s" },
  { x: "46%", y: "52%", size: 15, opacity: 0.8, delay: "0.3s", duration: "4.2s" },
];

// Glowing dot particles clustered for Community Hub background
const COMMUNITY_DOT_PARTICLES = [
  { x: "18%", y: "35%", size: 3, opacity: 0.85, delay: "0s", duration: "3.1s" },
  { x: "30%", y: "60%", size: 2, opacity: 0.7, delay: "0.8s", duration: "2.5s" },
  { x: "44%", y: "25%", size: 4, opacity: 0.9, delay: "1.4s", duration: "3.8s" },
  { x: "52%", y: "72%", size: 3, opacity: 0.75, delay: "0.3s", duration: "2.9s" },
  { x: "68%", y: "45%", size: 5, opacity: 0.95, delay: "1.9s", duration: "4.2s" },
  { x: "80%", y: "80%", size: 3, opacity: 0.8, delay: "0.6s", duration: "3.0s" },
  { x: "88%", y: "32%", size: 2, opacity: 0.7, delay: "2.1s", duration: "3.3s" },
  { x: "94%", y: "56%", size: 4, opacity: 0.85, delay: "1.0s", duration: "2.7s" },
  { x: "38%", y: "85%", size: 3, opacity: 0.75, delay: "1.7s", duration: "3.6s" },
  { x: "62%", y: "18%", size: 2, opacity: 0.65, delay: "0.4s", duration: "2.8s" },
];

// Custom Magnetic Join Button Component
function MagneticJoinButton({ onClick }: { onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for magnetic pull
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
    
    // Magnetic pull calculation (35% of distance)
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group relative w-full sm:w-[280px] h-[60px] bg-[#c6f806] text-black font-mono text-[11px] font-black uppercase tracking-widest cursor-pointer shadow-[0_0_15px_rgba(198,248,6,0.3)] hover:shadow-[0_0_25px_rgba(198,248,6,0.65)] hover:bg-black hover:text-[#c6f806] border border-[#c6f806] transition-all duration-300 flex items-center justify-center gap-2 select-none z-30 outline-none rounded-sm"
    >
      {/* Corner laser brackets */}
      {isHovered && (
        <>
          <div className="absolute top-[-2px] left-[-2px] w-2.5 h-2.5 border-t border-l border-white pointer-events-none" />
          <div className="absolute bottom-[-2px] right-[-2px] w-2.5 h-2.5 border-b border-r border-white pointer-events-none" />
        </>
      )}

      <span>ESTABLISH LINK // JOIN</span>
      <span className="text-[12px] transform group-hover:translate-x-0.5 transition-transform duration-300">
        ↗
      </span>
    </motion.button>
  );
}

export default function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardOuterRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Framer Motion 3D Tilt Values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardOuterRef.current) return;
    const rect = cardOuterRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    x.set(clientX / rect.width);
    y.set(clientY / rect.height);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading character reveal on scroll
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

      // Stagger fade-in for section content
      const content = sectionRef.current?.querySelector(".cyber-terminal-card");
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "COMMUNITY HUB";

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full py-24 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#000000] select-none font-mono"
    >
      {/* ─── Keyframe Animations ─── */}
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

      {/* ─── Fine lime dot grid texture ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(198,248,6,0.11) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
          opacity: 0.55,
        }}
      />

      {/* ─── Large lime glow bloom — right anchor ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "8%", top: "15%",
          width: "48%", height: "55%",
          background: `radial-gradient(ellipse at center,
            rgba(198,248,6,0.25) 0%,
            rgba(198,248,6,0.10) 30%,
            transparent 70%)`,
          filter: "blur(65px)",
          animation: "glowBreath 6s ease-in-out infinite",
        }}
      />

      {/* ─── Large lime glow bloom — left anchor ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "5%", bottom: "10%",
          width: "48%", height: "55%",
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
      {COMMUNITY_PLUS_MARKS.map((p, i) => (
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
      {COMMUNITY_SPARKLES.map((s, i) => (
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
      {COMMUNITY_DOT_PARTICLES.map((d, i) => (
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
            /03
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
            <span>SYS_GATE: EXT_COMMS</span>
            <span style={{ color: LIME, textShadow: `0 0 8px ${LIME}` }} className="font-black">+</span>
          </div>
        </div>

        {/* Central Terminal Card */}
        <div
          ref={cardOuterRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="cyber-terminal-card relative w-full max-w-[960px] mx-auto h-auto min-h-[420px] rounded-lg pointer-events-auto z-10"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            ref={cardInnerRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full rounded-lg p-[1.5px] flex flex-col justify-between border border-[rgba(198,248,6,0.3)] hover:border-[rgba(198,248,6,0.65)] transition-colors duration-300"
          >
            {/* Card Main Cover Back */}
            <div 
              className="relative w-full h-full rounded-lg p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between z-10"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, rgba(198,248,6,0.08) 0%, rgba(4,6,4,0.98) 75%)`,
                backgroundColor: "#040604",
              }}
            >
              {/* Interactive cursor tracking particle swarm */}
              <CommunityParticles />
              
              {/* Corner Accent HUD brackets inside card */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />

              {/* LEFT: Text & Diagnostics */}
              <div className="flex flex-col gap-6 w-full md:w-3/5 text-left relative z-20">
                
                {/* HUD Stats */}
                <div className="flex flex-wrap items-center gap-4 text-[9px] tracking-wider text-zinc-500 font-semibold border-b border-zinc-900 pb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                    <span>SYS_BANDWIDTH: HIGH</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    <span>ACTIVE_DEVICES: 12.4K</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6f806] animate-pulse" />
                    <span>NODE: MAIN</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
                  ENTER THE CYBERNETIC GATEWAY
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-semibold leading-relaxed">
                  Join our developer collective. Access dedicated feedback routers, direct technical resources, upcoming events dashboards, and real-time sandbox challenges.
                </p>

                <div className="mt-4">
                  <MagneticJoinButton onClick={() => setIsModalOpen(true)} />
                </div>
              </div>

              {/* RIGHT: High-tech Visual Network Nodes */}
              <div className="w-full md:w-2/5 flex items-center justify-center relative z-20 h-[220px]">
                <div className="relative w-[200px] h-[200px]">
                  {/* Glowing core */}
                  <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-[#c6f806]/20 border border-[#00F5FF]/30 flex items-center justify-center animate-pulse duration-[3000ms] shadow-[0_0_30px_rgba(0,245,255,0.25)]">
                    <svg className="w-6 h-6 text-[#00F5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                  </div>

                  {/* Pulsating orbiting rings */}
                  <div className="absolute inset-0 m-auto w-32 h-32 rounded-full border border-dashed border-cyan-500/20 animate-spin duration-[20000ms]" />
                  <div className="absolute inset-0 m-auto w-40 h-40 rounded-full border border-[#c6f806]/10 animate-reverse-spin duration-[15000ms]" />
                  
                  {/* Orbiting nodes */}
                  <span className="absolute top-[10%] left-[20%] w-3 h-3 rounded-full bg-[#00F5FF] shadow-[0_0_10px_#00F5FF] animate-pulse" />
                  <span className="absolute bottom-[20%] right-[10%] w-2.5 h-2.5 rounded-full bg-[#c6f806] shadow-[0_0_8px_#c6f806] animate-ping" />
                  <span className="absolute bottom-[10%] left-[15%] w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
                </div>
              </div>

              {/* Diagonal HUD border detail bottom-right */}
              <div className="absolute bottom-4 right-4 z-20 text-white/20 pointer-events-none font-mono text-[8px]">
                SYS_GATEWAY_V1.0
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connection Gateway Modal */}
      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Global CSS animations for keyframe spins */}
      <style jsx global>{`
        .is-scrolling .cyber-terminal-card {
          pointer-events: none !important;
        }
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
      `}</style>
    </section>
  );
}
