"use client";

import { useState } from "react";
import styles from "./Kontakt.module.css";

type Status = "idle" | "sending" | "success" | "error";

const topics = [
  "Boka visning",
  "Fråga om fastighet",
  "Värdering av min bostad",
  "Annat",
];

export default function ContactForm({ property }: { property?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Något gick fel.");
      }

      form.reset();
      setStatus("success");
    } catch (err: any) {
      setError(err?.message || "Något gick fel. Försök igen.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>
          Tack för ditt <em>meddelande.</em>
        </p>
        <p>Vi har tagit emot det och återkommer så snart vi kan.</p>
        <button
          type="button"
          className={styles.textButton}
          onClick={() => setStatus("idle")}
        >
          Skicka ett till
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      {property && (
        <div className={styles.propertyNote}>
          <span>Gäller fastighet</span>
          <strong>{property}</strong>
          <input type="hidden" name="property" value={property} />
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Namn</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">
            Telefon <span>(valfritt)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-post</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="topic">Gäller</label>
        <select id="topic" name="topic" defaultValue={topics[property ? 0 : 1]}>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Meddelande</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={5}
          maxLength={4000}
        />
      </div>

      {/* Honeypot: dolt för människor, boten fyller i det */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Lämna tomt</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>
          Jag godkänner att mina uppgifter används för att besvara mitt
          meddelande.
        </span>
      </label>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Skickar…" : "Skicka meddelande"}
        </button>

        <p className={styles.error} role="alert" aria-live="assertive">
          {status === "error" ? error : ""}
        </p>
      </div>
    </form>
  );
}