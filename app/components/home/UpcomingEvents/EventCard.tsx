"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Event } from "./types";
import CardGlow from "./CardGlow";
import EventImage from "./EventImage";
import EventInfo from "./EventInfo";
import EventTags from "./EventTags";
import AnimatedButton from "./AnimatedButton";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion values for 3D card tilt (applied to cardRef)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), springConfig);

  // Mouse tracking handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    x.set(clientX / rect.width);
    y.set(clientY / rect.height);

    outerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
    outerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
  }, [x, y]);

  // GSAP Hover Timeline
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = outerRef.current;
    const card = cardRef.current;
    if (!el || !card) return;

    const sweep = el.querySelector(".light-sweep");
    const image = el.querySelector("img");
    const buttons = el.querySelectorAll(".z-30");

    // Initialize GSAP Hover Timeline
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(sweep, {
      x: "-100%"
    }, {
      x: "100%",
      duration: 0.8,
      ease: "power2.inOut"
    }, 0.0) // 1. Reflection sweep starts immediately
    .to(image, {
      scale: 1.04,
      duration: 0.5,
      ease: "power2.out"
    }, 0.1) // 2. Image zoom starts at 0.1s
    .to(card, {
      y: -10,
      duration: 0.45,
      ease: "power3.out"
    }, 0.2) // 3. Card elevation starts at 0.2s
    .to(el, {
      boxShadow: "0 15px 35px rgba(255, 255, 255, 0.04), 0 0 20px rgba(0, 245, 255, 0.02)",
      duration: 0.45,
      ease: "power2.out"
    }, 0.2)
    .to(buttons, {
      filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.25))",
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05
    }, 0.35); // 4. Button glow starts at 0.35s

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    tlRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tlRef.current?.reverse();
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-[540px] md:h-[580px] rounded-lg pointer-events-auto z-10"
      style={{
        perspective: "1000px",
      }}
    >
      {/* ─── Inner Container: Handles 3D Tilt, Elevation, Continuous Silver Border, and holds Glow/Borders in the same context ─── */}
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="pulse-border-card relative w-full h-full rounded-lg p-[1.2px] flex flex-col justify-between border border-[rgba(198,248,6,0.3)] group-hover:border-[rgba(198,248,6,0.65)] transition-colors duration-300"
      >
        {/* ─── WebGL Background (Lazy rendered only on hover) ─── */}
        <ThreeBackground isHovered={isHovered} />

        {/* ─── Ambient Aura (Soft Silver-White/Ice-Blue Bloom projected outside borders) ─── */}
        <CardGlow />

        {/* ─── HUD Corner Brackets (Corners shift style on hover) ─── */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[rgba(198,248,6,0.35)] pointer-events-none z-20 group-hover:border-[#c6f806] transition-colors duration-300" />

        {/* ─── Solid Dark Card Content Block (Covers gradient center) ─── */}
        <div 
          className="relative w-full h-full rounded-lg flex flex-col justify-between overflow-hidden z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(198,248,6,0.07) 0%, rgba(4,6,4,0.98) 75%)`,
            backgroundColor: "#040604",
          }}
        >
          {/* Top Image Section (Clickable opening in new tab) */}
          <div className="relative transform-gpu transition-transform duration-700 ease-out group-hover:translate-z-6 z-20">
            <a 
              href={event.applyLink || event.registrationLink || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <EventImage src={event.image} alt={event.title} isHovered={isHovered} />
            </a>
          </div>

          {/* Bottom Content Details */}
          <div className="relative flex flex-col flex-grow justify-between z-20 bg-gradient-to-t from-[#040604] via-[#040604]/90 to-transparent">
            <EventInfo event={event} />
          </div>

          {/* HUD Identifier details */}
          <div className="absolute bottom-4 left-4 z-20 font-mono text-[8px] text-zinc-700 select-none pointer-events-none">
            ID_{event.id.toUpperCase().substring(0, 8)}
          </div>

          {/* Bottom-right diagonal animated indicator arrow */}
          <div className="absolute bottom-4 right-4 z-20 text-white/40 group-hover:text-[#00F5FF] transform group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 pointer-events-none select-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* CSS custom keyframe animations and styles */}
      <style jsx global>{`
        .pulse-border-card {
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 245, 255, 0.16) 50%, rgba(255, 255, 255, 0.08) 100%);
          background-size: 200% auto;
          animation: borderPulse 6s linear infinite;
        }
        .pulse-border-card:hover {
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(0, 245, 255, 0.32) 50%, rgba(255, 255, 255, 0.16) 100%);
        }
        @keyframes borderPulse {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
