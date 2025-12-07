'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function Stuff() {
  const kalshiWrappedUrl = 'https://nitinm21.github.io/kalshi-wrapped/';
  const exaSerpApiUrl = 'https://exa-jusn.onrender.com/';
  const langchainUrl = 'https://github.com/nitinm21/langchain1';

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Kalshi Wrapped Project */}
        <motion.div
          className={styles.projectSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.header}>
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
          </div>

          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a
              href={kalshiWrappedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageLink}
              aria-label="View Kalshi Wrapped"
            >
              <img
                src="/kalshi-wrapped-preview.png"
                alt="Kalshi Wrapped Preview"
                className={styles.image}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Exa v/s SerpAPI Project */}
        <motion.div
          className={styles.projectSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>Exa v/s SerpAPI</h2>
              <p className={styles.subtitle}>
                Interactive playground to compare Exa's APIs and traditional search APIs
              </p>
            </div>
            <a
              href={exaSerpApiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openButton}
              aria-label="Open Exa v/s SerpAPI in new tab"
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
          </div>

          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a
              href={exaSerpApiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageLink}
              aria-label="View Exa v/s SerpAPI"
            >
              <img
                src="/exa-serpapi-preview.png"
                alt="Exa v/s SerpAPI Preview"
                className={styles.image}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* LangChain Project */}
        <motion.div
          className={styles.projectSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>Talk to the OGs with LangChain</h2>
              <p className={styles.subtitle}>
                Talk to Steve Jobs, Kobe Bryant and Marcus Aurelius — at once.
              </p>
            </div>
            <a
              href={langchainUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openButton}
              aria-label="Open LangChain project in new tab"
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
          </div>

          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a
              href={langchainUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageLink}
              aria-label="View LangChain project"
            >
              <img
                src="/langchain_project.png"
                alt="Talk to the OGs with LangChain Preview"
                className={styles.image}
              />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
