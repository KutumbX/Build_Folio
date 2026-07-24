"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import AboutSection from "../components/home/About/AboutSection";

export default function AboutPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#04070C] text-white min-h-screen pt-4">
      <AboutSection />
    </main>
  );
}
