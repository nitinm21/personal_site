'use client';

import { motion } from 'framer-motion';
import { BLOG_POSTS } from './posts';
import styles from './page.module.css';

export default function BlogPage() {
  return (
    <div className={styles.container}>
      <motion.section
        className={styles.intro}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className={styles.eyebrow}>Stuff / Blog</p>
        <h1 className={styles.heading}>Writing archive</h1>
        <p className={styles.subheading}>
          The latest posts from my Substack, focused on product thinking, strategy, and building.
        </p>
      </motion.section>

      <ul className={styles.list} aria-label="Blog posts">
        {BLOG_POSTS.map((post, index) => (
          <motion.li
            key={post.id}
            className={styles.listItem}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className={styles.article}>
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`Read "${post.title}" on Substack`}
              >
                <div className={styles.copy}>
                  <time className={styles.date} dateTime={post.publishedAt}>
                    {post.publishedLabel}
                  </time>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.description}>{post.description}</p>
                  <span className={styles.cta}>
                    Read on Substack
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {post.openGraphImage ? (
                  <div className={styles.media}>
                    <img
                      src={post.openGraphImage}
                      alt={`Cover image for ${post.title}`}
                      loading="lazy"
                      className={styles.image}
                    />
                  </div>
                ) : null}
              </a>
            </article>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
