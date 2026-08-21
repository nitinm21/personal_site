import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOME_SUMMARY_PARAGRAPHS,
  MARKDOWN_ROUTES,
  NOT_FOUND_MARKDOWN,
  RECOVERY_LINKS,
  buildMarkdownDoc,
  renderNotFoundMarkdown,
} from '../content/agentDocs.mjs';
import { PAGES, PAGE_ROUTES, ROUTE_ALIASES, SITE_URL, absoluteUrl } from '../utils/site.mjs';
import { routeToMarkdownPath } from '../utils/agentPaths.mjs';

test('every registered page has a markdown representation', () => {
  assert.deepEqual(MARKDOWN_ROUTES, PAGE_ROUTES);

  for (const route of PAGE_ROUTES) {
    const doc = buildMarkdownDoc(route);
    assert.ok(doc, `no markdown doc for ${route}`);
    assert.equal(doc.route, route);
    assert.match(doc.markdown, /^# \S/, `${route} must start with an H1`);
    assert.ok(doc.markdown.length > 500, `${route} markdown is only ${doc.markdown.length} chars`);
  }
});

test('markdown docs advertise their canonical and markdown URLs', () => {
  for (const route of PAGE_ROUTES) {
    const { markdown } = buildMarkdownDoc(route);
    assert.ok(
      markdown.includes(`Canonical URL: ${absoluteUrl(route)}`),
      `${route} is missing its canonical URL`,
    );
    assert.ok(
      markdown.includes(`Markdown URL: ${SITE_URL}${routeToMarkdownPath(route)}`),
      `${route} is missing its markdown URL`,
    );
  }
});

test('markdown docs contain no unresolved template placeholders', () => {
  for (const route of PAGE_ROUTES) {
    const { markdown } = buildMarkdownDoc(route);
    assert.doesNotMatch(markdown, /undefined|\[object Object\]|\$\{/, route);
  }
});

test('route aliases resolve to their canonical page', () => {
  for (const [alias, canonical] of Object.entries(ROUTE_ALIASES)) {
    const doc = buildMarkdownDoc(alias);
    assert.ok(doc, `alias ${alias} did not resolve`);
    assert.equal(doc.route, canonical);
  }
});

test('unknown routes have no markdown doc', () => {
  assert.equal(buildMarkdownDoc('/does-not-exist'), null);
  assert.equal(buildMarkdownDoc('/work/extra'), null);
});

test('the blog doc mirrors the posts it is given', () => {
  const posts = [
    {
      title: 'A post title',
      description: 'A post description',
      publishedLabel: 'Jan 1, 2026',
      postUrl: 'https://nitinmurali.substack.com/p/a-post',
    },
  ];
  const withPosts = buildMarkdownDoc('/stuff/blog', { posts }).markdown;
  assert.ok(withPosts.includes('A post title'));
  assert.ok(withPosts.includes('https://nitinmurali.substack.com/p/a-post'));
  assert.ok(withPosts.includes('(Jan 1, 2026)'));

  // With no posts it still points at the archive rather than rendering nothing.
  const withoutPosts = buildMarkdownDoc('/stuff/blog').markdown;
  assert.ok(withoutPosts.includes('nitinmurali.substack.com'));
});

test('the homepage summary carries enough prose for a JS-less crawler', () => {
  const text = HOME_SUMMARY_PARAGRAPHS.join(' ');
  assert.ok(HOME_SUMMARY_PARAGRAPHS.length >= 3);
  assert.ok(text.length > 500, `summary is only ${text.length} chars`);
  assert.ok(text.includes('Nitin Murali'));
  assert.ok(text.includes('Chicago'));
});

test('the 404 body points agents back at the discovery files', () => {
  for (const body of [NOT_FOUND_MARKDOWN, renderNotFoundMarkdown('/missing')]) {
    assert.match(body, /^# 404 - Page not found/);
    assert.ok(body.includes('/sitemap.xml'));
    assert.ok(body.includes('/llms.txt'));
    assert.ok(body.includes('/llms-full.txt'));
    assert.ok(body.includes('/api/profile'));
    for (const link of RECOVERY_LINKS) {
      assert.ok(body.includes(absoluteUrl(link.href)), `404 body missing ${link.href}`);
    }
  }
  assert.ok(renderNotFoundMarkdown('/missing').includes('/missing'));
});

test('every recovery link points at a real page or published file', () => {
  const known = new Set([
    ...PAGES.map((page) => page.route),
    '/sitemap.xml',
    '/llms.txt',
    '/llms-full.txt',
  ]);
  for (const link of RECOVERY_LINKS) {
    assert.ok(known.has(link.href), `${link.href} is not a known destination`);
  }
});
