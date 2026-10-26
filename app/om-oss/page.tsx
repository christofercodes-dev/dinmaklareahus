import Link from "next/link";
import styles from "./Om-oss.module.css";

export default function OmOssPage() {
  return (
    <main className={styles.page}>
      {/* INTRO */}
{/*       <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Personligt engagemang · Lokal närvaro
          </p>

          <h1 className={styles.heroTitle}>
            Mer än
            <br />
            <span>en bostad.</span>
          </h1>

          <p className={styles.heroText}>
            Vi tror att ett hem är mer än väggar och tak.
            Det är platsen där livet händer, minnen skapas
            och nya kapitel börjar.
          </p>

          <a href="#var-berattelse" className={styles.heroLink}>
            <span>Lär känna oss</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <span className={styles.heroNumber} aria-hidden="true">
          01 / OM OSS
        </span>
      </section> */}

      {/* BERÄTTELSEN */}
      <section className={styles.story} id="var-berattelse">
        <div className={styles.storyLabel}>
          <p className={styles.eyebrow}>Vilka vi är</p>
        </div>

        <div className={styles.storyContent}>
          <h2 className={styles.storyTitle}>
            Nära människorna.
            <br />
            <span>Nära platsen.</span>
          </h2>

          <div className={styles.storyText}>
            <p>
              Vi är en personlig mäklarfirma med hjärtat i Åhus
              och en genuin kärlek till platsen vi kallar hem.
              Här känner vi områdena, människorna och de små
              detaljerna som gör varje bostad unik.
            </p>

            <p>
              För oss handlar mäkleri inte bara om att förmedla
              bostäder. Det handlar om att förstå människors
              drömmar, skapa förtroende och finnas där genom
              hela processen – från det första samtalet till
              nycklarna lämnas över.
            </p>

            <p>
              Med personligt engagemang, lokalkännedom och
              omsorg om varje detalj vill vi göra din
              bostadsresa trygg, genomtänkt och minnesvärd.
            </p>
          </div>
        </div>
      </section>

      {/* VÅRA VÄRDERINGAR */}
      <section className={styles.values}>
        <div className={styles.valuesHeader}>
          <p className={styles.eyebrow}>Det vi tror på</p>
          <h2 className={styles.valuesTitle}>
            Ett personligt
            <br />
            <span>sätt att göra affärer.</span>
          </h2>
        </div>

        <div className={styles.valuesGrid}>
          <article className={styles.valueCard}>
            <span className={styles.valueNumber}>01</span>
            <h3>Förtroende</h3>
            <p>
              En bra bostadsaffär börjar med att du känner dig
              trygg. Vi tror på ärlig kommunikation, tydlighet
              och att alltid vara tillgängliga längs vägen.
            </p>
          </article>

          <article className={styles.valueCard}>
            <span className={styles.valueNumber}>02</span>
            <h3>Lokalkännedom</h3>
            <p>
              Varje område har sin egen karaktär. Vår närhet
              till trakten hjälper oss att lyfta fram det som
              gör just din bostad och dess omgivning speciell.
            </p>
          </article>

          <article className={styles.valueCard}>
            <span className={styles.valueNumber}>03</span>
            <h3>Omsorg i detaljerna</h3>
            <p>
              Från första mötet till presentation och
              överlämning. Vi lägger omsorg vid detaljerna
              för att skapa en genomtänkt upplevelse.
            </p>
          </article>
        </div>
      </section>

      {/* VÅRT OMRÅDE */}
      <section className={styles.local}>
        <div className={styles.localInner}>
          <div className={styles.localCopy}>
            <p className={styles.eyebrow}>En plats att kalla hem</p>

            <h2 className={styles.localTitle}>
              Förälskade i
              <br />
              <span>vår del av Skåne.</span>
            </h2>

            <p>
              Från kustens lugn och sandiga stränder till
              charmiga kvarter och landsbygdens öppna vyer.
              Åhus och omnejd bjuder på en särskild livskvalitet
              som vi gärna hjälper fler att upptäcka.
            </p>

            <p>
              Oavsett om du söker ditt första hem, drömmer om
              ett hus vid kusten eller funderar på att sälja,
              möter vi dig där du är.
            </p>

            <Link href="/fastigheter" className={styles.textLink}>
              <span>Upptäck våra bostäder</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.localArt} aria-hidden="true">
            <img
              src="images/profile.jpg"
              alt="Peter Olvsborn, fastighetsmäklare i Åhus"
              className={styles.peterImage}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className={styles.closing}>
        <p className={styles.eyebrow}>Vi ser fram emot att träffa dig</p>

        <h2>
          Allt börjar
          <br />
          med <span>ett samtal.</span>
        </h2>

        <p className={styles.closingText}>
          Berätta om dina tankar och planer. Vi hjälper dig
          gärna att ta nästa steg, oavsett var du befinner dig
          på din bostadsresa.
        </p>

        <Link href="/kontakt" className={styles.contactButton}>
          Kontakta oss
        </Link>
      </section>
    </main>
  );
}
