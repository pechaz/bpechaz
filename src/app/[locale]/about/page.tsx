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

  const skillGroups = [
    {
      key: "frontend" as const,
      label: t("frontend"),
      skills: profile.technicalSkills.frontend,
      variant: "primary" as const,
    },
    {
      key: "stateAndApis" as const,
      label: t("stateAndApis"),
      skills: profile.technicalSkills.stateAndApis,
      variant: "secondary" as const,
    },
    {
      key: "backend" as const,
      label: t("backend"),
      skills: profile.technicalSkills.backend,
      variant: "primary" as const,
    },
    {
      key: "data" as const,
      label: t("data"),
      skills: profile.technicalSkills.data,
      variant: "secondary" as const,
    },
    {
      key: "infra" as const,
      label: t("infra"),
      skills: profile.technicalSkills.infra,
      variant: "default" as const,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} />

      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div className="relative h-96 w-full overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--shadow-md)]">
          <Image
            src="/images/profile.webp"
            alt={tp("name")}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            {tp("name")}
          </h2>
          <p className="text-lg text-[var(--foreground-muted)]">
            {tp("title")}
          </p>
          <div className="space-y-2 text-[var(--foreground-muted)]">
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
            <p>
              <strong className="text-[var(--foreground)]">
                {t("locationLabel")}:
              </strong>{" "}
              {tp("location")}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
          {t("bio")}
        </h2>
        <p className="text-lg leading-relaxed text-[var(--foreground-muted)]">
          {tp("summary")}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-[var(--foreground)]">
          {t("coreCompetencies")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tp.raw("coreCompetencies").map((competency: string) => (
            <Card key={competency}>
              <h3 className="font-semibold text-[var(--foreground)]">
                {competency}
              </h3>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-[var(--foreground)]">
          {t("technicalSkills")}
        </h2>
        <div className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.key}>
              <h3 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
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
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold text-[var(--foreground)]">
          {t("languages")}
        </h2>
        <div className="space-y-2">
          {tp
            .raw("languages")
            .map((lang: { name: string; proficiency: string }) => (
              <Card key={lang.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--foreground)]">
                    {lang.name}
                  </span>
                  <span className="text-sm text-[var(--foreground-muted)]">
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
