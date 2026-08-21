import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/pageMetadata';

export const metadata: Metadata = pageMetadata('/work');

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
