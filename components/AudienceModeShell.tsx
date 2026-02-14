'use client';

import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import MachineContextView from '@/components/MachineContextView';
import PageTransition from '@/components/PageTransition';
import { useAudienceMode } from '@/contexts/AudienceModeContext';

export default function AudienceModeShell({ children }: { children: ReactNode }) {
  const { isMachine } = useAudienceMode();

  if (isMachine) {
    return (
      <main>
        <MachineContextView />
      </main>
    );
  }

  return (
    <>
      <Navigation />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
