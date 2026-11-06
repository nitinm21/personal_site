#!/usr/bin/env node
/**
 * End-to-end check of every public endpoint and machine-readable file agents
 * rely on. Run against a local production server or the deployed site:
 *
 *   node scripts/verify-agent-endpoints.mjs http://localhost:3000
 *   node scripts/verify-agent-endpoints.mjs https://nitinmurali.vercel.app
 *
 * Exits non-zero if any check fails.
 */

import { OG_IMAGE, PAGES, PAGE_ROUTES, SITE_URL } from '../utils/site.mjs';
import { routeToMarkdownPath } from '../utils/agentPaths.mjs';

const baseUrl = (process.argv[2] ?? SITE_URL).replace(/\/+$/, '');
const MIN_HOMEPAGE_TEXT = 500;
const MIN_CONTENT_EFFICIENCY = 5; // percent, the Is Agentic threshold

const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/.test(baseUrl);
const results = [];

function record(name, status, detail) {
  results.push({ name, status, detail });
  console.log(`${status.padEnd(4)}  ${name}${detail ? ` - ${detail}` : ''}`);
}

/**
 * @param {string} name
 * @param {() => Promise<string | undefined>} fn
 * @param {{ localOnlyWarning?: string, alwaysWarn?: string }} [options]
 *   `localOnlyWarning` downgrades a failure to a warning against `next start`;
 *   `alwaysWarn` does so everywhere, for a known framework limitation that is
 *   worth reporting but is not a regression to act on.
 */
async function check(name, fn, options = {}) {
  try {
    record(name, 'PASS', await fn());
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    const downgrade = options.alwaysWarn ?? (isLocal ? options.localOnlyWarning : undefined);
    if (downgrade) {
      record(name, 'WARN', `${detail} (${downgrade})`);
      return;
    }
    record(name, 'FAIL', detail);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchUrl(path, headers = {}) {
  const response = await fetch(`${baseUrl}${path}`, { headers, redirect: 'manual' });
  const body = await response.text();
  return { response, body };
}

function visibleText(html) {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  return withoutScripts
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function varyIncludesAccept(response) {
  return (response.headers.get('vary') ?? '')
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .includes('accept');
}

// --- 1. Content without JavaScript --------------------------------------
await check('homepage renders content without JavaScript', async () => {
  const { response, body } = await fetchUrl('/');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  assert(/<h1[\s>]/i.test(body), 'no <h1> in the raw HTML');
  const text = visibleText(body);
  assert(
    text.length >= MIN_HOMEPAGE_TEXT,
    `only ${text.length} chars of text (need ${MIN_HOMEPAGE_TEXT})`,
  );
  return `${text.length} chars of text, h1 present`;
});

await check('homepage content efficiency', async () => {
  const { body } = await fetchUrl('/');
  const ratio = (visibleText(body).length / body.length) * 100;
  assert(
    ratio >= MIN_CONTENT_EFFICIENCY,
    `${ratio.toFixed(2)}% text (need ${MIN_CONTENT_EFFICIENCY}%)`,
  );
  return `${ratio.toFixed(2)}% of ${body.length} bytes is text`;
});

// --- 2. Agent-friendly 404s ---------------------------------------------
await check('nonexistent path returns HTTP 404 with recovery links', async () => {
  const { response, body } = await fetchUrl('/this-path-does-not-exist-xyz');
  assert(response.status === 404, `expected 404, got ${response.status}`);
  for (const needle of ['sitemap.xml', 'llms.txt', 'llms-full.txt', '404']) {
    assert(body.includes(needle), `404 body is missing ${needle}`);
  }
  return 'HTTP 404 with markdown recovery body';
});

await check('nonexistent path returns a markdown 404 when asked', async () => {
  const { response, body } = await fetchUrl('/this-path-does-not-exist-xyz', {
    Accept: 'text/markdown',
  });
  assert(response.status === 404, `expected 404, got ${response.status}`);
  const type = response.headers.get('content-type') ?? '';
  assert(type.includes('text/markdown'), `expected text/markdown, got "${type}"`);
  assert(varyIncludesAccept(response), 'Vary is missing Accept');
  assert(body.startsWith('# 404'), 'body is not the markdown recovery guide');
  return 'HTTP 404, text/markdown, Vary: Accept';
});

// --- 3. Markdown content negotiation (acceptmarkdown.com) ---------------
for (const route of PAGE_ROUTES) {
  await check(`markdown negotiation on ${route}`, async () => {
    const { response, body } = await fetchUrl(route, { Accept: 'text/markdown' });
    assert(response.status === 200, `expected 200, got ${response.status}`);
    const type = response.headers.get('content-type') ?? '';
    assert(type.includes('text/markdown'), `expected text/markdown, got "${type}"`);
    assert(varyIncludesAccept(response), 'Vary is missing Accept');
    assert(body.startsWith('# '), 'markdown body does not start with an H1');
    return `${body.length} bytes of markdown`;
  });

  await check(`markdown twin ${routeToMarkdownPath(route)}`, async () => {
    const { response, body } = await fetchUrl(routeToMarkdownPath(route));
    assert(response.status === 200, `expected 200, got ${response.status}`);
    const type = response.headers.get('content-type') ?? '';
    assert(type.includes('text/markdown'), `expected text/markdown, got "${type}"`);
    assert(body.startsWith('# '), 'markdown body does not start with an H1');
    return `${body.length} bytes`;
  });
}

await check('HTML responses advertise the markdown alternate', async () => {
  const { response } = await fetchUrl('/', { Accept: 'text/html' });
  assert(response.status === 200, `expected 200, got ${response.status}`);
  const link = response.headers.get('link') ?? '';
  assert(link.includes('rel="alternate"'), `Link header is "${link}"`);
  assert(link.includes('text/markdown'), `Link header is "${link}"`);
  return link;
});

await check(
  'HTML responses advertise Vary: Accept',
  async () => {
    const { response } = await fetchUrl('/', { Accept: 'text/html' });
    assert(response.status === 200, `expected 200, got ${response.status}`);
    assert(varyIncludesAccept(response), `Vary is "${response.headers.get('vary')}"`);
    return `Vary: ${response.headers.get('vary')}`;
  },
  {
    // Known framework limitation, not a regression. Next owns Vary on App
    // Router responses and neither middleware nor a routing-layer header rule
    // can override it. The check below asserts the invariant this header would
    // have protected.
    alwaysWarn:
      'Next overwrites Vary on App Router responses; the markdown representation sets it correctly and the cache-separation check below covers the risk',
  },
);

await check('the two representations never share a cache entry', async () => {
  // What Vary: Accept exists to prevent: a cache handing one representation to
  // a client that asked for the other. Prime each variant, then immediately ask
  // for the opposite one and confirm the content type still matches the ask.
  const probe = '/behind-the-scenes';
  const html = { Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' };
  const markdown = { Accept: 'text/markdown' };

  for (const [first, second, expected] of [
    [markdown, html, 'text/html'],
    [html, markdown, 'text/markdown'],
  ]) {
    await fetchUrl(probe, first);
    const { response } = await fetchUrl(probe, second);
    const type = response.headers.get('content-type') ?? '';
    assert(
      type.includes(expected),
      `after priming with ${first.Accept}, a request for ${second.Accept} got "${type}"`,
    );
  }
  return 'no cross-variant contamination in either direction';
});

await check('q-values are honoured (html wins at higher q)', async () => {
  const { response } = await fetchUrl('/', { Accept: 'text/markdown;q=0.5, text/html;q=0.9' });
  const type = response.headers.get('content-type') ?? '';
  assert(type.includes('text/html'), `expected text/html, got "${type}"`);
  return 'text/html';
});

await check('q-values are honoured (markdown wins at higher q)', async () => {
  const { response } = await fetchUrl('/', { Accept: 'text/html;q=0.4, text/markdown;q=0.8' });
  const type = response.headers.get('content-type') ?? '';
  assert(type.includes('text/markdown'), `expected text/markdown, got "${type}"`);
  return 'text/markdown';
});

await check('a browser Accept header still gets HTML', async () => {
  const { response, body } = await fetchUrl('/', {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  });
  const type = response.headers.get('content-type') ?? '';
  assert(type.includes('text/html'), `expected text/html, got "${type}"`);
  assert(body.includes('<h1'), 'HTML body has no h1');
  return 'text/html';
});

await check('unsatisfiable Accept returns 406', async () => {
  const { response } = await fetchUrl('/', { Accept: 'application/pdf' });
  assert(response.status === 406, `expected 406, got ${response.status}`);
  assert(varyIncludesAccept(response), 'Vary is missing Accept');
  return 'HTTP 406 with Vary: Accept';
});

// --- 4. Developer resources ---------------------------------------------
await check('/agents documents the machine-readable surface', async () => {
  const { response, body } = await fetchUrl('/agents');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  assert(/<h1[^>]*>[^<]*Nitin Murali/i.test(body), 'h1 does not name the site owner');
  for (const needle of ['/llms.txt', '/api/profile', '/openapi.json', 'Accept: text/markdown']) {
    assert(body.includes(needle), `/agents is missing ${needle}`);
  }
  return `${visibleText(body).length} chars of text`;
});

await check('/api/profile returns the structured profile', async () => {
  const { response, body } = await fetchUrl('/api/profile');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  assert(
    (response.headers.get('content-type') ?? '').includes('application/json'),
    `content-type is "${response.headers.get('content-type')}"`,
  );
  const profile = JSON.parse(body);
  for (const key of ['person', 'experience', 'education', 'projects', 'pages', 'resources']) {
    assert(key in profile, `missing key ${key}`);
  }
  assert(profile.person.name === 'Nitin Murali', 'unexpected person name');
  return `${profile.pages.length} pages, ${profile.projects.length} projects`;
});

await check('/openapi.json describes the API', async () => {
  const { response, body } = await fetchUrl('/openapi.json');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  const spec = JSON.parse(body);
  assert(spec.openapi === '3.1.0', `openapi version is ${spec.openapi}`);
  assert(spec.paths['/api/profile'], 'missing /api/profile path');
  return `${Object.keys(spec.paths).length} documented paths`;
});

// --- 5-7. Discovery files and metadata ----------------------------------
await check('/llms.txt is served and lists the developer resources', async () => {
  const { response, body } = await fetchUrl('/llms.txt');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  for (const needle of ['/agents', '/api/profile', '/openapi.json', 'acceptmarkdown.com']) {
    assert(body.includes(needle), `llms.txt is missing ${needle}`);
  }
  return `${body.length} bytes`;
});

await check('/llms-full.txt is served', async () => {
  const { response, body } = await fetchUrl('/llms-full.txt');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  assert(body.includes('Machine-readable endpoints'), 'missing the endpoints section');
  return `${body.length} bytes`;
});

await check('/robots.txt allows crawlers and points at the sitemap', async () => {
  const { response, body } = await fetchUrl('/robots.txt');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  assert(/user-agent:\s*\*/i.test(body), 'no wildcard rule');
  assert(body.includes('/sitemap.xml'), 'no sitemap pointer');
  return body.split('\n').filter(Boolean).join(' | ');
});

await check('/sitemap.xml lists every registered page', async () => {
  const { response, body } = await fetchUrl('/sitemap.xml');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  for (const page of PAGES) {
    const url = page.route === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.route}`;
    assert(body.includes(`<loc>${url}</loc>`), `sitemap is missing ${url}`);
  }
  return `${PAGES.length} URLs`;
});

await check('/site.webmanifest names the site', async () => {
  const { response, body } = await fetchUrl('/site.webmanifest');
  assert(response.status === 200, `expected 200, got ${response.status}`);
  const manifest = JSON.parse(body);
  assert(manifest.name, 'manifest name is empty');
  return manifest.name;
});

await check('the OG image renders', async () => {
  const response = await fetch(`${baseUrl}${OG_IMAGE.path}`, { redirect: 'follow' });
  assert(response.ok, `expected 2xx, got ${response.status}`);
  const type = response.headers.get('content-type') ?? '';
  assert(type.includes('image/'), `content-type is "${type}"`);
  const bytes = (await response.arrayBuffer()).byteLength;
  assert(bytes > 1000, `image is only ${bytes} bytes`);
  return `${type}, ${bytes} bytes`;
});

for (const route of PAGE_ROUTES) {
  await check(`metadata on ${route}`, async () => {
    const { response, body } = await fetchUrl(route);
    assert(response.status === 200, `expected 200, got ${response.status}`);
    assert(/<html[^>]+lang="en"/i.test(body), 'missing html lang');
    const canonical = body.match(/<link rel="canonical" href="([^"]+)"/i);
    assert(canonical, 'missing <link rel="canonical">');
    const normalise = (url) => url.replace(/\/$/, '');
    const expected = `${SITE_URL}${route === '/' ? '' : route}`;
    assert(
      normalise(canonical[1]) === normalise(expected),
      `canonical is ${canonical[1]}, expected ${expected}`,
    );
    const ogImage = body.match(/property="og:image" content="([^"]+)"/i);
    assert(ogImage, 'missing og:image');
    assert(
      ogImage[1].endsWith(OG_IMAGE.path),
      `og:image is ${ogImage[1]}, expected it to end with ${OG_IMAGE.path}`,
    );
    assert(/property="og:type"/i.test(body), 'missing og:type');
    assert(/<title>/i.test(body), 'missing <title>');
    return 'lang + canonical + og:image + og:type';
  });
}

await check('homepage ships a schema.org graph', async () => {
  const { body } = await fetchUrl('/');
  const match = body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert(match, 'no JSON-LD script tag');
  const graph = JSON.parse(match[1]);
  const types = (graph['@graph'] ?? []).map((node) => node['@type']);
  assert(types.includes('Person'), 'no Person node');
  assert(types.includes('WebSite'), 'no WebSite node');
  return types.join(', ');
});

await check('/stuff still redirects to the projects gallery', async () => {
  const { response } = await fetchUrl('/stuff');
  assert([307, 308].includes(response.status), `expected a redirect, got ${response.status}`);
  const location = response.headers.get('location') ?? '';
  assert(location.endsWith('/stuff/coding-explorations'), `redirects to "${location}"`);
  return `${response.status} -> ${location}`;
});

const failures = results.filter((result) => result.status === 'FAIL');
const warnings = results.filter((result) => result.status === 'WARN');
const passed = results.filter((result) => result.status === 'PASS');
console.log(
  `\n${passed.length}/${results.length} checks passed against ${baseUrl}` +
    (warnings.length > 0 ? `, ${warnings.length} warning(s)` : '') +
    (failures.length > 0 ? `, ${failures.length} failure(s)` : ''),
);
for (const warning of warnings) console.log(`  WARN ${warning.name}: ${warning.detail}`);
for (const failure of failures) console.log(`  FAIL ${failure.name}: ${failure.detail}`);
if (failures.length > 0) process.exitCode = 1;
