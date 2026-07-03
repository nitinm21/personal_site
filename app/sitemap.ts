import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nitinmurali.vercel.app';

const routes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/work', priority: 0.8 },
  { path: '/stuff', priority: 0.7 },
  { path: '/stuff/coding-explorations', priority: 0.8 },
  { path: '/stuff/blog', priority: 0.8 },
  { path: '/stuff/in-the-wild', priority: 0.7 },
  { path: '/behind-the-scenes', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
