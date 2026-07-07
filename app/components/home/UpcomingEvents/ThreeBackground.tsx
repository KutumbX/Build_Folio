"use client";

import React, { useRef, useEffect } from "react";

interface ThreeBackgroundProps {
  isHovered: boolean;
}

export default function ThreeBackground({ isHovered }: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Particle vector logic for 3D depth simulation
    class Particle {
      x!: number;
      y!: number;
      z!: number;
      size!: number;
      color!: string;
      speed!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 1.8;
        this.y = (Math.random() - 0.5) * height * 1.8;
        this.z = Math.random() * 350 + 50; // Z depth
        this.size = Math.random() * 1.2 + 0.4;
        this.color = Math.random() > 0.5 ? "rgba(0, 245, 255, 0.4)" : "rgba(255, 255, 255, 0.3)";
        this.speed = Math.random() * 0.6 + 0.15;
      }

      update() {
        // Accelerate drift rate slightly when hovered
        this.z -= this.speed * (isHovered ? 2.2 : 0.7);
        if (this.z <= 0) {
          this.reset();
          this.z = 400;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        const fov = 180;
        const scale = fov / (fov + this.z);
        const px = this.x * scale + width / 2;
        const py = this.y * scale + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          c.beginPath();
          c.arc(px, py, this.size * scale * 2.2, 0, Math.PI * 2);
          c.fillStyle = this.color;
          c.fill();
        }
      }
    }

    const count = 35;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    let gridOffset = 0;

    const resizeHandler = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resizeHandler);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // ─── Drawing 3D Perspective Grid ───
      ctx.strokeStyle = "rgba(0, 245, 255, 0.02)";
      ctx.lineWidth = 1;

      const vanishingY = height * 0.45; // Vanishing horizon line
      const cols = 10;
      
      // Draw vertical vanishing lines converging at center horizon
      for (let i = 0; i <= cols; i++) {
        const xPos = (width / cols) * i;
        ctx.beginPath();
        ctx.moveTo(xPos, height);
        ctx.lineTo(width / 2 + (xPos - width / 2) * 0.08, vanishingY);
        ctx.stroke();
      }

      // Scroll speed modifier
      gridOffset += isHovered ? 0.8 : 0.2;
      if (gridOffset >= 35) gridOffset = 0;

      const horizLines = 8;
      for (let i = 0; i < horizLines; i++) {
        const relativePos = (i * 35 + gridOffset) / (horizLines * 35);
        // Exponential line spacing for perspective scaling
        const yPos = vanishingY + (height - vanishingY) * Math.pow(relativePos, 2.2);
        
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.04 * relativePos})`;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

      // ─── Draw Particle Field ───
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-45 z-0"
    />
  );
}
