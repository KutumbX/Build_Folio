"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JoinModal from "./JoinModal";
import CommunityParticles from "./CommunityParticles";

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
      className="relative w-full py-24 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#04070C] select-none font-mono"
    >
      {/* Background Cyber Grid */}
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

      {/* Cyber Scanlines */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #00F5FF 3px, #00F5FF 6px)",
        }}
      />

      {/* Glowing Bloom Aura spots */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-600/10 to-[#00F5FF]/5 blur-[120px] pointer-events-none animate-pulse duration-[9000ms]" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#c6f806]/5 to-transparent blur-[120px] pointer-events-none animate-pulse duration-[11000ms]" />

      {/* Main Section Content Wrapper */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col gap-12">
        
        {/* Section Heading Row */}
        <div className="flex items-center gap-4 border-b border-blue-500/10 pb-6">
          <span 
            className="text-base md:text-lg font-black text-[#39FF14] tracking-widest"
            style={{ textShadow: "0 0 10px rgba(57, 255, 20, 0.5)" }}
          >
            /04
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
            <span>SYS_GATE: EXT_COMMS</span>
            <span className="text-[#39FF14] font-black">+</span>
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
            className="pulse-border-card relative w-full h-full rounded-lg p-[1.5px] flex flex-col justify-between"
          >
            {/* Card Main Cover Back */}
            <div className="relative w-full h-full rounded-lg bg-[#070B14] p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between z-10">
              {/* Interactive cursor tracking particle swarm */}
              <CommunityParticles />
              
              {/* Corner Accent HUD brackets inside card */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white/10 pointer-events-none z-20 group-hover:border-white/30 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white/10 pointer-events-none z-20 group-hover:border-white/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white/10 pointer-events-none z-20 group-hover:border-white/30 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white/10 pointer-events-none z-20 group-hover:border-white/30 transition-colors duration-300" />

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
