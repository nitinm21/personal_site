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

          <motion.div
            className={styles.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleContainer}>
                <h3 className={styles.itemTitle}>
                  Phone call with Steve Jobs at the Elastic User Group |{' '}
                  <a
                    href="https://youtu.be/wmOfrbRLl-k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    Video
                  </a>
                </h3>
                <p className={styles.itemSubtitle}>
                  Demoed an AI-powered phone call with Steve Jobs using Elasticsearch at the{' '}
                  <a
                    href="https://www.meetup.com/elastic-chicago-user-group/events/305542818/?eventOrigin=group_events_list"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    Chicago Elastic User Group
                  </a>
                  .
                </p>
              </div>
              <a
                href="https://www.linkedin.com/posts/activity-7308580318423261186-cgaR"
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
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a
                href="https://www.linkedin.com/posts/activity-7308580318423261186-cgaR"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
                aria-label="View on LinkedIn"
              >
                <img
                  src="/elastic-talk.jpeg"
                  alt="Phone call with Steve Jobs at the Elastic User Group"
                  className={styles.image}
                />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fireside chats moderated</h2>

          <motion.div
            className={styles.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleContainer}>
                <h3 className={styles.itemTitle}>
                  AI Masterclass with{' '}
                  <a
                    href="https://www.linkedin.com/in/davidgiard"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    David Giard
                  </a>
                  , Partner Solution Architect, Microsoft
                </h3>
              </div>
              <a
                href="https://www.linkedin.com/posts/activity-7182502375469801472-4cW7"
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
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <a
                href="https://www.linkedin.com/posts/activity-7182502375469801472-4cW7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
                aria-label="View on LinkedIn"
              >
                <img
                  src="/david-giard.jpeg"
                  alt="AI Masterclass with David Giard, Partner Solution Architect, Microsoft"
                  className={styles.image}
                />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleContainer}>
                <h3 className={styles.itemTitle}>
                  Future of AI and CS with{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Lance_Fortnow"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    Dr. Lance Fortnow
                  </a>
                  , Dean, Illinois Institute of Technology |{' '}
                  <a
                    href="https://youtu.be/g5mt8R6-v4E"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    Video
                  </a>
                </h3>
              </div>
              <a
                href="https://www.linkedin.com/posts/activity-7242289458736218112-bAZ5"
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
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <a
                href="https://www.linkedin.com/posts/activity-7242289458736218112-bAZ5"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
                aria-label="View on LinkedIn"
              >
                <img
                  src="/lance_event.jpeg"
                  alt="Future of AI and CS with Dr. Lance Fortnow, Dean, Illinois Institute of Technology"
                  className={styles.image}
                />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleContainer}>
                <h3 className={styles.itemTitle}>
                  WTF is Product Management with{' '}
                  <a
                    href="https://www.linkedin.com/in/kauvii543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    Avinash Ravi
                  </a>
                  , Lead Product Manager, AT&T |{' '}
                  <a
                    href="https://youtu.be/3GvX8vYWGrM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    Video
                  </a>
                </h3>
              </div>
              <a
                href="https://www.linkedin.com/posts/activity-7244116588604391424-CLXp"
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
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <a
                href="https://www.linkedin.com/posts/activity-7244116588604391424-CLXp"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
                aria-label="View on LinkedIn"
              >
                <img
                  src="/avinash_ravi.jpeg"
                  alt="WTF is Product Management with Avinash Ravi, Lead Product Manager, AT&T"
                  className={styles.image}
                />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleContainer}>
                <h3 className={styles.itemTitle}>
                  Fundamentals of Product Management with the Grabackis (
                  <a
                    href="https://www.linkedin.com/in/timgrabacki"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    Tim
                  </a>
                  {' '}and{' '}
                  <a
                    href="https://linkedin.com/in/silvia-grabacki-57381b62"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'underline' }}
                  >
                    Silvia
                  </a>
                  ), Ex-Directors, Motorola Solutions |{' '}
                  <a
                    href="https://youtu.be/QEdhMC7K-Ak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    Video
                  </a>
                </h3>
              </div>
              <a
                href="https://www.linkedin.com/posts/activity-7295477709860655104-krFr"
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
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <a
                href="https://www.linkedin.com/posts/activity-7295477709860655104-krFr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageLink}
                aria-label="View on LinkedIn"
              >
                <img
                  src="/tim_event.jpeg"
                  alt="Fundamentals of Product Management with the Grabackis (Tim and Silvia), Ex-Directors, Motorola Solutions"
                  className={styles.image}
                />
              </a>
            </motion.div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
