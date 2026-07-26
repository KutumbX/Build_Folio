"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const LIME = "#c6f806";

interface CoreMember {
  id: string;
  name: string;
  avatar: string;
  avatarImage?: string;
  roleTag: string;
  roleTitle: string;
  subtitle: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
  badgeColor: string;
  badgeBorder: string;
  avatarBg: string;
  avatarBorder: string;
  socialHover: string;
}

const CORE_MEMBERS: CoreMember[] = [
  {
    id: "dev",
    name: "DEV",
    avatar: "DEV",
    avatarImage: "/images/dev_cyber_avatar.png",
    roleTag: "// FOUNDER & LEAD ARCHITECT",
    roleTitle: "Founder of KutumbX",
    subtitle: "Creator of Build_Folio Ecosystem",
    description: "Specializing in WebGL 3D interfaces, fullstack React 19 architecture, and developer incubator tooling.",
    email: "devranjeetq@gmail.com",
    github: "https://github.com/KutumbX",
    linkedin: "https://linkedin.com/in/dev-kutumbx",
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
    badgeBorder: "border-cyan-500/30",
    avatarBg: "from-cyan-950 via-zinc-900 to-zinc-950",
    avatarBorder: "border-[#c6f806]",
    socialHover: "group-hover/link:text-cyan-400 hover:border-cyan-500/50",
  },
  {
    id: "nandini",
    name: "NANDINI",
    avatar: "NAN",
    roleTag: "// CO-FOUNDER & CREATIVE LEAD",
    roleTitle: "Core-Member of KutumbX",
    subtitle: "Design Systems & Community Lead",
    description: "Focusing on user experience design, front-end motion systems, community engagements, and product strategy.",
    email: "nandinisahu128@gmail.com",
    github: "https://github.com/KutumbX",
    linkedin: "https://linkedin.com/in/nandinisahu",
    badgeColor: "text-[#c6f806] bg-[#c6f806]/10 border-[#c6f806]/30",
    badgeBorder: "border-[#c6f806]/30",
    avatarBg: "from-purple-950 via-zinc-900 to-zinc-950",
    avatarBorder: "border-cyan-400",
    socialHover: "group-hover/link:text-[#c6f806] hover:border-[#c6f806]/50",
  },
  {
    id: "mohit",
    name: "MOHIT",
    avatar: "MOH",
    roleTag: "// CORE MEMBER & OPERATIONAL MANAGER",
    roleTitle: "Core-Member of KutumbX",
    subtitle: "Operational Manager",
    description: "Managing community operations, event execution, workflow coordination, and ecosystem growth.",
    email: "relax9690@gmail.com",
    github: "https://github.com/Relax-29",
    linkedin: "https://www.linkedin.com/in/rerelax",
    badgeColor: "text-blue-400 bg-blue-950/60 border-blue-500/30",
    badgeBorder: "border-blue-500/30",
    avatarBg: "from-blue-950 via-zinc-900 to-zinc-950",
    avatarBorder: "border-blue-400",
    socialHover: "group-hover/link:text-blue-400 hover:border-blue-500/50",
  },
  {
    id: "krish",
    name: "KRISH AHIRWAR",
    avatar: "KRI",
    roleTag: "// CORE MEMBER",
    roleTitle: "Core-Member of KutumbX",
    subtitle: "Ecosystem Contributor",
    description: "Contributing to community initiatives, developer tooling, and collaborative technical projects.",
    email: "krishahirwar@gmail.com",
    github: "",
    linkedin: "",
    badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/30",
    badgeBorder: "border-purple-500/30",
    avatarBg: "from-indigo-950 via-zinc-900 to-zinc-950",
    avatarBorder: "border-purple-400",
    socialHover: "group-hover/link:text-purple-400 hover:border-purple-500/50",
  },
];

const CYBER_TOKENS = [
  "0x9F", "SYS_AUTH", "DEV_v2.4", "10101", "NET_OK",
  "ARCHITECT", "WEBGL", "REACT19", "CYBER_ID", "0x44"
];

interface Particle {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isDevCyberActive, setIsDevCyberActive] = useState(false);
  const [devParticles, setDevParticles] = useState<Particle[]>([]);
  const [biometricToast, setBiometricToast] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const skillsScrollRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleDevAvatarClick = () => {
    setIsDevCyberActive(true);
    setBiometricToast(true);
    setIsDevModalOpen(true);

    // Spawn 10 Cyber particles radiating outward
    const newParticles: Particle[] = Array.from({ length: 10 }).map((_, index) => {
      const angle = (index / 10) * Math.PI * 2;
      const distance = 60 + Math.random() * 50;
      return {
        id: Date.now() + index,
        text: CYBER_TOKENS[index % CYBER_TOKENS.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    });

    setDevParticles(newParticles);

    // Reset particle animation state after 3.5 seconds
    setTimeout(() => {
      setIsDevCyberActive(false);
      setBiometricToast(false);
      setDevParticles([]);
    }, 3500);
  };

  // Keyboard close shortcut (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDevModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lenis Smooth Scroll binding for Dev Spec Modal main glass container
  useEffect(() => {
    if (!isDevModalOpen || !modalScrollRef.current) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const lenis = new Lenis({
      wrapper: modalScrollRef.current,
      content: (modalScrollRef.current.firstElementChild as HTMLElement) || modalScrollRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      document.body.style.overflow = originalOverflow;
    };
  }, [isDevModalOpen]);

  // Lenis Smooth Scroll binding for inner Peak Skills list container
  useEffect(() => {
    if (!isDevModalOpen || !skillsScrollRef.current) return;

    const skillsLenis = new Lenis({
      wrapper: skillsScrollRef.current,
      content: (skillsScrollRef.current.firstElementChild as HTMLElement) || skillsScrollRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      skillsLenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      skillsLenis.destroy();
    };
  }, [isDevModalOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  const headingText = "GET IN TOUCH";

  return (
    <section className="relative w-full min-h-screen bg-[#04070C] text-white py-20 px-4 sm:px-6 lg:px-8 font-mono select-none overflow-hidden">
      {/* KEYFRAMES FOR CYBER LASER BEAM */}
      <style>{`
        @keyframes cyberLaserScan {
          0% { top: -10%; opacity: 1; }
          100% { top: 110%; opacity: 0.2; }
        }
        @keyframes hudSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* BACKGROUND ACCENTS & GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#c6f806]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ─── Premium Heading Row (UPCOMING EVENTS Typography Style) ─── */}
        <div
          className="flex items-center gap-4 pb-6 mb-10"
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
            /04
          </span>

          <h1
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
          </h1>

          <div className="ml-auto hidden sm:flex items-center gap-4 text-zinc-400 text-[10px] tracking-widest font-semibold">
            <span>STATUS: ONLINE</span>
            <span style={{ color: LIME, textShadow: `0 0 8px ${LIME}` }} className="font-black">
              +
            </span>
          </div>
        </div>

        {/* SUBHEADER / SECTION INTRO */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <div className="text-xs text-[#c6f806] tracking-widest uppercase mb-1">
              // KUTUMBX_CORE_LEADERSHIP
            </div>
            <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-2xl">
              Connect with the core team driving the KutumbX & Build_Folio ecosystem. Reach out directly via official communication channels below.
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-400 bg-zinc-950/80 border border-zinc-800 px-4 py-2 shrink-0 self-start sm:self-center">
            CORE_TEAM: <span className="text-[#c6f806] font-bold">4 MEMBERS</span>
          </div>
        </div>

        {/* TEAM SPOTLIGHT CARDS GRID (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CORE_MEMBERS.map((member) => {
            const isDevCard = member.id === "dev";

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/50 backdrop-blur-md relative group transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c6f806]" />

                <div>
                  {/* Header Tag + Availability Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono border px-2.5 py-1 ${member.badgeColor}`}>
                      {member.roleTag}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      AVAILABLE
                    </span>
                  </div>

                  {/* Member Avatar & Details */}
                  <div className="flex items-center space-x-4 mb-4">
                    {/* DEV INTERACTIVE CYBER AVATAR CIRCLE */}
                    {isDevCard ? (
                      <div className="relative shrink-0 flex items-center justify-center">
                        {/* Rotating Outer Cyber HUD Ring */}
                        <div className="absolute inset-[-6px] rounded-full border border-dashed border-[#c6f806]/60 animate-[hudSpin_12s_linear_infinite] pointer-events-none" />
                        <div className="absolute inset-[-10px] rounded-full border border-cyan-400/30 animate-[hudSpin_18s_linear_infinite_reverse] pointer-events-none" />

                        {/* Interactive Click Button */}
                        <motion.button
                          onClick={handleDevAvatarClick}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.94 }}
                          animate={
                            isDevCyberActive
                              ? {
                                  scale: [1, 1.15, 0.95, 1.08, 1],
                                  rotate: [0, -4, 4, -2, 0],
                                  filter: [
                                    "drop-shadow(0 0 15px #c6f806)",
                                    "drop-shadow(0 0 35px #06b6d4) hue-rotate(90deg)",
                                    "drop-shadow(0 0 25px #c6f806) hue-rotate(0deg)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 0.6 }}
                          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#c6f806] shadow-[0_0_20px_rgba(198,248,6,0.4)] cursor-pointer group/avatar outline-none bg-zinc-950"
                          title="Click to open Cyber Spec & Stack Modal"
                        >
                          {/* Cyber Avatar Image */}
                          <img
                            src={member.avatarImage}
                            alt="Dev Cyber Avatar"
                            className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                          />

                          {/* Laser Scanline Beam Sweep Effect */}
                          <div
                            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c6f806] to-transparent shadow-[0_0_12px_#c6f806] pointer-events-none"
                            style={{
                              animation: isDevCyberActive
                                ? "cyberLaserScan 0.8s ease-in-out infinite"
                                : "cyberLaserScan 3.5s ease-in-out infinite",
                            }}
                          />

                          {/* Hover Prompt Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-[8px] text-[#c6f806] font-bold tracking-widest text-center px-1">
                            VIEW SPEC
                          </div>
                        </motion.button>

                        {/* Floating Digital Matrix Particles Burst */}
                        <AnimatePresence>
                          {devParticles.map((particle) => (
                            <motion.span
                              key={particle.id}
                              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                              animate={{ opacity: 0, scale: 1.3, x: particle.x, y: particle.y }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="absolute text-[9px] font-mono font-bold text-[#c6f806] pointer-events-none drop-shadow-[0_0_8px_#c6f806] z-30"
                            >
                              {particle.text}
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Standard Team Member Avatar Circle */
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-tr ${member.avatarBg} border-2 ${member.avatarBorder} flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0`}
                      >
                        {member.avatar}
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <h2 className="text-lg font-extrabold text-white tracking-wider truncate flex items-center gap-2">
                        <span>{member.name}</span>
                        {isDevCard && (
                          <span className="text-[9px] text-[#c6f806] bg-[#c6f806]/10 border border-[#c6f806]/40 px-1.5 py-0.5 rounded font-mono font-normal cursor-pointer" onClick={handleDevAvatarClick}>
                            SPEC_MODAL ↗
                          </span>
                        )}
                      </h2>
                      <p className="text-xs text-[#c6f806] font-mono mt-0.5 truncate">
                        {member.roleTitle}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-sans mt-0.5 truncate">
                        {member.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Dev Biometric HUD Toast */}
                  {isDevCard && biometricToast && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-3 p-2 bg-[#c6f806]/15 border border-[#c6f806]/60 rounded text-[10px] text-[#c6f806] font-mono flex items-center justify-between shadow-[0_0_15px_rgba(198,248,6,0.2)]"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="w-2 h-2 bg-[#c6f806] rounded-full animate-ping shrink-0" />
                        <span className="truncate">// BIOMETRIC_ID: DEV_AUTHENTICATED // SPEC_OPEN</span>
                      </div>
                      <span className="font-bold shrink-0">100%</span>
                    </motion.div>
                  )}

                  {/* Bio / Description */}
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6 border-t border-b border-zinc-900 py-3">
                    {member.description}
                  </p>
                </div>

                {/* Contact Channels */}
                <div className="space-y-2.5">
                  {/* Email Box */}
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded flex items-center justify-between gap-3 group/email">
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${member.email}`} className="text-xs text-white font-mono hover:text-[#c6f806] transition-colors truncate block">
                        {member.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopyEmail(member.email)}
                      className="px-2 py-1 bg-zinc-800 hover:bg-[#c6f806] hover:text-black text-zinc-300 text-[10px] font-mono tracking-wider transition-all cursor-pointer shrink-0 border border-zinc-700 hover:border-[#c6f806]"
                    >
                      {copiedEmail === member.email ? "COPIED! ✓" : "COPY"}
                    </button>
                  </div>

                  {/* Social Links Row */}
                  <div className="grid grid-cols-2 gap-2">
                    {member.github ? (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 bg-zinc-900/80 border border-zinc-800 rounded flex items-center justify-between group/link transition-all ${member.socialHover}`}
                      >
                        <span className="text-[11px] text-zinc-300 group-hover/link:text-[#c6f806]">GitHub ↗</span>
                      </a>
                    ) : (
                      <div className="p-2.5 bg-zinc-900/30 border border-zinc-800/40 rounded flex items-center justify-between opacity-50 cursor-not-allowed">
                        <span className="text-[11px] text-zinc-600">GitHub (N/A)</span>
                      </div>
                    )}

                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 bg-zinc-900/80 border border-zinc-800 rounded flex items-center justify-between group/link transition-all ${member.socialHover}`}
                      >
                        <span className="text-[11px] text-zinc-300 group-hover/link:text-[#c6f806]">LinkedIn ↗</span>
                      </a>
                    ) : (
                      <div className="p-2.5 bg-zinc-900/30 border border-zinc-800/40 rounded flex items-center justify-between opacity-50 cursor-not-allowed">
                        <span className="text-[11px] text-zinc-600">LinkedIn (N/A)</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* QUICK STATS FOOTER BAR */}
        <div className="mt-10 p-5 bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block text-[9px]">TIMEZONE</span>
            <span className="text-[#c6f806] font-bold">IST (UTC+5:30)</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[9px]">CORE TEAM</span>
            <span className="text-cyan-400 font-bold">4 MEMBERS</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[9px]">STATUS</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              ACTIVE & BUILDING
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[9px]">AVG_RESPONSE_TIME</span>
            <span className="text-[#c6f806] font-bold">&lt; 6 HOURS</span>
          </div>
        </div>
      </div>

      {/* ─── DEV CYBER SPEC & STACK MODAL WITH LENIS SMOOTH SCROLL ─── */}
      <AnimatePresence>
        {isDevModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl font-mono">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDevModalOpen(false)}
              className="absolute inset-0 bg-cyan-950/20"
            />

            {/* Modal Glass Container with Lenis Smooth Scroll */}
            <motion.div
              ref={modalScrollRef}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-950/95 border border-cyan-500/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-y-auto z-10 p-6 sm:p-8 custom-scrollbar flex flex-col justify-between"
            >
              <div>
                {/* Corner Cyber Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c6f806]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c6f806]" />

                {/* Modal Top Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 shrink-0">
                  <div>
                    <div className="text-xs text-[#c6f806] tracking-widest uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#c6f806] rounded-full animate-ping" />
                      <span>// DEV_SPECIFICATION // ARCHITECT_DOSSIER</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mt-1">
                      PEAK TECH STACK & MEDIA TRANSMISSION
                    </h2>
                  </div>

                  <button
                    onClick={() => setIsDevModalOpen(false)}
                    className="px-3.5 py-1.5 bg-zinc-900 hover:bg-[#c6f806] hover:text-black text-zinc-300 border border-zinc-800 hover:border-[#c6f806] text-xs font-mono tracking-widest transition-all cursor-pointer shrink-0"
                  >
                    [ CLOSE_SPEC X ]
                  </button>
                </div>

                {/* Modal Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  
                  {/* LEFT COLUMN: VIDEO FRAME SHOWCASE (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="text-xs text-cyan-400 tracking-widest uppercase">// FEATURED_MEDIA_STREAM</div>
                    
                    {/* Cyber Video Container */}
                    <div className="relative rounded bg-black border border-cyan-500/40 p-2 shadow-[0_0_25px_rgba(6,182,212,0.2)] overflow-hidden group">
                      <div className="absolute top-3 left-3 z-10 text-[9px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5">
                        LIVE_FEED // 1080P
                      </div>

                      <video
                        src="/images/get_me_only_second_video_and.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="w-full h-auto rounded border border-zinc-800 object-cover max-h-[360px]"
                      />
                    </div>

                    <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>ARCHITECT:</span>
                        <span className="text-[#c6f806] font-bold">DEV (Founder KutumbX)</span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>FOCUS:</span>
                        <span className="text-cyan-400 font-bold">Fullstack + AI/ML + Systems</span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>STATUS:</span>
                        <span className="text-emerald-400 font-bold">BUILDING_NEXT_GEN</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: PEAK TECH STACK BREAKDOWN (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="text-xs text-[#c6f806] tracking-widest uppercase">// PEAK_TECH_STACK_BREAKDOWN</div>

                    {/* Inner Skills Container with Lenis Smooth Scroll binding */}
                    <div ref={skillsScrollRef} className="space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                      
                      {/* 1. FULLSTACK ARCHITECTURE */}
                      <div className="p-4 bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/50 rounded transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                            <span className="text-cyan-400">01.</span> FULLSTACK ARCHITECTURE
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                            95% PROFICIENCY
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mb-3">
                          Specializing in modern React 19, Next.js 16 App Router, WebGL 3D canvas, TypeScript, Node.js, and high-performance Tailwind CSS systems.
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                          {["React 19", "Next.js 16", "WebGL / Three.js", "TypeScript", "Node.js", "Tailwind CSS"].map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-zinc-950 text-cyan-300 border border-zinc-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 2. IOT + AI / ML */}
                      <div className="p-4 bg-zinc-900/70 border border-zinc-800 hover:border-[#c6f806]/50 rounded transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                            <span className="text-[#c6f806]">02.</span> IOT + AI / ML
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-[#c6f806]/10 text-[#c6f806] border border-[#c6f806]/30">
                            88% ADVANCED
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mb-3">
                          Integrating smart IoT hardware sensors with computer vision, edge AI computing, model fine-tuning, and real-time tensor inference pipelines.
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                          {["Edge AI", "Embedded Sensors", "Computer Vision", "Tensor Pipelines", "Model Fine-Tuning"].map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-zinc-950 text-[#c6f806] border border-zinc-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3. DSA (MEDIUM LEVEL) */}
                      <div className="p-4 bg-zinc-900/70 border border-zinc-800 hover:border-purple-500/50 rounded transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                            <span className="text-purple-400">03.</span> DSA (MEDIUM LEVEL)
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-purple-950/80 text-purple-400 border border-purple-500/30">
                            MEDIUM LEVEL
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mb-3">
                          Solid problem-solving mastery in medium-level Data Structures & Algorithms, focusing on optimal space-time complexity, tree/graph traversal, and dynamic programming.
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                          {["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "HashMaps", "Sliding Window"].map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-zinc-950 text-purple-300 border border-zinc-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 4. CLOUD MANAGEMENT */}
                      <div className="p-4 bg-zinc-900/70 border border-zinc-800 hover:border-blue-500/50 rounded transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                            <span className="text-blue-400">04.</span> CLOUD MANAGEMENT
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-blue-950/80 text-blue-400 border border-blue-500/30">
                            90% CLOUD
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mb-3">
                          Managing cloud infrastructure deployments across AWS & GCP, containerization with Docker & Kubernetes, serverless architectures, and CI/CD pipelines.
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                          {["AWS", "GCP", "Docker", "Kubernetes", "Serverless", "CI/CD"].map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-zinc-950 text-blue-300 border border-zinc-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 5. SYSTEM DESIGN */}
                      <div className="p-4 bg-zinc-900/70 border border-zinc-800 hover:border-emerald-500/50 rounded transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                            <span className="text-emerald-400">05.</span> SYSTEM DESIGN
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                            92% SYSTEM
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mb-3">
                          Architecting resilient microservices, low-latency WebSocket communication layers, distributed database caching, and fault-tolerant event streams.
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[9px] font-mono">
                          {["Microservices", "Distributed Systems", "WebSockets", "High Availability", "Event Queues"].map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-zinc-950 text-emerald-300 border border-zinc-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 mt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono shrink-0">
                <div className="text-zinc-500 text-[10px]">
                  // KUTUMBX_ARCHITECT_DOSSIER // CONFIDENTIAL_SYSTEM_SPEC
                </div>
                <button
                  onClick={() => setIsDevModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-black hover:text-[#c6f806] transition-all cursor-pointer"
                >
                  DISMISS SPEC DOSSIER ↗
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
