"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { profile } from "@/config/profile";
import { Card } from "@/components/atomic/atoms/Card";
import { ProjectCard } from "@/components/atomic/molecules/ProjectCard";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Tag } from "@/components/atomic/atoms/Tag";

export default function Home() {
  const t = useTranslations("home");
  const tp = useTranslations("profile");
  const locale = useLocale();
  const featuredProjects = profile.projects
    .filter((p) => p.featured)
    .slice(0, 3);
  const featuredSkills = [
    ...profile.technicalSkills.frontend.slice(0, 6),
    ...profile.technicalSkills.backend.slice(0, 3),
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-gray-100 sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mb-8 text-xl text-slate-800 dark:text-gray-400">
              {t("subtitle")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {t("viewProjects")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 bg-white px-6 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {t("contact")}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-slate-200 dark:border-gray-800 sm:h-80 sm:w-80">
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
      </section>

      {/* Quick Highlights */}
      <section className="bg-slate-50 dark:bg-gray-900/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("coreCompetencies")}
            subtitle={t("coreCompetenciesSubtitle")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.coreCompetencies.map((competency) => (
              <Card key={competency} className="text-center">
                <h3 className="font-semibold text-slate-900 dark:text-gray-100">
                  {competency}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("technicalSkills")}
          subtitle={t("technicalSkillsSubtitle")}
        />
        <div className="flex flex-wrap gap-3">
          {featuredSkills.map((skill) => (
            <Tag key={skill} variant="primary">
              {skill}
            </Tag>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={`/${locale}/about`}
            className="text-base font-medium text-slate-900 transition-colors hover:text-slate-700 dark:text-gray-100 dark:hover:text-gray-300"
          >
            {t("viewAllSkills")}{" "}
            <span className="inline-block rtl:rotate-180">→</span>
          </Link>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-slate-50 dark:bg-gray-900/50">
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
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              {t("viewAllProjects")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-gray-100">
            {t("letsWorkTogether")}
          </h2>
          <p className="mb-6 text-slate-600 dark:text-gray-400">
            {t("letsWorkTogetherSubtitle")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {t("getInTouch")}
          </Link>
        </Card>
      </section>
    </main>
  );
}
