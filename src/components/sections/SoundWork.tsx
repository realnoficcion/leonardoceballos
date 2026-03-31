import { MasonryGrid } from "@/components/grid/MasonryGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getProjectsBySection } from "@/data/projects";

export function SoundWork() {
  const projects = getProjectsBySection("sound-design");

  return (
    <section id="sound-work" className="px-4 md:px-10 py-20 max-w-[1400px] mx-auto">
      <ScrollReveal>
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent">
            SOUNDTRACKS | SOUND DESIGN
          </h2>
        </div>
      </ScrollReveal>

      <MasonryGrid projects={projects} section="sound-design" showFilter={false} />
    </section>
  );
}
