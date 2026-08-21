import type { MetadataRoute } from 'next';
import { PAGES, absoluteUrl } from '@/utils/site.mjs';

// Canonical HTML URLs only: redirects (/stuff) and the Markdown twins are
// discoverable through llms.txt, /agents, and the Link: rel="alternate" header.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.map((page) => ({
    url: absoluteUrl(page.route),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
