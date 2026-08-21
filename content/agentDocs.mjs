/**
 * Markdown representations of every HTML page, plus the prose the homepage
 * server-renders for crawlers that do not run JavaScript.
 *
 * Rendered from content/profile.mjs so the Markdown variant of a page can never
 * drift from the JSON API or the JSON-LD graph.
 */

import {
  AGENT_RESOURCES,
  PAGES,
  PAGE_ROUTES,
  ROUTE_ALIASES,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
  getPage,
} from '../utils/site.mjs';
import { routeToMarkdownPath } from '../utils/agentPaths.mjs';
import {
  APPEARANCES,
  BTS_VIDEOS,
  EDUCATION,
  EXPERIENCE,
  PERSON,
  PROJECTS,
  SUBSTACK_URL,
} from './profile.mjs';

export const MARKDOWN_ROUTES = PAGE_ROUTES;

/** Prose used by the server-rendered homepage summary and by /index.md. */
export const HOME_SUMMARY_PARAGRAPHS = [
  `${PERSON.name} builds AI products at GoodPower in Chicago, Illinois, where he works as both product manager and engineer. He started his career as a software engineer at the Institute of Product Leadership, moved into product management at SurveySparrow, interned as a product manager at Aeropay, and holds a Master of Science in Artificial Intelligence from the Illinois Institute of Technology.`,
  `At SurveySparrow he built an AI-powered survey generator that used large language models to turn a stated goal into a ready-to-send survey, cutting survey creation time by 40% and lifting free-to-paid conversion by 5%. He also moved the product onto consumption-based pricing, which raised net retention 16% and grew expansion revenue 18% within four months. Earlier, as a software engineer, he cut web application load times by 40% and shipped 40+ programmatically-SEO'd pages that increased organic registrations 45%.`,
  `This site is where that work lives. Work & experience has the role-by-role history and education. Coding explorations is a gallery of shipped side projects, including Domino (a coding agent that joins your meetings and writes an implementation plan), an open model post-trained on his own sent mail so it drafts email in his voice, the PM Archetype Finder quiz, a Bad Bunny lyrics translator, and Kalshi Wrapped. In the wild collects conference talks and product-management fireside chats with leaders from Amazon, Microsoft, AT&T, and Motorola Solutions. Blog is his writing on product thinking and building with AI, and Behind the scenes has short videos on how he builds things.`,
  `Every page here is also available as Markdown for agents: request any URL with an "Accept: text/markdown" header, or append ".md" to its path. There is a curated index at /llms.txt, the whole site in one file at /llms-full.txt, a structured profile at /api/profile, and an OpenAPI 3.1 description of both at /openapi.json.`,
  `Reach him at ${PERSON.email}, or via ${SOCIAL_PROFILES.map((profile) => `${profile.name} (${profile.url})`).join(', ')}.`,
];

/** Links offered to humans and agents that land on a page that does not exist. */
export const RECOVERY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work & experience', href: '/work' },
  { label: 'Coding explorations', href: '/stuff/coding-explorations' },
  { label: 'In the wild', href: '/stuff/in-the-wild' },
  { label: 'Blog', href: '/stuff/blog' },
  { label: 'Behind the scenes', href: '/behind-the-scenes' },
  { label: 'Agent & developer resources', href: '/agents' },
  { label: 'sitemap.xml (every canonical URL)', href: '/sitemap.xml' },
  { label: 'llms.txt (curated index for agents)', href: '/llms.txt' },
  { label: 'llms-full.txt (whole site in one file)', href: '/llms-full.txt' },
];

/**
 * Body returned with a 404 so an agent can recover instead of guessing.
 *
 * @param {string} [requestedPath]
 * @returns {string}
 */
export function renderNotFoundMarkdown(requestedPath) {
  const lines = [
    '# 404 - Page not found',
    '',
    requestedPath
      ? `There is no page at \`${requestedPath}\` on ${SITE_URL}. Nothing was moved; this path never existed.`
      : `That path does not exist on ${SITE_URL}. Nothing was moved; the path never existed.`,
    '',
    '## Where to look instead',
    '',
    ...RECOVERY_LINKS.map((link) => `- [${link.label}](${absoluteUrl(link.href)})`),
    '',
    '## For agents',
    '',
    `- Start with [llms.txt](${SITE_URL}/llms.txt), or fetch [llms-full.txt](${SITE_URL}/llms-full.txt) to get every page in one request.`,
    `- Every page has a Markdown representation: send \`Accept: text/markdown\`, or append \`.md\` to the path.`,
    `- Structured data lives at [${SITE_URL}/api/profile](${SITE_URL}/api/profile), described by [${SITE_URL}/openapi.json](${SITE_URL}/openapi.json).`,
    '',
  ];
  return `${lines.join('\n')}\n`;
}

export const NOT_FOUND_MARKDOWN = renderNotFoundMarkdown();

function docFooter(route) {
  const page = getPage(route);
  return [
    '---',
    '',
    `Canonical URL: ${absoluteUrl(route)}`,
    `Markdown URL: ${SITE_URL}${routeToMarkdownPath(route)}`,
    `Site index for agents: ${SITE_URL}/llms.txt | Whole site in one file: ${SITE_URL}/llms-full.txt`,
    page ? `Page: ${page.title} - ${SITE_NAME}` : `Site: ${SITE_NAME}`,
    '',
  ].join('\n');
}

function siteNavSection() {
  return [
    '## Elsewhere on this site',
    '',
    ...PAGES.filter((page) => page.route !== '/').map(
      (page) => `- [${page.title}](${absoluteUrl(page.route)}): ${page.description}`,
    ),
    '',
  ].join('\n');
}

function renderHome() {
  return [
    `# ${PERSON.name}`,
    '',
    `> ${PERSON.shortBio} Based in ${PERSON.location}.`,
    '',
    ...HOME_SUMMARY_PARAGRAPHS.flatMap((paragraph) => [paragraph, '']),
    '## At a glance',
    '',
    `- Name: ${PERSON.name}`,
    `- Current role: ${PERSON.jobTitle}, ${PERSON.employer}`,
    `- Location: ${PERSON.location}`,
    `- Education: ${EDUCATION.map((item) => `${item.degree}, ${item.school} (${item.years})`).join('; ')}`,
    `- Email: ${PERSON.email}`,
    ...SOCIAL_PROFILES.map((profile) => `- ${profile.name}: ${profile.url}`),
    '',
    siteNavSection(),
    docFooter('/'),
  ].join('\n');
}

function renderWork() {
  const lines = ['# Work & experience - Nitin Murali', '', '## Experience', ''];

  for (const role of EXPERIENCE) {
    lines.push(`### ${role.title}, ${role.company} (${role.years})`);
    if (role.companyUrl) lines.push('', `Company: ${role.companyUrl}`);
    lines.push('');
    for (const highlight of role.highlights) lines.push(`- ${highlight}`);
    lines.push('');
  }

  lines.push('## Education', '');
  for (const item of EDUCATION) {
    lines.push(`### ${item.degree} (${item.years})`, '', item.school, '');
  }

  lines.push(siteNavSection(), docFooter('/work'));
  return lines.join('\n');
}

function renderProjects() {
  const lines = [
    '# Coding explorations - Nitin Murali',
    '',
    `> Side projects and demos ${PERSON.name} has shipped. Most are live; several are open source.`,
    '',
  ];

  for (const project of PROJECTS) {
    lines.push(`## ${project.title}`, '', project.summary, '', `- Live: ${project.url}`);
    if (project.codeUrl && project.codeUrl !== project.url) lines.push(`- Code: ${project.codeUrl}`);
    lines.push('');
  }

  lines.push(siteNavSection(), docFooter('/stuff/coding-explorations'));
  return lines.join('\n');
}

function renderInTheWild() {
  const speaking = APPEARANCES.filter((item) => item.category === 'speaking');
  const firesides = APPEARANCES.filter((item) => item.category === 'fireside');
  const lines = [
    '# In the wild - Nitin Murali',
    '',
    '> Conference talks, demos, and product-management fireside chats.',
    '',
  ];

  for (const [heading, items] of [
    ['Speaking', speaking],
    ['Fireside chats', firesides],
  ]) {
    lines.push(`## ${heading}`, '');
    for (const item of items) {
      lines.push(`### ${item.title}`, '', item.summary, '');
      if (item.videoUrl) lines.push(`- Video: ${item.videoUrl}`);
      if (item.linkUrl && item.linkUrl !== item.videoUrl) lines.push(`- Post: ${item.linkUrl}`);
      lines.push('');
    }
  }

  lines.push(siteNavSection(), docFooter('/stuff/in-the-wild'));
  return lines.join('\n');
}

/**
 * @param {{ title: string, description: string, publishedLabel?: string, postUrl: string }[]} posts
 */
function renderBlog(posts = []) {
  const lines = [
    '# Blog - Nitin Murali',
    '',
    `> Essays on product thinking, strategy, and building with AI. Posts are hosted on Substack at ${SUBSTACK_URL} and mirrored here.`,
    '',
  ];

  if (posts.length === 0) {
    lines.push(`Read the full archive at ${SUBSTACK_URL}.`, '');
  } else {
    lines.push('## Posts', '');
    for (const post of posts) {
      const date = post.publishedLabel ? ` (${post.publishedLabel})` : '';
      lines.push(`- [${post.title}](${post.postUrl})${date}: ${post.description}`);
    }
    lines.push('');
  }

  lines.push(siteNavSection(), docFooter('/stuff/blog'));
  return lines.join('\n');
}

function renderBehindTheScenes() {
  const lines = [
    '# Behind the scenes - Nitin Murali',
    '',
    '> Short videos on how Nitin builds things with AI. More drops soon.',
    '',
  ];

  for (const video of BTS_VIDEOS) {
    lines.push(`## ${video.title}`, '', video.summary, '', `- Video: ${video.url}`, '');
  }

  lines.push(siteNavSection(), docFooter('/behind-the-scenes'));
  return lines.join('\n');
}

function renderAgents() {
  const lines = [
    '# Agent & developer resources - Nitin Murali',
    '',
    `> Every machine-readable entry point to ${SITE_URL}, at a predictable URL.`,
    '',
    '## Files and endpoints',
    '',
  ];

  for (const resource of AGENT_RESOURCES) {
    lines.push(`- \`${resource.path}\` (${resource.contentType}): ${resource.description}`);
  }

  lines.push(
    '',
    '## Markdown content negotiation',
    '',
    'Every HTML page has a Markdown representation at the same URL, following the acceptmarkdown.com convention:',
    '',
    '```',
    `curl -s -H "Accept: text/markdown" ${SITE_URL}/work`,
    `curl -s ${SITE_URL}/work.md`,
    '```',
    '',
    'Responses set `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept, Accept-Encoding`. An `Accept` header that rules out both `text/html` and `text/markdown` gets a `406 Not Acceptable`. Quality values are honoured, so `Accept: text/markdown;q=0.5, text/html;q=0.9` returns HTML.',
    '',
    '## Markdown URLs',
    '',
    ...PAGES.map((page) => `- \`${routeToMarkdownPath(page.route)}\` - ${page.title}`),
    '',
    '## Profile API',
    '',
    `\`GET ${SITE_URL}/api/profile\` returns JSON with \`person\`, \`experience\`, \`education\`, \`projects\`, \`appearances\`, \`videos\`, \`pages\`, and \`resources\`. It needs no authentication, no API key, and has no rate limit beyond ordinary hosting limits. It is described by \`${SITE_URL}/openapi.json\` (OpenAPI 3.1).`,
    '',
    siteNavSection(),
    docFooter('/agents'),
  );
  return lines.join('\n');
}

/**
 * Build the Markdown representation of a route.
 *
 * @param {string} route canonical route, e.g. '/' or '/work'
 * @param {{ posts?: { title: string, description: string, publishedLabel?: string, postUrl: string }[] }} [options]
 * @returns {{ route: string, title: string, markdown: string } | null}
 */
export function buildMarkdownDoc(route, options = {}) {
  const canonical = ROUTE_ALIASES[route] ?? route;
  const page = getPage(canonical);
  if (!page) return null;

  /** @type {Record<string, () => string>} */
  const renderers = {
    '/': renderHome,
    '/work': renderWork,
    '/stuff/coding-explorations': renderProjects,
    '/stuff/in-the-wild': renderInTheWild,
    '/stuff/blog': () => renderBlog(options.posts ?? []),
    '/behind-the-scenes': renderBehindTheScenes,
    '/agents': renderAgents,
  };

  const render = renderers[canonical];
  if (!render) return null;

  return { route: canonical, title: page.title, markdown: render() };
}
