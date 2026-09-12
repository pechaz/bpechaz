"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import { useLocalizedProfile } from "@/lib/localizedProfile";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { ProjectCard } from "@/components/atomic/molecules/ProjectCard";
import { Button } from "@/components/atomic/atoms/Button";

const DEFAULT_VISIBLE = 12;

export default function Projects() {
  const t = useTranslations("projects");
  const tExp = useTranslations("experience");
  const localized = useLocalizedProfile();
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTechs, setShowAllTechs] = useState(false);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    localized.projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [localized.projects]);

  const visibleTechnologies = showAllTechs
    ? allTechnologies
    : allTechnologies.slice(0, DEFAULT_VISIBLE);

  const filteredProjects = useMemo(() => {
    let filtered = localized.projects;

    if (showFeaturedOnly) {
      filtered = filtered.filter((p) => p.featured);
    }

    if (selectedTag) {
      filtered = filtered.filter((p) => p.technologies.includes(selectedTag));
    }

    return filtered;
  }, [showFeaturedOnly, selectedTag, localized.projects]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="mb-8 space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showFeaturedOnly}
            onChange={(e) => setShowFeaturedOnly(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent-primary)] focus:ring-[var(--focus-ring)]"
          />
          <span className="text-sm font-medium text-[var(--foreground)]">
            {t("showFeaturedOnly")}
          </span>
        </label>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-subtle)]">
            {t("filterByTechnology")}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                selectedTag === null
                  ? "bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)]"
                  : "bg-[var(--tag-default-bg)] text-[var(--tag-default-text)] hover:bg-[var(--active-bg)]"
              }`}
              type="button"
            >
              {t("all")}
            </button>
            {visibleTechnologies.map((tech) => {
              const isSelected = selectedTag === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setSelectedTag(isSelected ? null : tech)}
                  className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)]"
                      : "bg-[var(--tag-default-bg)] text-[var(--tag-default-text)] hover:bg-[var(--active-bg)]"
                  }`}
                  type="button"
                >
                  {tech}
                </button>
              );
            })}
          </div>
          {allTechnologies.length > DEFAULT_VISIBLE && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => setShowAllTechs((v) => !v)}
            >
              {showAllTechs ? tExp("showLess") : tExp("showMore")}
            </Button>
          )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--foreground-muted)]">
          {t("noMatches")}
        </p>
      )}
    </main>
  );
}
