"use client";

import React, { useRef, useEffect } from "react";

export default function CommunityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.offsetWidth);
    let height = (canvas.height = parent.offsetHeight);

    let mouseX = -9999;
    let mouseY = -9999;
    let isHovered = false;

    // Track mouse coordinates on parent card element
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isHovered = false;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("mouseenter", handleMouseEnter);

    // Particle representation class
    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glowColor: string;

      constructor(originX: number, originY: number, color: string, glowColor: string) {
        this.x = originX;
        this.y = originY;
        this.originX = originX;
        this.originY = originY;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 1.5 + 0.8; // size range
        this.color = color;
        this.glowColor = glowColor;
      }
    }

    // Grid distribution configuration
    const initParticles = (w: number, h: number) => {
      const list: Particle[] = [];
      const cols = Math.floor(w / 40); // spacing size
      const rows = Math.floor(h / 40);
      const spacingX = w / cols;
      const spacingY = h / rows;

      const colors = [
        "rgba(0, 245, 255, 0.45)",  // Cyber Cyan
        "rgba(57, 255, 20, 0.38)",   // Neon Green
        "rgba(198, 248, 6, 0.38)",   // Cyber Lime
      ];
      
      const glowColors = [
        "rgba(0, 245, 255, 0.8)",
        "rgba(57, 255, 20, 0.8)",
        "rgba(198, 248, 6, 0.8)",
      ];

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const xVal = c * spacingX;
          const yVal = r * spacingY;
          // Organic displacement noise
          const noiseX = (Math.random() - 0.5) * 16;
          const noiseY = (Math.random() - 0.5) * 16;
          const idx = Math.floor(Math.random() * colors.length);
          list.push(new Particle(xVal + noiseX, yVal + noiseY, colors[idx], glowColors[idx]));
        }
      }
      return list;
    };

    let particles = initParticles(width, height);

    // Dynamic sizing helper
    const handleResize = () => {
      width = canvas.width = parent.offsetWidth;
      height = canvas.height = parent.offsetHeight;
      particles = initParticles(width, height);
    };

    window.addEventListener("resize", handleResize);

    const forceRadius = 140; // interaction bubble size
    const forceStrength = 3.5;
    const springK = 0.045; // restoration stiffness
    const friction = 0.88; // friction/damping

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // ─── Step 1: Draw Connection Lines (Digital Mesh Grid) ───
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const pdx = pi.x - pj.x;
          const pdy = pi.y - pj.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          // Render mesh connections within boundary thresholds
          if (pdist < 60) {
            const opacity = ((60 - pdist) / 60) * 0.065;
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // ─── Step 2: Draw and Physics Step for each particle ───
      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < forceRadius && isHovered) {
          // Repulsive force mapping
          const force = (forceRadius - dist) / forceRadius;
          const forceX = (dx / (dist || 1)) * force * forceStrength;
          const forceY = (dy / (dist || 1)) * force * forceStrength;
          p.vx -= forceX;
          p.vy -= forceY;
        }

        // Hooke's Law Spring force back to base anchor
        const originDx = p.originX - p.x;
        const originDy = p.originY - p.y;
        p.vx += originDx * springK;
        p.vy += originDy * springK;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Position displacement
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Add cyber glow effect near cursor
        if (dist < forceRadius && isHovered) {
          ctx.fillStyle = p.glowColor;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.glowColor;
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none opacity-60"
    />
  );
}
