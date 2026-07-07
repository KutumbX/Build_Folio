"use client";

import React from "react";

export default function CardGlow() {
  return (
    <>
      {/* ─── Ambient External Bloom Aura (Behind the card, z-index -10) ─── */}
      <div 
        className="absolute inset-[-25px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-xl blur-[32px] transform-gpu"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1) 0%, rgba(0, 245, 255, 0.03) 60%, transparent 100%)`,
        }}
      />
      
      {/* ─── Bottom Soft White Bloom Anchor (Cast shadow depth) ─── */}
      <div className="absolute inset-x-8 bottom-[-15px] h-[30px] rounded-full bg-white/5 blur-[20px] pointer-events-none -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </>
  );
}
