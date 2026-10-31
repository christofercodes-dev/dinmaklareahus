import Link from "next/link";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { getDeal } from "@/lib/mspecs";
import PropertyAccordion from "@/components/PropertyAccordion";
import styles from "./Property.module.css";

const displayFont = Cormorant_Garamond({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    style: ["normal", "italic"],
});

const textFont = Hanken_Grotesk({
    variable: "--font-text",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

type AnyRecord = Record<string, any>;

function formatText(value: any): string {
    if (value === null || value === undefined) return "";

    if (typeof value === "string" || typeof value === "number") {
        return String(value).trim();
    }

    if (typeof value === "object") {
        for (const key of [
            "translation",
            "name",
            "description",
            "constant",
            "value",
            "label",
        ]) {
            if (value[key] !== undefined && value[key] !== null) {
                const result = String(value[key]).trim();
                if (result) return result;
            }
        }
    }

    return "";
}

function firstValue(...values: any[]): any {
    return values.find(
        (value) => value !== null && value !== undefined && value !== ""
    );
}

function getImages(deal: AnyRecord) {
    return (deal?.images ?? [])
        .filter((image: AnyRecord) => Boolean(image?.viewUrl))
        .sort(
            (a: AnyRecord, b: AnyRecord) =>
                (a?.displayOrder ?? 999) - (b?.displayOrder ?? 999)
        );
}

function getMainBuilding(deal: AnyRecord) {
    const buildings =
        deal?.buildings?.buildings ?? deal?.buildings ?? [];

    if (!Array.isArray(buildings)) return buildings ?? {};

    return (
        buildings.find((building: AnyRecord) =>
            firstValue(
                building?.livingArea,
                building?.rooms,
                building?.roomCount
            ) !== undefined
        ) ?? buildings[0] ?? {}
    );
}

function formatPrice(value: any): string {
    if (typeof value === "number") {
        return `${new Intl.NumberFormat("sv-SE").format(value)} kr`;
    }

    const text = formatText(value);
    if (!text) return "";

    if (/^\d+$/.test(text)) {
        return `${new Intl.NumberFormat("sv-SE").format(Number(text))} kr`;
    }

    return text;
}

function formatArea(value: any): string {
    if (value === null || value === undefined || value === "") return "";

    const text =
        typeof value === "number"
            ? new Intl.NumberFormat("sv-SE").format(value)
            : formatText(value);

    if (!text) return "";

    return /m²|m2/i.test(text) ? text : `${text} m²`;
}

function normalizeRooms(value: any): string {
    if (value === null || value === undefined || value === "") return "";

    if (typeof value === "number") {
        return Number.isFinite(value) ? String(value) : "";
    }

    if (typeof value === "string") return value.trim();

    if (Array.isArray(value)) {
        for (const item of value) {
            const result = normalizeRooms(item);
            if (result) return result;
        }

        return "";
    }

    if (typeof value === "object") {
        for (const key of [
            "number",
            "count",
            "value",
            "rooms",
            "roomCount",
            "quantity",
            "translation",
            "name",
        ]) {
            if (value[key] !== undefined && value[key] !== null) {
                const result = normalizeRooms(value[key]);
                if (result) return result;
            }
        }
    }

    return "";
}

function getRooms(deal: AnyRecord, building: AnyRecord): string {
    const candidates = [
        deal?.numberOfRooms,
        deal?.rooms?.numberOfRooms,
        deal?.estate?.numberOfRooms,
        deal?.estate?.rooms?.numberOfRooms,
        building?.numberOfRooms,
        building?.rooms,
        building?.roomCount,
        building?.numberRooms,
        deal?.rooms,
        deal?.roomCount,
        deal?.estate?.rooms,
        deal?.property?.numberOfRooms,
        deal?.property?.rooms,
        deal?.property?.roomCount,
    ];

    for (const candidate of candidates) {
        const result = normalizeRooms(candidate);
        if (result) return result;
    }

    return "";
}

export default async function PropertyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const deal: AnyRecord = await getDeal(id);

    if (!deal) {
        return (
            <main
                className={`${displayFont.variable} ${textFont.variable} ${styles.page}`}
            >
                <section className={styles.notFound}>
                    <div className="container">
                        <p className={styles.eyebrow}>Vårt utbud</p>
                        <h1>Vi kunde inte hitta objektet.</h1>
                        <p>Objektet kan ha tagits bort eller flyttats.</p>

                        <Link href="/" className={styles.backLink}>
                            <span aria-hidden="true">←</span>
                            Tillbaka till objekten
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    const images = getImages(deal);

    const mainImage =
        images.find((image: AnyRecord) => image?.isMainImage) ?? images[0];

    const building = getMainBuilding(deal);

    const title =
        formatText(deal?.sellingTextSubject) ||
        formatText(deal?.location?.streetAddress) ||
        "En unik fastighet";

    const city = formatText(deal?.location?.city);
    const address = formatText(deal?.location?.streetAddress);
    const postalCode = formatText(deal?.location?.postalCode);

    const objectType = formatText(deal?.objectType);
    const objectSubType = formatText(deal?.objectSubType);
    const propertyType = objectSubType || objectType;

    const price = formatPrice(
        firstValue(deal?.saleInformation?.price, deal?.price)
    );

    const livingArea = formatArea(
        firstValue(
            building?.livingArea,
            deal?.estate?.livingArea,
            deal?.livingArea
        )
    );

    const rooms = getRooms(deal, building);

    const plotArea = formatArea(
        firstValue(
            deal?.estate?.plotArea,
            deal?.plotArea,
            building?.plotArea
        )
    );

    const facts = [
        { label: "Boarea", value: livingArea },
        { label: "Antal rum", value: rooms ? `${rooms} rum` : "" },
        { label: "Tomtarea", value: plotArea },
        { label: "Pris", value: price },
    ].filter((fact) => fact.value);

    const fullDescription = formatText(deal?.sellingTexts?.sellingText);

    const paragraphs = fullDescription
        .split(/\n+/)
        .map((paragraph: string) => paragraph.trim())
        .filter(Boolean);

    const [lead, ...rest] = paragraphs;

    const titleWords = title.split(/\s+/);

    const titleMain =
        titleWords.length > 1
            ? titleWords.slice(0, -1).join(" ")
            : title;

    const titleAccent =
        titleWords.length > 1 ? titleWords[titleWords.length - 1] : "";

    return (
        <main
            className={`${displayFont.variable} ${textFont.variable} ${styles.page}`}
        >
            {/* HUVUDBILD */}
            <section className={styles.hero}>
                {mainImage?.viewUrl ? (
                    <img
                        src={mainImage.viewUrl}
                        alt={mainImage.title || title}
                        className={styles.heroImage}
                        fetchPriority="high"
                    />
                ) : (
                    <div
                        className={styles.heroPlaceholder}
                        aria-hidden="true"
                    />
                )}

                <div
                    className={styles.heroShade}
                    aria-hidden="true"
                />

                <div className={`container ${styles.heroFrame}`}>
                    <div className={styles.heroBody}>
                        {propertyType && (
                            <p className={styles.heroKicker}>
                                {propertyType}
                            </p>
                        )}

                        <h1 className={styles.heroTitle}>
                            {titleMain}
                            {titleAccent && (
                                <>
                                    {" "}
                                    <em>{titleAccent}</em>
                                </>
                            )}
                        </h1>

                        <div className={styles.heroLocation}>
                            <span className={styles.heroLocationLabel}>
                                {city}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAKTARUTA UNDER BILDEN */}
            <section
                className={styles.factsSection}
                aria-label="Fastighetsfakta"
            >
                <div className={`container ${styles.factsContainer}`}>
                    <div className={styles.factsCard}>
                        <div className={styles.factsTop}>
                            <div>
                                <p className={styles.sectionEyebrow}>
                                    Överblick
                                </p>

                            </div>
                        </div>

                        {facts.length > 0 && (
                            <dl className={styles.factsGrid}>
                                {facts.map((fact, index) => (
                                    <div
                                        key={fact.label}
                                        className={styles.factItem}
                                    >
                                        <span
                                            className={styles.factIndex}
                                            aria-hidden="true"
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <dt>{fact.label}</dt>
                                        <dd>{fact.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </div>
            </section>

            {/* BESKRIVNING OCH DETALJER */}
            <section className={styles.story}>
                <div className="container">
                    <div className={styles.storyHeader}>
                        <p className={styles.sectionEyebrow}>
                            Upptäck fastigheten
                        </p>

                        <span
                            className={styles.storyRule}
                            aria-hidden="true"
                        />
                    </div>

                    <div className={styles.storyGrid}>
                        <article className={styles.storyText}>
                            {lead && (
                                <p className={styles.lead}>{lead}</p>
                            )}

                            {rest.length > 0 && (
                                <div className={styles.body}>
                                    {rest.map(
                                        (paragraph: string, index: number) => (
                                            <p key={index}>{paragraph}</p>
                                        )
                                    )}
                                </div>
                            )}

                            {!fullDescription && (
                                <p className={styles.lead}>
                                    Kontakta oss gärna för mer information om
                                    fastigheten.
                                </p>
                            )}
                        </article>

                        <aside className={styles.storySide}>
                            <div className={styles.sideHeading}>
                                <p className={styles.sectionEyebrow}>
                                    Fördjupning
                                </p>

                                <h3>Information &amp; detaljer</h3>

                                <p>
                                    Allt du behöver veta om bostaden, samlat på
                                    ett ställe.
                                </p>
                            </div>

                            <div className={styles.accordion}>
                                <PropertyAccordion deal={deal} />
                            </div>

                            <Link
                                href="/kontakt"
                                className={styles.detailsLink}
                            >
                                Fråga om fastigheten{" "}
                                <span aria-hidden="true">↗</span>
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>

            {/* BILDER */}
            {images.length > 0 && (
                <section className={styles.gallerySection}>
                    <div className="container">
                        <div className={styles.galleryHead} />

                        <div className={styles.gallery}>
                            {images.map(
                                (image: AnyRecord, index: number) => (
                                    <figure
                                        key={
                                            image.id ||
                                            image.viewUrl ||
                                            index
                                        }
                                        className={styles.galleryFigure}
                                    >
                                        <img
                                            src={image.viewUrl}
                                            alt={
                                                image.title ||
                                                `${title}, bild ${index + 1}`
                                            }
                                            loading="lazy"
                                        />

                                        <figcaption>
                                            <span
                                                className={styles.galleryNumber}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <span>
                                                {image.title || title}
                                            </span>
                                        </figcaption>
                                    </figure>
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}