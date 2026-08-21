import { HOME_SUMMARY_PARAGRAPHS } from '@/content/agentDocs.mjs';
import { AGENT_RESOURCES, PAGES, absoluteUrl } from '@/utils/site.mjs';
import styles from './AgentSummary.module.css';

/**
 * Server-rendered summary of the site.
 *
 * The prose block is available to screen readers and to crawlers that never run
 * JavaScript. The <noscript> block is the no-JS navigation: it only renders for
 * clients without scripting, so it adds no tab stops for keyboard users.
 */
export default function AgentSummary() {
  return (
    <>
      <section className={styles.summary} aria-label="About Nitin Murali">
        <h2>Nitin Murali - AI product engineer and product manager in Chicago, Illinois</h2>
        {HOME_SUMMARY_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </section>

      <noscript>
        <nav aria-label="All pages on this site">
          <h2>Pages on this site</h2>
          <ul>
            {PAGES.map((page) => (
              <li key={page.route}>
                <a href={absoluteUrl(page.route)}>{page.title}</a>: {page.description}
              </li>
            ))}
          </ul>
          <h2>Machine-readable versions of this site</h2>
          <ul>
            {AGENT_RESOURCES.map((resource) => (
              <li key={resource.path}>
                <a href={absoluteUrl(resource.path)}>{resource.title}</a>: {resource.description}
              </li>
            ))}
          </ul>
        </nav>
      </noscript>
    </>
  );
}
