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

/* Fält som vi helt vill dölja från accordion (t.ex. dubblerade språkspecifika fält) */
const IGNORED_KEYS = new Set([
  "livingAreaDescriptionMultiLang",
  "plotDescriptionMultiLang",
  "parkingDescriptionMultiLang",
  "patioDescriptionMultiLang",
  "buildingDescriptionMultiLang",
  "generalInformationMultiLang",
  "standardPoints",
]);

/* Översättningar av etiketter / fältnamn */
const LABELS: Record<string, string> = {
  id: "ID",
  shortId: "Objektnummer",
  objectType: "Objekttyp",
  objectSubType: "Underkategori",
  status: "Status",
  currency: "Valuta",
  
  isNewDevelopment: "Nyproduktion",

  customFields: "Övriga uppgifter",
  marketingTags: "Marknadsföring",
  viewings: "Visningar",
  files: "Dokument",
  urls: "Länkar",

  sellingTexts: "Säljtexter",
  saleInformation: "Försäljning",
  location: "Läge",
  housingAssociation: "Förening",
  estate: "Bostaden",
  economy: "Ekonomi",
  parking: "Parkering",
  patios: "Uteplatser",
  patio: "Uteplats",
  rooms: "Rum & planlösning",

  price: "Pris",
  priceType: "Prisform",
  priceDescription: "Prisbeskrivning",
  earliestAccessDateDescription: "Tillträde",

  streetAddress: "Adress",
  postalCode: "Postnummer",
  city: "Ort",
  municipality: "Kommun",
  county: "Län",
  district: "Område",
  residentialArea: "Bostadsområde",

  livingArea: "Boarea",
  otherLivingArea: "Övrig area",
  totalArea: "Totalarea",
  plotArea: "Tomtarea",
  floor: "Våning",
  floorsInTotal: "Antal våningar",
  buildYear: "Byggår",
  renovationYear: "Renoveringsår",
  tenureType: "Upplåtelseform",
  apartmentNumber: "Lägenhetsnummer",
  governmentApartmentNumber: "Lägenhetsnummer hos Lantmäteriet",
  propertyDesignation: "Fastighetsbeteckning",
  partOfEstate: "Del av fastighet",
  freeholdTitle: "Ägandeform",
  landTenure: "Markägande",
  isSharedOwnership: "Delat ägande",

  livingAreaAccuracy: "Källa för boarea",
  plotAreaAccuracy: "Källa för tomtarea",
  livingAreaDescription: "Beskrivning av boarea",
  plotDescription: "Tomtbeskrivning",
  livingAreaIsApproximate: "Boarea är ungefärlig",

  numberOfRooms: "Antal rum",
  numberOfBedrooms: "Antal sovrum",
  convertNumberOfBedRooms: "Sovrum",

  renovationDescription: "Renoveringar",
  otherDescription: "Övrig beskrivning",
  otherBuildingsDescription: "Övriga byggnader",
  faultsAndDefectsDescription: "Besiktning / Fel & brister",
  tvInternetDescription: "TV & Internet",
  parkingDescription: "Parkering",
  patioDescription: "Uteplats & trädgård",

  plumbing: "Vatten & Avlopp",
  construction: "Byggnadssätt",
  heating: "Uppvärmning",
  electricity: "El & Installationer",
  chimney: "Skorsten",
  ventilation: "Ventilation",
  radon: "Radon",

  // Underobjekt till teknik & byggnad
  water: "Vatten",
  drain: "Avlopp",
  subFoundationType: "Undergrund",
  foundationWallType: "Grundmur",
  foundationType: "Grund",
  roofingType: "Tak",
  guttersType: "Plåtarbete / Hängrännor",
  facadeType: "Fasad",
  frameType: "Stomme",
  windowsType: "Fönster",
  joistType: "Bjälklag",
  type: "Typ",
  condition: "Skick",
  age: "Ålder",
  brand: "Märke",
  stemsCondition: "Ledningar",
  mainFuse: "Huvudsäkring",
  electricSafety: "Elsäkerhet",
  isDetected: "Uppmätt",

  shareInHousingAssociation: "Andel i föreningen",
  shareInHousingAssociationFee: "Andel av avgift",
  shareOfHousingAssociationNetDebt: "Andel av föreningens nettoskuld",
  shareOfHousingAssociationNetDebtDescription: "Beskrivning av nettoskuld",

  operatingCostSum: "Driftkostnad",
  householdElectricity: "Hushållsel",
  insurance: "Försäkring",
  rent: "Avgift",
  rentDescription: "Avgiftsbeskrivning",
  livingCostAnalysis: "Boendekostnadsanalys",
  includedInRent: "Ingår i avgiften",
  includedInRentDescription: "Vad som ingår",

  name: "Namn",
  identifier: "Organisationsnummer",
  founded: "Bildad",
  generalInformation: "Allmän information",
  buildingDescription: "Byggnadsbeskrivning",
  heatingDescription: "Uppvärmning",
  internetDescription: "Internet",
  upcomingRenovationsDescription: "Kommande underhåll",
  legalEntityAcceptable: "Juridisk person",
  housingAssociationTaxationType: "Föreningstyp",
  plotOwnership: "Markägande",
  energyPerformance: "Energiprestanda",

  description: "Beskrivning",
  parkingSpaces: "Parkeringsplatser",

  number: "Antal",
  count: "Antal",
  value: "Värde",
  total: "Totalt",
};

/* Översättning av sektionsnamn */
const SECTION_NAMES: Record<string, string> = {
  sellingTexts: "Säljtexter",
  saleInformation: "Försäljning",
  location: "Läge",
  housingAssociation: "Förening",
  estate: "Bostaden",
  economy: "Ekonomi",
  parking: "Parkering",
  patios: "Uteplatser",
  patio: "Uteplats",
  rooms: "Rum & planlösning",
  customFields: "Övriga uppgifter",
  marketingTags: "Marknadsföring",
  viewings: "Visningar",
  files: "Dokument",
  urls: "Länkar",
};

/* Översättningar av engelska värden från Mspecs API */
const VALUE_TRANSLATIONS: Record<string, string> = {
  // Status
  ACTIVE: "Till salu",
  FOR_SALE: "Till salu",
  UPCOMING: "Kommande",
  PREPARING: "På gång",
  SOLD: "Såld",
  RESERVED: "Reserverad",
  PAUSED: "Pausad",

  // Objekttyper
  HOUSE: "Villa",
  VILLA: "Villa",
  APARTMENT: "Lägenhet",
  CONDOMINIUM: "Bostadsrätt",
  ROW_HOUSE: "Radhus",
  TERRACED_HOUSE: "Radhus",
  TOWN_HOUSE: "Parhus / Kedjehus",
  FARM: "Gård",
  AGRICULTURE: "Lantbruk",
  PLOT: "Tomt",
  VACANT_LAND: "Tomt / Mark",
  COTTAGE: "Fritidshus",
  SUMMER_HOUSE: "Fritidshus",
  COMMERCIAL: "Kommersiell",

  // Upplåtelseform / Ägande
  OWNERSHIP: "Äganderätt",
  FREEHOLD: "Friköpt",
  TENANT_RIGHT: "Bostadsrätt",
  SITE_LEASEHOLD: "Tomträtt",
  LEASEHOLD: "Arrende",

  // Källor & övrigt
  LANTMATERIET: "Lantmäteriet",

  // Booleans / Svar
  YES: "Ja",
  NO: "Nej",
  TRUE: "Ja",
  FALSE: "Nej",

  // Övrigt
  SEK: "kr",
  EUR: "EUR",
};

function labelFor(key: string) {
  if (LABELS[key]) return LABELS[key];

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .replace(/_/g, " ");
}

function translateValue(val: string): string {
  const trimmed = val.trim();
  
  // Rensa bort "Sv: " prefix om det finns
  if (trimmed.startsWith("Sv: ")) {
    return translateValue(trimmed.replace(/^Sv:\s*/, ""));
  }

  const upper = trimmed.toUpperCase();

  if (VALUE_TRANSLATIONS[upper]) {
    return VALUE_TRANSLATIONS[upper];
  }

  if (VALUE_TRANSLATIONS[trimmed]) {
    return VALUE_TRANSLATIONS[trimmed];
  }

  return trimmed;
}

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

function formatValue(value: unknown): string {
  const primitive = formatPrimitive(value);

  if (primitive) {
    return primitive;
  }

  if (Array.isArray(value)) {
    const values = value
      .map((item) => formatValue(item))
      .filter(Boolean);

    return values.join(", ");
  }

  if (typeof value === "object" && value !== null) {
    const object = value as Record<string, unknown>;

    if ("translation" in object) {
      return formatValue(object.translation);
    }

    if ("description" in object) {
      const description = formatValue(object.description);

      if (description) {
        return description;
      }
    }

    if ("name" in object) {
      const name = formatValue(object.name);

      if (name) {
        return name;
      }
    }

    if ("value" in object) {
      const objectValue = formatValue(object.value);

      if (objectValue) {
        return objectValue;
      }
    }

    if ("constant" in object) {
      const constant = formatValue(object.constant);

      if (constant) {
        return constant;
      }
    }

    const values = Object.entries(object)
      .map(([key, nestedValue]) => {
        if (IGNORED_KEYS.has(key)) return "";
        const formatted = formatValue(nestedValue);

        if (!formatted) return "";

        return `${labelFor(key)}: ${formatted}`;
      })
      .filter(Boolean);

    return values.join(" · ");
  }

  return "";
}

function createRows(value: unknown): AccordionRow[] {
  if (!value || typeof value !== "object") {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        const formatted = formatValue(item);

        if (!formatted) return null;

        return {
          label: `Post ${index + 1}`,
          value: formatted,
        };
      })
      .filter(Boolean) as AccordionRow[];
  }

  return Object.entries(value as Record<string, unknown>)
    .map(([key, nestedValue]) => {
      if (IGNORED_KEYS.has(key)) return null;

      const formatted = formatValue(nestedValue);

      if (!formatted) return null;

      return {
        label: labelFor(key),
        value: formatted,
      };
    })
    .filter(Boolean) as AccordionRow[];
}

function createSections(deal: any): AccordionSection[] {
  const sections: AccordionSection[] = [];

  const basicRows = createRows({
    objectType: deal?.objectType,
    objectSubType: deal?.objectSubType,
    status: deal?.status,
    shortId: deal?.shortId,

    isNewDevelopment: deal?.isNewDevelopment,
  });

  if (basicRows.length) {
    sections.push({
      title: "Grunduppgifter",
      rows: basicRows,
    });
  }

  const orderedKeys = [
    "location",
    "estate",
    "rooms",
    "saleInformation",
    "economy",
    "housingAssociation",
    "parking",
    "patio",
    "patios",
    "viewings",
    "customFields",
    "marketingTags",
    "files",
    "urls",
  ];

  for (const key of orderedKeys) {
    const rows = createRows(deal?.[key]);

    if (!rows.length) continue;

    sections.push({
      title: SECTION_NAMES[key] || labelFor(key),
      rows,
    });
  }

  return sections;
}

export default function PropertyAccordion({
  deal,
}: {
  deal: any;
}) {
  const sections = createSections(deal);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!sections.length) return null;

  return (
    <div className={styles.accordion}>
      {sections.map((section, index) => {
        const isOpen = openIndex === index;

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
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              aria-expanded={isOpen}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.title}>
                {section.title}
              </span>

              <span className={styles.icon}>
                <span />
                <span />
              </span>
            </button>

            <div className={styles.content}>
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