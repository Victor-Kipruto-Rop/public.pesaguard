"use client";
import { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Marketing contact form. This form opens a pre-filled email; it does not
 * create a ticket. Inline validation mirrors the developer platform's
 * touched-field and accessible error treatment.
 */
export function ContactForm({ kind = "general" }: { kind?: string }) {
  const [sent, setSent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const emailIsValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email.trim());
  const errors = {
    name: !values.name.trim() ? "Enter your name." : "",
    email: !values.email.trim() ? "Enter your work email." : !emailIsValid ? "Enter a valid email address." : "",
    message: !values.message.trim() ? "Tell us how we can help." : "",
  };
  const showError = (field: keyof typeof touched) => touched[field] || attempted;

  if (sent) {
    return (
      <div className="success-box" role="status" aria-live="polite">
        <strong>Your email draft is ready.</strong>
        <p>
          Your mail client should have opened with a pre-filled message to {siteConfig.email}. If it did not, email us directly and mention “{kind} request”. No ticket has been created.
        </p>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        if (errors.name || errors.email || errors.message) return;
        const subject = encodeURIComponent(`PesaGuard ${kind} request from ${values.name.trim()}`);
        const body = encodeURIComponent(`Name: ${values.name.trim()}\\nEmail: ${values.email.trim()}\\nKind: ${kind}\\n\\n${values.message.trim()}`);
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
        setSent(true);
      }}
    >
      <label htmlFor="contact-name">
        Name
        <input id="contact-name" required name="name" autoComplete="name" value={values.name} aria-invalid={showError("name") && Boolean(errors.name)} aria-describedby={showError("name") && errors.name ? "contact-name-error" : undefined} onBlur={() => setTouched((current) => ({ ...current, name: true }))} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} />
        {showError("name") && errors.name && <small className="field-validation-error" id="contact-name-error">{errors.name}</small>}
      </label>
      <label htmlFor="contact-email">
        Work email
        <input id="contact-email" required type="email" name="email" autoComplete="email" value={values.email} aria-invalid={showError("email") && Boolean(errors.email)} aria-describedby={showError("email") && errors.email ? "contact-email-error" : undefined} onBlur={() => setTouched((current) => ({ ...current, email: true }))} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} />
        {showError("email") && errors.email && <small className="field-validation-error" id="contact-email-error">{errors.email}</small>}
      </label>
      <label htmlFor="contact-message">
        How can we help?
        <textarea id="contact-message" required name="message" rows={5} value={values.message} aria-invalid={showError("message") && Boolean(errors.message)} aria-describedby={showError("message") && errors.message ? "contact-message-error" : undefined} onBlur={() => setTouched((current) => ({ ...current, message: true }))} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} />
        {showError("message") && errors.message && <small className="field-validation-error" id="contact-message-error">{errors.message}</small>}
      </label>
      <button className="button button-primary" type="submit">Send {kind} request</button>
      <p className="form-note">Opens your email client addressed to {siteConfig.email}. No account or ticket is created on this site.</p>
    </form>
  );
}
