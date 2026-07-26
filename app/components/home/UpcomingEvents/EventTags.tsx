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
          className="font-mono text-[10px] tracking-wider uppercase bg-[rgba(198,248,6,0.08)] text-[#c6f806] border border-[rgba(198,248,6,0.25)] px-2.5 py-0.5 rounded-sm backdrop-blur-sm transition-all duration-300 hover:border-[#c6f806] hover:bg-[#c6f806] hover:text-black hover:shadow-[0_0_10px_rgba(198,248,6,0.4)] select-none"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
