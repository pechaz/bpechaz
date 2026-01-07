import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { profile } from "@/config/profile";
import { Card } from "@/components/atomic/atoms/Card";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";
import { Tag } from "@/components/atomic/atoms/Tag";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tp = await getTranslations({ locale, namespace: "profile" });

  return {
    title: `${t("title")}`,
    description: tp("summary").substring(0, 150) + "...",
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tp = await getTranslations({ locale, namespace: "profile" });

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} />

      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
          <Image
            src="/images/profile.webp"
            alt={tp("name")}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black dark:text-gray-100">
            {tp("name")}
          </h2>
          <p className="text-lg text-slate-800 dark:text-gray-400">
            {tp("title")}
          </p>
          <div className="space-y-2 text-slate-700 dark:text-gray-400">
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
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-gray-100">
          {t("bio")}
        </h2>
        <p className="text-lg leading-relaxed text-slate-800 dark:text-gray-400">
          {tp("summary")}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-black dark:text-gray-100">
          {t("coreCompetencies")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tp.raw("coreCompetencies").map((competency: string) => (
            <Card key={competency}>
              <h3 className="font-semibold text-black dark:text-gray-100">
                {competency}
              </h3>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-black dark:text-gray-100">
          {t("technicalSkills")}
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-gray-100">
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
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-gray-100">
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
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-gray-100">
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
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold text-black dark:text-gray-100">
          {t("languages")}
        </h2>
        <div className="space-y-2">
          {tp
            .raw("languages")
            .map((lang: { name: string; proficiency: string }) => (
              <Card key={lang.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black dark:text-gray-100">
                    {lang.name}
                  </span>
                  <span className="text-sm text-slate-700 dark:text-gray-400">
                    {lang.proficiency}
                  </span>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}
