'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Navigation.module.css';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/stuff', label: 'Stuff' },
  { href: '/work', label: 'Work' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.container}>
        <div className={styles.pills}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={styles.linkWrapper}>
                <motion.div
                  className={`${styles.pill} ${isActive ? styles.active : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      className={styles.activeBg}
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={styles.label}>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
