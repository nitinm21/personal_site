'use client';

import { HUMAN_AUDIENCE_MODE } from '@/utils/audienceMode.mjs';
import { useAudienceMode } from '@/contexts/AudienceModeContext';
import styles from './AudienceToggle.module.css';

const AGENT_CONTEXT_URL = 'https://nitinmurali.vercel.app/llms-full.txt';

export default function AudienceToggle() {
  const { audienceMode, setAudienceMode } = useAudienceMode();
  const isHumanSelected = audienceMode === HUMAN_AUDIENCE_MODE;

  return (
    <div className={styles.root}>
      <fieldset className={styles.toggle}>
        <legend className={styles.visuallyHidden}>Audience Mode</legend>
        <label className={styles.option}>
          <input
            type="radio"
            name="audience-mode"
            value={HUMAN_AUDIENCE_MODE}
            checked={isHumanSelected}
            onChange={() => setAudienceMode(HUMAN_AUDIENCE_MODE)}
            className={styles.radioInput}
          />
          <span className={styles.radio} aria-hidden="true" />
          <span className={styles.label}>Human</span>
        </label>
        <a
          href={AGENT_CONTEXT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.option}
        >
          <span className={styles.radio} aria-hidden="true" />
          <span className={styles.label}>Agent</span>
        </a>
      </fieldset>
    </div>
  );
}
