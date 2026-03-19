"use client";

import { useRef, useEffect } from "react";

interface WavesProps {
  className?: string;
  color?: string;
}

export function Waves({ className = "", color = "var(--accent)" }: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1, sx: -1, sy: -1 });
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resolve CSS var color
    const resolveColor = () => {
      const temp = document.createElement("div");
      temp.style.color = color;
      document.body.appendChild(temp);
      const resolved = getComputedStyle(temp).color;
      document.body.removeChild(temp);
      return resolved;
    };

    const strokeColor = resolveColor();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();

    const cols = 50;
    const rows = 25;
    let frameCount = 0;

    const tick = (time: number) => {
      if (!isActiveRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Skip every other frame for performance
      frameCount++;
      if (frameCount % 2 !== 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const mouse = mouseRef.current;

      // Smooth mouse
      if (mouse.sx < 0) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
      }
      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const gapX = w / cols;
      const gapY = h / rows;
      const t = time * 0.0008;

      // Draw grid of crosses/dots that distort near mouse
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.35;

      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const x = i * gapX;
          const y = j * gapY;

          // Wave distortion
          const wave1 = Math.sin(x * 0.008 + t * 1.2) * 8;
          const wave2 = Math.cos(y * 0.006 + t * 0.8) * 6;
          const wave3 = Math.sin((x + y) * 0.004 + t * 0.5) * 4;

          let dx = wave1 + wave3;
          let dy = wave2 + wave3;

          // Mouse repulsion
          if (mouse.sx >= 0) {
            const mx = x - mouse.sx;
            const my = y - mouse.sy;
            const dist = Math.hypot(mx, my);
            const radius = 200;
            if (dist < radius) {
              const force = (1 - dist / radius) * 40;
              dx += (mx / dist) * force;
              dy += (my / dist) * force;
            }
          }

          const px = x + dx;
          const py = y + dy;

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
      mouseRef.current.sx = -1;
      mouseRef.current.sy = -1;
    };

    const observer = new IntersectionObserver(
      ([entry]) => { isActiveRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    rafRef.current = requestAnimationFrame(tick);
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
