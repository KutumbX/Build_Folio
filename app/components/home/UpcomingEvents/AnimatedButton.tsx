"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface AnimatedButtonProps {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

export default function AnimatedButton({ href, variant, children }: AnimatedButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the magnetic offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth rubbery magnetic response
  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance vector from cursor to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Pull button by a percentage of the distance
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (variant === "primary") {
    return (
      <motion.a
        ref={ref}
        href={href}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 bg-[#c6f806] text-black font-mono text-[11px] font-black uppercase text-center py-2.5 px-4 rounded-sm tracking-widest border border-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] hover:shadow-[0_0_22px_rgba(198,248,6,0.65)] hover:bg-black hover:text-[#c6f806] active:scale-95 transition-all duration-300 select-none cursor-pointer flex items-center justify-center gap-1.5 z-30"
      >
        {/* Futuristic top-left and bottom-right corner bracket accents */}
        {isHovered && (
          <>
            <div className="absolute top-[-2px] left-[-2px] w-1.5 h-1.5 border-t border-l border-black pointer-events-none" />
            <div className="absolute bottom-[-2px] right-[-2px] w-1.5 h-1.5 border-b border-r border-black pointer-events-none" />
          </>
        )}
        <span>{children}</span>
        <span className="text-[10px] transform group-hover:translate-x-0.5 transition-transform duration-200">
          {"//"}
        </span>
      </motion.a>
    );
  }

  // Outline/Secondary style button
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 bg-transparent text-[#c6f806] font-mono text-[11px] font-black uppercase text-center py-2.5 px-4 rounded-sm tracking-widest border border-[rgba(198,248,6,0.35)] hover:border-[#c6f806] hover:text-black hover:bg-[#c6f806] hover:shadow-[0_0_15px_rgba(198,248,6,0.4)] active:scale-95 transition-all duration-300 select-none cursor-pointer flex items-center justify-center gap-1.5 z-30"
    >
      {/* Laser side brackets */}
      {isHovered && (
        <>
          <div className="absolute top-[-1px] left-[-1px] w-1.5 h-1.5 border-t border-l border-[#c6f806] pointer-events-none" />
          <div className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 border-b border-r border-[#c6f806] pointer-events-none" />
        </>
      )}
      <span>{children}</span>
    </motion.a>
  );
}
