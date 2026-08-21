import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isMarkdownPath,
  isNegotiablePath,
  markdownPathToRoute,
  markdownRewritePath,
  normalizeRoute,
  routeToMarkdownPath,
  slugToRoute,
} from '../utils/agentPaths.mjs';
import { PAGE_ROUTES } from '../utils/site.mjs';

test('normalizes trailing slashes', () => {
  assert.equal(normalizeRoute('/'), '/');
  assert.equal(normalizeRoute(''), '/');
  assert.equal(normalizeRoute('/work/'), '/work');
  assert.equal(normalizeRoute('/stuff/blog//'), '/stuff/blog');
});

test('negotiates HTML pages only', () => {
  assert.equal(isNegotiablePath('/'), true);
  assert.equal(isNegotiablePath('/work'), true);
  assert.equal(isNegotiablePath('/stuff/coding-explorations'), true);
  assert.equal(isNegotiablePath('/nope'), true);
});

test('leaves assets, API routes, and Next internals alone', () => {
  for (const path of [
    '/robots.txt',
    '/llms.txt',
    '/sitemap.xml',
    '/openapi.json',
    '/favicon.ico',
    '/site.webmanifest',
    '/jwst_reveal_image.jpg',
    '/_next/static/chunks/main.js',
    '/_vercel/insights/view',
    '/api/profile',
    '/api/markdown/work',
    '/.well-known/security.txt',
  ]) {
    assert.equal(isNegotiablePath(path), false, path);
  }
});

test('.md paths are always negotiable and map back to their route', () => {
  assert.equal(isMarkdownPath('/index.md'), true);
  assert.equal(isMarkdownPath('/work'), false);
  assert.equal(isNegotiablePath('/work.md'), true);

  assert.equal(markdownPathToRoute('/index.md'), '/');
  assert.equal(markdownPathToRoute('/.md'), '/');
  assert.equal(markdownPathToRoute('/work.md'), '/work');
  assert.equal(markdownPathToRoute('/stuff/blog.md'), '/stuff/blog');
  assert.equal(markdownPathToRoute('/stuff/index.md'), '/stuff');
  assert.equal(markdownPathToRoute('/work'), '/work');
});

test('every page has a markdown twin that round-trips', () => {
  for (const route of PAGE_ROUTES) {
    const mdPath = routeToMarkdownPath(route);
    assert.ok(mdPath.endsWith('.md'), `${route} -> ${mdPath}`);
    assert.equal(markdownPathToRoute(mdPath), route);
  }
  assert.equal(routeToMarkdownPath('/'), '/index.md');
  assert.equal(routeToMarkdownPath('/work'), '/work.md');
});

test('rewrite targets land inside the markdown route handler', () => {
  assert.equal(markdownRewritePath('/'), '/api/markdown');
  assert.equal(markdownRewritePath('/work'), '/api/markdown/work');
  assert.equal(markdownRewritePath('/stuff/blog'), '/api/markdown/stuff/blog');
});

test('the catch-all slug maps back to a canonical route', () => {
  assert.equal(slugToRoute(undefined), '/');
  assert.equal(slugToRoute([]), '/');
  assert.equal(slugToRoute(['work']), '/work');
  assert.equal(slugToRoute(['stuff', 'blog']), '/stuff/blog');
  assert.equal(slugToRoute(['index.md']), '/');
});
