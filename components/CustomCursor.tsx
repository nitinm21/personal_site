'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const interactiveSelectors = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[data-cursor="interactive"]',
  '[contenteditable="true"]',
].join(',');

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    let rafId: number | null = null;
    let cursorSize = 12;
    let isVisible = false;
    let isInteractive = false;
    let latestX = 0;
    let latestY = 0;

    const updateCursorSize = () => {
      const nextSize = cursor.offsetWidth;
      if (nextSize > 0) {
        cursorSize = nextSize;
      }
    };

    const setVisible = (nextVisible: boolean) => {
      if (nextVisible === isVisible) {
        return;
      }
      cursor.classList.toggle(styles.visible, nextVisible);
      isVisible = nextVisible;
    };

    const setInteractive = (nextInteractive: boolean) => {
      if (nextInteractive === isInteractive) {
        return;
      }
      cursor.classList.toggle(styles.interactive, nextInteractive);
      isInteractive = nextInteractive;
    };

    const updatePosition = () => {
      rafId = null;
      const offset = cursorSize / 2;
      cursor.style.transform = `translate3d(${latestX - offset}px, ${latestY - offset}px, 0)`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (!isVisible) {
        setVisible(true);
      }

      const target = event.target as Element | null;
      setInteractive(Boolean(target && target.closest(interactiveSelectors)));

      if (rafId === null) {
        rafId = window.requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        setVisible(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setVisible(false);
      }
    };

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const startTracking = () => {
      document.body.dataset.customCursor = 'true';
      document.documentElement.dataset.customCursor = 'true';
      document.documentElement.style.setProperty('cursor', 'none', 'important');
      document.body.style.setProperty('cursor', 'none', 'important');
      cursor.style.display = 'block';
      updateCursorSize();
      document.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('mouseout', handleMouseOut);
      window.addEventListener('blur', handleVisibilityChange);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('resize', updateCursorSize);
    };

    const stopTracking = () => {
      document.body.removeAttribute('data-custom-cursor');
      document.documentElement.removeAttribute('data-custom-cursor');
      document.documentElement.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');
      cursor.style.display = 'none';
      setVisible(false);
      setInteractive(false);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', updateCursorSize);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        startTracking();
      } else {
        stopTracking();
      }
    };

    if (mediaQuery.matches) {
      startTracking();
    } else {
      stopTracking();
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMediaChange);
      }
      stopTracking();
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />;
}
