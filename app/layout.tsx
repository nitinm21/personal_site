import type { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor';
import AudienceModeShell from '@/components/AudienceModeShell';
import AudienceToggle from '@/components/AudienceToggle';
import { AudienceModeProvider } from '@/contexts/AudienceModeContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nitin Murali',
  description: 'Product Manager & Software Engineer building products that translate complex technology into user delight and business value.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Nitin Murali',
    description: 'Product Manager & Software Engineer building products that translate complex technology into user delight and business value.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <ViewModeProvider>
          <AudienceModeProvider>
            <AudienceModeShell>{children}</AudienceModeShell>
            <AudienceToggle />
          </AudienceModeProvider>
        </ViewModeProvider>
      </body>
    </html>
  );
}
