'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '@/components/SocialLinks';
import { useSpotlightReveal } from '@/utils/useSpotlightReveal';
import styles from './page.module.css';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useSpotlightReveal(containerRef, cardRef);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.revealLayer} aria-hidden="true" />
      <div className={styles.revealBlocker} aria-hidden="true" />
      <motion.div
        className={`${styles.content} ${styles.holographicCard}`}
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Nitin Murali
        </motion.h1>

        <motion.p
          className={styles.bio}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m passionate about translating complex technology into user delight
          and business value. I&apos;ve held roles as a Product Manager and Software
          Engineer in the past.
        </motion.p>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Best work happens when I&apos;m close to customers, building, and measuring impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </div>
  );
}
