"use client";

import { useState } from "react";
import styles from "./PropertyAccordion.module.css";

type AccordionRow = {
  label: string;
  value: string;
};

type AccordionSection = {
  title: string;
  rows: AccordionRow[];
};

type Deal = Record<string, any>;

/**
 * Översättningar av fältnamn.
 */
const LABELS: Record<string, string> = {
  objectType: "Bostadstyp",
  objectSubType: "Typ",
  livingArea: "Boarea",
  otherLivingArea: "Biarea",
  totalArea: "Totalarea",
  plotArea: "Tomtarea",
  buildYear: "Byggår",
  renovationYear: "Renoveringsår",
  tenureType: "Upplåtelseform",
  propertyDesignation: "Fastighetsbeteckning",
  floor: "Våning",
  floorsInTotal: "Antal våningar",
  municipality: "Kommun",
  district: "Område",
  residentialArea: "Bostadsområde",
  numberOfRooms: "Antal rum",
  numberOfBedrooms: "Antal sovrum",
  description: "Beskrivning",
  construction: "Byggnadssätt",
  renovationDescription: "Utförda renoveringar",
  otherBuildingsDescription: "Övriga byggnader",
  faultsAndDefectsDescription: "Besiktning, fel och brister",
  otherDescription: "Övrig information",
  heating: "Uppvärmning",
  heatingDescription: "Uppvärmning",
  ventilation: "Ventilation",
  plumbing: "Vatten och avlopp",
  water: "Vatten",
  drain: "Avlopp",
  electricity: "El",
  tvInternetDescription: "TV och internet",
  internetDescription: "Internet",
  operatingCostSum: "Driftkostnad",
  householdElectricity: "Hushållsel",
  insurance: "Försäkring",
  includedInRent: "Ingår i avgiften",
  includedInRentDescription: "Detta ingår i avgiften",
  rent: "Månadsavgift",
  rentDescription: "Information om avgiften",
  name: "Föreningens namn",
  founded: "Bildad",
  generalInformation: "Om föreningen",
  upcomingRenovationsDescription: "Kommande underhåll",
  shareOfHousingAssociationNetDebt:
    "Andel av föreningens nettoskuld",
  shareOfHousingAssociationNetDebtDescription:
    "Information om föreningens nettoskuld",
  parkingSpaces: "Parkeringsplatser",
  parkingDescription: "Parkering",
  patioDescription: "Uteplats och trädgård",
  otherBuildings: "Övriga byggnader",
};

/**
 * Engelska API-värden som ska visas på svenska.
 */
const VALUE_TRANSLATIONS: Record<string, string> = {
  ACTIVE: "Till salu",
  FOR_SALE: "Till salu",
  UPCOMING: "Kommande",
  PREPARING: "På gång",
  SOLD: "Såld",

  HOUSE: "Villa",
  VILLA: "Villa",
  APARTMENT: "Lägenhet",
  CONDOMINIUM: "Bostadsrätt",
  ROW_HOUSE: "Radhus",
  TERRACED_HOUSE: "Radhus",
  TOWN_HOUSE: "Parhus / kedjehus",
  FARM: "Gård",
  AGRICULTURE: "Lantbruk",
  PLOT: "Tomt",
  VACANT_LAND: "Tomt / mark",
  COTTAGE: "Fritidshus",
  SUMMER_HOUSE: "Fritidshus",
  COMMERCIAL: "Kommersiell fastighet",

  OWNERSHIP: "Äganderätt",
  FREEHOLD: "Friköpt",
  TENANT_RIGHT: "Bostadsrätt",
  SITE_LEASEHOLD: "Tomträtt",
  LEASEHOLD: "Arrende",

  LANTMATERIET: "Lantmäteriet",

  YES: "Ja",
  NO: "Nej",
  TRUE: "Ja",
  FALSE: "Nej",

  SEK: "kr",
  EUR: "EUR",
};

/**
 * Tillåtna fält per sektion.
 *
 * Endast dessa fält visas.
 * Okända och interna Mspecs-fält filtreras bort.
 */
const SECTION_CONFIG = [
  {
    key: "estate",
    title: "Bostaden",
    fields: [
      "livingArea",
      "otherLivingArea",
      "totalArea",
      "plotArea",
      "buildYear",
      "renovationYear",
      "tenureType",
      "propertyDesignation",
      "floor",
      "floorsInTotal",
    ],
  },
  {
    key: "rooms",
    title: "Rum & planlösning",
    fields: [
      "numberOfRooms",
      "numberOfBedrooms",
      "description",
    ],
  },
  {
    key: "location",
    title: "Läge",
    fields: [
      "municipality",
      "district",
      "residentialArea",
    ],
  },
  {
    key: "saleInformation",
    title: "Byggnad & skick",
    fields: [
      "construction",
      "renovationDescription",
      "otherBuildingsDescription",
      "faultsAndDefectsDescription",
      "otherDescription",
    ],
  },
  {
    key: "economy",
    title: "Ekonomi & drift",
    fields: [
      "operatingCostSum",
      "householdElectricity",
      "insurance",
      "includedInRent",
      "includedInRentDescription",
      "rent",
      "rentDescription",
    ],
  },
  {
    key: "housingAssociation",
    title: "Föreningen",
    fields: [
      "name",
      "founded",
      "generalInformation",
      "upcomingRenovationsDescription",
      "heatingDescription",
      "internetDescription",
      "shareOfHousingAssociationNetDebt",
      "shareOfHousingAssociationNetDebtDescription",
    ],
  },
  {
    key: "parking",
    title: "Parkering",
    fields: [
      "parkingSpaces",
      "parkingDescription",
      "description",
    ],
  },
  {
    key: "patio",
    title: "Uteplats & trädgård",
    fields: [
      "patioDescription",
      "description",
    ],
  },
  {
    key: "patios",
    title: "Uteplats & trädgård",
    fields: [
      "patioDescription",
      "description",
    ],
  },
] as const;

/**
 * Hämta en begriplig etikett för ett fält.
 */
function labelFor(key: string): string {
  if (LABELS[key]) {
    return LABELS[key];
  }

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
}

/**
 * Översätt textvärden från API:t.
 */
function translateValue(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  // Hantera exempelvis "Sv: Villa".
  if (/^Sv:\s*/i.test(trimmed)) {
    return translateValue(trimmed.replace(/^Sv:\s*/i, ""));
  }

  const translated = VALUE_TRANSLATIONS[trimmed.toUpperCase()];

  if (translated) {
    return translated;
  }

  return trimmed;
}

/**
 * Formatera enkla värden.
 */
function formatPrimitive(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "boolean") {
    return value ? "Ja" : "Nej";
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat("sv-SE").format(value);
  }

  if (typeof value === "string") {
    return translateValue(value);
  }

  return "";
}

/**
 * Formatera värden från Mspecs.
 * Stödjer strängar, tal, listor och vanliga objekt.
 */
function formatValue(
  value: unknown,
  depth = 0
): string {
  if (depth > 4 || value === null || value === undefined) {
    return "";
  }

  const primitive = formatPrimitive(value);

  if (primitive) {
    return primitive;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => formatValue(item, depth + 1))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value !== "object") {
    return "";
  }

  const object = value as Record<string, unknown>;

  // Prioritera vanliga översättnings- och värdefält.
  for (const key of [
    "translation",
    "description",
    "name",
    "value",
    "constant",
  ]) {
    if (key in object) {
      const formatted = formatValue(object[key], depth + 1);

      if (formatted) {
        return formatted;
      }
    }
  }

  // Visa inte godtyckliga objekt eller råa API-fält.
  return "";
}

/**
 * Hämta en sektion och endast de uttryckligen tillåtna fälten.
 */
function createFilteredRows(
  section: unknown,
  allowedFields: readonly string[]
): AccordionRow[] {
  if (!section || typeof section !== "object" || Array.isArray(section)) {
    return [];
  }

  const record = section as Record<string, unknown>;

  return allowedFields.flatMap((key) => {
    const formatted = formatValue(record[key]);

    if (!formatted) {
      return [];
    }

    return [
      {
        label: labelFor(key),
        value: formatted,
      },
    ];
  });
}

/**
 * Bygg accordionens sektioner.
 */
function createSections(deal: Deal): AccordionSection[] {
  const sections: AccordionSection[] = [];

  for (const config of SECTION_CONFIG) {
    const rows = createFilteredRows(
      deal?.[config.key],
      config.fields
    );

    if (!rows.length) {
      continue;
    }

    // Undvik två sektioner med samma rubrik.
    const existing = sections.find(
      (section) => section.title === config.title
    );

    if (existing) {
      const existingLabels = new Set(
        existing.rows.map((row) => row.label)
      );

      existing.rows.push(
        ...rows.filter((row) => !existingLabels.has(row.label))
      );

      continue;
    }

    sections.push({
      title: config.title,
      rows,
    });
  }

  return sections.filter((section) => section.rows.length > 0);
}

/**
 * PropertyAccordion
 */
export default function PropertyAccordion({
  deal,
}: {
  deal: Deal;
}) {
  const sections = createSections(deal);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!sections.length) {
    return null;
  }

  return (
    <div className={styles.accordion}>
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        const panelId = `property-accordion-panel-${index}`;

        return (
          <div
            key={section.title}
            className={`${styles.item} ${
              isOpen ? styles.open : ""
            }`}
          >
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.title}>
                {section.title}
              </span>

              <span className={styles.icon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>

            <div
              id={panelId}
              className={styles.content}
              hidden={!isOpen}
            >
              <div className={styles.contentInner}>
                {section.rows.map((row) => (
                  <div
                    key={`${section.title}-${row.label}`}
                    className={styles.row}
                  >
                    <span className={styles.label}>
                      {row.label}
                    </span>

                    <span className={styles.value}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
