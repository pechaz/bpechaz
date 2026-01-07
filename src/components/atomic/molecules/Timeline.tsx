import { ExperienceItem } from "@/config/profile";
import { Tag } from "../atoms/Tag";

interface TimelineProps {
  items: ExperienceItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line - centered on bullets */}
      {/* Mobile: bullet is 32px (h-8 w-8), center at 16px. Line is 2px wide, so start-[15px] centers it */}
      {/* Desktop: bullet is 40px (h-10 w-10), center at 20px. Line is 2px wide, so start-[19px] centers it */}
      <div className="absolute start-[15px] top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-800 md:start-[19px]" />
      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex gap-6 md:gap-8">
            {/* Bullet container - positioned to align with line center */}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:h-10 md:w-10">
              <div className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-600 md:h-4 md:w-4" />
            </div>
            <div className="flex-1 pb-12">
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-black dark:text-gray-100">
                  {item.role}
                </h3>
                <p className="text-lg font-medium text-slate-800 dark:text-gray-300">
                  {item.company}
                </p>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {item.period} • {item.location}
                </p>
              </div>
              <ul className="mb-4 space-y-2">
                {item.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="text-slate-700 dark:text-gray-400 before:me-2 before:content-['•']"
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
