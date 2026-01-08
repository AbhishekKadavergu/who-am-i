import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  validateContactForm,
  type ContactForm as ContactFormType,
} from "../utils/validation";
import Toast from "./Toast";
import { UI_CONSTANTS } from "../constants/ui";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ContactFormType;
    setForm((prev) => ({ ...prev, [key]: value }));
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
        const text = await res
          .text()
          .catch(() => res.statusText || "Failed to send message");
        throw new Error(text || "Failed to send message");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setValidationErrors({});
      setShowToast(true);
    } catch (err: unknown) {
      console.error("Contact send error", err);
      const message =
        err instanceof Error
          ? err.message
          : String(err ?? "Failed to send message");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = useMemo(
    () => Object.keys(validateContactForm(form)).length === 0,
    [form]
  );

  return (
    <section
      id="contact"
      className="py-16 px-4 md:px-12 bg-[var(--brand-bg)] transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="heading-lg text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Connect
        </motion.h2>

        {showToast && (
          <Toast
            message="Thank you! Your message has been sent successfully."
            type="success"
            duration={UI_CONSTANTS.TOAST_DURATION_MS}
            onClose={() => setShowToast(false)}
          />
        )}

        {submitted ? (
          <motion.div
            className="text-center py-16 space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl">✓</div>
            <h3 className="heading-md text-yellow-500">Message Sent!</h3>
            <p className="text-body text-muted">
              I'll get back to you as soon as possible.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="card card-accent max-w-lg mx-auto p-8 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-body-sm font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${validationErrors.name ? "error" : ""}`}
                required
              />
              {validationErrors.name && (
                <div className="form-error">{validationErrors.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-body-sm font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${validationErrors.email ? "error" : ""}`}
                required
              />
              {validationErrors.email && (
                <div className="form-error">{validationErrors.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-body-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`form-textarea ${validationErrors.message ? "error" : ""}`}
                required
              />
              {validationErrors.message && (
                <div className="form-error">{validationErrors.message}</div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="btn btn-primary w-full text-base"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Contact;
