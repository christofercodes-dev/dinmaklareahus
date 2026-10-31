import Link from "next/link";
import styles from "./UniqueHome.module.css";

export default function UniqueHome() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Inför din försäljning</p>

          <h2>
            VARJE HEM ÄR
            <br />
            UNIKT
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <img
              src="/images/2412061.jpg"
              alt="Hem med karaktär"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.lead}>
              och förtjänar att visas från sin bästa sida.
            </p>

            <div className={styles.text}>
              <p>
                Med rätt förberedelser kan du höja värdet och skapa bästa
                förutsättningar inför försäljning. God framförhållning ger
                utrymme att planera och få råd från en mäklare inför visning.
                Styling, professionella bilder och små förbättringar som
                målning eller nya lister kan göra stor skillnad utan stora
                kostnader.
              </p>

              <p>
                Att veta vilka förbättringar som faktiskt lönar sig kräver både
                erfarenhet och lokalkännedom. Vi guidar dig genom allt från
                möbleringstips till tankar kring rumsindelning för att ditt hem
                ska presenteras från sin absolut bästa sida.
              </p>

              <p>
                Vi finns här för att svara på dina frågor – kontakta oss redan
                idag för en kostnadsfri värdering och strategisk rådgivning
                anpassad efter just dina behov.
              </p>
            </div>

            <Link href="/kontakt" className={styles.button}>
              <span>Boka kostnadsfri värdering</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
