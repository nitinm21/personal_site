'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DEFAULT_AUDIENCE_MODE,
  HUMAN_AUDIENCE_MODE,
  MACHINE_AUDIENCE_MODE,
} from '@/utils/audienceMode.mjs';

type AudienceMode = 'human' | 'machine';

interface AudienceModeContextType {
  audienceMode: AudienceMode;
  isHuman: boolean;
  isMachine: boolean;
  setAudienceMode: (mode: AudienceMode) => void;
}

const AudienceModeContext = createContext<AudienceModeContextType | undefined>(undefined);

export function AudienceModeProvider({ children }: { children: ReactNode }) {
  const [audienceMode, setAudienceMode] = useState<AudienceMode>(
    DEFAULT_AUDIENCE_MODE as AudienceMode
  );

  const value = useMemo(
    () => ({
      audienceMode,
      isHuman: audienceMode === HUMAN_AUDIENCE_MODE,
      isMachine: audienceMode === MACHINE_AUDIENCE_MODE,
      setAudienceMode,
    }),
    [audienceMode]
  );

  return <AudienceModeContext.Provider value={value}>{children}</AudienceModeContext.Provider>;
}

export function useAudienceMode() {
  const context = useContext(AudienceModeContext);
  if (context === undefined) {
    throw new Error('useAudienceMode must be used within an AudienceModeProvider');
  }
  return context;
}
