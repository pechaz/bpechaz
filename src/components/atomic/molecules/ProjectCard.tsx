"use client";

import { useTranslations } from "next-intl";

import { Project } from "@/config/profile";
import { Card } from "../atoms/Card";
import { Tag } from "../atoms/Tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("projects");

  return (
    <Card hover className="h-full">
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              {project.name}
            </h3>
            {project.company && (
              <p className="text-sm text-[var(--foreground-muted)]">
                {project.company}
              </p>
            )}
            {project.period && (
              <p className="text-xs text-[var(--foreground-subtle)]">
                {project.period}
              </p>
            )}
          </div>
          {project.featured && (
            <span className="shrink-0 rounded-full bg-[var(--tag-primary-bg)] px-2 py-1 text-xs font-medium text-[var(--tag-primary-text)]">
              {t("featured")}
            </span>
          )}
        </div>
        <p className="mb-4 flex-1 text-[var(--foreground-muted)]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech} variant="primary">
              {tech}
            </Tag>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
          >
            {t("viewSite")}
            <span className="inline-block rtl:rotate-180" aria-hidden>
              →
            </span>
          </a>
        )}
      </div>
    </Card>
  );
}
