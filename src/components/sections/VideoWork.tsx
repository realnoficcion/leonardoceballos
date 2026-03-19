import { MasonryGrid } from "@/components/grid/MasonryGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getProjectsBySection } from "@/data/projects";

export function VideoWork() {
  const projects = getProjectsBySection("video-editing");

  return (
    <section id="video-work" className="px-4 md:px-10 py-20 max-w-[1400px] mx-auto">
      <ScrollReveal>
        <div className="mb-12">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent">
            VIDEO
          </h2>
          <p className="font-body text-accent/70 text-sm mt-3 max-w-md">
            Video editing for brands and creators.
          </p>
        </div>
      </ScrollReveal>

      <MasonryGrid projects={projects} section="video-editing" />
    </section>
  );
}
