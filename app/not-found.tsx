import { NOT_FOUND_MARKDOWN, RECOVERY_LINKS } from '@/content/agentDocs.mjs';
import styles from './not-found.module.css';

/**
 * Rendered with a real HTTP 404 for any path that does not exist.
 *
 * Both audiences get a way out: humans get the link list, agents get the same
 * information as Markdown (inline here, and as the response body when the
 * request negotiates text/markdown).
 */
export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* not-found.tsx cannot export metadata; React hoists these into <head>. */}
      <title>404 - Page not found | Nitin Murali</title>
      <meta name="robots" content="noindex, follow" />
      <div className={styles.card}>
        <p className={styles.status}>HTTP 404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.lede}>
          Nothing lives at this URL on nitinmurali.vercel.app, and nothing was moved away from it.
          Here is everywhere else you can go.
        </p>

        <h2 className={styles.sectionTitle}>Where to look instead</h2>
        <ul className={styles.links}>
          {RECOVERY_LINKS.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <details className={styles.details}>
          <summary className={styles.summary}>Same thing as markdown, for agents</summary>
          <pre className={styles.markdown}>{NOT_FOUND_MARKDOWN}</pre>
        </details>
      </div>
    </div>
  );
}
