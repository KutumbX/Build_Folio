"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCyberMenuOpen, setIsCyberMenuOpen] = useState(false);
  const cyberMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // UTC clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close cyber menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cyberMenuRef.current && !cyberMenuRef.current.contains(event.target as Node)) {
        setIsCyberMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenAllSocials = () => {
    window.open("https://discord.gg/DxargfJxX", "_blank");
    window.open("https://www.instagram.com/kutumbx?igsh=MWpjMmtzMHVqM29lZg==", "_blank");
    window.open("https://www.linkedin.com/company/kutumbx", "_blank");
  };

  const getHref = (item: string) => {
    const itemUpper = item.toUpperCase();
    if (itemUpper === "HOME") return "/";
    if (itemUpper === "ABOUT") return "/about";
    if (itemUpper === "CONTACT") return "/contact";
    if (itemUpper === "BUILDER NIGHTS" || itemUpper === "BUILDER_NIGHTS") return "/builder-nights";
    const sectionId = item.toLowerCase();
    return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-gradient-to-r from-zinc-950 via-blue-950/20 to-zinc-950 backdrop-blur-md shadow-[0_4px_30px_rgba(59,130,246,0.12)] select-none font-mono">
      {/* Top Cyber Blue Highlight Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* LEFT: CYBR_ Cyber Button with Social Popover */}
          <div className="flex items-center space-x-3 relative" ref={cyberMenuRef}>
            {/* Cyber diagonal dash decoration */}
            <div className="hidden sm:block text-cyan-500/50 font-sans text-lg font-light select-none">
              {"//"}
            </div>

            {/* CYBR_ Interactive Button */}
            <button
              onClick={() => setIsCyberMenuOpen(!isCyberMenuOpen)}
              className="bg-[#c6f806] text-black font-black px-3.5 py-1.5 flex items-center tracking-wider text-xs sm:text-sm border border-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] hover:bg-black hover:text-[#c6f806] hover:border-[#c6f806] hover:shadow-[0_0_25px_rgba(198,248,6,0.6)] transition-all duration-200 group cursor-pointer relative"
              aria-label="Toggle KutumbX Cyber Links"
            >
              {/* Space Invader pixel SVG */}
              <svg
                className="w-4 h-4 fill-current mr-2 animate-pulse group-hover:scale-110 transition-transform duration-200"
                viewBox="0 0 8 8"
              >
                <rect x="1" y="1" width="1" height="1" />
                <rect x="6" y="1" width="1" height="1" />
                <rect x="2" y="2" width="1" height="1" />
                <rect x="5" y="2" width="1" height="1" />
                <rect x="2" y="3" width="4" height="1" />
                <rect x="1" y="4" width="2" height="1" />
                <rect x="5" y="4" width="2" height="1" />
                <rect x="0" y="5" width="8" height="1" />
                <rect x="0" y="6" width="1" height="1" />
                <rect x="2" y="6" width="4" height="1" />
                <rect x="7" y="6" width="1" height="1" />
                <rect x="1" y="7" width="1" height="1" />
                <rect x="6" y="7" width="1" height="1" />
              </svg>
              <span className="tracking-widest font-black">CYBR_</span>
              <span className="ml-1.5 text-[10px] transform transition-transform duration-200 opacity-80 group-hover:opacity-100">
                {isCyberMenuOpen ? "▲" : "▼"}
              </span>

              {/* Pulsing indicator dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
            </button>

            {/* CYBER SOCIAL POPOVER DROPDOWN MENU */}
            {isCyberMenuOpen && (
              <div className="absolute top-12 left-0 w-80 sm:w-96 bg-zinc-950/95 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.25)] p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Cyber Corner Accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#c6f806]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#c6f806]" />

                {/* Popover Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                  <div>
                    <div className="text-[10px] text-[#c6f806] tracking-widest uppercase">// KUTUMBX_NETWORK</div>
                    <div className="text-xs font-bold text-white tracking-wider">OFFICIAL CYBER CHANNELS</div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                    VERIFIED
                  </span>
                </div>

                {/* Social Channels List */}
                <div className="space-y-3">
                  {/* DISCORD CHANNEL */}
                  <a
                    href="https://discord.gg/DxargfJxX"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCyberMenuOpen(false)}
                    className="p-3 bg-zinc-900/90 border border-zinc-800 hover:border-indigo-500/60 rounded flex items-center justify-between group/channel transition-all duration-200 hover:bg-zinc-900"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover/channel:scale-110 transition-transform">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/channel:text-indigo-400 transition-colors">
                          DISCORD HQ
                        </div>
                        <div className="text-[10px] text-zinc-400 font-sans">KutumbX Community Server</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 group-hover/channel:bg-indigo-500 group-hover/channel:text-black transition-all font-mono">
                      JOIN ↗
                    </span>
                  </a>

                  {/* INSTAGRAM CHANNEL */}
                  <a
                    href="https://www.instagram.com/kutumbx?igsh=MWpjMmtzMHVqM29lZg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCyberMenuOpen(false)}
                    className="p-3 bg-zinc-900/90 border border-zinc-800 hover:border-pink-500/60 rounded flex items-center justify-between group/channel transition-all duration-200 hover:bg-zinc-900"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded bg-pink-950/60 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover/channel:scale-110 transition-transform">
                        <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/channel:text-pink-400 transition-colors">
                          INSTAGRAM
                        </div>
                        <div className="text-[10px] text-zinc-400 font-sans">@kutumbx Official Page</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-pink-950/80 text-pink-300 border border-pink-500/30 group-hover/channel:bg-pink-500 group-hover/channel:text-black transition-all font-mono">
                      FOLLOW ↗
                    </span>
                  </a>

                  {/* LINKEDIN CHANNEL */}
                  <a
                    href="https://www.linkedin.com/company/kutumbx"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCyberMenuOpen(false)}
                    className="p-3 bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/60 rounded flex items-center justify-between group/channel transition-all duration-200 hover:bg-zinc-900"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover/channel:scale-110 transition-transform">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover/channel:text-cyan-400 transition-colors">
                          LINKEDIN
                        </div>
                        <div className="text-[10px] text-zinc-400 font-sans">Official Company Page</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 group-hover/channel:bg-cyan-500 group-hover/channel:text-black transition-all font-mono">
                      CONNECT ↗
                    </span>
                  </a>
                </div>

                {/* OPEN ALL CHANNELS BUTTON */}
                <button
                  onClick={handleOpenAllSocials}
                  className="w-full mt-4 py-2.5 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-black hover:text-[#c6f806] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>OPEN ALL SOCIALS</span>
                  <span>↗</span>
                </button>
              </div>
            )}
          </div>

          {/* MIDDLE: Navigation Items */}
          <nav className="hidden md:flex items-center space-x-5">
            {["HOME", "ABOUT", "BUILDER NIGHTS", "COMMUNITY", "CONTACT"].map((item, idx, arr) => (
              <React.Fragment key={item}>
                <Link
                  href={getHref(item)}
                  className="text-zinc-400 hover:text-white font-medium text-xs tracking-widest transition-all duration-200 uppercase relative py-2 group"
                >
                  {item}
                  {/* Micro-glow underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                </Link>
                {idx < arr.length - 1 && (
                  <span className="text-[#c6f806]/80 text-xs select-none font-bold animate-pulse mx-2">
                    +
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* RIGHT: Clock Widget & CTA Button */}
          <div className="flex items-center h-full">
            {/* Clock Widget */}
            <div className="hidden lg:flex flex-col px-6 border-l border-r border-zinc-800/80 justify-center h-16 text-[10px] tracking-widest text-left leading-tight mr-6">
              <span className="text-zinc-500 font-semibold text-[8px]">SYS_TIME</span>
              <span className="text-[#c6f806] font-bold text-xs tabular-nums tracking-wider my-0.5 shadow-sm">
                {time || "00:00:00"}
              </span>
              <span className="text-zinc-500 text-[8px]">UTC+0</span>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href={getHref("COMMUNITY")}
                className="bg-[#c6f806] text-black font-black text-xs uppercase px-5 py-2.5 flex items-center space-x-2 tracking-widest border border-[#c6f806] hover:bg-transparent hover:text-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] hover:shadow-[0_0_25px_rgba(198,248,6,0.6)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <span>EXPLORE THE COMMUNITY</span>
                <span className="text-sm font-black leading-none ml-1">↗</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL OVERLAY */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-950/95 border-b border-blue-500/20 backdrop-blur-lg shadow-2xl transition-all duration-300">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
            
            {/* Nav Links */}
            {["HOME", "ABOUT", "BUILDER NIGHTS", "COMMUNITY", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={getHref(item)}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-zinc-300 hover:text-white py-2 text-sm tracking-widest hover:bg-zinc-900/50 rounded-sm border border-transparent hover:border-blue-500/10 transition-all duration-200"
              >
                {item}
              </Link>
            ))}

            {/* Cyber Socials Mobile Section */}
            <div className="w-full max-w-xs p-3 bg-zinc-900/60 border border-cyan-500/30 rounded font-mono">
              <div className="text-[10px] text-[#c6f806] tracking-widest mb-2 font-bold text-center">// KUTUMBX SOCIAL CHANNELS</div>
              <div className="grid grid-cols-3 gap-1.5">
                <a
                  href="https://discord.gg/DxargfJxX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-indigo-950/60 border border-indigo-500/40 rounded text-center text-[9px] font-bold text-indigo-300 hover:bg-indigo-500 hover:text-black transition-colors block"
                >
                  DISCORD ↗
                </a>
                <a
                  href="https://www.instagram.com/kutumbx?igsh=MWpjMmtzMHVqM29lZg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-pink-950/60 border border-pink-500/40 rounded text-center text-[9px] font-bold text-pink-300 hover:bg-pink-500 hover:text-black transition-colors block"
                >
                  INSTA ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/kutumbx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-950/60 border border-cyan-500/40 rounded text-center text-[9px] font-bold text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors block"
                >
                  LINKEDIN ↗
                </a>
              </div>
            </div>

            {/* Micro panel with time display */}
            <div className="flex flex-col items-center justify-center p-3 border border-zinc-800 bg-zinc-950/80 rounded w-full max-w-xs font-mono">
              <span className="text-[8px] text-zinc-500">SYS_TIME</span>
              <span className="text-[#c6f806] text-sm font-bold tracking-wider my-0.5">
                {time || "00:00:00"}
              </span>
              <span className="text-[8px] text-zinc-500">UTC+0</span>
            </div>

            {/* Mobile CTA */}
            <Link
              href="#community"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full max-w-xs bg-[#c6f806] text-black font-black text-center text-xs uppercase py-3 tracking-widest border border-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] transition-all duration-300 block cursor-pointer"
            >
              EXPLORE THE COMMUNITY ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
