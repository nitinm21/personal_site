import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nitinmurali.vercel.app';

// Allow every crawler (including AI bots like GPTBot, ClaudeBot, PerplexityBot)
// and point them to the sitemap so an agent handed only the domain can find
// every page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
