"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

import { profile } from "@/config/profile";
import { Card } from "@/components/atomic/atoms/Card";
import { Button } from "@/components/atomic/atoms/Button";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";

type SubjectPreset = "role" | "project" | "other";

export default function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [preset, setPreset] = useState<SubjectPreset | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(
    null
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("subjectRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("messageMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `${t("name")}: ${formData.name}\n${t("email")}: ${formData.email}\n\n${t(
        "message"
      )}:\n${formData.message}`
    );
    const mailtoLink = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "subject") setPreset(null);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const applyPreset = (key: SubjectPreset) => {
    const label = t(`subjectPresets.${key}`);
    setPreset(key);
    setFormData((prev) => ({ ...prev, subject: label }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: "" }));
    }
  };

  const copyValue = async (field: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard may be unavailable; ignore.
    }
  };

  const inputClass = (hasError: boolean) =>
    `mt-1 block w-full rounded-lg border-2 bg-[var(--card-background)] px-3 py-2.5 text-[var(--foreground)] shadow-sm focus:outline-none focus:ring-2 ${
      hasError
        ? "border-[var(--danger-text)] focus:border-[var(--danger-text)] focus:ring-[var(--danger-text)]"
        : "border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-[var(--focus-ring)]"
    }`;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
              {t("contactInformation")}
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-medium text-[var(--foreground-subtle)]">
                  {t("email")}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[var(--foreground)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyValue("email", profile.email)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-[var(--accent-primary)] hover:bg-[var(--hover-bg)]"
                  >
                    {copiedField === "email" ? t("copied") : t("copy")}
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[var(--foreground-subtle)]">
                  {t("phone")}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-[var(--foreground)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {profile.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyValue("phone", profile.phone)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-[var(--accent-primary)] hover:bg-[var(--hover-bg)]"
                  >
                    {copiedField === "phone" ? t("copied") : t("copy")}
                  </button>
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-[var(--foreground-subtle)]">
                  {t("social")}
                </h4>
                <div className="space-y-2">
                  {profile.socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[var(--foreground)] transition-colors hover:text-[var(--accent-primary)]"
                    >
                      {link.name}{" "}
                      <span className="inline-block rtl:rotate-180">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="mb-6 text-xl font-semibold text-[var(--foreground)]">
              {t("sendMessage")}
            </h3>
            {submitted ? (
              <div className="rounded-lg bg-[var(--success-bg)] p-4 text-[var(--success-text)]">
                <p className="font-medium">{t("thankYou")}</p>
                <p className="mt-2 text-sm">
                  {t("thankYouSubtitle", { email: profile.email })}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  {t("sendAnother")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--foreground)]"
                  >
                    {t("name")}{" "}
                    <span className="text-[var(--danger-text)]">
                      {t("required")}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass(!!errors.name)}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-sm text-[var(--danger-text)]"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--foreground)]"
                  >
                    {t("email")}{" "}
                    <span className="text-[var(--danger-text)]">
                      {t("required")}
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass(!!errors.email)}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-[var(--danger-text)]"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[var(--foreground)]"
                  >
                    {t("subject")}{" "}
                    <span className="text-[var(--danger-text)]">
                      {t("required")}
                    </span>
                  </label>
                  <div className="mt-2 mb-2 flex flex-wrap gap-2">
                    {(
                      ["role", "project", "other"] as const
                    ).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyPreset(key)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          preset === key
                            ? "bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)]"
                            : "bg-[var(--tag-default-bg)] text-[var(--tag-default-text)] hover:bg-[var(--active-bg)]"
                        }`}
                      >
                        {t(`subjectPresets.${key}`)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass(!!errors.subject)}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  />
                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="mt-1 text-sm text-[var(--danger-text)]"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--foreground)]"
                  >
                    {t("message")}{" "}
                    <span className="text-[var(--danger-text)]">
                      {t("required")}
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass(!!errors.message)}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-sm text-[var(--danger-text)]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  {t("send")}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
