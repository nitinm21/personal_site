/**
 * Path helpers shared by the negotiation middleware, the markdown route
 * handler, and the tests. Kept free of next/server imports so it can run
 * under plain `node --test`.
 */

export const MARKDOWN_SUFFIX = '.md';
export const MARKDOWN_ROUTE_PREFIX = '/api/markdown';

/** Prefixes that are never a negotiable HTML page. */
const OPAQUE_PREFIXES = ['/_next/', '/_vercel/', '/api/', '/.well-known/'];

/**
 * Trim a request path down to a canonical route: no trailing slash, and an
 * empty path becomes '/'.
 *
 * @param {string} pathname
 * @returns {string}
 */
export function normalizeRoute(pathname) {
  if (!pathname || pathname === '/') return '/';
  const withoutTrailingSlash = pathname.replace(/\/+$/, '');
  return withoutTrailingSlash === '' ? '/' : withoutTrailingSlash;
}

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function isMarkdownPath(pathname) {
  return normalizeRoute(pathname).endsWith(MARKDOWN_SUFFIX);
}

/**
 * True when the request is for an HTML page whose representation we are willing
 * to negotiate. Static assets, Next internals, and API routes are left alone.
 *
 * @param {string} pathname
 * @returns {boolean}
 */
export function isNegotiablePath(pathname) {
  const route = normalizeRoute(pathname);
  if (OPAQUE_PREFIXES.some((prefix) => route.startsWith(prefix))) return false;
  if (isMarkdownPath(route)) return true;

  // Anything with a file extension is a static asset (robots.txt, *.png, ...).
  const lastSegment = route.slice(route.lastIndexOf('/') + 1);
  return !lastSegment.includes('.');
}

/**
 * '/index.md' -> '/', '/work.md' -> '/work'.
 *
 * @param {string} pathname
 * @returns {string}
 */
export function markdownPathToRoute(pathname) {
  const route = normalizeRoute(pathname);
  if (!route.endsWith(MARKDOWN_SUFFIX)) return route;

  const withoutSuffix = route.slice(0, -MARKDOWN_SUFFIX.length);
  if (withoutSuffix === '' || withoutSuffix === '/' || withoutSuffix === '/index') return '/';
  return withoutSuffix.endsWith('/index') ? withoutSuffix.slice(0, -'/index'.length) : withoutSuffix;
}

/**
 * '/' -> '/index.md', '/work' -> '/work.md'.
 *
 * @param {string} route
 * @returns {string}
 */
export function routeToMarkdownPath(route) {
  const normalized = normalizeRoute(route);
  return normalized === '/' ? `/index${MARKDOWN_SUFFIX}` : `${normalized}${MARKDOWN_SUFFIX}`;
}

/**
 * Internal rewrite target for a canonical route.
 *
 * @param {string} route
 * @returns {string}
 */
export function markdownRewritePath(route) {
  const normalized = normalizeRoute(route);
  return normalized === '/' ? MARKDOWN_ROUTE_PREFIX : `${MARKDOWN_ROUTE_PREFIX}${normalized}`;
}

/**
 * Turn the optional catch-all slug from /api/markdown/[[...slug]] back into a
 * canonical route.
 *
 * @param {string[] | undefined} slug
 * @returns {string}
 */
export function slugToRoute(slug) {
  if (!slug || slug.length === 0) return '/';
  return markdownPathToRoute(`/${slug.join('/')}`);
}
