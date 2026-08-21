import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/pageMetadata';

export const metadata: Metadata = pageMetadata('/stuff/blog');

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
