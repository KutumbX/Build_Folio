"use client";

import React from "react";
import { Event } from "./types";

interface EventInfoProps {
  event: Event;
}

export default function EventInfo({ event }: EventInfoProps) {
  const {
    title,
    type = "Hackathon",
    theme = event.themeTags || ["AI", "Web3"],
    participants = 100,
    status = event.mode || "Online",
    registration = "Open",
    startDate = "2026-10-24",
    applyLink = event.registrationLink || "#",
    discordLink = "#",
  } = event;

  // Format participant count e.g. "+100 participating" or "+1000 participating"
  const participantText = `+${participants} participating`;

  // Format start date label cleanly e.g. "STARTS 24/10/26" or "STARTS Live"
  const formattedStartDate = startDate.toLowerCase().includes("live") 
    ? "STARTS Live" 
    : startDate.startsWith("STARTS") 
    ? startDate 
    : `STARTS ${startDate}`;

  return (
    <div className="flex flex-col flex-1 p-5 font-mono select-none z-10 relative gap-4">
      {/* ─── Top Header: Title, Category Subtitle & Top Right Link Icons ─── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#c6f806] tracking-tight transition-colors duration-300 truncate">
            {title}
          </h3>
          <span className="text-xs text-zinc-400 font-sans font-medium mt-0.5">
            {type}
          </span>
        </div>

        {/* Action Link Icons (Website & Discord) */}
        <div className="flex items-center gap-2 shrink-0">
          {applyLink && applyLink !== "#" && (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[rgba(198,248,6,0.08)] border border-[rgba(198,248,6,0.3)] hover:border-[#c6f806] hover:bg-[#c6f806] hover:text-black text-[#c6f806] flex items-center justify-center transition-all duration-300 text-sm"
              title="Open Hackathon Website"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
            </a>
          )}
          {discordLink && discordLink !== "#" && (
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[rgba(198,248,6,0.08)] border border-[rgba(198,248,6,0.3)] hover:border-[#c6f806] hover:bg-[#c6f806] hover:text-black text-[#c6f806] flex items-center justify-center transition-all duration-300 text-sm"
              title="Join Discord Community"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ─── Themes Section + Participant Stack ─── */}
      <div className="flex flex-col gap-2 bg-[rgba(0, 0, 0, 0.03)] border border-[rgba(0, 0, 0, 0.12)] p-3 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">THEME</span>
          <div className="flex items-center gap-1.5 text-xs text-[#c6f806] font-semibold">
            {/* User Avatars Stack */}
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#040604] bg-[#c6f806]/20 border border-[#c6f806]/40 text-[9px] text-[#c6f806] font-bold text-center leading-5">
                👤
              </div>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#040604] bg-[#c6f806]/30 border border-[#c6f806]/60 text-[9px] text-[#c6f806] font-bold text-center leading-5">
                ⚡
              </div>
            </div>
            <span>{participantText}</span>
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {theme.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase font-mono tracking-wider bg-[rgba(198,248,6,0.08)] text-[#c6f806] border border-[rgba(198,248,6,0.25)] px-2.5 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Footer Controls: Status Pills & Action Button ─── */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase">
          <span className="bg-[rgba(0, 0, 0, 0.1)] text-[#c6f806] border border-[rgba(198,248,6,0.3)] px-2.5 py-1 rounded-md">
            {status}
          </span>
          <span className="bg-[rgba(0, 0, 0, 0.1)] text-[#c6f806] border border-[rgba(0, 0, 0, 0.3)] px-2.5 py-1 rounded-md">
            {registration}
          </span>
          <span className="bg-zinc-900/60 text-zinc-300 border border-zinc-700/60 px-2.5 py-1 rounded-md">
            {formattedStartDate}
          </span>
        </div>

        {/* Apply Now Button (Opens in New Tab) */}
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-[#c6f806] hover:bg-[#c6f806] hover:text-black border border-[#c6f806] font-mono text-xs font-black uppercase px-4 py-2 rounded-md transition-all duration-300 cursor-pointer flex items-center gap-1 shrink-0 select-none"
        >
          <span>Apply now</span>
          <span className="text-[10px]">↗</span>
        </a>
      </div>
    </div>
  );
}
