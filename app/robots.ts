import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/site.mjs';

// Allow every crawler (including AI bots like GPTBot, ClaudeBot, PerplexityBot)
// and point them to the sitemap so an agent handed only the domain can find
// every page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
