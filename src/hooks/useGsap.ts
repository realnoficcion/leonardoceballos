"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useGsap(callback: (gsapInstance: typeof gsap) => void, deps: unknown[] = []) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap);
    });

    return () => {
      ctx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}
