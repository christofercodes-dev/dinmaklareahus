
import Image from "next/image";
import Link from "next/link";
import styles from "./AboutBroker.module.css";

export default function PeterOlvsbornPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="peter-title">
        <div className={styles.heroInner}>
          

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <p className={styles.role}>Möt mäklaren</p>

              <h1 id="peter-title" className={styles.title}>
                Peter
                <br />
                <span>Olvsborn.</span>
              </h1>

              <p className={styles.subtitle}>
                Mäklaren som valde närvaro framför höjd.
              </p>

              <div className={styles.heroRule} />

              <p className={styles.heroIntro}>
                En väg via juridikstudier, Alpernas skidbackar och
                flygutbildning i USA. Till slut landade Peter där
                hjärtat fanns – i Åhus, nära människorna och platsen
                han kallar hemma.
              </p>

            </div>

            <figure className={styles.portrait}>
              <div className={styles.imageFrame}>
                <Image
                  src="https://www.bythus.nu/static/media/peter2.df99f9dfd4d8eb92463e.jpg"
                  alt="Peter Olvsborn, fastighetsmäklare i Åhus"
                  width={900}
                  height={1150}
                  priority
                  unoptimized
                  className={styles.portraitImage}
                  sizes="(max-width: 760px) 100vw, 46vw"
                />
              </div>
              <figcaption className={styles.imageCaption}>
                <span>Peter Olvsborn</span>
                <span>Fastighetsmäklare · Åhus</span>
              </figcaption>
            </figure>
          </div>

        </div>
      </section>

      <section className={styles.quoteSection} aria-label="Citat">
        <span className={styles.quoteMark} aria-hidden="true">
          “
        </span>
        <blockquote className={styles.mainQuote}>
          Jag fick välja, skulle jag bli en frånvarande pilotpappa
          eller en närvarande mäklarpappa?
        </blockquote>
        <p className={styles.quoteAttribution}>Peter Olvsborn</p>
      </section>

      <section
        id="berattelsen"
        className={styles.story}
        aria-labelledby="story-title"
      >
        <aside className={styles.storyAside}>
          <p className={styles.eyebrow}>En resa med flera kapitel</p>
          <h2 id="story-title" className={styles.storyTitle}>
            Alltid på väg.
            <br />
            <span>Alltid nära.</span>
          </h2>
          <div className={styles.asideRule} />
          <p className={styles.asideText}>
            Från drömmen om att flyga till ett yrkesliv där det
            mänskliga mötet alltid står i centrum.
          </p>
        </aside>

        <article className={styles.storyBody}>
          <p className={styles.lead}>
            Från juridikstudier och Alpernas skidbackar till
            flygutbildning i USA. Peters väg till mäklaryrket var
            allt annat än spikrak. Men den röda tråden har alltid
            varit densamma: människor, möten och valet att finnas
            där på riktigt.
          </p>

          <p>
            Peter Olvsborn är född och uppvuxen i Kristianstad,
            men har haft hus i Åhus sedan 1986 och långt innan dess
            ett fritidshus vid Yngsjö Havsbad. Efter gymnasiet
            började han läsa juridik i Lund med sikte på att bli
            företagsjurist. Men livet tog en annan riktning.
            Peter, som alltid älskat utförsåkning, valde att ta en
            paus från studierna och blev reseledare i Alperna för
            Fritidsresor.
          </p>

          <blockquote className={styles.storyQuote}>
            <span className={styles.storyQuoteMark} aria-hidden="true">
              “
            </span>
            <p>
              På den tiden fanns varken mobil eller mejl, utan det
              var fast telefoni och fax som gällde. Vi fick lösa
              allt på plats. Det var otroligt utvecklande och man
              lärde sig att känna av människor, berättar Peter.
            </p>
          </blockquote>

          <p>
            Tre år som reseledare gav nya perspektiv och nya vänner.
            När en kompis reste till USA för att bli pilot väcktes
            samma dröm hos Peter. Han åkte över och gick en
            ettårig utbildning på NAIA (North American Institute
            of Aviation), en flygskola i USA. Dessutom utbildade
            han sig till flyglärare. Väl hemma i Sverige
            konverterade han sin utbildning för att kunna arbeta
            som pilot här.
          </p>

          <p>
            Men tajmingen var inte den rätta. Under Kuwaitkriget
            och tiden efter stod flygbranschen stilla. Pilotjobben
            uteblev, och Peters mamma föreslog att han skulle ha
            fler krokar att hänga sin hatt på. Peter lyssnade,
            hoppade på mäklarutbildningen och tog examen 1988.
          </p>

          <p>
            Han startade eget och delade kontor med
            fastighetsförsäljaren Per Limé, en person som kom att
            betyda mycket för hans utveckling.
          </p>

          <blockquote className={styles.storyQuote}>
            <span className={styles.storyQuoteMark} aria-hidden="true">
              “
            </span>
            <p>
              Jag beundrade Per jättemycket. Han hade en enorm
              känsla för kunder och jag lärde mig otroligt mycket
              av honom.
            </p>
          </blockquote>

          <p>
            Efter en tid som egen företagare sökte Peter jobb på
            Malmöhusmäklarna. Han fortsatte driva sitt bolag
            parallellt och fick möjlighet att sälja både villor
            och lägenheter i Malmö.
          </p>

          <p>
            Där och då lärde jag mig att aldrig döma människor
            efter utseende. Alla är lika mycket värda.
          </p>

          <p>
            Efter tiden i Malmö flyttade Peter tillbaka till Åhus
            och öppnade eget igen. Han valde närvaron. Peter köpte
            fastigheten på Köpmannagatan, där han än i dag har
            sitt kontor.
          </p>

          <div className={styles.articleCredit}>
            <span className={styles.creditLine} />
            <p>
              Berättelsen bygger på en artikel i{" "}
              <em>Vi syns i Åhus</em>, nummer 184.
            </p>
          </div>
        </article>
      </section>

      <section className={styles.answers} aria-labelledby="answers-title">
        <div className={styles.answersHeading}>
          <p className={styles.eyebrow}>Lite mer personligt</p>
          <h2 id="answers-title">
            Korta frågor
            <br />
            <span>till Peter.</span>
          </h2>
          <p className={styles.answersIntro}>
            Fyra snabba om inspiration, material, återhämtning
            och konsten att skapa ett hem som känns på riktigt.
          </p>
        </div>

        <div className={styles.answersList}>
          <article className={styles.answer}>
            <span className={styles.answerNumber}>01</span>
            <div>
              <h3>Vad inspirerar dig mest just nu?</h3>
              <p>
                Dansk modernism och hur man lyckas kombinera
                strikt minimalism med värme.
              </p>
            </div>
          </article>

          <article className={styles.answer}>
            <span className={styles.answerNumber}>02</span>
            <div>
              <h3>Ditt favoritmaterial?</h3>
              <p>
                Oljad ek och natursten som fått en naturlig
                patina över tid.
              </p>
            </div>
          </article>

          <article className={styles.answer}>
            <span className={styles.answerNumber}>03</span>
            <div>
              <h3>Bästa platsen för återhämtning?</h3>
              <p>
                Stranden i Åhus en tidig tisdagsmorgon
                i september.
              </p>
            </div>
          </article>

          <article className={styles.answer}>
            <span className={styles.answerNumber}>04</span>
            <div>
              <h3>Ett råd till blivande säljare?</h3>
              <p>
                Våga rensa, men behåll själen. Ett hem ska
                kännas levt, inte som ett hotellrum.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>Lokalkännedom med hjärta</p>
        <h2>
          Hemma är mer
          <br />
          än en <span>adress.</span>
        </h2>
        <p className={styles.closingText}>
          För Peter handlar mäklaryrket om mer än bostäder.
          Det handlar om människorna som ska leva sina liv där.
        </p>
        <Link href="/kontakt" className={styles.closingLink}>
          KONTAKTA OSS
        </Link>
      </section>

    </main>
  );
}
