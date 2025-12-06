import React, { useState } from "react";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ContactForm;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // Simple, robust error extraction — don't rely on JSON shape
        const text = await res
          .text()
          .catch(() => res.statusText || "Failed to send message");
        throw new Error(text || "Failed to send message");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
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

  return (
    <section
      id="contact"
      className="py-12 px-4 md:px-12 bg-primary-light dark:bg-primary-dark transition-colors duration-500 animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-text-light dark:text-text-dark">
        Connect with me
      </h2>

      {submitted ? (
        <div className="text-primary text-center">
          Thank you for reaching out!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-black p-6 rounded-lg shadow-lg space-y-4 border-2 border-primary"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-primary bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-primary bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border border-primary bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {error && (
            <div className="text-red-600 text-sm font-semibold">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </section>
  );
};

export default Contact;
