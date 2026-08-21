import type { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor';
import AudienceModeShell from '@/components/AudienceModeShell';
import AudienceToggle from '@/components/AudienceToggle';
import { AudienceModeProvider } from '@/contexts/AudienceModeContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '@/utils/site.mjs';
import './globals.css';

export const metadata: Metadata = {
  // Makes every relative canonical / og:url / og:image absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: `${SITE_URL}/` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    type: 'website',
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: '/',
    images: [
      {
        url: OG_IMAGE.path,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        type: OG_IMAGE.type,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.path],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE_LANGUAGE}>
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
