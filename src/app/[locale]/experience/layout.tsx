import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experience" });
  const tp = await getTranslations({ locale, namespace: "profile" });
  
  return {
    title: t("title"),
    description: `Work experience of ${tp("name")} - ${tp("title")} with 14+ years of professional experience`,
  };
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

