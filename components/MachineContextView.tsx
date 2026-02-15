'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './MachineContextView.module.css';

type LoadStatus = 'loading' | 'success' | 'error';
const SIGNAL_EFFECT_DURATION_MS = 620;
const SIGNAL_EFFECT_REDUCED_DURATION_MS = 220;

export default function MachineContextView() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignalEffect, setShowSignalEffect] = useState(true);

  const loadContext = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/SITE_AGENT_CONTEXT.md', {
        signal: controller.signal,
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const markdown = await response.text();
      setContent(markdown);
      setStatus('success');
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      const message = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadContext();
    return () => abortControllerRef.current?.abort();
  }, [loadContext]);

  useEffect(() => {
    const duration = reduceMotion
      ? SIGNAL_EFFECT_REDUCED_DURATION_MS
      : SIGNAL_EFFECT_DURATION_MS;
    const timeoutId = window.setTimeout(() => {
      setShowSignalEffect(false);
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [reduceMotion]);

  return (
    <section className={styles.wrapper} aria-live="polite">
      {showSignalEffect && (
        <div
          className={`${styles.signalEffect} ${reduceMotion ? styles.signalEffectReduced : ''}`}
          aria-hidden="true"
        >
          <div className={styles.signalNoise} />
          <div className={styles.signalBandTop} />
          <div className={styles.signalBandBottom} />
          <div className={styles.signalGhost} />
        </div>
      )}
      <div className={styles.panel}>
        {status === 'loading' && (
          <p className={styles.status}>Loading `SITE_AGENT_CONTEXT.md`...</p>
        )}

        {status === 'error' && (
          <div className={styles.errorWrap} role="alert">
            <p className={`${styles.status} ${styles.errorText}`}>
              Unable to load agent context. {errorMessage}
            </p>
            <button type="button" className={styles.retryButton} onClick={() => void loadContext()}>
              Retry
            </button>
          </div>
        )}

        {status === 'success' && (
          <article className={styles.article}>
            <pre className={styles.content}>{content}</pre>
          </article>
        )}
      </div>
    </section>
  );
}
