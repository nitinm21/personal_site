'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Nitin Murali
        </motion.h1>

        <motion.p
          className={styles.bio}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI Product Manager at GoodPower. Started my career as a Software Engineer. <nav></nav>Build projects with coding agents all day.
        </motion.p>

        <motion.div
          className={styles.ctaWrap}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/stuff/coding-explorations" className={styles.cta}>
            <span>See my projects</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </div>
  );
}
