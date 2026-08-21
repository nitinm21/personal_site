import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/pageMetadata';

export const metadata: Metadata = pageMetadata('/stuff/coding-explorations');

export default function CodingExplorationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
