'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './page.module.css';
import { BLOG_POSTS } from './posts';

export default function BlogPage() {
  const reduceMotion = useReducedMotion();

  const introTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.4, 0, 0.2, 1] };

  return (
    <div className={styles.container}>
      <motion.section
        className={styles.intro}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={introTransition}
      >
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.45,
                    delay: Math.min(0.12 + index * 0.06, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            <article className={styles.article}>
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`Open blog post: ${post.title}`}
              >
                <div className={styles.copy}>
                  <time className={styles.date} dateTime={post.publishedAt}>
                    {post.publishedLabel}
                  </time>
                  <h2 className={styles.title}>
                    <span className={styles.titleText}>{post.title}</span>
                  </h2>
                  <p className={styles.description}>{post.description}</p>
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
