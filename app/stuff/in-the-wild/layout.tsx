import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/pageMetadata';

export const metadata: Metadata = pageMetadata('/stuff/in-the-wild');

export default function InTheWildLayout({ children }: { children: React.ReactNode }) {
  return children;
}
