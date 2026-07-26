"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BuilderNightsSection from "../components/builder-nights/BuilderNightsSection";

export default function BuilderNightsPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.hash && target.hash.startsWith("#")) {
        const hash = target.hash;
        const element = document.querySelector(hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -64,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickLenis);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <main className="bg-[#04070C] text-white min-h-screen pt-4">
      <BuilderNightsSection />
    </main>
  );
}
