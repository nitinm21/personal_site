'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useViewMode } from '@/contexts/ViewModeContext';
import styles from './Navigation.module.css';

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
  const isStuffPage = pathname.startsWith('/stuff/');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { viewMode, setViewMode } = useViewMode();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStuffOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setStuffOpen(false);
  }, [pathname]);

  const handleStuffClick = () => {
    setStuffOpen((prev) => !prev);
  };

  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
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
            ref={dropdownRef}
            className={styles.dropdownContainer}
            onMouseEnter={() => setStuffOpen(true)}
            onMouseLeave={() => setStuffOpen(false)}
          >
            <motion.div
              className={`${styles.pill} ${isStuffActive ? styles.active : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStuffClick}
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

          {/* View Toggle - only on /stuff/* pages */}
          <AnimatePresence>
            {isStuffPage && (
              <motion.div
                className={styles.viewToggleSection}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className={styles.divider} />
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewIcon} ${viewMode === 'list' ? styles.viewIconActive : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                    data-tooltip="List View"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    className={`${styles.viewIcon} ${viewMode === 'coverflow' ? styles.viewIconActive : ''}`}
                    onClick={() => setViewMode('coverflow')}
                    aria-label="Cover Flow View"
                    data-tooltip="Cover Flow View"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="10" y="5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="rgba(0,0,0,0.15)" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
