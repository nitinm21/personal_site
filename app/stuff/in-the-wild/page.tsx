'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function InTheWild() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Public speaking</h2>

          <motion.div
            className={styles.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleContainer}>
                <h3 className={styles.itemTitle}>
                  HawkBot Presentation - Techqueria 2024 |{' '}
                  <a
                    href="https://youtu.be/UWDaI6g_cp8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    Video
                  </a>
                </h3>
                <p className={styles.itemSubtitle}>
                  Demoed and presented the story of building the{' '}
                  <a
                    href="https://www.iit.edu/coursera"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    HawkBot
                  </a>{' '}
                  for my university (Illinois Institute of Technology).
                </p>
              </div>
              <a
                href="https://www.linkedin.com/posts/activity-7251626565594173444-kSYt"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openButton}
                aria-label="Open LinkedIn post in new tab"
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
                href="https://www.linkedin.com/posts/activity-7251626565594173444-kSYt"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
                aria-label="View on LinkedIn"
              >
                <img
                  src="/hawkbot-presentation.jpg"
                  alt="HawkBot Presentation at Techqueria 2024"
                  className={styles.image}
                />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fireside chats moderated</h2>
          <div className={styles.itemsList}>
            <p className={styles.placeholder}>Coming soon...</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
