"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.08,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap((gsapInstance) => {
    if (!ref.current) return;

    const colItems = ref.current.querySelectorAll(".masonry-col > *");
    const items = colItems.length > 0 ? colItems : ref.current.children;
    if (!items.length) return;

    gsapInstance.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
