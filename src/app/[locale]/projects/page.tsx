"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

import { profile } from "@/config/profile";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { ProjectCard } from "@/components/atomic/molecules/ProjectCard";

export default function Projects() {
  const t = useTranslations("projects");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    profile.projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = profile.projects;

    if (showFeaturedOnly) {
      filtered = filtered.filter((p) => p.featured);
    }

    if (selectedTag) {
      filtered = filtered.filter((p) => p.technologies.includes(selectedTag));
    }

    return filtered;
  }, [showFeaturedOnly, selectedTag]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800"
            />
            <span className="text-sm font-medium text-black dark:text-gray-100">
              {t("showFeaturedOnly")}
            </span>
          </label>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-black dark:text-gray-100">
            {t("filterByTechnology")}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium transition-colors ${
                selectedTag === null
                  ? "bg-black text-white dark:bg-gray-100 dark:text-gray-900"
                  : "bg-slate-100 text-black hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
              type="button"
            >
              {t("all")}
            </button>
            {allTechnologies.map((tech) => {
              const isSelected = selectedTag === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setSelectedTag(isSelected ? null : tech)}
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
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-700 dark:text-gray-400">
          {t("noMatches")}
        </p>
      )}
    </main>
  );
}
