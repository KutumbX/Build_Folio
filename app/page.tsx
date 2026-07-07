"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UpcomingEvents from "./components/home/UpcomingEvents/UpcomingEvents";
import CommunitySection from "./components/home/Community/CommunitySection";

const HeroSection = dynamic(
  () => import("./components/home/HeroSection"),
  { ssr: false }
);

export default function Home() {
  // Initialize Lenis Smooth Scroll
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

    // Update ScrollTrigger on Lenis scroll ticks
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Sync Lenis ticks with GSAP ticker loop
    const tickLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickLenis);
    
    // Disable lag smoothing to align ticking frames
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page hash anchor clicks for smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.hash && target.hash.startsWith("#")) {
        const hash = target.hash;
        const element = document.querySelector(hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -64, // header navbar offset height
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
    <main className="bg-[#04070C] text-white min-h-screen relative">
      <HeroSection />
      <UpcomingEvents />
      <CommunitySection />
    </main>
  );
}

