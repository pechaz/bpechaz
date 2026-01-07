"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import { profile } from "@/config/profile";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Timeline } from "@/components/atomic/molecules/Timeline";

export default function Experience() {
  const t = useTranslations("experience");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    profile.experience.forEach((exp) => {
      exp.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter experience based on selected tags
  const filteredExperience = useMemo(() => {
    if (selectedTags.length === 0) {
      return profile.experience;
    }
    return profile.experience.filter((exp) =>
      selectedTags.some((tag) => exp.technologies.includes(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      {/* Filter Tags */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-black dark:text-gray-100">
          {t("filterByTechnology")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTechnologies.map((tech) => {
            const isSelected = selectedTags.includes(tech);
            return (
              <button
                key={tech}
                onClick={() => toggleTag(tech)}
                className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-black text-white dark:bg-gray-100 dark:text-gray-900"
                    : "bg-slate-100 text-black hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
                type="button"
              >
                {tech}
              </button>
            );
          })}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="mt-4 text-sm text-slate-700 underline transition-colors hover:text-black dark:text-gray-400 dark:hover:text-gray-100"
            type="button"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="mb-8">
        {filteredExperience.length > 0 ? (
          <Timeline items={filteredExperience} />
        ) : (
          <p className="text-center text-slate-700 dark:text-gray-400">
            {t("noMatches")}
          </p>
        )}
      </div>
    </main>
  );
}
