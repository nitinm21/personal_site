/**
 * OpenAPI 3.1 description of every machine-readable endpoint on the site:
 * the profile JSON API, the Markdown representations, and the static
 * agent files. Published at /openapi.json.
 */

import { PAGES, SITE_DESCRIPTION, SITE_NAME, SITE_URL, CONTACT_EMAIL } from '../utils/site.mjs';
import { PROFILE_API_VERSION } from './apiProfile.mjs';

const MARKDOWN_PAGE_SLUGS = PAGES.map((page) =>
  page.route === '/' ? 'index' : page.route.replace(/^\//, ''),
);

function textResponse(description, mediaType) {
  return {
    description,
    content: { [mediaType]: { schema: { type: 'string' } } },
  };
}

/** @returns {object} the OpenAPI document */
export function buildOpenApiDocument() {
  return {
    openapi: '3.1.0',
    info: {
      title: `${SITE_NAME} - portfolio API`,
      version: PROFILE_API_VERSION,
      summary: `Machine-readable endpoints for ${SITE_NAME}'s personal site.`,
      description: [
        `${SITE_DESCRIPTION}`,
        '',
        'No authentication, no API keys, no rate limits beyond ordinary hosting limits.',
        'Every HTML page also has a Markdown representation: send `Accept: text/markdown`,',
        'or append `.md` to the path. Responses set `Vary: Accept, Accept-Encoding`, and an',
        '`Accept` header that rules out both `text/html` and `text/markdown` gets a 406.',
      ].join('\n'),
      contact: { name: SITE_NAME, email: CONTACT_EMAIL, url: `${SITE_URL}/` },
      license: {
        name: 'Content is published for reading and citation; attribute to nitinmurali.vercel.app.',
        identifier: 'CC-BY-4.0',
      },
    },
    servers: [{ url: SITE_URL, description: 'Production' }],
    tags: [
      { name: 'profile', description: 'Structured facts about Nitin Murali.' },
      { name: 'markdown', description: 'Markdown representations of the HTML pages.' },
      { name: 'discovery', description: 'Static files agents look for by convention.' },
    ],
    paths: {
      '/api/profile': {
        get: {
          tags: ['profile'],
          operationId: 'getProfile',
          summary: 'Get the full structured profile',
          description:
            'Roles, education, projects, talks, videos, page index, and machine-readable resource index in one JSON document.',
          responses: {
            200: {
              description: 'The profile document.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } },
            },
          },
        },
      },
      '/{page}.md': {
        get: {
          tags: ['markdown'],
          operationId: 'getPageMarkdown',
          summary: 'Get a page as Markdown',
          description:
            'The Markdown twin of an HTML page. Use `index` for the homepage. Equivalent to requesting the HTML URL with `Accept: text/markdown`.',
          parameters: [
            {
              name: 'page',
              in: 'path',
              required: true,
              description: 'Page path without the leading slash; `index` for the homepage.',
              schema: { type: 'string', enum: MARKDOWN_PAGE_SLUGS },
            },
          ],
          responses: {
            200: textResponse('The page as Markdown.', 'text/markdown'),
            404: textResponse('No such page; the body is a Markdown recovery guide.', 'text/markdown'),
          },
        },
      },
      '/{page}': {
        get: {
          tags: ['markdown'],
          operationId: 'getPageNegotiated',
          summary: 'Get a page as HTML or Markdown by content negotiation',
          parameters: [
            {
              name: 'page',
              in: 'path',
              required: true,
              description: 'Page path without the leading slash; empty string for the homepage.',
              schema: { type: 'string' },
            },
            {
              name: 'Accept',
              in: 'header',
              required: false,
              description:
                '`text/html` (default) or `text/markdown`. Quality values are honoured.',
              schema: { type: 'string', default: 'text/html' },
            },
          ],
          responses: {
            200: {
              description: 'The page in the negotiated representation.',
              content: {
                'text/html': { schema: { type: 'string' } },
                'text/markdown': { schema: { type: 'string' } },
              },
            },
            404: {
              description: 'No such page.',
              content: {
                'text/html': { schema: { type: 'string' } },
                'text/markdown': { schema: { type: 'string' } },
              },
            },
            406: textResponse(
              'The Accept header rules out both text/html and text/markdown.',
              'text/plain',
            ),
          },
        },
      },
      '/llms.txt': {
        get: {
          tags: ['discovery'],
          operationId: 'getLlmsTxt',
          summary: 'Curated llms.txt index',
          responses: { 200: textResponse('The llms.txt index.', 'text/plain') },
        },
      },
      '/llms-full.txt': {
        get: {
          tags: ['discovery'],
          operationId: 'getLlmsFullTxt',
          summary: 'Whole site inlined into one file',
          responses: { 200: textResponse('The full-site context file.', 'text/plain') },
        },
      },
      '/sitemap.xml': {
        get: {
          tags: ['discovery'],
          operationId: 'getSitemap',
          summary: 'Every canonical HTML URL',
          responses: { 200: textResponse('The sitemap.', 'application/xml') },
        },
      },
      '/robots.txt': {
        get: {
          tags: ['discovery'],
          operationId: 'getRobotsTxt',
          summary: 'Crawl policy and sitemap pointer',
          responses: { 200: textResponse('The robots.txt file.', 'text/plain') },
        },
      },
    },
    components: {
      schemas: {
        Profile: {
          type: 'object',
          required: ['version', 'site', 'person', 'experience', 'education', 'projects', 'pages'],
          properties: {
            version: { type: 'string' },
            site: { $ref: '#/components/schemas/Site' },
            person: { $ref: '#/components/schemas/Person' },
            experience: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
            education: { type: 'array', items: { $ref: '#/components/schemas/Education' } },
            projects: { type: 'array', items: { $ref: '#/components/schemas/Project' } },
            appearances: { type: 'array', items: { $ref: '#/components/schemas/Appearance' } },
            videos: { type: 'array', items: { $ref: '#/components/schemas/Video' } },
            pages: { type: 'array', items: { $ref: '#/components/schemas/Page' } },
            resources: { type: 'array', items: { $ref: '#/components/schemas/Resource' } },
          },
        },
        Site: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            description: { type: 'string' },
            language: { type: 'string' },
          },
        },
        Person: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            jobTitle: { type: 'string' },
            employer: { type: 'string' },
            location: { type: 'string' },
            shortBio: { type: 'string' },
            summary: { type: 'string' },
            email: { type: 'string', format: 'email' },
            url: { type: 'string', format: 'uri' },
            sameAs: { type: 'array', items: { type: 'string', format: 'uri' } },
            socialProfiles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  url: { type: 'string', format: 'uri' },
                },
              },
            },
          },
        },
        Role: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            company: { type: 'string' },
            companyUrl: { type: ['string', 'null'], format: 'uri' },
            years: { type: 'string' },
            highlights: { type: 'array', items: { type: 'string' } },
          },
        },
        Education: {
          type: 'object',
          properties: {
            degree: { type: 'string' },
            school: { type: 'string' },
            years: { type: 'string' },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            summary: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            codeUrl: { type: ['string', 'null'], format: 'uri' },
          },
        },
        Appearance: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            summary: { type: 'string' },
            category: { type: 'string', enum: ['speaking', 'fireside'] },
            videoUrl: { type: ['string', 'null'], format: 'uri' },
            linkUrl: { type: ['string', 'null'], format: 'uri' },
          },
        },
        Video: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            summary: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
        },
        Page: {
          type: 'object',
          properties: {
            route: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            htmlUrl: { type: 'string', format: 'uri' },
            markdownUrl: { type: 'string', format: 'uri' },
          },
        },
        Resource: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            contentType: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
        },
      },
    },
  };
}
