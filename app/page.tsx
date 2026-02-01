'use client';

import { motion } from 'framer-motion';
import SocialLinks from '@/components/SocialLinks';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles.content} ${styles.holographicCard}`}
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
