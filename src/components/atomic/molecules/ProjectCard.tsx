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
            <h3 className="text-xl font-semibold text-black dark:text-gray-100">
              {project.name}
            </h3>
            {project.company && (
              <p className="text-sm text-slate-700 dark:text-gray-400">
                {project.company}
              </p>
            )}
            {project.period && (
              <p className="text-xs text-slate-600 dark:text-gray-500">
                {project.period}
              </p>
            )}
          </div>
          {project.featured && (
            <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-900 dark:bg-blue-900 dark:text-blue-200">
              {t("featured")}
            </span>
          )}
        </div>
        <p className="mb-4 flex-1 text-slate-700 dark:text-gray-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech} variant="primary">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}
