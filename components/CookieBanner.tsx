"use client";

import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.css";

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as CookieConsent;
        setConsent(parsed);
        setAnalytics(parsed.analytics);
        setMarketing(parsed.marketing);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function saveConsent(value: CookieConsent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Webbplatsen ska fungera även om lagring inte är tillgänglig.
    }

    setConsent(value);
    setVisible(false);
    setShowSettings(false);

    // Aktivera eventuell analys eller marknadsföring först här,
    // och endast om besökaren har samtyckt till respektive kategori.
  }

  if (!visible || consent) return null;

  return (
    <div className={styles.overlay}>
      <section
        className={styles.banner}
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-description"
      >
        <div className={styles.topLine}>
          <span className={styles.eyebrow}>DIN INTEGRITET</span>
          <span className={styles.cookieIcon} aria-hidden="true">
            ✳
          </span>
        </div>

        <h2 id="cookie-title" className={styles.title}>
          En webbupplevelse
          <br />
          med omtanke.
        </h2>

        <p id="cookie-description" className={styles.description}>
          Vi använder cookies för att webbplatsen ska fungera och, om du
          samtycker, för att förstå hur den används och förbättra din upplevelse.
          Du väljer själv vad du vill tillåta.
        </p>

        {showSettings && (
          <div className={styles.settings}>
            <div className={styles.settingRow}>
              <div>
                <strong>Nödvändiga</strong>
                <p>Krävs för webbplatsens grundläggande funktioner.</p>
              </div>
              <span className={styles.alwaysOn}>Alltid aktiva</span>
            </div>

            <label className={styles.settingRow}>
              <div>
                <strong>Analys</strong>
                <p>Hjälper oss förstå hur webbplatsen används.</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>

            <label className={styles.settingRow}>
              <div>
                <strong>Marknadsföring</strong>
                <p>Kan användas för relevant annonsering och mätning.</p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() =>
              saveConsent({
                necessary: true,
                analytics: true,
                marketing: true,
              })
            }
          >
            Acceptera alla
          </button>

          {showSettings ? (
            <button
              className={styles.secondaryButton}
              onClick={() =>
                saveConsent({
                  necessary: true,
                  analytics,
                  marketing,
                })
              }
            >
              Spara mina val
            </button>
          ) : (
            <button
              className={styles.secondaryButton}
              onClick={() =>
                saveConsent({
                  necessary: true,
                  analytics: false,
                  marketing: false,
                })
              }
            >
              Endast nödvändiga
            </button>
          )}

          <button
            className={styles.textButton}
            onClick={() => setShowSettings((current) => !current)}
            aria-expanded={showSettings}
          >
            {showSettings ? "Tillbaka" : "Inställningar"}
          </button>
        </div>

        <p className={styles.footnote}>
          Genom dina val hjälper du oss att respektera din integritet.
          Läs mer i vår integritetspolicy.
        </p>
      </section>
    </div>
  );
}
