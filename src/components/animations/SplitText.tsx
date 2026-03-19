"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  duration = 1.2,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(
    (gsapInstance) => {
      if (!ref.current) return;

      const chars = ref.current.querySelectorAll(".char-inner");
      if (!chars.length) return;

      gsapInstance.fromTo(
        chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "expo.out",
        }
      );
    },
    [delay, stagger, duration]
  );

  const characters = Array.from(text);

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {characters.map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span className="char-inner inline-block" style={{ opacity: 0 }}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </div>
  );
}
