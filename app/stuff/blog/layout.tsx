import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Nitin Murali',
  description: 'Latest writing from product stash on Substack.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
