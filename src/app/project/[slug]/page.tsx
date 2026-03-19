import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjectsBySection, projects } from "@/data/projects";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { VideoCard } from "@/components/grid/VideoCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — Leonardo Ceballos`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const relatedProjects = getProjectsBySection(project.section)
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="px-4 md:px-10 py-12 pt-[72px] max-w-[1400px] mx-auto">
      <ScrollToTop />
      {/* Back link */}
      <ScrollReveal>
        <Link
          href={project.section === "sound-design" ? "/#sound-work" : "/#video-work"}
          className="font-body text-xs uppercase tracking-[0.15em] text-accent/60 hover:text-accent transition-colors inline-block mb-8"
        >
          &larr; Back to {project.section === "sound-design" ? "Sound" : "Video"}
        </Link>
      </ScrollReveal>

      {/* Video player */}
      <ScrollReveal>
        <VideoPlayer src={project.videoSrc} poster={project.thumbnailSrc} youtubeId={project.youtubeId} vimeoId={project.vimeoId} instagramId={project.instagramId} />
      </ScrollReveal>

      {/* Project info */}
      <ScrollReveal delay={0.1}>
        <div className="mt-10 flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <h1 className="font-display text-4xl md:text-5xl tracking-wide">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 mt-3">
              <span className="font-body text-xs uppercase tracking-[0.15em] text-accent">
                {project.category}
              </span>
              <span className="font-body text-xs text-accent/60">
                {project.date}
              </span>
            </div>
            {project.client && (
              <span className="font-body text-xs text-accent/60 block mt-2">
                Client: {project.client}
              </span>
            )}
          </div>
          <p className="font-body text-sm md:text-base leading-relaxed text-accent/80 max-w-lg">
            {project.description}
          </p>
        </div>
      </ScrollReveal>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-24">
          <ScrollReveal>
            <h2 className="font-display text-2xl tracking-wide mb-8">
              MORE PROJECTS
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {relatedProjects.map((p) => (
              <VideoCard key={p.slug} project={p} />
            ))}
          </StaggerReveal>
        </div>
      )}
    </div>
  );
}
