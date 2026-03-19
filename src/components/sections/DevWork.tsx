"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const devProjects = [
  {
    title: "Scriptau",
    description: "Platform for scriptwriting and content creation.",
    url: "https://www.scriptau.com/",
    thumbnail: "/thumbnails/scriptau.jpg",
  },
  {
    title: "RNF Audio",
    description: "Audio tools and sound design platform.",
    url: "https://www.rnfaudio.space/",
    thumbnail: "/thumbnails/rnfaudio.jpg",
  },
  {
    title: "Real No Ficción",
    description: "Live streaming and interactive media platform.",
    url: "https://realnoficcion.live/",
    thumbnail: "/thumbnails/realnoficcion.jpg",
  },
  {
    title: "Fontara",
    description: "Font discovery and typography tools.",
    url: "https://www.fontara.cc/",
    thumbnail: "/thumbnails/fontara.jpg",
  },
];

export function DevWork() {
  return (
    <section id="dev-work" className="px-4 md:px-10 py-20 max-w-[1400px] mx-auto">
      <ScrollReveal>
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent">
            DEV
          </h2>
          <p className="font-body text-accent/70 text-sm mt-3 max-w-md">
            Apps and tools I built.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devProjects.map((project) => (
          <ScrollReveal key={project.title}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group overflow-hidden border border-accent/20 hover:border-accent/50 rounded-sm transition-all duration-500"
            >
              {/* Thumbnail */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl tracking-wide text-accent group-hover:text-accent-hover transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-accent/60 text-sm mt-2">
                  {project.description}
                </p>
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-accent/40 group-hover:text-accent/70 mt-4 block transition-colors">
                  Visit site &rarr;
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
