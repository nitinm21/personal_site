import type { Metadata } from 'next';
import Link from 'next/link';
import { PAGES, AGENT_RESOURCES, SITE_URL } from '@/utils/site.mjs';
import { routeToMarkdownPath } from '@/utils/agentPaths.mjs';
import { pageMetadata } from '@/utils/pageMetadata';
import styles from './page.module.css';

export const metadata: Metadata = pageMetadata('/agents');

export default function AgentsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>For agents and developers</p>
        <h1 className={styles.title}>Agent &amp; developer resources — Nitin Murali</h1>
        <p className={styles.lede}>
          Everything on nitinmurali.vercel.app that a program can read, at a URL you can guess.
          No authentication, no API keys, no rate limits beyond ordinary hosting limits. If you are
          an agent evaluating Nitin Murali for a role or a collaboration, start with llms.txt and
          come back here when you need structured data.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Files and endpoints</h2>
          <ul className={styles.list}>
            {AGENT_RESOURCES.map((resource) => (
              <li key={resource.path} className={styles.listItem}>
                <a className={styles.path} href={resource.path}>
                  {resource.path}
                </a>
                <span className={styles.contentType}>{resource.contentType}</span>
                <br />
                {resource.description}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Markdown content negotiation</h2>
          <p className={styles.prose}>
            Every HTML page here has a Markdown representation at the same URL, following the{' '}
            <a
              className={styles.inlineLink}
              href="https://acceptmarkdown.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              acceptmarkdown.com
            </a>{' '}
            convention. Ask for it with an <code>Accept</code> header, or append{' '}
            <code>.md</code> to the path if your client cannot set headers.
          </p>
          <pre className={styles.code}>
            {`curl -s -H "Accept: text/markdown" ${SITE_URL}/work\ncurl -s ${SITE_URL}/work.md`}
          </pre>
          <p className={styles.prose}>
            Markdown responses set <code>Content-Type: text/markdown; charset=utf-8</code> and{' '}
            <code>Vary: Accept, Accept-Encoding</code>, so a CDN can never hand an agent the HTML
            variant or a browser the Markdown one. Quality values are honoured, so{' '}
            <code>Accept: text/markdown;q=0.5, text/html;q=0.9</code> returns HTML. An{' '}
            <code>Accept</code> header that rules out both representations gets a{' '}
            <code>406 Not Acceptable</code>. A path that does not exist returns a real{' '}
            <code>404</code> whose body is a Markdown recovery guide.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Markdown URL for every page</h2>
          <ul className={styles.list}>
            {PAGES.map((sitePage) => (
              <li key={sitePage.route} className={styles.listItem}>
                <a className={styles.path} href={routeToMarkdownPath(sitePage.route)}>
                  {routeToMarkdownPath(sitePage.route)}
                </a>
                <br />
                {sitePage.title} — also at{' '}
                <Link className={styles.inlineLink} href={sitePage.route}>
                  {sitePage.route}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile API</h2>
          <p className={styles.prose}>
            <code>GET /api/profile</code> returns one JSON document with the whole site as data:{' '}
            <code>person</code>, <code>experience</code>, <code>education</code>,{' '}
            <code>projects</code>, <code>appearances</code>, <code>videos</code>, a{' '}
            <code>pages</code> index with both the HTML and Markdown URL of every page, and a{' '}
            <code>resources</code> index of the files on this page.
          </p>
          <pre className={styles.code}>
            {`curl -s ${SITE_URL}/api/profile | jq '.person'\ncurl -s ${SITE_URL}/openapi.json | jq '.paths | keys'`}
          </pre>
          <p className={styles.prose}>
            The API is described by an OpenAPI 3.1 document at{' '}
            <a className={styles.path} href="/openapi.json">
              /openapi.json
            </a>
            , which also documents the Markdown endpoints and the static discovery files.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Crawling policy</h2>
          <p className={styles.prose}>
            Every crawler is allowed, AI crawlers included — see{' '}
            <a className={styles.path} href="/robots.txt">
              /robots.txt
            </a>
            . Please attribute quotes to nitinmurali.vercel.app and link back to the page you took
            them from. Agent traffic to this site is counted in aggregate (path, user agent, and a
            salted hash of the IP) to see which pages agents actually read; nothing is sold and
            nothing personal is stored.
          </p>
        </section>
      </div>
    </div>
  );
}
