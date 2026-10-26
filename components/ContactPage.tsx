
import styles from "./ContactPage.module.css";

export default function KontaktPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Personlig kontakt · Österlen</p>

          <h1 className={styles.heroTitle}>
            Låt oss
            <br />
            <span>prata.</span>
          </h1>

          <p className={styles.heroText}>
            Oavsett om du drömmer om ett nytt hem, funderar på att sälja
            eller bara vill veta mer finns jag här. Hör av dig, så tar
            vi det därifrån.
          </p>

          <a href="#kontaktformular" className={styles.heroLink}>
            <span>Kom i kontakt</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.heroNote} aria-hidden="true">
          Genuint engagemang.
          <br />
          Från första samtalet.
        </div>
      </section>

      <section
        className={styles.contactSection}
        id="kontaktformular"
      >
        <div className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>Vi börjar här</p>

            <h2 className={styles.sectionTitle}>
              Vad kan jag
              <br />
              hjälpa dig med?
            </h2>

            <p className={styles.introText}>
              Varje bostadsresa är personlig. Berätta lite om dina
              tankar och önskemål, så återkommer jag för ett första
              samtal.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Telefon</span>
                <p>Kontakta mig gärna direkt</p>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Område</span>
                <p>Åhus · Österlen med omnejd</p>
              </div>
            </div>
          </div>

          <form
            className={styles.form}
            action="/api/kontakt"
            method="POST"
          >
            <div className={styles.formHeading}>
              <p className={styles.formEyebrow}>Skicka en förfrågan</p>
              <h3>Berätta mer</h3>
            </div>

            <div className={styles.field}>
              <label htmlFor="name">Namn *</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ditt för- och efternamn"
                required
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="email">E-post *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="namn@exempel.se"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">Telefon</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Ditt telefonnummer"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">Vad gäller din förfrågan?</label>
              <select
                id="subject"
                name="subject"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Välj ett alternativ
                </option>
                <option value="buy">Jag vill köpa bostad</option>
                <option value="sell">Jag vill sälja bostad</option>
                <option value="valuation">Jag vill boka en värdering</option>
                <option value="coming-soon">
                  Jag vill veta mer om kommande försäljningar
                </option>
                <option value="other">Annat ärende</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Meddelande *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Berätta gärna lite om vad du funderar på..."
                required
              />
            </div>

            <div className={styles.privacy}>
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                value="accepted"
                required
              />
              <label htmlFor="privacy">
                Jag godkänner att mina uppgifter används för att
                hantera min förfrågan. *
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              <span>Skicka förfrågan</span>
              <span className={styles.submitArrow} aria-hidden="true">
                ↗
              </span>
            </button>

            <p className={styles.formFootnote}>
              * Obligatoriska fält
            </p>
          </form>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>Det börjar med ett samtal</p>
        <h2>
          Nästa kapitel
          <br />
          börjar <span>här.</span>
        </h2>
      </section>
    </main>
  );
}
