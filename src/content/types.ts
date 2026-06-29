// Shared content types for the DIGL brand site.
// Every piece of narrative copy is bilingual: English + Arabic (Tunisian voice).

export type Lang = "en" | "ar";

export interface Bilingual {
  en: string;
  ar: string;
}

/** A single drop / capsule collection in the DIGL world. */
export interface Drop {
  /** Short latin code shown as the logo-mark, e.g. "GHBAR". */
  code: string;
  /** Arabic script name, e.g. "غبار". */
  arabic: string;
  /** Translated meaning of the name. */
  meaning: Bilingual;
  /** One-line poetic descriptor. */
  line: Bilingual;
  /** Longer paragraph. */
  body: Bilingual;
  /** Drop status label. */
  status: Bilingual;
  /** Signature hex color for the capsule. */
  color: string;
  /** Readable ink color on top of `color`. */
  ink: string;
}

/** A real garment in the catalog. */
export interface Product {
  id: string;
  /** Which drop it belongs to (Drop.code). */
  drop: string;
  name: Bilingual;
  category: Bilingual;
  colorway: Bilingual;
  /** Material / construction spec — concrete, no placeholders. */
  spec: Bilingual;
  fit: Bilingual;
  material: Bilingual;
  care: Bilingual;
  story: Bilingual;
  details: Bilingual[];
  status: Bilingual;
  /** Price in Tunisian Dinar. */
  priceTND: number;
  /** Available sizes, or a single descriptor like "One size". */
  sizes: string[];
  /** Edition note, e.g. "/ 99" for limited. Empty if open stock. */
  edition?: string;
  /** Array of image URLs for the product gallery. If absent, falls back to the SVG garment. */
  images?: string[];
  /** Optional lifestyle/editorial hero image URL for the premium row layout. */
  lifestyleImage?: string;
  /** Garment silhouette used to pick the SVG template. */
  silhouette: "hoodie" | "tee" | "cargo" | "jacket" | "beanie" | "knit" | "windbreaker" | "tank" | "bag" | "cap";
  bover?: string;
}

/** A stop on the journey from the southern edge to the northern medina. */
export interface JourneyStop {
  city: Bilingual;
  /** Normalised position on the stylised map (0–100, both axes). */
  x: number;
  y: number;
  note: Bilingual;
  /** Hour of the walk, e.g. "18:42". */
  hour: string;
}

/** A short lore entry in the Journal. */
export interface JournalEntry {
  index: string;
  title: Bilingual;
  body: Bilingual;
  place: Bilingual;
}

/** A member of the crew behind DIGL — "The Makers". */
export interface TeamMember {
  id: string;
  name: Bilingual;
  /** What they hold down, in brand voice. */
  role: Bilingual;
  bio: Bilingual;
  /** A short tag/handle line, e.g. "keeps the route". */
  tag: Bilingual;
  /** Portrait variant for the hand-built woodcut bust. */
  portrait: "keeper" | "cutter" | "ink" | "scribe";
  /** Signature tint (pulled from the drop palette) for the portrait. */
  color: string;
  ink: string;
}
