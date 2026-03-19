"use client";

import { useRef } from "react";
import { SplitText } from "@/components/animations/SplitText";
import { Waves } from "@/components/animations/Waves";
import { BinarySeparator } from "@/components/ui/BinarySeparator";
import { useGsap } from "@/hooks/useGsap";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGsap((gsapInstance) => {
    if (!sectionRef.current) return;

    const tl = gsapInstance.timeline();

    // Fade in the whole section
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      0
    );

    // Animate border
    if (borderRef.current) {
      tl.fromTo(
        borderRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "expo.inOut" },
        0.2
      );
    }

    // Content clip reveal
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "expo.inOut",
        },
        0.8
      );
    }

  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col relative"
      style={{ opacity: 0 }}
    >
      {/* Waves background */}
      <div className="flex-1 relative overflow-hidden">
        <Waves className="absolute inset-0" color="var(--accent)" />
      </div>

      {/* Content area */}
      <div ref={contentRef} className="relative">
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-accent/30" />

        {/* Name separator */}
        <BinarySeparator
          strings={["Leo", "nar", "do", "Ce", "bal", "los"]}
        />

        {/* Title */}
        <div className="py-6 md:py-10 px-4 md:px-10 overflow-hidden">
          <SplitText
            text="MULTIDISCIPLINARY CREATIVE"
            className="font-display text-[7.5vw] md:text-[7vw] lg:text-[6.5vw] tracking-wide leading-[0.85] text-accent w-full justify-between"
            delay={0.8}
            stagger={0.03}
          />
        </div>

        {/* Tagline separator */}
        <BinarySeparator
          strings={["Video", "Sound", "Motion", "Code"]}
        />
      </div>

      {/* Bottom border line */}
      <div
        ref={borderRef}
        className="h-px bg-accent/30 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </section>
  );
}
