"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useVideoHover } from "@/hooks/useVideoHover";
import { Project } from "@/types/project";

interface VideoCardProps {
  project: Project;
}

export function VideoCard({ project }: VideoCardProps) {
  const { videoRef, handleMouseEnter, handleMouseLeave } = useVideoHover();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasLocalVideo = !project.youtubeId && project.videoSrc;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/project/${project.slug}`}
      className="block group relative overflow-hidden"
      onMouseEnter={hasLocalVideo ? handleMouseEnter : undefined}
      onMouseLeave={hasLocalVideo ? handleMouseLeave : undefined}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: project.aspectRatio }}
      >
        {/* Poster image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isVisible ? project.thumbnailSrc : undefined}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Video (plays on hover) — only mount when visible */}
        {hasLocalVideo && isVisible && (
          <video
            ref={videoRef}
            src={project.videoSrc}
            muted
            playsInline
            loop
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-expo-out">
          <h3 className="font-display text-xl md:text-2xl tracking-wide text-accent">
            {project.title}
          </h3>
          <span className="font-body text-[11px] uppercase tracking-[0.15em] text-accent mt-1 block">
            {project.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
