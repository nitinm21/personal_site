import { buildMarkdownDoc, renderNotFoundMarkdown } from '@/content/agentDocs.mjs';
import { getBlogPosts } from '@/app/stuff/blog/posts';
import { routeToMarkdownPath, slugToRoute } from '@/utils/agentPaths.mjs';
import { SITE_URL, absoluteUrl } from '@/utils/site.mjs';

// The Markdown representation of every HTML page. Reached only through the
// negotiation middleware, which rewrites here when a client prefers
// text/markdown or asks for the .md twin of a page.

const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';
const VARY = 'Accept, Accept-Encoding';

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const route = slugToRoute(slug);

  // The blog page renders live posts from the Substack feed; mirror it rather
  // than shipping a stale copy.
  const posts = route === '/stuff/blog' ? await getBlogPosts() : undefined;
  const doc = buildMarkdownDoc(route, posts ? { posts } : {});

  if (!doc) {
    return new Response(renderNotFoundMarkdown(route), {
      status: 404,
      headers: {
        'Content-Type': MARKDOWN_CONTENT_TYPE,
        Vary: VARY,
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400',
      },
    });
  }

  return new Response(doc.markdown, {
    headers: {
      'Content-Type': MARKDOWN_CONTENT_TYPE,
      Vary: VARY,
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400',
      Link: [
        `<${absoluteUrl(doc.route)}>; rel="canonical"`,
        `<${SITE_URL}${routeToMarkdownPath(doc.route)}>; rel="self"; type="text/markdown"`,
      ].join(', '),
    },
  });
}
