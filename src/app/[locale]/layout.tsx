import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";

import { locales } from "@/i18n/config";
import { ThemeProvider } from "@/components/atomic/provider/ThemeProvider";
import { Header } from "@/components/atomic/molecules/Header";
import { Footer } from "@/components/atomic/molecules/Footer";
import { SITE_URL } from "@/config/constants";
import { inter, iranSansX } from "@/lib/fonts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });
  const name = t("name");
  const title = t("title");
  const summary = t("summary");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${name} | ${title}`,
      template: `%s | ${name}`,
    },
    description: summary,
    keywords: [
      "Senior Full-Stack Engineer",
      "Site Reliability",
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "Python",
      "Go",
      "TypeScript",
      "Kubernetes",
      "Kafka",
      "Software Engineer",
    ],
    authors: [{ name }],
    creator: name,
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      url: SITE_URL,
      siteName: name,
      title: `${name} | ${title}`,
      description: summary,
      images: [
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description: summary,
      images: ["/og.svg"],
      creator: "@pechaz",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${iranSansX.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
