import { ScrollReveal } from "@/components/animations/ScrollReveal";

const spotifyArtists = [
  { name: "Real No Ficcíon", id: "3YQGp0xoC2GtuMBXEQ0OnK" },
  { name: "Stroka", id: "53DrlPptHzk8iT1xoJDYX5" },
];

export function Autoral() {
  return (
    <section id="autoral" className="px-4 md:px-10 py-20 max-w-[1400px] mx-auto">
      <ScrollReveal>
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent">
            AUTORAL
          </h2>
          <p className="font-body text-accent/70 text-sm mt-3 max-w-md">
            Original music projects.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-12">
        {spotifyArtists.map((artist) => (
          <ScrollReveal key={artist.id}>
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
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
