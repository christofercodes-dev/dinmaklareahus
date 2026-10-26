import Link from "next/link";
import { getDeals, getSoldDeals } from "@/lib/mspecs";
import styles from "./Fastigheter.module.css";

function formatText(value: any): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    if (value.translation !== undefined) return String(value.translation);
    if (value.name !== undefined) return String(value.name);
    if (value.description !== undefined) return String(value.description);
    if (value.constant !== undefined) return String(value.constant);
  }

  return "";
}

function getMainImage(deal: any): string {
  return (
    deal?.images?.find((image: any) => image?.isMainImage)?.viewUrl ||
    deal?.images?.[0]?.viewUrl ||
    "/images/rusty.jpg"
  );
}

function getAddress(deal: any): string {
  return formatText(deal?.location?.streetAddress) || "Adress saknas";
}

function getCity(deal: any): string {
  return (
    formatText(deal?.location?.city) ||
    formatText(deal?.location?.residentialArea) ||
    "Österlen"
  );
}



function getRooms(deal: any): string {
  const rooms = deal?.rooms;

  const numberOfRooms =
    rooms?.numberOfRooms ??
    rooms?.number ??
    rooms?.count ??
    rooms?.value;

  if (
    numberOfRooms !== null &&
    numberOfRooms !== undefined &&
    numberOfRooms !== ""
  ) {
    return String(numberOfRooms);
  }

  return "";
}



function getLivingArea(deal: any): string {
  const building = deal?.buildings?.buildings?.[0];

  const livingArea =
    deal?.estate?.livingArea ??
    building?.livingArea ??
    deal?.livingArea;

  if (
    livingArea === null ||
    livingArea === undefined ||
    livingArea === ""
  ) {
    return "";
  }

  if (typeof livingArea === "object") {
    return String(
      livingArea.value ??
        livingArea.area ??
        livingArea.number ??
        ""
    );
  }

  return String(livingArea);
}

function getPlotArea(deal: any): string {
  const building = deal?.buildings?.buildings?.[0];

  const plotArea =
    deal?.estate?.plotArea ??
    deal?.plotArea ??
    building?.plotArea ??
    deal?.estate?.plot?.area;

  if (
    plotArea === null ||
    plotArea === undefined ||
    plotArea === ""
  ) {
    return "";
  }

  if (typeof plotArea === "object") {
    return String(
      plotArea.value ??
        plotArea.area ??
        plotArea.number ??
        ""
    );
  }

  return String(plotArea);
}


function getPrice(deal: any): string {
  const price = deal?.saleInformation?.price;

  if (typeof price === "number" && price > 0) {
    return `${new Intl.NumberFormat("sv-SE").format(price)} kr`;
  }

  if (typeof price === "string" && price.trim() !== "") {
    const numericPrice = Number(price);

    if (Number.isFinite(numericPrice) && numericPrice > 0) {
      return `${new Intl.NumberFormat("sv-SE").format(numericPrice)} kr`;
    }
  }

  return formatText(deal?.saleInformation?.priceDescription);
}




function PropertyCard({
  deal,
  sold = false,
}: {
  deal: any;
  sold?: boolean;
}) {
  const image = getMainImage(deal);
  const address = getAddress(deal);
  const city = getCity(deal);
  const rooms = getRooms(deal);
  const livingArea = getLivingArea(deal);
  const plotArea = getPlotArea(deal);
  const price = sold ? "" : getPrice(deal);

  const content = (
    <>
      <div className={styles.imageWrap}>
        <img
          src={image}
          alt={address}
          className={styles.image}
          loading="lazy"
        />

        <span className={styles.imageNumber}>
          {sold ? "Tidigare försäljning" : "Till salu"}
        </span>


        {sold && (
          <span className={styles.soldBadge}>SÅLD</span>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.propertyInfo}>
          <p className={styles.location}>{city}</p>
          <h3 className={styles.address}>{address}</h3>
        </div>

        <div className={styles.metaRow}>
          {price && (
            <span className={styles.price}>{price}</span>
          )}

          {price && (rooms || livingArea || plotArea) && (
            <span className={styles.dot} aria-hidden="true">·</span>
          )}

          {rooms && (
            <span className={styles.metaItem}>{rooms} rum</span>
          )}

          {rooms && (livingArea || plotArea) && (
            <span className={styles.dot} aria-hidden="true">·</span>
          )}

          {livingArea && (
            <span className={styles.metaItem}>{livingArea} m²</span>
          )}

          {livingArea && plotArea && (
            <span className={styles.dot} aria-hidden="true">·</span>
          )}

          {plotArea && (
            <span className={styles.metaItem}>
              {plotArea} m² tomt
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (sold) {
    return (
      <article
        className={`${styles.property} ${styles.soldProperty}`}
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      href={`/fastigheter/${encodeURIComponent(String(deal.id))}`}
      className={styles.property}
    >
      {content}
    </Link>
  );
}


export default async function FastigheterPage() {
  const [dealsResult, soldResult] = await Promise.allSettled([
    getDeals(),
    getSoldDeals(),
  ]);

  const deals =
    dealsResult.status === "fulfilled" &&
    Array.isArray(dealsResult.value)
      ? dealsResult.value
      : [];

  const soldDeals =
    soldResult.status === "fulfilled" &&
    Array.isArray(soldResult.value)
      ? soldResult.value
      : [];

  // FELSÖKNING: visa vilka prisfält som finns i Mspecs-data.
  // Den här loggen visar inte API-token eller andra miljöhemligheter.
  console.log(
    "PRISFÄLT FRÅN MSPECS:",
    JSON.stringify(
      deals.slice(0, 2).map((deal: any) => ({
        id: deal?.id,
        price: deal?.price,
        estatePrice: deal?.estate?.price,
        keys: Object.keys(deal ?? {}),
        estateKeys: Object.keys(deal?.estate ?? {}),
      })),
      null,
      2
    )
  );

  console.log(
    "RUMSDATA FRÅN MSPECS:",
    JSON.stringify(
      deals.slice(0, 3).map((deal: any) => ({
        id: deal?.id,
        rooms: deal?.rooms,
        objectType: deal?.objectType,
        customFields: deal?.customFields,
      })),
      null,
      2
    )
  );

  if (dealsResult.status === "rejected") {
    console.error(
      "Kunde inte hämta objekt till salu:",
      dealsResult.reason
    );
  }

  if (soldResult.status === "rejected") {
    console.error(
      "Kunde inte hämta sålda objekt:",
      soldResult.reason
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        {/* OBJEKT TILL SALU */}
        <header className={styles.header}>
          <div className={styles.headingWrap}>
            <p className={styles.eyebrow}>Våra bostäder</p>
            <h1 className={styles.title}>HEM TILL SALU</h1>
          </div>
        </header>

        {deals.length > 0 ? (
          <section className={styles.grid}>
            {deals.map((deal: any, index: number) => (
              <PropertyCard
                key={deal?.id ?? `deal-${index}`}
                deal={deal}
              />
            ))}

            {deals.length % 2 !== 0 && (
              <Link
                href="/#kontakt"
                className={styles.contactCard}
              >
                <div className={styles.contactContent}>
                  <p className={styles.contactEyebrow}>
                    Hittar du inte rätt?
                  </p>

                  <h2 className={styles.contactTitle}>
                    Låt oss hitta
                    <br />
                    ditt nästa hem.
                  </h2>

                  <p className={styles.contactText}>
                    Alla våra fastigheter publiceras inte alltid öppet.
                    Kontakta oss så berättar vi mer om kommande och
                    privata försäljningar.
                  </p>

                  <span className={styles.contactLink}>
                    <span>Kontakta oss</span>
                    <span
                      className={styles.arrow}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </span>
                </div>
              </Link>
            )}
          </section>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              Inga fastigheter till salu just nu.
            </p>
          </div>
        )}

        {/* SÅLDA FASTIGHETER */}
        <section className={styles.soldSection}>
          <header className={styles.header}>
            <div className={styles.headingWrap}>
              <p className={styles.eyebrow}>
                Tidigare försäljningar
              </p>
              <h2 className={styles.title}>SÅLDA FASTIGHETER</h2>
            </div>
          </header>

          {soldDeals.length > 0 ? (
            <div className={styles.grid}>
              {soldDeals.map((deal: any, index: number) => (
                <PropertyCard
                  key={deal?.id ?? `sold-${index}`}
                  deal={deal}
                  sold
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>
                Inga sålda fastigheter att visa just nu.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
