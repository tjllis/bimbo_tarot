import { CARDS, type CardData } from "../data/deck";

const PARAM = "cards";
/** "-" survives a URL untouched; "," would come back as %2C. */
const SEPARATOR = "-";

/** A shareable link to this exact reading, e.g. …/?cards=9-4-16 */
export function readingUrl(cards: CardData[]): string {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set(PARAM, cards.map((c) => c.id).join(SEPARATOR));
  return url.toString();
}

/**
 * The reading a link is asking for, or null if there isn't a valid one.
 * Anything malformed falls through to a normal fresh start rather than
 * throwing at someone who mangled a URL.
 */
export function decodeReading(search: string): CardData[] | null {
  const raw = new URLSearchParams(search).get(PARAM);
  if (!raw) return null;

  const ids = raw.split(SEPARATOR).map(Number);
  // only the two real spreads, and no card twice
  if (ids.length !== 1 && ids.length !== 3) return null;
  if (ids.some((id) => !Number.isInteger(id))) return null;
  if (new Set(ids).size !== ids.length) return null;

  const cards = ids.map((id) => CARDS.find((c) => c.id === id));
  if (cards.some((c) => c === undefined)) return null;

  return cards as CardData[];
}

/** Drop the query so a new reading doesn't sit under someone else's link. */
export function clearPermalink() {
  if (window.location.search) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}
