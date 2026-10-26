"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>

            {/* BILD */}
            <div className={styles.hero__image}>
                <Image
                    src="/images/2412037.jpg"
                    alt="Bostad"
                    fill
                    priority
                    sizes="(max-width: 700px) 100vw, 58vw"
                    className={styles.hero__imageElement}
                />

                <div className={styles.hero__imageOverlay} />
            </div>

            {/* MÖRK PANEL */}
            <div className={styles.hero__panel}>

                {/* CONTENT */}
                <div className={styles.hero__content}>

                    <p className={styles.hero__eyebrow}>
                    Din mäklare Åhus & österlen
                    </p>

                    <h1 className={styles.hero__title}>
                    NÄSTA KAPITEL BÖRJAR HÄR
                    </h1>

                    <p className={styles.hero__description}>
                    VI HJÄLPER DIG HITTA MER ÄN BARA ETT HUS - VI HITTAR DITT HEM
                    </p>

                    <Link
                        href="/fastigheter"
                        className={styles.hero__link}
                    >
                        <span>Utforska bostäder</span>

                        <span className={styles.hero__arrow}>
                            →
                        </span>
                    </Link>
                </div>

            </div>



        </section>
    );
}
