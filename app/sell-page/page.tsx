
import Link from "next/link";
import styles from "./Sell.module.css";

export default function SaljMedOssPage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroCopy}>
                        <p className={styles.eyebrow}>

                            Sälj med oss
                        </p>

                        <h1>
                            Nästa kapitel
                            <br />
                            börjar <span>hemma.</span>
                        </h1>

                        <p className={styles.heroText}>
                            Ett hem är mer än väggar och kvadratmeter. Det är
                            minnen, vardag och en del av din historia. När det
                            är dags att gå vidare finns vi här för att hjälpa
                            dig att ta nästa steg — med omtanke, kunskap och
                            en plan som passar just dig.
                        </p>

                        <a href="/kontakt" className={styles.primaryButton}>
                            Prata bostadsförsäljning
                        </a>

                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.visualFrame}>
                            <img
                                className={styles.visualImage}
                                src="/images/2412059.jpg"
                                alt="Ljust och harmoniskt hem med naturliga material"
                            />
                        </div>
                        <div className={styles.floatingNote}>
                            <span className={styles.noteLine} />
                            <p>
                                Personligt engagemang.
                                <br />
                                Från första mötet till avslutad affär.
                            </p>
                        </div>
                    </div>
                </div>

            </section>

            <section className={styles.approach}>
                <div className={styles.sectionIntro}>
                    <p className={styles.eyebrow}>En tryggare försäljning</p>
                    <h2>
                        Rätt känsla.
                        <br />
                        <span>Rätt förutsättningar.</span>
                    </h2>
                    <p>
                        En lyckad bostadsaffär handlar inte bara om slutpriset.
                        Den handlar också om att känna sig trygg, vara välinformerad
                        och få stöd genom varje beslut.
                    </p>
                </div>

                <div className={styles.steps}>
                    <article className={styles.step}>
                        <span className={styles.stepNumber}>01</span>
                        <h3>Vi börjar med dig</h3>
                        <p>
                            Vi lyssnar på dina tankar, svarar på dina frågor och
                            pratar om vad som är viktigt för just din situation.
                        </p>
                    </article>

                    <article className={styles.step}>
                        <span className={styles.stepNumber}>02</span>
                        <h3>En plan för ditt hem</h3>
                        <p>
                            Tillsammans går vi igenom bostaden, marknaden och
                            hur en genomtänkt försäljning kan läggas upp.
                        </p>
                    </article>

                    <article className={styles.step}>
                        <span className={styles.stepNumber}>03</span>
                        <h3>Vi finns med hela vägen</h3>
                        <p>
                            Från förberedelser och visningar till budgivning
                            och kontrakt — med tydlig kommunikation längs vägen.
                        </p>
                    </article>
                </div>
            </section>

            {/* <section className={styles.formSection} id="intresse">
                <div className={styles.formIntro}>
                    <p className={styles.eyebrow}>Låt oss ta en första kontakt</p>
                    <h2>
                        Berätta lite
                        <br />
                        <span>om ditt hem.</span>
                    </h2>
                    <p>
                        Fyll i formuläret så tar vi nästa steg tillsammans.
                        Du behöver inte ha bestämt dig för att sälja — ibland
                        börjar allt med en enkel fråga.
                    </p>

                    <div className={styles.formAside}>
                        <span className={styles.asideMark}>“</span>
                        <p>
                            Du behöver inte ha alla svar. Vi börjar där du är.
                        </p>
                    </div>
                </div> */}

               {/*  <div className={styles.formCard}>
                    <div className={styles.formCardHeader}>
                        <span className={styles.requiredNote}>* Obligatoriska fält</span>
                    </div>

                    <form
                        className={styles.form}
                        action="/api/salj-med-oss"
                        method="POST"
                    >
                        <fieldset className={styles.fieldset}>
                            <legend>01 — Om dig</legend>

                            <div className={styles.fieldGrid}>
                                <label className={styles.field}>
                                    <span>Namn *</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="För- och efternamn"
                                        autoComplete="name"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Telefon *</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Ditt telefonnummer"
                                        autoComplete="tel"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>E-post *</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="namn@exempel.se"
                                        autoComplete="email"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Hur vill du bli kontaktad?</span>
                                    <select name="contactPreference" defaultValue="telefon">
                                        <option value="telefon">Telefon</option>
                                        <option value="e-post">E-post</option>
                                        <option value="sms">SMS</option>
                                    </select>
                                </label>
                            </div>
                        </fieldset>

                        <fieldset className={styles.fieldset}>
                            <legend>02 — Om bostaden</legend>

                            <div className={styles.fieldGrid}>
                                <label className={styles.field}>
                                    <span>Adress eller område</span>
                                    <input
                                        type="text"
                                        name="propertyAddress"
                                        placeholder="Var ligger bostaden?"
                                        autoComplete="street-address"
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Typ av bostad</span>
                                    <select name="propertyType" defaultValue="">
                                        <option value="" disabled>
                                            Välj bostadstyp
                                        </option>
                                        <option value="villa">Villa</option>
                                        <option value="bostadsratt">Bostadsrätt</option>
                                        <option value="fritidshus">Fritidshus</option>
                                        <option value="tomt">Tomt</option>
                                        <option value="gard">Gård</option>
                                        <option value="annat">Annat</option>
                                    </select>
                                </label>

                                <label className={styles.field}>
                                    <span>När funderar du på att sälja?</span>
                                    <select name="saleTimeline" defaultValue="">
                                        <option value="" disabled>
                                            Välj tidpunkt
                                        </option>
                                        <option value="snart">Så snart som möjligt</option>
                                        <option value="1-3-manader">Inom 1–3 månader</option>
                                        <option value="3-6-manader">Inom 3–6 månader</option>
                                        <option value="senare">Längre fram</option>
                                        <option value="osaker">Jag är osäker</option>
                                    </select>
                                </label>

                                <label className={styles.field}>
                                    <span>Vad vill du ha hjälp med?</span>
                                    <select name="helpType" defaultValue="vardering">
                                        <option value="vardering">Värdering av bostaden</option>
                                        <option value="saljrad">Råd inför försäljning</option>
                                        <option value="saljprocess">Planera en försäljning</option>
                                        <option value="annat">Annat / vill veta mer</option>
                                    </select>
                                </label>
                            </div>

                            <label className={`${styles.field} ${styles.messageField}`}>
                                <span>Är det något mer du vill berätta?</span>
                                <textarea
                                    name="message"
                                    rows={4}
                                    placeholder="Berätta gärna lite om bostaden eller dina funderingar..."
                                />
                            </label>
                        </fieldset>

                        <div className={styles.privacy}>
                            <input
                                type="checkbox"
                                name="privacyConsent"
                                id="privacyConsent"
                                value="yes"
                                required
                            />
                            <label htmlFor="privacyConsent">
                                Jag godkänner att mina uppgifter används för att
                                återkoppla på min förfrågan. Läs gärna vår{" "}
                                <Link href="/integritetspolicy">
                                    integritetspolicy
                                </Link>
                                .
                            </label>
                        </div>

                        <button className={styles.submitButton} type="submit">
                            Skicka förfrågan
                            <span aria-hidden="true">↗</span>
                        </button>

                        <p className={styles.formFootnote}>
                            Din förfrågan är inte bindande. Vi återkommer för
                            att prata vidare om dina önskemål.
                        </p>
                    </form>
                </div>
            </section> */}

            <section className={styles.bottomCta}>
                <p className={styles.eyebrow}>Föredrar du att prata direkt?</p>
                <h2>
                    Vi börjar
                    <br />
                    med ett <span>samtal.</span>
                </h2>
                <p>
                    Du är varmt välkommen att höra av dig. Inga frågor är
                    för små när det gäller ditt hem.
                </p>
                <Link href="/kontakt" className={styles.secondaryButton}>
                    Kontakta oss
                </Link>
            </section>
        </main>
    );
}
