"use client";

import React from "react";
import Image from "next/image";

interface EventImageProps {
  src: string;
  alt: string;
  isHovered: boolean;
}

export default function EventImage({ src, alt, isHovered }: EventImageProps) {
  return (
    <div className="relative w-full h-[240px] md:h-[260px] overflow-hidden rounded-t-lg z-10 border-b border-[rgba(198,248,6,0.2)]">
      {/* ─── Holographic Light Sweep Element (Animated by GSAP) ─── */}
      <div className="light-sweep absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12 -translate-x-[100%] pointer-events-none z-20" />

      {/* Cyber Laser Scanner Line Effect */}
      <div 
        className="absolute left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#c6f806]/70 to-transparent z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          animation: isHovered ? "scannerMove 3.5s linear infinite" : "none",
        }}
      />

      {/* Grid & Dark-Lime Gradient Overlay inside the image container */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040604]/20 via-transparent to-[#040604] z-10 pointer-events-none" />

      {/* Image element with zoom and parallax style */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transform scale-100 group-hover:scale-[1.04] transition-all duration-700 ease-out filter brightness-[0.88] group-hover:brightness-[0.98]"
          priority={alt === "NEO_GENESIS_2026"}
        />
      </div>

      {/* Top right indicator corner bracket */}
      <div className="absolute top-3 right-3 z-30 font-mono text-[9px] bg-black/90 text-[#c6f806] border border-[rgba(198,248,6,0.35)] px-2 py-0.5 rounded-sm select-none tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c6f806] animate-pulse" />
        <span>SYS_LOCK</span>
      </div>

      {/* CSS custom animation for scanner line */}
      <style jsx global>{`
        @keyframes scannerMove {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
      `}</style>
    </div>
  );
}
