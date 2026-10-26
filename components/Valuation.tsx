import Link from "next/link";
import styles from "./Valuation.module.css";

export default function Valuation() {
    return (<section className={styles.section}> <div className={styles.inner}> <p className={styles.eyebrow}>Personlig värdering</p>

        <h2>
            Går du i
            <br />
            säljtankar?
        </h2>

        <p className={styles.text}>
            Jag vet varför köpare väljer just Åhus. Låt mig berätta vad din
            bostad är värd i dagens marknad och hur vi bäst presenterar ditt
            hem för nästa ägare.
        </p>

        <Link href="/#kontakt" className={styles.button}>
            <span>Boka fri värdering</span>
        </Link>
    </div>
    </section>

    );
}
