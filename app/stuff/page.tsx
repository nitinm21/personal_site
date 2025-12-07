'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function Stuff() {
  const kalshiWrappedUrl = 'https://nitinm21.github.io/kalshi-wrapped/';

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className={styles.header}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Kalshi Wrapped</h2>
            <p className={styles.subtitle}>
              A cinematic, mobile-first year-in-review experience for Kalshi traders, inspired by Spotify Wrapped.
            </p>
          </div>
          <a
            href={kalshiWrappedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.openButton}
            aria-label="Open Kalshi Wrapped in new tab"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        <motion.div
          className={styles.iframeContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <iframe
            src={kalshiWrappedUrl}
            className={styles.iframe}
            title="Kalshi Wrapped"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
