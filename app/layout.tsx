import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nitin Murali',
  description: 'Product Manager & Software Engineer building products that translate complex technology into user delight and business value.',
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
        <ViewModeProvider>
          <Navigation />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
        </ViewModeProvider>
      </body>
    </html>
  );
}
