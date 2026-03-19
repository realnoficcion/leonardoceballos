"use client";

interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string | null;
  onFilterChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onFilterChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={`font-body text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors pb-1 border-b ${
            activeCategory === cat
              ? "text-accent border-accent"
              : "text-accent/60 border-transparent hover:text-accent"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
