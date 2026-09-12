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
    <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              {tp("name")}
            </h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              {tp("title")}
            </p>
            <p className="mt-2 text-sm text-[var(--foreground-subtle)]">
              {tp("location")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/about`, label: tNav("about") },
                { href: `/${locale}/experience`, label: tNav("experience") },
                { href: `/${locale}/projects`, label: tNav("projects") },
                { href: `/${locale}/contact`, label: tNav("contact") },
                { href: `/${locale}/resume`, label: tNav("resume") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
              {t("connect")}
            </h3>
            <ul className="space-y-2">
              {profile.socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent-primary)]"
                >
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="text-center text-sm text-[var(--foreground-subtle)]">
            © {currentYear} {tp("name")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
