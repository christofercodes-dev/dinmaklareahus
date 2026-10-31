import styles from "./Om-oss.module.css";

export default function OmOss() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Personligt engagemang · Lokal närvaro
          </p>

          <h1 id="about-hero-title" className={styles.heroTitle}>
            Mer än
            <br />
            <span>en bostad.</span>
          </h1>

          <p className={styles.heroText}>
            Vi tror att ett hem är mer än väggar och tak. Det är platsen där
            livet händer, minnen skapas och nya kapitel börjar.
          </p>

          <a href="#var-berattelse" className={styles.heroLink}>
            <span>Lär känna oss</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <span className={styles.heroNumber} aria-hidden="true">
          01 / OM OSS
        </span>
      </section>

      {/* VÅR BERÄTTELSE */}
      <section
        id="var-berattelse"
        className={styles.story}
        aria-labelledby="story-title"
      >
        <div className={styles.storyLabel}>
          <span className={styles.sectionNumber}>01</span>
          <span>Vår berättelse</span>
        </div>

        <div className={styles.storyContent}>
          <h2 id="story-title" className={styles.sectionTitle}>
            Människor först.
            <br />
            <span>Alltid.</span>
          </h2>

          <div className={styles.storyText}>
            <p>
              För oss handlar bostäder om så mycket mer än kvadratmeter,
              planlösningar och adresser. Det handlar om människor, drömmar
              och platser där livet får ta form.
            </p>

            <p>
              Vi vill göra bostadsresan personlig, trygg och genomtänkt.
              Därför lägger vi stor vikt vid att lyssna, förstå dina behov
              och finnas nära genom hela processen.
            </p>

            <p>
              Med engagemang, omtanke och lokal närvaro vill vi skapa
              långsiktiga relationer – och hjälpa fler att hitta hem.
            </p>
          </div>
        </div>
      </section>

      {/* VÅRA VÄRDERINGAR */}
      <section className={styles.values} aria-labelledby="values-title">
        <div className={styles.valuesHeader}>
          <p className={styles.eyebrow}>
            Det som driver oss
          </p>

          <h2 id="values-title" className={styles.sectionTitle}>
            Ett personligare
            <br />
            <span>arbetssätt.</span>
          </h2>
        </div>

        <div className={styles.valuesGrid}>
          <article className={styles.valueCard}>
            <span className={styles.valueNumber}>01</span>
            <h3>Personligt</h3>
            <p>
              Varje människa och varje bostadsresa är unik. Vi tar oss tid
              att lyssna och anpassar vårt arbete efter dig.
            </p>
          </article>

          <article className={styles.valueCard}>
            <span className={styles.valueNumber}>02</span>
            <h3>Engagerat</h3>
            <p>
              Vi tror på närvaro, tydlig kommunikation och ett genuint
              engagemang från första mötet till sista detaljen.
            </p>
          </article>

          <article className={styles.valueCard}>
            <span className={styles.valueNumber}>03</span>
            <h3>Tryggt</h3>
            <p>
              En bra bostadsaffär bygger på förtroende. Vi arbetar
              strukturerat och transparent så att du kan känna dig trygg.
            </p>
          </article>
        </div>
      </section>

      {/* AVSLUTNING */}
      <section className={styles.closing} aria-labelledby="closing-title">
        <p className={styles.eyebrow}>Ska vi lära känna varandra?</p>

        <h2 id="closing-title" className={styles.closingTitle}>
          Nästa kapitel
          <br />
          <span>börjar här.</span>
        </h2>

        <p className={styles.closingText}>
          Oavsett om du funderar på att köpa, sälja eller bara vill prata
          bostad är du varmt välkommen att höra av dig.
        </p>

        <a href="/kontakt" className={styles.heroLink}>
          <span>Kontakta oss</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
