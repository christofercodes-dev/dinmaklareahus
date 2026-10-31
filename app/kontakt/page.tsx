
import styles from "./Kontakt.module.css";

export default function KontaktPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="kontakt-hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Personlig rådgivning</p>

          <h1 id="kontakt-hero-title" className={styles.heroTitle}>
            Låt oss hitta
            <br />
            <span>din nästa</span> väg.
          </h1>

          <p className={styles.heroText}>
            Oavsett om du vill köpa, sälja eller bara utforska dina
            möjligheter börjar vi med ett samtal.
          </p>

          <a className={styles.heroLink} href="#kontaktformular">
            Kontakta mig
          </a>
        </div>

        <p className={styles.heroNote}>Åhus · Österlen med omnejd</p>
      </section>

      {/* KONTAKT OCH FORMULÄR */}
      <section
        className={styles.contactSection}
        id="kontaktformular"
        aria-labelledby="kontakt-section-title"
      >
        <div className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>Vi börjar här</p>

            <h2 id="kontakt-section-title" className={styles.sectionTitle}>
              Vad kan jag
              <br />
              hjälpa dig med?
            </h2>

            <p className={styles.introText}>
              Varje bostadsresa är personlig. Berätta lite om dina tankar
              och önskemål, så återkommer jag för ett första samtal.
              Helt förutsättningslöst.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Telefon</span>

                <a className={styles.detailLink} href="tel:+46 708 24 04 72">
 

                  <span className={styles.detailNumber}>+46 708 24 04 72</span>
                </a>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>E-post</span>

                <a className={styles.detailLink} href="peter@dinmaklareahus.se">
                  

                  <span className={styles.detailNumber}>peter@dinmaklareahus.se</span>
                </a>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Område</span>
                <p>Åhus · Österlen med omnejd</p>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Personligt bemötande</span>
                <p>En kontakt, hela vägen.</p>
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
              <h3>Berätta mer.</h3>
              <p className={styles.formDescription}>
                Fyll i formuläret så tar vi nästa steg tillsammans.
              </p>
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
              <label htmlFor="subject">Vad gäller din förfrågan? *</label>
              <select id="subject" name="subject" defaultValue="" required>
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
                Jag godkänner att mina uppgifter behandlas för att hantera
                min förfrågan. Läs gärna hur personuppgifter hanteras via
                webbplatsens integritetspolicy. *
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              <span>Skicka förfrågan</span>

            </button>

            <p className={styles.formFootnote}>
              * Obligatoriska fält. Dina uppgifter används för att hantera
              din förfrågan.
            </p>
          </form>
        </div>
      </section>

      {/* AVSLUTNING */}
      <section className={styles.closing} aria-labelledby="closing-title">
        <p className={styles.eyebrow}>Det börjar med ett samtal</p>
        <h2 id="closing-title">
          Nästa kapitel
          <br />
          börjar <span>här.</span>
        </h2>
        <a className={styles.closingLink} href="#kontaktformular">
          Ta första steget
        </a>
      </section>
    </main>
  );
}
