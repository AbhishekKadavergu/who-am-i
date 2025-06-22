import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 px-4 md:px-12 bg-primary-light dark:bg-primary-dark transition-colors duration-500 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-8 text-text-light dark:text-text-dark">Contact</h2>
      {submitted ? (
        <div className="text-primary text-center">Thank you for reaching out!</div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-black p-6 rounded-lg shadow-lg space-y-4 border-2 border-primary">
          <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-primary bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary" />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-primary bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary" />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required className="w-full px-4 py-2 rounded border border-primary bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary" />
          <button type="submit" className="w-full py-2 rounded bg-primary text-black font-semibold hover:bg-primary/80 transition-colors duration-200">Send</button>
        </form>
      )}
    </section>
  );
};

export default Contact;
