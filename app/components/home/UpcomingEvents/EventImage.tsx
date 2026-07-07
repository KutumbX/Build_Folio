"use client";

import React from "react";
import Image from "next/image";

interface EventImageProps {
  src: string;
  alt: string;
  isHovered: boolean;
}

export default function EventImage({ src, alt, isHovered }: EventImageProps) {
  // Shift colors dynamically to make reused mock images look unique
  let filterClass = "";
  if (alt === "BIO_CODE_GENESIS") filterClass = "hue-rotate-[140deg] saturate-[1.1]";
  else if (alt === "QUANTUM_SHIFT") filterClass = "hue-rotate-[220deg] saturate-[1.2]";
  else if (alt === "CYBER_DOME_DEFENSE") filterClass = "hue-rotate-[90deg] saturate-[1.0]";
  else if (alt === "AETHER_DRIVE_UAV") filterClass = "hue-rotate-[290deg] saturate-[1.1]";

  return (
    <div className="relative w-full h-[240px] md:h-[260px] overflow-hidden rounded-t-lg z-10 border-b border-[#00F5FF]/10">
      {/* ─── Holographic Light Sweep Element (Animated by GSAP) ─── */}
      <div className="light-sweep absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12 -translate-x-[100%] pointer-events-none z-20" />

      {/* Cyber Laser Scanner Line Effect */}
      <div 
        className="absolute left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#00F5FF]/60 to-transparent z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          animation: isHovered ? "scannerMove 3.5s linear infinite" : "none",
        }}
      />

      {/* Grid Overlay inside the image container */}
      <div className="absolute inset-0 bg-[#04070C]/15 z-10 pointer-events-none" />

      {/* Image element with zoom and parallax style */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className={`object-cover transform scale-100 group-hover:scale-[1.04] transition-all duration-700 ease-out filter brightness-[0.88] group-hover:brightness-[0.98] ${filterClass}`}
          priority={alt === "NEO_GENESIS_2026"}
        />
      </div>

      {/* Top right indicator corner bracket */}
      <div className="absolute top-3 right-3 z-30 font-mono text-[9px] bg-zinc-950/85 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-sm select-none tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
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
