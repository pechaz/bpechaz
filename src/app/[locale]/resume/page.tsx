import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getMessages } from "next-intl/server";

import { profile } from "@/config/profile";
import { localizeProfileFromMessages } from "@/lib/localizedProfile";
import { Card } from "@/components/atomic/atoms/Card";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Tag } from "@/components/atomic/atoms/Tag";
import { ButtonLink } from "@/components/atomic/atoms/Button";

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
  const messages = await getMessages({ locale });
  const localized = localizeProfileFromMessages(
    (messages as { profile: Parameters<typeof localizeProfileFromMessages>[0] })
      .profile
  );

  const skillGroups = [
    {
      label: t("frontend"),
      skills: profile.technicalSkills.frontend,
      variant: "primary" as const,
    },
    {
      label: t("stateAndApis"),
      skills: profile.technicalSkills.stateAndApis,
      variant: "secondary" as const,
    },
    {
      label: t("backend"),
      skills: profile.technicalSkills.backend,
      variant: "primary" as const,
    },
    {
      label: t("data"),
      skills: profile.technicalSkills.data,
      variant: "secondary" as const,
    },
    {
      label: t("infra"),
      skills: profile.technicalSkills.infra,
      variant: "default" as const,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading title={t("title")} className="mb-0" />
        <ButtonLink href="/resume.pdf" external>
          {t("downloadPdf")}
        </ButtonLink>
      </div>

      <div className="space-y-8">
        <Card>
          <h1 className="mb-2 text-3xl font-bold text-[var(--foreground)]">
            {localized.name}
          </h1>
          <p className="mb-4 text-xl text-[var(--foreground-muted)]">
            {localized.title}
          </p>
          <div className="space-y-1 text-sm text-[var(--foreground-muted)]">
            <p>
              <strong className="text-[var(--foreground)]">
                {t("emailLabel")}:
              </strong>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-[var(--accent-primary)]"
              >
                {profile.email}
              </a>
            </p>
            <p>
              <strong className="text-[var(--foreground)]">
                {t("phoneLabel")}:
              </strong>{" "}
              <a
                href={`tel:${profile.phone}`}
                className="transition-colors hover:text-[var(--accent-primary)]"
              >
                {profile.phone}
              </a>
            </p>
            <div>
              <strong className="text-[var(--foreground)]">
                {t("linksLabel")}:
              </strong>{" "}
              {profile.socialLinks.map((link, idx) => (
                <span key={link.name}>
                  {idx > 0 && " · "}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {link.name}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
            {t("summary")}
          </h2>
          <p className="text-[var(--foreground-muted)]">{localized.summary}</p>
        </Card>

        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
            {t("coreCompetencies")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {localized.coreCompetencies.map((competency) => (
              <Tag key={competency} variant="primary">
                {competency}
              </Tag>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
            {t("technicalSkills")}
          </h2>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag key={skill} variant={group.variant}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-6 text-2xl font-semibold text-[var(--foreground)]">
            {t("experience")}
          </h2>
          <div className="space-y-8">
            {localized.experience.map((exp) => (
              <div
                key={exp.id}
                className="border-b border-[var(--border)] pb-6 last:border-0 last:pb-0"
              >
                <div className="mb-2">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">
                    {exp.role}
                  </h3>
                  <p className="text-lg font-medium text-[var(--foreground-secondary)]">
                    {exp.company}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {exp.period} · {exp.location}
                  </p>
                </div>
                <ul className="mb-4 space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li
                      key={idx}
                      className="text-[var(--foreground-muted)] before:me-2 before:content-['•']"
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

        <Card>
          <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
            {t("languages")}
          </h2>
          <div className="space-y-2">
            {localized.languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center justify-between"
              >
                <span className="font-medium text-[var(--foreground)]">
                  {lang.name}
                </span>
                <span className="text-sm text-[var(--foreground-muted)]">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="text-center">
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium text-[var(--accent-primary)] hover:underline"
          >
            {localized.email}
          </Link>
        </div>
      </div>
    </main>
  );
}
