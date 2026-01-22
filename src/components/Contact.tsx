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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errors = validateContactForm(form);
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setValidationErrors({});
      setShowToast(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
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
        {!submitted ? (
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
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${validationErrors.name ? "error" : ""}`}
              />

              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${
                  validationErrors.email ? "error" : ""
                }`}
              />

              <textarea
                name="message"
                placeholder="Your message..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`form-textarea ${
                  validationErrors.message ? "error" : ""
                }`}
              />

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
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-5xl mb-4">✓</div>
            <h3 className="heading-md mb-2">Message sent</h3>
            <p className="text-muted">
              I’ll get back to you as soon as possible.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
