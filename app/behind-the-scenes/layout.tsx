import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/pageMetadata';

export const metadata: Metadata = pageMetadata('/behind-the-scenes');

export default function BehindTheScenesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
