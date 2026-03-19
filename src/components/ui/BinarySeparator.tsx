"use client";

import { useEffect, useRef } from "react";

interface BinarySeparatorProps {
  strings?: string[];
  inverted?: boolean;
  className?: string;
}

function toBinary(str: string): string {
  return str
    .split("")
    .map((c) => c.charCodeAt(0).toString(2))
    .join(" ");
}

export function BinarySeparator({
  strings = ["Do", "Things", "Your", "Way"],
  inverted = false,
  className = "",
}: BinarySeparatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLSpanElement>(".bin-char");

    const interval = setInterval(() => {
      chars.forEach((char) => {
        if (char.dataset.type === "blank" || Math.random() > 0.1) return;
        char.textContent = Math.random() > 0.5 ? "1" : "0";
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const binaries = strings.map(toBinary);

  const bg = inverted ? "bg-accent" : "bg-transparent";
  const border = inverted ? "border-black" : "border-accent/30";
  const text = inverted ? "text-black" : "text-accent/60";
  const triangle = inverted ? "border-l-black" : "border-l-accent/40";
  const triangleR = inverted ? "border-r-black" : "border-r-accent/40";

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-between px-4 md:px-10 h-9 border-y ${border} ${bg} font-mono text-[8px] ${text} overflow-hidden ${className}`}
    >
      {/* Left triangle */}
      <span
        className={`w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] ${triangle} flex-shrink-0`}
      />

      {/* Binary codes */}
      <div className="flex items-center justify-between flex-1 px-2 overflow-hidden">
        {binaries.map((binary, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="flex tracking-tight">
              {binary.split("").map((char, j) => (
                <span
                  key={j}
                  className="bin-char inline-block w-[5px] text-center"
                  data-type={char === " " ? "blank" : "digit"}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            {i < binaries.length - 1 && (
              <span className="mx-2 opacity-40 text-[7px] leading-[8px] overflow-hidden h-2">
                {"///////////"}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Right triangle */}
      <span
        className={`w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-r-[5px] ${triangleR} flex-shrink-0`}
      />
    </div>
  );
}
