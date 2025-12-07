'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(10px)',
    y: 12
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(6px)',
    y: -8
  }
};

const pageTransition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1], // Apple-like ease curve
  opacity: { duration: 0.3, ease: 'easeOut' },
  filter: { duration: 0.35 },
  scale: { duration: 0.4 },
  y: { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={pageTransition}
        style={{
          width: '100%',
          height: '100%',
          willChange: 'opacity, transform, filter'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
