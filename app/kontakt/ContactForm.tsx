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

export default function ContactForm({
  property,
}: {
  property?: string;
}) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Något gick fel.");
      }

      form.reset();
      setStatus("success");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Något gick fel. Försök igen.";

      setError(message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3 className={styles.successTitle}>
          Tack för ditt <em>meddelande.</em>
        </h3>

        <p className={styles.successText}>
          Vi har tagit emot det och återkommer till dig så snart som möjligt.
        </p>

        <button
          type="button"
          className={styles.textButton}
          onClick={() => setStatus("idle")}
        >
          <span>Skicka ett till meddelande</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {property && (
        <div className={styles.propertyNote}>
          <span className={styles.propertyLabel}>Gäller fastighet</span>
          <strong className={styles.propertyName}>{property}</strong>
          <input type="hidden" name="property" value={property} />
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Namn <span className={styles.required}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className={styles.input}
            placeholder="Ditt för- och efternamn"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Telefon <span className={styles.optional}>(valfritt)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            className={styles.input}
            placeholder="070-000 00 00"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          E-post <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          className={styles.input}
          placeholder="namn@exempel.se"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="topic" className={styles.label}>
          Gäller
        </label>
        <div className={styles.selectWrap}>
          <select
            id="topic"
            name="topic"
            defaultValue={topics[property ? 0 : 1]}
            className={styles.select}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <span className={styles.selectArrow} aria-hidden="true">↓</span>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Meddelande <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={5}
          maxLength={4000}
          className={styles.textarea}
          placeholder="Skriv ditt meddelande här..."
        />
      </div>

      {/* Honeypot: dolt för människor, boten fyller i det */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Lämna tomt</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className={styles.consent}>
        <input
          type="checkbox"
          name="consent"
          required
          className={styles.checkbox}
        />
        <span className={styles.consentText}>
          Jag godkänner att mina uppgifter används för att besvara mitt meddelande.
        </span>
      </label>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          disabled={status === "sending"}
        >
          <span>
            {status === "sending" ? "Skickar..." : "Skicka meddelande"}
          </span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </button>

        {status === "error" && (
          <p className={styles.error} role="alert" aria-live="assertive">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}