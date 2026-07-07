"use client";

import React from "react";

interface EventTagsProps {
  tags: string[];
}

export default function EventTags({ tags }: EventTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4 z-10 relative">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[10px] tracking-wider uppercase bg-[#0D1726]/60 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-sm backdrop-blur-sm transition-all duration-300 hover:border-[#39FF14]/50 hover:text-white hover:shadow-[0_0_8px_rgba(57,255,20,0.25)] select-none"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
