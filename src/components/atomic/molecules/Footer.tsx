"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { profile } from "@/config/profile";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tp = useTranslations("profile");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-gray-100">
              {tp("name")}
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              {tp("title")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-gray-100">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/experience`}
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {tNav("experience")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/projects`}
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {tNav("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-gray-100">
              {t("connect")}
            </h3>
            <ul className="space-y-2">
              {profile.socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-slate-600 dark:text-gray-400">
            © {currentYear} {tp("name")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
