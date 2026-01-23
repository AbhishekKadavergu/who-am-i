import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  validateContactForm,
  type ContactForm as ContactFormType,
} from "../utils/validation";
import Toast from "./Toast";
import { UI_CONSTANTS } from "../constants/ui";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/abhishek-kadavergu/",
    description: "Professional background & experience",
    icon: "🔗",
  },
  {
    name: "GitHub",
    href: "https://github.com/AbhishekKadavergu/",
    description: "Code, systems, and side projects",
    icon: "💻",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/abhishek_kadavergu/",
    description: "Life beyond code",
    icon: "📸",
  },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormType>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showToast, setShowToast] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);
    setValidationErrors(validateContactForm(updated));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const shouldShowError = (field: keyof ContactFormType) =>
    touched[field] && validationErrors[field];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Validate
    const errors = validateContactForm(form);
    setValidationErrors(errors);

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (Object.keys(errors).length > 0) return;

    // 2. Submit
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      // 🔹 enable when backend is ready
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      // 3. Success
      setForm({ name: "", email: "", message: "" });
      setValidationErrors({});
      setTouched({});
      setShowToast(true);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out. Please check your connection.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const isFormValid = useMemo(
    () => Object.keys(validateContactForm(form)).length === 0,
    [form],
  );

  return (
    <section
      id="contact"
      className="
    py-20 px-4 md:px-12
    relative
    bg-[var(--brand-bg)]
  "
    >
      {/* soft backdrop */}
      <div
        className="
      absolute inset-0
      bg-gradient-to-b
      from-transparent
      via-white/[0.03]
      to-transparent
      pointer-events-none
    "
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="
    heading-lg
    text-center
    mb-4
    text-[var(--brand-text)]
    font-semibold
  "
        >
          Let’s connect.
        </motion.h2>

        <p
          className="
  text-center
  text-base
  leading-relaxed
  text-[var(--brand-muted)]
  max-w-xl
  mx-auto
  mb-16
"
        >
          Whether it’s about systems, work opportunities, or just exchanging
          ideas — feel free to reach out in whatever way feels easiest.
        </p>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="
  group
  flex items-center gap-4
  rounded-xl
  px-6 py-5
  bg-[var(--brand-surface)]
  border border-white/10
  transition
  hover:border-[var(--brand-orange)]
  hover:shadow-[0_0_0_1px_var(--brand-orange)]
"
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="font-semibold text-[var(--brand-text)]">
                  {s.name}
                </div>
                <div
                  className="
  text-sm
  text-[var(--brand-muted)]
  group-hover:text-[var(--brand-text)]
"
                >
                  {s.description}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Toast */}
        {showToast && (
          <Toast
            message="Thank you! Your message has been sent successfully."
            type="success"
            duration={UI_CONSTANTS.TOAST_DURATION_MS}
            onClose={() => setShowToast(false)}
          />
        )}

        {/* Contact Form */}
        {
          <>
            <p
              className="text-center text-sm mb-6 text-[var(--brand-muted)] font-semibold
"
            >
              Prefer a message? This goes straight to my inbox.
            </p>

            <motion.form
              onSubmit={handleSubmit}
              className="
  relative
  max-w-lg mx-auto
  p-8
  space-y-5
  rounded-xl
  bg-[var(--brand-dark)]
  border border-white/10
  shadow-[0_30px_80px_rgba(0,0,0,0.6)]
"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {loading && (
                <div
                  className="
      absolute inset-0 z-10
      flex items-center justify-center
      rounded-xl
      bg-black/40
      backdrop-blur-sm
    "
                >
                  <div className="flex items-center gap-3 text-sm text-[var(--brand-text)]">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-[var(--brand-orange)] animate-spin" />
                    Sending your message…
                  </div>
                </div>
              )}

              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${
                  shouldShowError("name") ? "error" : ""
                }`}
                disabled={loading}
              />

              {shouldShowError("name") && (
                <p className="mt-1 text-sm text-red-400">
                  {validationErrors.name}
                </p>
              )}

              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${
                  shouldShowError("email") ? "error" : ""
                }`}
                disabled={loading}
              />

              {shouldShowError("email") && (
                <p className="mt-1 text-sm text-red-400">
                  {validationErrors.email}
                </p>
              )}

              <textarea
                name="message"
                rows={5}
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-textarea ${
                  shouldShowError("message") ? "error" : ""
                }`}
                disabled={loading}
              />

              {shouldShowError("message") && (
                <p className="mt-1 text-sm text-red-400">
                  {validationErrors.message}
                </p>
              )}

              {error && <div className="form-error text-center">{error}</div>}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="
    btn btn-primary w-full
    text-base
    tracking-wide
  "
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </motion.form>
          </>
        }
      </div>
    </section>
  );
};

export default Contact;
