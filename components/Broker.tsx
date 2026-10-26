import Link from "next/link";
import styles from "./Broker.module.css";

export default function Broker() {
  return (
    <section className={styles.section} id="om-oss">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              src="/images/peter.jpg"
              alt="Peter Olvsborn, mäklare"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>Din mäklare</p>

            <h2>
              Peter
              <br />
              Olvsborn
            </h2>

            <p className={styles.role}>Fastighetsmäklare · Åhus & Österlen</p>

            <p className={styles.description}>
              Med lokal kunskap, personligt engagemang och ett stort fokus på
              varje detalj hjälper jag dig genom hela din bostadsaffär.
            </p>

            <Link href="/maklaren" className={styles.button}>
              Läs mer om Peter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}