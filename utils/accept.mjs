/**
 * Accept-header content negotiation, per RFC 9110 section 12.5.1 and the
 * acceptmarkdown.com convention (https://acceptmarkdown.com/recipes/nextjs/).
 *
 * Rules this implements:
 *  - rank candidates by q-value, tie-break on the client's own ordering
 *  - a more specific media range wins over a less specific one regardless of q,
 *    so `text/html;q=0, *\/*` correctly rejects HTML instead of letting the
 *    wildcard resurrect it
 *  - `q=0` is an explicit rejection, not a low preference
 *  - no acceptable representation -> null, which callers turn into a 406
 */

export const HTML_TYPE = 'text/html';
export const MARKDOWN_TYPE = 'text/markdown';

/** Ordered by preference: the first entry wins an otherwise exact tie. */
export const PRODUCED_TYPES = [HTML_TYPE, MARKDOWN_TYPE];

/**
 * @typedef {object} AcceptEntry
 * @property {string} type
 * @property {number} q
 * @property {number} specificity
 */

/**
 * @param {string} header
 * @returns {AcceptEntry[]} entries in the order the client sent them
 */
export function parseAccept(header) {
  return header
    .split(',')
    .map((raw) => raw.trim())
    .filter((raw) => raw !== '')
    .map((raw) => {
      const parts = raw.split(';').map((part) => part.trim());
      const type = parts[0].toLowerCase();
      let q = 1;

      for (const param of parts.slice(1)) {
        const [name, value] = param.split('=').map((part) => part.trim());
        if (name.toLowerCase() === 'q') {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) {
            q = Math.max(0, Math.min(1, parsed));
          }
        }
      }

      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    });
}

/**
 * @param {AcceptEntry} entry
 * @param {string} candidate
 * @returns {boolean}
 */
export function matchesType(entry, candidate) {
  if (entry.type === '*/*') return true;
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * Pick the representation to serve.
 *
 * @param {string | null | undefined} header raw Accept header
 * @param {string[]} produces candidate types, most-preferred first
 * @returns {string | null} the chosen type, or null when nothing is acceptable
 */
export function negotiateType(header, produces = PRODUCED_TYPES) {
  if (!header) return produces[0] ?? null;

  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0] ?? null;

  /** @type {string | null} */
  let bestType = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of produces) {
    /** @type {AcceptEntry | null} */
    let matched = null;
    let matchedPosition = Infinity;

    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      if (!matchesType(entry, candidate)) continue;

      const isMoreSpecific = matched === null || entry.specificity > matched.specificity;
      const isEarlierAtSameSpecificity =
        matched !== null && entry.specificity === matched.specificity && index < matchedPosition;

      if (isMoreSpecific || isEarlierAtSameSpecificity) {
        matched = entry;
        matchedPosition = index;
      }
    }

    // Unmatched, or explicitly rejected with q=0.
    if (matched === null || matched.q <= 0) continue;

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

/**
 * Append header names to an existing Vary value without duplicating them.
 *
 * @param {string | null | undefined} existing current Vary value
 * @param {string[]} names header names to guarantee are present
 * @returns {string}
 */
export function mergeVary(existing, names = ['Accept', 'Accept-Encoding']) {
  const present = (existing ?? '')
    .split(',')
    .map((token) => token.trim())
    .filter((token) => token !== '');
  const seen = new Set(present.map((token) => token.toLowerCase()));

  for (const name of names) {
    if (!seen.has(name.toLowerCase())) {
      present.push(name);
      seen.add(name.toLowerCase());
    }
  }

  return present.join(', ');
}
