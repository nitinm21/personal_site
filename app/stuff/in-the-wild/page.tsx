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
        <h1 className={styles.title}>In the wild</h1>
        <p className={styles.subtitle}>Coming soon...</p>
      </motion.div>
    </div>
  );
}
