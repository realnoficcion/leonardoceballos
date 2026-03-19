"use client";

import { useState, useMemo } from "react";
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

  const filteredProjects = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const colsSm = useMemo(
    () => distributeToColumns(filteredProjects, columns.sm),
    [filteredProjects, columns.sm]
  );
  const colsMd = useMemo(
    () => distributeToColumns(filteredProjects, columns.md),
    [filteredProjects, columns.md]
  );
  const colsLg = useMemo(
    () => distributeToColumns(filteredProjects, columns.lg),
    [filteredProjects, columns.lg]
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

      {/* Small: 1 col */}
      <StaggerReveal className="masonry-row-grid md:hidden">
        {colsSm.map((col, colIdx) => (
          <div key={colIdx} className="masonry-col">
            {col.map((project) => (
              <VideoCard key={project.slug} project={project} />
            ))}
          </div>
        ))}
      </StaggerReveal>

      {/* Medium: 2 cols */}
      <StaggerReveal className="masonry-row-grid hidden md:flex lg:hidden">
        {colsMd.map((col, colIdx) => (
          <div key={colIdx} className="masonry-col">
            {col.map((project) => (
              <VideoCard key={project.slug} project={project} />
            ))}
          </div>
        ))}
      </StaggerReveal>

      {/* Large: 3 cols */}
      <StaggerReveal className="masonry-row-grid hidden lg:flex">
        {colsLg.map((col, colIdx) => (
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
