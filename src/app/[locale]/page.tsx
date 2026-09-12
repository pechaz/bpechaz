"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { useLocalizedProfile } from "@/lib/localizedProfile";
import { Card } from "@/components/atomic/atoms/Card";
import { ButtonLink } from "@/components/atomic/atoms/Button";
import { ProjectCard } from "@/components/atomic/molecules/ProjectCard";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Tag } from "@/components/atomic/atoms/Tag";

export default function Home() {
  const t = useTranslations("home");
  const tp = useTranslations("profile");
  const locale = useLocale();
  const localized = useLocalizedProfile();

  const featuredProjects = localized.projects
    .filter((p) => p.featured)
    .slice(0, 3);

  const featuredSkills = [
    ...localized.technicalSkills.frontend.slice(0, 4),
    ...localized.technicalSkills.backend.slice(0, 3),
    ...localized.technicalSkills.data.slice(0, 2),
    ...localized.technicalSkills.infra.slice(0, 3),
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 70% -20%, var(--accent-primary-muted), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up flex flex-col justify-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                {tp("name")}
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="mb-3 text-lg leading-relaxed text-[var(--foreground-muted)] sm:text-xl">
                {t("subtitle")}
              </p>
              <p className="mb-8 text-sm font-medium text-[var(--foreground-subtle)]">
                {t("availableWorldwide")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={`/${locale}/projects`}>
                  {t("viewProjects")}
                </ButtonLink>
                <ButtonLink href={`/${locale}/contact`} variant="secondary">
                  {t("contact")}
                </ButtonLink>
                <ButtonLink
                  href="/resume.pdf"
                  variant="ghost"
                  external
                  className="underline-offset-4 hover:underline"
                >
                  {t("downloadResume")}
                </ButtonLink>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-full opacity-40 blur-2xl"
                  style={{ background: "var(--accent-primary-muted)" }}
                  aria-hidden
                />
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-[var(--border)] shadow-[var(--shadow-md)] sm:h-80 sm:w-80">
                  <Image
                    src="/images/profile.webp"
                    alt={tp("name")}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background-secondary)]">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("coreCompetencies")}
            subtitle={t("coreCompetenciesSubtitle")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {localized.coreCompetencies.map((competency) => (
              <Card key={competency} className="text-center">
                <h3 className="font-semibold text-[var(--foreground)]">
                  {competency}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("technicalSkills")}
          subtitle={t("technicalSkillsSubtitle")}
        />
        <div className="flex flex-wrap gap-2.5">
          {featuredSkills.map((skill) => (
            <Tag key={skill} variant="primary">
              {skill}
            </Tag>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={`/${locale}/about`}
            className="text-base font-medium text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
          >
            {t("viewAllSkills")}{" "}
            <span className="inline-block rtl:rotate-180">→</span>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--background-secondary)]">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("selectedWork")}
            subtitle={t("selectedWorkSubtitle")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href={`/${locale}/projects`}>
              {t("viewAllProjects")}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-[var(--accent-primary)]/20 bg-gradient-to-br from-[var(--card-background)] to-[var(--accent-primary-muted)]/30 text-center">
          <h2 className="mb-3 text-2xl font-bold text-[var(--foreground)]">
            {t("letsWorkTogether")}
          </h2>
          <p className="mb-6 text-[var(--foreground-muted)]">
            {t("letsWorkTogetherSubtitle")}
          </p>
          <ButtonLink href={`/${locale}/contact`}>{t("getInTouch")}</ButtonLink>
        </Card>
      </section>
    </main>
  );
}
