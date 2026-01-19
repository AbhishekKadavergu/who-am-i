export type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateContactForm(form: ContactForm): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.name || !form.name.trim()) errors.name = "Name is required";
  if (!form.email || !form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email address";
  if (!form.message || !form.message.trim())
    errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
}
