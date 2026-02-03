'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const baseEase = [0.22, 0.61, 0.36, 1];
const snapEase = [0.16, 1, 0.3, 1];

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const shellVariants = reduceMotion
    ? {
        initial: { opacity: 1 },
        enter: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0 },
        enter: {
          opacity: 1,
          transition: { duration: 0.45, ease: baseEase },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
        },
      };

  const contentVariants = reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 14, scale: 0.995 },
        enter: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: snapEase,
            delay: 0.12,
          },
        },
        exit: {
          opacity: 0,
          y: -8,
          scale: 0.995,
          transition: { duration: 0.3, ease: baseEase },
        },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="page-transition"
        variants={shellVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{
          width: '100%',
          minHeight: '100%',
          willChange: 'opacity',
        }}
      >
        <motion.div
          className="page-transition__content"
          variants={contentVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          style={{
            width: '100%',
            height: '100%',
            willChange: 'opacity, transform',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
