"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { ThemeToggle } from "../atoms/ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the mobile menu when the route changes (React-recommended
  // "adjust state when props change" pattern — not an effect).
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  const navItems = [
    { href: `/${locale}`, label: t("home"), exact: true },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/experience`, label: t("experience") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/contact`, label: t("contact") },
    { href: `/${locale}/resume`, label: t("resume") },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-background)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent-primary)]"
        >
          Bassir Pechaz
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]"
                    : "text-[var(--foreground-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ms-2 flex items-center gap-1 border-s border-[var(--border)] ps-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--foreground)] transition-colors hover:bg-[var(--hover-bg)]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`border-t border-[var(--border)] bg-[var(--card-background)] md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-1 px-3 py-3">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  active
                    ? "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)]"
                    : "text-[var(--foreground-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
