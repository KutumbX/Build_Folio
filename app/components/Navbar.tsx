"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-gradient-to-r from-zinc-950 via-blue-950/20 to-zinc-950 backdrop-blur-md shadow-[0_4px_30px_rgba(59,130,246,0.12)] select-none font-mono">
      {/* Top Cyber Blue Highlight Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* LEFT: Branding Block + Diagonal Tech Accent */}
          <div className="flex items-center space-x-4">
            {/* Cyber diagonal dash decoration */}
            <div className="hidden sm:block text-cyan-500/50 font-sans text-lg font-light select-none">
              {"//"}
            </div>

            {/* CYBR_ Logo Box */}
            <a href="#" className="block">
              <div className="bg-[#c6f806] text-black font-black px-4 py-2 flex items-center tracking-wider text-sm border border-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.25)] hover:bg-black hover:text-[#c6f806] hover:border-[#c6f806] transition-all duration-200 group">
                <svg
                  className="w-4 h-4 fill-current mr-2.5 animate-pulse group-hover:scale-110 transition-transform duration-200"
                  viewBox="0 0 8 8"
                >
                  {/* Space Invader style pixel SVG */}
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
                <span className="tracking-widest">CYBR_</span>
              </div>
            </a>
          </div>

          {/* MIDDLE: Navigation Items */}
          <nav className="hidden md:flex items-center space-x-5">
            {["WORK", "SERVICES", "ABOUT", "LABS", "COMMUNITY", "CONTACT"].map((item, idx, arr) => (
              <React.Fragment key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
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
                href="#community"
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
                // Close Icon (X) with cyberpunk styling
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Cyber Hamburger Icon
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
            {["WORK", "SERVICES", "ABOUT", "LABS", "COMMUNITY", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-zinc-300 hover:text-white py-2 text-sm tracking-widest hover:bg-zinc-900/50 rounded-sm border border-transparent hover:border-blue-500/10 transition-all duration-200"
              >
                {item}
              </Link>
            ))}

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
