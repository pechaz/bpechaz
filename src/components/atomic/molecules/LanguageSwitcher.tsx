"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Remove current locale from pathname
    let pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    if (!pathWithoutLocale.startsWith("/")) {
      pathWithoutLocale = "/" + pathWithoutLocale;
    }

    // Add new locale
    const newPath = `/${newLocale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`;
    router.push(newPath);
  };

  const currentLocaleIndex = locales.indexOf(locale as Locale);
  const nextLocale = locales[(currentLocaleIndex + 1) % locales.length];

  return (
    <button
      onClick={() => switchLocale(nextLocale)}
      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
      aria-label={`Switch to ${localeNames[nextLocale]} language`}
      type="button"
      title={`Switch to ${localeNames[nextLocale]}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="ms-1 hidden text-sm font-medium sm:inline">
        {locale.toUpperCase()}
      </span>
    </button>
  );
}
