"use client";

import { useState, useMemo, useEffect } from "react";
import { Project, WorkSection } from "@/types/project";
import { VideoCard } from "./VideoCard";
import { CategoryFilter } from "./CategoryFilter";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { VIDEO_CATEGORIES, SOUND_CATEGORIES } from "@/lib/constants";

interface MasonryGridProps {
  projects: readonly Project[];
  section: WorkSection;
  columns?: { sm: number; md: number; lg: number };
  showFilter?: boolean;
}

function distributeToColumns(
  items: readonly Project[],
  numCols: number
): readonly Project[][] {
  const cols: Project[][] = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => {
    cols[i % numCols].push(item);
  });
  return cols;
}

function useBreakpoint(breakpoints: { sm: number; md: number; lg: number }) {
  const [numCols, setNumCols] = useState(breakpoints.sm);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setNumCols(breakpoints.lg);
      else if (w >= 768) setNumCols(breakpoints.md);
      else setNumCols(breakpoints.sm);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoints.sm, breakpoints.md, breakpoints.lg]);

  return numCols;
}

export function MasonryGrid({
  projects,
  section,
  columns = { sm: 1, md: 2, lg: 3 },
  showFilter = true,
}: MasonryGridProps) {
  const categories =
    section === "video-editing" ? VIDEO_CATEGORIES : SOUND_CATEGORIES;

  const [activeCategory, setActiveCategory] = useState<string | null>(
    showFilter && categories.length > 1 ? categories[0] : null
  );

  const numCols = useBreakpoint(columns);

  const filteredProjects = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const distributed = useMemo(
    () => distributeToColumns(filteredProjects, numCols),
    [filteredProjects, numCols]
  );

  return (
    <div>
      {showFilter && categories.length > 1 && (
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
        </div>
      )}

      <StaggerReveal className="masonry-row-grid">
        {distributed.map((col, colIdx) => (
          <div key={colIdx} className="masonry-col">
            {col.map((project) => (
              <VideoCard key={project.slug} project={project} />
            ))}
          </div>
        ))}
      </StaggerReveal>

      {filteredProjects.length === 0 && (
        <p className="text-accent/60 text-center py-20 font-body text-sm">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
