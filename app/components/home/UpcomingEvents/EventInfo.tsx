"use client";

import React, { useMemo } from "react";
import { formatEventDates } from "./data";

interface EventInfoProps {
  title: string;
  organizer: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  prizePool: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function EventInfo({
  title,
  organizer,
  location,
  mode,
  prizePool,
  registrationDeadline,
  startDate,
  endDate,
  description,
}: EventInfoProps) {
  // Compute remaining days dynamically
  const { remainingDays, isLessThanSevenDays, deadlineFormatted } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(registrationDeadline);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const deadlineFormatted = `${months[deadline.getMonth()]} ${deadline.getDate()}, ${deadline.getFullYear()}`;

    return {
      remainingDays: diffDays,
      isLessThanSevenDays: diffDays < 7,
      deadlineFormatted,
    };
  }, [registrationDeadline]);

  const dateFormatted = useMemo(() => {
    return formatEventDates(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col flex-1 p-5 font-mono select-none z-10 relative">
      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold mb-1 tracking-wider">
        <span>{"//"} BY: {organizer}</span>
        <span className="bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30 px-2 py-0.5 rounded-sm">
          {mode.toUpperCase()}
        </span>
      </div>

      {/* Hackathon Name */}
      <h3 className="text-xl font-black text-white group-hover:text-[#39FF14] tracking-tight transition-colors duration-300 line-clamp-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[11px] text-zinc-400 font-sans mt-2 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Horizontal Divider Line */}
      <div className="w-full h-px bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent my-3.5" />

      {/* Visual HUD Metadata Grid */}
      <div className="grid grid-cols-2 gap-y-3.5 text-xs">
        {/* Prize Pool Field */}
        <div className="flex flex-col">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">PRIZE_POOL</span>
          <span className="text-sm font-black text-[#00F5FF] tracking-wider mt-0.5" style={{ textShadow: "0 0 12px rgba(0, 245, 255, 0.4)" }}>
            {prizePool}
          </span>
        </div>

        {/* Event Dates Field */}
        <div className="flex flex-col">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">EVENT_DATES</span>
          <span className="text-[11px] text-zinc-300 font-semibold mt-1">
            {dateFormatted}
          </span>
        </div>

        {/* Location Field */}
        <div className="flex flex-col">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">LOC_COORDS</span>
          <span className="text-[11px] text-zinc-400 font-semibold mt-1 truncate max-w-[130px]">
            {location}
          </span>
        </div>

        {/* Registration Deadline Field (Color changes red/green dynamically) */}
        <div className="flex flex-col">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">REG_DEADLINE</span>
          <span
            className={`text-[10px] font-bold mt-1 inline-flex items-center gap-1.5 ${
              isLessThanSevenDays ? "text-[#FF0055]" : "text-[#39FF14]"
            }`}
            style={{
              textShadow: isLessThanSevenDays
                ? "0 0 8px rgba(255, 0, 85, 0.3)"
                : "0 0 8px rgba(57, 255, 20, 0.3)",
            }}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLessThanSevenDays ? "bg-[#FF0055] animate-pulse" : "bg-[#39FF14]"}`} />
            {remainingDays > 0
              ? `${deadlineFormatted} (${remainingDays}d left)`
              : remainingDays === 0
              ? `TODAY IS LAST DAY`
              : `EXPIRED`}
          </span>
        </div>
      </div>
    </div>
  );
}
