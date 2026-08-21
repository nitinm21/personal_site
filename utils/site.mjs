/**
 * Single source of truth for the site's identity and its public route table.
 * Imported by app/robots.ts, app/sitemap.ts, app/layout.tsx, the markdown
 * content-negotiation route, and the tests — so a new page only has to be
 * registered here to show up everywhere machines look for it.
 */

export const SITE_URL = 'https://nitinmurali.vercel.app';
export const SITE_NAME = 'Nitin Murali';
export const SITE_DESCRIPTION =
  'Product Manager & Software Engineer building products that translate complex technology into user delight and business value.';
export const SITE_LOCALE = 'en_US';
export const SITE_LANGUAGE = 'en';
export const CONTACT_EMAIL = 'nitinmurali21@gmail.com';

export const SOCIAL_PROFILES = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nitin-murali/' },
  { name: 'GitHub', url: 'https://github.com/nitinm21' },
  { name: 'Substack', url: 'https://nitinmurali.substack.com/' },
];

/**
 * Every HTML route an agent (or a human) can land on, in sitemap order.
 * `title` feeds <title> and the markdown representation's H1.
 *
 * @typedef {object} SitePage
 * @property {string} route
 * @property {string} title
 * @property {string} description
 * @property {number} priority
 * @property {'daily' | 'weekly' | 'monthly' | 'yearly'} changeFrequency
 */

/** @type {SitePage[]} */
export const PAGES = [
  {
    route: '/',
    title: 'Nitin Murali',
    description: SITE_DESCRIPTION,
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    route: '/work',
    title: 'Work & experience',
    description:
      "Nitin Murali's role-by-role work history and education, with the outcome of each role.",
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    route: '/stuff/coding-explorations',
    title: 'Coding explorations',
    description:
      'Side projects and demos Nitin Murali has shipped, from AI agents to interactive product concepts.',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    route: '/stuff/in-the-wild',
    title: 'In the wild',
    description:
      'Conference talks, demos, and product-management fireside chats Nitin Murali has hosted or presented.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    route: '/stuff/blog',
    title: 'Blog',
    description: 'Latest writing synced from product stash on Substack.',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    route: '/behind-the-scenes',
    title: 'Behind the scenes',
    description: 'Short videos on how Nitin Murali builds things with AI.',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    route: '/agents',
    title: 'Agent & developer resources',
    description:
      "Machine-readable entry points to nitinmurali.vercel.app: llms.txt, per-page Markdown, the profile JSON API, and its OpenAPI description.",
    priority: 0.6,
    changeFrequency: 'monthly',
  },
];

export const PAGE_ROUTES = PAGES.map((page) => page.route);

/**
 * Routes that exist but resolve to another page. `/stuff` redirects to the
 * coding-explorations gallery, so its markdown representation should too
 * rather than 404-ing an agent that guessed the shorter URL.
 * @type {Record<string, string>}
 */
export const ROUTE_ALIASES = {
  '/stuff': '/stuff/coding-explorations',
};

/**
 * @param {string} route
 * @returns {SitePage | undefined}
 */
export function getPage(route) {
  const canonical = ROUTE_ALIASES[route] ?? route;
  return PAGES.find((page) => page.route === canonical);
}

/**
 * @param {string} route
 * @returns {string}
 */
export function absoluteUrl(route = '/') {
  return route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

/**
 * Social card. Declared here and spread into every route's metadata by
 * utils/pageMetadata.ts, rather than relying on Next's `opengraph-image` file
 * convention, which only attaches an image to the segment it lives in - nested
 * routes would ship no og:image at all.
 */
export const OG_IMAGE = {
  path: '/jwst_reveal_image.jpg',
  width: 2000,
  height: 1158,
  type: 'image/jpeg',
  alt: "The James Webb telescope's Cosmic Cliffs image, the backdrop revealed across nitinmurali.vercel.app",
};

/** Machine-readable files published at fixed, guessable paths. */
export const AGENT_RESOURCES = [
  {
    path: '/llms.txt',
    title: 'llms.txt',
    description: 'Curated llms.txt index of the whole site, with links to go deeper.',
    contentType: 'text/plain',
  },
  {
    path: '/llms-full.txt',
    title: 'llms-full.txt',
    description: 'Every page inlined into a single document, for one-fetch ingestion.',
    contentType: 'text/plain',
  },
  {
    path: '/sitemap.xml',
    title: 'sitemap.xml',
    description: 'Every canonical HTML URL on the site.',
    contentType: 'application/xml',
  },
  {
    path: '/robots.txt',
    title: 'robots.txt',
    description: 'Crawl policy (all crawlers allowed) plus the sitemap pointer.',
    contentType: 'text/plain',
  },
  {
    path: '/api/profile',
    title: 'Profile JSON API',
    description:
      'GET a structured JSON profile: roles, education, projects, writing, talks, and contact details.',
    contentType: 'application/json',
  },
  {
    path: '/openapi.json',
    title: 'OpenAPI 3.1 description',
    description: 'Machine-readable description of the profile API and the Markdown endpoints.',
    contentType: 'application/json',
  },
  {
    path: '/index.md',
    title: 'Markdown representation of any page',
    description:
      'Request any page with "Accept: text/markdown", or append ".md" to its path, to get Markdown instead of HTML.',
    contentType: 'text/markdown',
  },
];
