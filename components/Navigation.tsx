'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './Navigation.module.css';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
];

const stuffSubItems = [
  { href: '/stuff/coding-explorations', label: 'Coding explorations' },
  { href: '/stuff/in-the-wild', label: 'In the wild' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [stuffOpen, setStuffOpen] = useState(false);
  const isStuffActive = pathname.startsWith('/stuff');

  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.container}>
        <div className={styles.pills}>
          {/* Home */}
          <Link href="/" className={styles.linkWrapper}>
            <motion.div
              className={`${styles.pill} ${pathname === '/' ? styles.active : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {pathname === '/' && (
                <motion.div
                  className={styles.activeBg}
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={styles.label}>Home</span>
            </motion.div>
          </Link>

          {/* Stuff with dropdown */}
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setStuffOpen(true)}
            onMouseLeave={() => setStuffOpen(false)}
          >
            <motion.div
              className={`${styles.pill} ${isStuffActive ? styles.active : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isStuffActive && (
                <motion.div
                  className={styles.activeBg}
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={styles.label}>
                Stuff
                <svg
                  className={`${styles.arrow} ${stuffOpen ? styles.arrowOpen : ''}`}
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4L5 7L8 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.div>

            <AnimatePresence>
              {stuffOpen && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  {stuffSubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.dropdownItem} ${pathname === item.href ? styles.dropdownItemActive : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Work */}
          <Link href="/work" className={styles.linkWrapper}>
            <motion.div
              className={`${styles.pill} ${pathname === '/work' ? styles.active : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {pathname === '/work' && (
                <motion.div
                  className={styles.activeBg}
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={styles.label}>Work</span>
            </motion.div>
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
