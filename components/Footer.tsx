import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/dist/api/image";

export default function Footer() {
  return (<footer className={styles.footer} id="kontakt"> <div className={styles.inner}> <div className={styles.top}> <div className={styles.about}>
    <Link href="/" className={styles.logo} aria-label="Till startsidan">
        <Image
          src="/images/logo-vit.png"
          alt="Din Mäklare"
          width={180}
          height={70}
          priority
          className={styles.logoImage}
        />
      </Link>
    <p className={styles.eyebrow}>Om oss</p>

    <p className={styles.description}>
      Vi är en lokal mäklarfirma med hjärtat i Åhus och många års
      samlad erfarenhet av den lokala fastighetsmarknaden. Vårt mål är
      att göra din bostadsresa så smidig, trygg och minnesvärd som
      möjligt.
    </p>

    <p className={styles.description}>
      Med en kombination av modern marknadsföring, ett brett kontaktnät
      och en genuin fingertoppskänsla ser vi till att du får ut det
      bästa värdet av din bostad, samtidigt som vi hjälper dig att hitta
      rätt plats där nästa kapitel i livet kan börja.
    </p>
  </div>

    <div className={styles.contact}>
      <div className={styles.contactBlock}>
        <p className={styles.label}>Kontakt</p>

        <a href="mailto:peter@dinmaklareahus.se">
        peter@dinmaklareahus.se
        </a>

        <a href="tel:+46 708 24 04 72">
        +46 708 24 04 72
        </a>
      </div>

      <div className={styles.contactBlock}>
        <p className={styles.label}>Besök oss</p>

        <address>
          Köpmannagatan 1
          <br />
          296 31 Åhus
        </address>
      </div>

      <Link href="/fastigheter" className={styles.link}>
        Se våra fastigheter
      </Link>
    </div>
  </div>

    <div className={styles.bottom}>
      <p>© {new Date().getFullYear()} Din Mäklare</p>

      <div className={styles.bottomLinks}>
        <Link href="/fastigheter">Fastigheter</Link>
        <a href="#om-oss">Om oss</a>
        <a href="#kontakt">Kontakt</a>
      </div>

      <p className={styles.credit}>Åhus · Skåne</p>
    </div>
  </div>
  </footer>

  );
}
