"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import { useLocalizedProfile } from "@/lib/localizedProfile";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Timeline } from "@/components/atomic/molecules/Timeline";
import { Button } from "@/components/atomic/atoms/Button";

const DEFAULT_VISIBLE = 12;

export default function Experience() {
  const t = useTranslations("experience");
  const localized = useLocalizedProfile();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTechs, setShowAllTechs] = useState(false);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    localized.experience.forEach((exp) => {
      exp.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [localized.experience]);

  const visibleTechnologies = showAllTechs
    ? allTechnologies
    : allTechnologies.slice(0, DEFAULT_VISIBLE);

  const filteredExperience = useMemo(() => {
    if (selectedTags.length === 0) {
      return localized.experience;
    }
    return localized.experience.filter((exp) =>
      selectedTags.some((tag) => exp.technologies.includes(tag))
    );
  }, [selectedTags, localized.experience]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="mb-10">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-subtle)]">
          {t("filterByTechnology")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {visibleTechnologies.map((tech) => {
            const isSelected = selectedTags.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => toggleTag(tech)}
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
            {showAllTechs ? t("showLess") : t("showMore")}
          </Button>
        )}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="mt-3 block text-sm text-[var(--accent-primary)] underline underline-offset-2"
            type="button"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>

      <div className="mb-8">
        {filteredExperience.length > 0 ? (
          <Timeline items={filteredExperience} />
        ) : (
          <p className="text-center text-[var(--foreground-muted)]">
            {t("noMatches")}
          </p>
        )}
      </div>
    </main>
  );
}
