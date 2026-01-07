import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { profile } from "@/config/profile";
import { Card } from "@/components/atomic/atoms/Card";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Tag } from "@/components/atomic/atoms/Tag";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resume" });
  const tp = await getTranslations({ locale, namespace: "profile" });

  return {
    title: `${t("title")}`,
    description: tp("summary").substring(0, 150) + "...",
  };
}

export default async function Resume({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resume" });
  const tp = await getTranslations({ locale, namespace: "profile" });
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeading title={t("title")} />
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {t("downloadPdf")}
        </Link>
      </div>

      <div className="space-y-8">
        {/* Header */}
        <Card>
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-gray-100">
            {tp("name")}
          </h1>
          <p className="mb-4 text-xl text-slate-700 dark:text-gray-400">
            {tp("title")}
          </p>
          <div className="space-y-1 text-sm text-slate-700 dark:text-gray-400">
            <p>
              <strong className="text-black dark:text-gray-100">
                {t("emailLabel")}:
              </strong>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-black dark:hover:text-gray-100"
              >
                {profile.email}
              </a>
            </p>
            <p>
              <strong className="text-black dark:text-gray-100">
                {t("phoneLabel")}:
              </strong>{" "}
              <a
                href={`tel:${profile.phone}`}
                className="transition-colors hover:text-black dark:hover:text-gray-100"
              >
                {profile.phone}
              </a>
            </p>
            <div>
              <strong className="text-black dark:text-gray-100">
                {t("linksLabel")}:
              </strong>
              {profile.socialLinks.map((link, idx) => (
                <span key={link.name}>
                  {idx > 0 && " • "}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black dark:hover:text-gray-100"
                  >
                    {link.name}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-black dark:text-gray-100">
            {t("summary")}
          </h2>
          <p className="text-slate-700 dark:text-gray-400">
            {tp.raw("summary")}
          </p>
        </Card>

        {/* Core Competencies */}
        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-black dark:text-gray-100">
            {t("coreCompetencies")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.coreCompetencies.map((competency) => (
              <Tag key={competency} variant="primary">
                {competency}
              </Tag>
            ))}
          </div>
        </Card>

        {/* Technical Skills */}
        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-black dark:text-gray-100">
            {t("technicalSkills")}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-gray-100">
                {t("frontend")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.technicalSkills.frontend.map((skill) => (
                  <Tag key={skill} variant="primary">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-gray-100">
                {t("backend")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.technicalSkills.backend.map((skill) => (
                  <Tag key={skill} variant="secondary">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-gray-100">
                {t("infra")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.technicalSkills.infra.map((skill) => (
                  <Tag key={skill} variant="default">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Experience */}
        <Card>
          <h2 className="mb-6 text-2xl font-semibold text-black dark:text-gray-100">
            {t("experience")}
          </h2>
          <div className="space-y-8">
            {profile.experience.map((exp) => (
              <div
                key={exp.id}
                className="border-b border-slate-200 pb-6 last:border-0 last:pb-0 dark:border-gray-800"
              >
                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-black dark:text-gray-100">
                    {exp.role}
                  </h3>
                  <p className="text-lg font-medium text-slate-800 dark:text-gray-300">
                    {exp.company}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    {exp.period} • {exp.location}
                  </p>
                </div>
                <ul className="mb-4 space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li
                      key={idx}
                      className="text-slate-700 dark:text-gray-400 before:me-2 before:content-['•']"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Tag key={tech} variant="default">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Languages */}
        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-black dark:text-gray-100">
            {t("languages")}
          </h2>
          <div className="space-y-2">
            {tp
              .raw("languages")
              .map((lang: { name: string; proficiency: string }) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium text-black dark:text-gray-100">
                    {lang.name}
                  </span>
                  <span className="text-sm text-slate-700 dark:text-gray-400">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
