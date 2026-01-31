'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { detectMobilePhone, getDefaultViewMode } from '@/utils/viewMode.mjs';

type ViewMode = 'list' | 'coverflow';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobilePhone] = useState(() => detectMobilePhone());
  const [viewMode, setViewMode] = useState<ViewMode>(() =>
    getDefaultViewMode(pathname ?? '', isMobilePhone)
  );

  useEffect(() => {
    const nextMode = getDefaultViewMode(pathname ?? '', isMobilePhone);
    setViewMode((prev) => (prev === nextMode ? prev : nextMode));
  }, [pathname, isMobilePhone]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
