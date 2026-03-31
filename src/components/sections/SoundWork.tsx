"use client";

import { useState } from "react";
import { MasonryGrid } from "@/components/grid/MasonryGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getProjectsBySection } from "@/data/projects";

const spotifyArtists = [
  { name: "Stroka", id: "53DrlPptHzk8iT1xoJDYX5" },
  { name: "Real No Ficcíon", id: "3YQGp0xoC2GtuMBXEQ0OnK" },
];

type SoundTab = "work" | "autoral";

export function SoundWork() {
  const [tab, setTab] = useState<SoundTab>("work");
  const projects = getProjectsBySection("sound-design");

  return (
    <section id="sound-work" className="px-4 md:px-10 py-20 max-w-[1400px] mx-auto">
      <ScrollReveal>
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent">
            SOUND
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={() => setTab("work")}
              className={`font-body text-xs uppercase tracking-[0.15em] pb-1 border-b transition-colors ${
                tab === "work"
                  ? "text-accent border-accent"
                  : "text-accent/60 border-transparent hover:text-accent"
              }`}
            >
              Soundtracks | Sound Design
            </button>
            <button
              onClick={() => setTab("autoral")}
              className={`font-body text-xs uppercase tracking-[0.15em] pb-1 border-b transition-colors ${
                tab === "autoral"
                  ? "text-accent border-accent"
                  : "text-accent/60 border-transparent hover:text-accent"
              }`}
            >
              Autoral
            </button>
          </div>
        </div>
      </ScrollReveal>

      {tab === "work" && (
        <MasonryGrid projects={projects} section="sound-design" showFilter={false} />
      )}

      {tab === "autoral" && (
        <div className="space-y-12">
          {spotifyArtists.map((artist) => (
            <div key={artist.id}>
              <h3 className="font-display text-2xl md:text-3xl tracking-wide text-accent mb-4">
                {artist.name}
              </h3>
              <iframe
                src={`https://open.spotify.com/embed/artist/${artist.id}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-sm"
                style={{ borderRadius: "4px" }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
