
import Link from "next/link";
import styles from "./Properties.module.css";

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

function getImage(deal: any) {
  const images =
    deal?.images
      ?.filter((image: any) => image?.viewUrl)
      ?.sort(
        (a: any, b: any) =>
          (a?.displayOrder ?? 999) - (b?.displayOrder ?? 999)
      ) || [];

  return images.find((image: any) => image?.isMainImage) || images[0];
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

function getRooms(deal: any): string {
  const rooms = deal?.rooms;

  const numberOfRooms =
    rooms?.numberOfRooms ??
    rooms?.number ??
    rooms?.count ??
    rooms?.value;

  return numberOfRooms !== null &&
    numberOfRooms !== undefined &&
    numberOfRooms !== ""
    ? String(numberOfRooms)
    : "";
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

function getAddress(deal: any): string {
  return (
    formatText(deal?.location?.streetAddress) ||
    formatText(deal?.location?.postalCode) ||
    "Adress saknas"
  );
}

function getCity(deal: any): string {
  return (
    formatText(deal?.location?.city) ||
    formatText(deal?.location?.residentialArea) ||
    "Österlen"
  );
}

export default function Properties({
  deals = [],
}: {
  deals?: any[];
}) {
  const properties = Array.isArray(deals) ? deals.slice(0, 2) : [];

  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Handplockade bostäder</p>
          <h2 className={styles.title}>Våra hem</h2>
        </header>

        {properties.length > 0 ? (
          <div className={styles.grid}>
            {properties.map((deal: any, index: number) => {
              const image = getImage(deal);

              if (!image) return null;

              const address = getAddress(deal);
              const city = getCity(deal);
              const rooms = getRooms(deal);
              const livingArea = getLivingArea(deal);
              const plotArea = getPlotArea(deal);
              const price = getPrice(deal);

              return (
                <Link
                  key={deal?.id ?? `property-${index}`}
                  href={`/fastigheter/${encodeURIComponent(
                    String(deal?.id)
                  )}`}
                  className={styles.property}
                >
                  <div className={styles.imageWrap}>
                    <img
                      src={image.viewUrl}
                      alt={image.title || address}
                      className={styles.image}
                      loading="lazy"
                    />

                    <span className={styles.imageNumber}>
                      Till salu
                    </span>
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
                        <span className={styles.dot} aria-hidden="true">
                          ·
                        </span>
                      )}

                      {rooms && (
                        <span className={styles.metaItem}>
                          {rooms} rum
                        </span>
                      )}

                      {rooms && (livingArea || plotArea) && (
                        <span className={styles.dot} aria-hidden="true">
                          ·
                        </span>
                      )}

                      {livingArea && (
                        <span className={styles.metaItem}>
                          {livingArea} m²
                        </span>
                      )}

                      {livingArea && plotArea && (
                        <span className={styles.dot} aria-hidden="true">
                          ·
                        </span>
                      )}

                      {plotArea && (
                        <span className={styles.metaItem}>
                          {plotArea} m² tomt
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className={styles.empty}>
            Just nu har vi inga bostäder att visa här.
          </p>
        )}

        <footer className={styles.footer}>
          <Link href="/fastigheter" className={styles.button}>
            <span>Upptäck alla fastigheter</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
