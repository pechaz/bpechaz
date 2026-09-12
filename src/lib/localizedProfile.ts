import { useTranslations } from "next-intl";

import {
  ExperienceItem,
  Profile,
  Project,
  profile as baseProfile,
} from "@/config/profile";

type LocalizedExperience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
};

type LocalizedProject = {
  name: string;
  description: string;
  company?: string;
  period?: string;
};

export function useLocalizedProfile(): Profile {
  const t = useTranslations("profile");

  const experience: ExperienceItem[] = baseProfile.experience.map((item) => {
    const localized = t.raw(`experience.${item.id}`) as
      | LocalizedExperience
      | undefined;

    if (!localized) {
      return item;
    }

    return {
      ...item,
      company: localized.company ?? item.company,
      role: localized.role ?? item.role,
      period: localized.period ?? item.period,
      location: localized.location ?? item.location,
      description: localized.description ?? item.description,
    };
  });

  const projects: Project[] = baseProfile.projects.map((item) => {
    const localized = t.raw(`projects.${item.id}`) as
      | LocalizedProject
      | undefined;

    if (!localized) {
      return item;
    }

    return {
      ...item,
      name: localized.name ?? item.name,
      description: localized.description ?? item.description,
      company: localized.company ?? item.company,
      period: localized.period ?? item.period,
    };
  });

  return {
    ...baseProfile,
    name: t("name"),
    title: t("title"),
    location: t("location"),
    summary: t("summary"),
    coreCompetencies: t.raw("coreCompetencies") as string[],
    languages: t.raw("languages") as Profile["languages"],
    experience,
    projects,
  };
}

/** Server-safe merge using an already-loaded profile translation namespace. */
export function localizeProfileFromMessages(
  messages: {
    name: string;
    title: string;
    location: string;
    summary: string;
    coreCompetencies: string[];
    languages: Profile["languages"];
    experience: Record<string, LocalizedExperience>;
    projects: Record<string, LocalizedProject>;
  }
): Profile {
  const experience: ExperienceItem[] = baseProfile.experience.map((item) => {
    const localized = messages.experience?.[item.id];
    if (!localized) return item;
    return {
      ...item,
      company: localized.company ?? item.company,
      role: localized.role ?? item.role,
      period: localized.period ?? item.period,
      location: localized.location ?? item.location,
      description: localized.description ?? item.description,
    };
  });

  const projects: Project[] = baseProfile.projects.map((item) => {
    const localized = messages.projects?.[item.id];
    if (!localized) return item;
    return {
      ...item,
      name: localized.name ?? item.name,
      description: localized.description ?? item.description,
      company: localized.company ?? item.company,
      period: localized.period ?? item.period,
    };
  });

  return {
    ...baseProfile,
    name: messages.name,
    title: messages.title,
    location: messages.location,
    summary: messages.summary,
    coreCompetencies: messages.coreCompetencies,
    languages: messages.languages,
    experience,
    projects,
  };
}
