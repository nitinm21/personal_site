import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildProfilePayload } from '../content/apiProfile.mjs';
import { buildOpenApiDocument } from '../content/openapi.mjs';
import { buildHomeJsonLd } from '../content/structuredData.mjs';
import { APPEARANCES, EXPERIENCE, PERSON, PROJECTS } from '../content/profile.mjs';
import { AGENT_RESOURCES, PAGES, SITE_URL, SOCIAL_PROFILES } from '../utils/site.mjs';

test('the profile payload mirrors the page data', () => {
  const profile = buildProfilePayload();
  assert.equal(profile.person.name, PERSON.name);
  assert.equal(profile.experience.length, EXPERIENCE.length);
  assert.equal(profile.projects.length, PROJECTS.length);
  assert.equal(profile.appearances.length, APPEARANCES.length);
  assert.equal(profile.pages.length, PAGES.length);
  assert.equal(profile.resources.length, AGENT_RESOURCES.length);

  for (const page of profile.pages) {
    assert.ok(page.htmlUrl.startsWith(SITE_URL), page.htmlUrl);
    assert.ok(page.markdownUrl.endsWith('.md'), page.markdownUrl);
  }
  assert.ok(JSON.stringify(profile).indexOf('undefined') === -1);
});

test('the profile payload is JSON-serialisable and self-describing', () => {
  const profile = JSON.parse(JSON.stringify(buildProfilePayload()));
  for (const key of [
    'version',
    'site',
    'person',
    'experience',
    'education',
    'projects',
    'appearances',
    'videos',
    'pages',
    'resources',
  ]) {
    assert.ok(key in profile, `missing key ${key}`);
  }
});

test('the OpenAPI document describes every documented resource', () => {
  const spec = buildOpenApiDocument();
  assert.equal(spec.openapi, '3.1.0');
  assert.ok(spec.info.title.includes('Nitin Murali'));
  assert.deepEqual(spec.servers, [{ url: SITE_URL, description: 'Production' }]);

  for (const path of ['/api/profile', '/{page}.md', '/{page}', '/llms.txt', '/sitemap.xml']) {
    assert.ok(spec.paths[path], `missing path ${path}`);
  }

  // Every $ref resolves inside components/schemas.
  const refs = [...JSON.stringify(spec).matchAll(/"\$ref":"#\/components\/schemas\/(\w+)"/g)].map(
    (match) => match[1],
  );
  assert.ok(refs.length > 0);
  for (const ref of refs) {
    assert.ok(spec.components.schemas[ref], `unresolved $ref ${ref}`);
  }

  // Every operation has a unique operationId and at least one response.
  const ids = new Set();
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(item)) {
      assert.ok(operation.operationId, `${method} ${path} has no operationId`);
      assert.ok(!ids.has(operation.operationId), `duplicate operationId ${operation.operationId}`);
      ids.add(operation.operationId);
      assert.ok(Object.keys(operation.responses ?? {}).length > 0, `${method} ${path}`);
    }
  }
});

test('the JSON-LD graph resolves the person as the site entity', () => {
  const graph = buildHomeJsonLd();
  assert.equal(graph['@context'], 'https://schema.org');

  const types = graph['@graph'].map((node) => node['@type']);
  assert.deepEqual(types, ['Person', 'WebSite', 'ProfilePage']);

  const [person, website, profilePage] = graph['@graph'];
  assert.equal(person.name, PERSON.name);
  assert.deepEqual(
    person.sameAs,
    SOCIAL_PROFILES.map((profile) => profile.url),
  );
  assert.equal(website.about['@id'], person['@id']);
  assert.equal(profilePage.mainEntity['@id'], person['@id']);
  assert.equal(profilePage.isPartOf['@id'], website['@id']);
});

test('llms.txt advertises the developer resources', async () => {
  const llms = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8');
  assert.match(llms, /^# Nitin Murali/);
  for (const needle of [
    '/agents',
    '/api/profile',
    '/openapi.json',
    '/sitemap.xml',
    '/robots.txt',
    'Accept: text/markdown',
    'acceptmarkdown.com',
  ]) {
    assert.ok(llms.includes(needle), `llms.txt is missing ${needle}`);
  }
});

test('llms-full.txt lists every page and every markdown twin', async () => {
  const full = await readFile(new URL('../public/llms-full.txt', import.meta.url), 'utf8');
  for (const page of PAGES) {
    assert.ok(full.includes(page.route), `llms-full.txt is missing ${page.route}`);
  }
  for (const needle of ['/index.md', '/work.md', '/openapi.json', '/api/profile', '406']) {
    assert.ok(full.includes(needle), `llms-full.txt is missing ${needle}`);
  }
});
