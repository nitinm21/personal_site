export interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedLabel: string;
  postUrl: string;
  openGraphImage: string;
}

const SUBSTACK_FEED_URL = 'https://nitinmurali.substack.com/feed';
const FEED_REVALIDATE_SECONDS = 3600;

const ENTITY_MAP: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
};

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'meetings-dont-end-when-they-end',
    title: "Meetings don't end when they end",
    description: 'Built an agent that generates grounded implementation plans from meetings.',
    publishedAt: '2026-04-22T03:23:39.000Z',
    publishedLabel: 'Apr 22, 2026',
    postUrl: 'https://nitinmurali.substack.com/p/meetings-dont-end-when-they-end',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/705ba397-1913-4430-8bf8-ab695dc417a0_1200x630.png',
  },
  {
    id: 'building-lyrics-translator-with-codex',
    title: 'Building Lyrics Translator With Codex CLI',
    description: 'Coding agents are addictive at this point.',
    publishedAt: '2026-03-29',
    publishedLabel: 'Mar 29, 2026',
    postUrl: 'https://nitinmurali.substack.com/p/building-lyrics-translator-with-codex',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!vN8v!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F62bbe8f2-83d9-407e-8b17-12dfce5c5f45_1338x1736.png',
  },
  {
    id: 'building-a-blog-page-for-my-site',
    title: 'Building a /blog page for my site',
    description: '..without writing a single line of code!',
    publishedAt: '2026-02-17',
    publishedLabel: 'Feb 17, 2026',
    postUrl: 'https://nitinmurali.substack.com/p/building-a-blog-page-for-my-site',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!8_Ss!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb5468246-f85a-4d26-b437-59119084a613_2492x1006.png',
  },
  {
    id: 'what-if-anyone-at-your-company-could',
    title: 'What if Anyone at Your Company Could Create a Pull Request?',
    description: 'Thoughts on Replit',
    publishedAt: '2025-06-06',
    publishedLabel: 'Jun 6, 2025',
    postUrl: 'https://nitinmurali.substack.com/p/what-if-anyone-at-your-company-could',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/de9f7ffd-8f1f-4ee1-a0c1-cc8e335d28d3_1264x728.png',
  },
  {
    id: 'winning-companies-stay-closest-to-customers',
    title: 'Winning companies stay closest to customers',
    description: 'Not a piece on user research, just a few thoughts on the interface layer!',
    publishedAt: '2024-05-09',
    publishedLabel: 'May 9, 2024',
    postUrl: 'https://nitinmurali.substack.com/p/winning-companies-stay-closest-to-customers',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/c49604bd-510e-4a44-a985-04a755d68c97_1024x1024.webp',
  },
  {
    id: 'why-churn-is-not-always-bad-in-dating',
    title: 'Why churn is not always bad in dating apps?',
    description: 'What I learned after overhearing a couple on the subway.',
    publishedAt: '2024-02-11',
    publishedLabel: 'Feb 11, 2024',
    postUrl: 'https://nitinmurali.substack.com/p/why-churn-is-not-always-bad-in-dating',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/28a9587a-5a8f-4ed4-8391-4e25059fb07a_3840x2160.png',
  },
  {
    id: 'what-b2b-physical-products-taught',
    title: 'What B2B physical products taught me about B2B SaaS products',
    description: 'Great insights usually come from the most disconnected of industries. This time, it was no different',
    publishedAt: '2023-06-20',
    publishedLabel: 'Jun 20, 2023',
    postUrl: 'https://nitinmurali.substack.com/p/what-b2b-physical-products-taught',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!hBtG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2fe8be5-7fbe-469e-b108-7408a70eb528_4624x2080.jpeg',
  },
  {
    id: 'what-linear-and-figma-taught-me-about',
    title: 'What Linear and Figma taught me about product differentiation.',
    description: 'With a few learnings on competing in a red ocean market',
    publishedAt: '2022-12-04',
    publishedLabel: 'Dec 4, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/what-linear-and-figma-taught-me-about',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!rCRC!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F52ebc565-70f7-4a22-a606-cc8ae2b9f784_1024x1024.png',
  },
  {
    id: 'jobs-theory-and-staying-close-to',
    title: 'Jobs Theory and staying close to your users',
    description: 'How a simple conversation about milkshakes rewired my brain',
    publishedAt: '2022-10-23',
    publishedLabel: 'Oct 23, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/jobs-theory-and-staying-close-to',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!CaZv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F2992a376-aab3-420a-acb9-4c0c6549a511_512x512.jpeg',
  },
  {
    id: 'changelog-2021-2022',
    title: 'Changelog: 2021-2022',
    description: 'A list of misses in the year gone by',
    publishedAt: '2022-04-24',
    publishedLabel: 'Apr 24, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/changelog-2021-2022',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!aZ2v!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ff423a5-0f05-460c-8cb4-9e5d7b1cba40_768x768.png',
  },
  {
    id: 'continuous-improvisation',
    title: 'Continuous Improvisation',
    description: 'Why should you become a feedback magnet?',
    publishedAt: '2022-01-02',
    publishedLabel: 'Jan 2, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/continuous-improvisation',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!LjX1!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe10274e2-9dbf-43fd-b6f2-8b6a58384db2_420x300.png',
  },
  {
    id: 'product-improvements-spotify-tv',
    title: 'Product Improvements: Spotify TV',
    description: 'Most of us will agree that Spotify is one of the most well-designed products in recent times.',
    publishedAt: '2021-10-17',
    publishedLabel: 'Oct 17, 2021',
    postUrl: 'https://nitinmurali.substack.com/p/product-improvements-spotify-tv',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!rFjD!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Feaeea9cd-614a-409b-b339-2b2f4c19357e_420x300.png',
  },
];

function decodeEntities(value: string) {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }

    if (entity.startsWith('#')) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }

    return ENTITY_MAP[entity] ?? match;
  });
}

function unwrapCdata(value: string) {
  const trimmedValue = value.trim();

  if (
    trimmedValue.startsWith('<![CDATA[') &&
    trimmedValue.endsWith(']]>')
  ) {
    return trimmedValue.slice(9, -3);
  }

  return trimmedValue;
}

function getTagValue(block: string, tagName: string) {
  const match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`));
  return match?.[1] ?? '';
}

function getEnclosureUrl(block: string) {
  const match = block.match(/<enclosure\b[^>]*\burl="([^"]+)"/);
  return decodeEntities(match?.[1] ?? '');
}

function normalizeText(value: string) {
  return decodeEntities(unwrapCdata(value)).replace(/\s+/g, ' ').trim();
}

function formatPublishedAt(pubDate: string) {
  const date = new Date(pubDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    publishedAt: date.toISOString(),
    publishedLabel: BLOG_DATE_FORMATTER.format(date),
    sortTime: date.getTime(),
  };
}

function getPostId(postUrl: string) {
  try {
    const pathnameSegments = new URL(postUrl).pathname
      .split('/')
      .filter(Boolean);
    return pathnameSegments[pathnameSegments.length - 1] ?? postUrl;
  } catch {
    return postUrl;
  }
}

function parseFeed(xml: string) {
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  return itemMatches
    .map(([, block]) => {
      const title = normalizeText(getTagValue(block, 'title'));
      const description = normalizeText(getTagValue(block, 'description'));
      const postUrl = normalizeText(getTagValue(block, 'link'));
      const pubDate = normalizeText(getTagValue(block, 'pubDate'));
      const published = formatPublishedAt(pubDate);

      if (!title || !description || !postUrl || !published) {
        return null;
      }

      return {
        id: getPostId(postUrl),
        title,
        description,
        publishedAt: published.publishedAt,
        publishedLabel: published.publishedLabel,
        postUrl,
        openGraphImage: getEnclosureUrl(block),
        sortTime: published.sortTime,
      };
    })
    .filter((post): post is BlogPost & { sortTime: number } => post !== null)
    .sort((left, right) => right.sortTime - left.sortTime)
    .map(({ sortTime, ...post }) => post);
}

export async function getBlogPosts() {
  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      next: { revalidate: FEED_REVALIDATE_SECONDS },
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`Substack feed request failed with ${response.status}`);
    }

    const xml = await response.text();
    const posts = parseFeed(xml);

    if (posts.length === 0) {
      throw new Error('Substack feed returned no parseable posts');
    }

    return posts;
  } catch (error) {
    console.error('Falling back to bundled blog posts.', error);
    return FALLBACK_BLOG_POSTS;
  }
}
