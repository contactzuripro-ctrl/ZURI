"use client";

interface CategoryFilterProps {
  categories: string[];
  /** Catégorie affichée, ou `null` pour toutes. */
  selected: string | null;
  onChange: (category: string | null) => void;
}

/**
 * Pilules de filtre du catalogue : « Toutes » + une pilule par catégorie.
 * Pilule active = fond prune plein, comme le filtre de l'agenda.
 */
export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const pillClass = (isActive: boolean) =>
    `rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "border-transparent bg-plum-900 text-white"
        : "border-hairline text-ink-600 hover:bg-surface hover:text-ink-900"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={pillClass(selected === null)}
      >
        Toutes
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(selected === category ? null : category)}
          className={pillClass(selected === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
