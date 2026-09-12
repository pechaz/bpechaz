"use client";

import { useTranslations } from "next-intl";

import { ExperienceItem } from "@/config/profile";
import { Tag } from "../atoms/Tag";

interface TimelineProps {
  items: ExperienceItem[];
}

export function Timeline({ items }: TimelineProps) {
  const t = useTranslations("experience");

  return (
    <div className="relative">
      <div className="absolute start-[15px] top-0 h-full w-0.5 bg-[var(--border)] md:start-[19px]" />
      <div className="space-y-10">
        {items.map((item) => (
          <div key={item.id} className="relative flex gap-6 md:gap-8">
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-[var(--card-background)] md:h-10 md:w-10 ${
                item.current
                  ? "border-[var(--accent-primary)]"
                  : "border-[var(--border)]"
              }`}
            >
              <div
                className={`h-3 w-3 rounded-full md:h-3.5 md:w-3.5 ${
                  item.current
                    ? "bg-[var(--accent-primary)]"
                    : "bg-[var(--foreground-subtle)]"
                }`}
              />
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="rounded-full bg-[var(--accent-primary-muted)] px-2 py-0.5 text-xs font-medium text-[var(--accent-primary)]">
                        {t("current")}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-medium text-[var(--foreground-secondary)]">
                    {item.company}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium text-[var(--foreground-muted)] sm:text-end">
                  {item.period}
                  <span className="mx-1.5 text-[var(--foreground-subtle)]">
                    ·
                  </span>
                  {item.location}
                </p>
              </div>
              <ul className="mb-4 space-y-2">
                {item.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="text-[var(--foreground-muted)] before:me-2 before:text-[var(--accent-primary)] before:content-['•']"
                  >
                    {desc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Tag key={tech} variant="default">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
