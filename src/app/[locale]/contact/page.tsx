"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

import { profile } from "@/config/profile";
import { Card } from "@/components/atomic/atoms/Card";
import { SectionHeading } from "@/components/atomic/atoms/SectionHeading";

export default function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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

    // Generate mailto link as fallback
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `${t("name")}: ${formData.name}\n${t("email")}: ${formData.email}\n\n${t(
        "message"
      )}:\n${formData.message}`
    );
    const mailtoLink = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-gray-100">
              {t("contactInformation")}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-600 dark:text-gray-400">
                  {t("email")}
                </h4>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-black transition-colors hover:text-slate-700 dark:text-gray-100 dark:hover:text-gray-300"
                >
                  {profile.email}
                </a>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-600 dark:text-gray-400">
                  {t("phone")}
                </h4>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-black transition-colors hover:text-slate-700 dark:text-gray-100 dark:hover:text-gray-300"
                >
                  {profile.phone}
                </a>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-slate-600 dark:text-gray-400">
                  {t("social")}
                </h4>
                <div className="space-y-2">
                  {profile.socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-black transition-colors hover:text-slate-700 dark:text-gray-100 dark:hover:text-gray-300"
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

        {/* Contact Form */}
        <div>
          <Card>
            <h3 className="mb-6 text-xl font-semibold text-black dark:text-gray-100">
              {t("sendMessage")}
            </h3>
            {submitted ? (
              <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                <p className="font-medium">{t("thankYou")}</p>
                <p className="mt-2 text-sm">
                  {t("thankYouSubtitle", { email: profile.email })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black dark:text-gray-100"
                  >
                    {t("name")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-slate-500 focus:ring-slate-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    }`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black dark:text-gray-100"
                  >
                    {t("email")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-slate-500 focus:ring-slate-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-black dark:text-gray-100"
                  >
                    {t("subject")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-slate-500 focus:ring-slate-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    }`}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  />
                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black dark:text-gray-100"
                  >
                    {t("message")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-black shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-slate-500 focus:ring-slate-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                    }`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  {t("send")}
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
