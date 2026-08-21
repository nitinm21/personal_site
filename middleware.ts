import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withFootfall } from './footfall';
import { MARKDOWN_TYPE, mergeVary, negotiateType } from './utils/accept.mjs';
import {
  isMarkdownPath,
  isNegotiablePath,
  markdownPathToRoute,
  markdownRewritePath,
  normalizeRoute,
  routeToMarkdownPath,
} from './utils/agentPaths.mjs';
import { PAGE_ROUTES, SITE_URL } from './utils/site.mjs';

// Markdown content negotiation, per https://acceptmarkdown.com/recipes/nextjs/.
// One URL, two representations: HTML for browsers, Markdown for agents.

const NOT_ACCEPTABLE_BODY =
  'Not Acceptable\n\nAvailable representations: text/html, text/markdown\n';

/**
 * Media types Next's own client router and Server Actions negotiate with. They
 * are not ours to negotiate, and a 406 here would break client-side navigation.
 */
const PASSTHROUGH_TYPES = ['text/x-component', 'multipart/form-data'];

/**
 * Next's own router and Server Action traffic; leave it alone.
 *
 * Next strips the RSC / Next-Router-* request headers before middleware sees
 * them, so the header checks below are belt and braces: what actually
 * identifies a client-side navigation in Next 16 is the `_rsc` query param,
 * and what identifies a Server Action is the Accept type.
 */
function isRouterRequest(request: NextRequest): boolean {
  const accept = request.headers.get('accept')?.toLowerCase() ?? '';
  return (
    request.headers.has('rsc') ||
    request.headers.has('next-action') ||
    request.headers.has('next-router-prefetch') ||
    request.headers.has('next-router-state-tree') ||
    request.headers.has('next-router-segment-prefetch') ||
    request.nextUrl.searchParams.has('_rsc') ||
    PASSTHROUGH_TYPES.some((type) => accept.includes(type))
  );
}

function applyVary(headers: Headers): void {
  headers.set('Vary', mergeVary(headers.get('Vary')));
}

/** Advertise the Markdown twin so a crawler can find it without guessing. */
function applyMarkdownAlternate(headers: Headers, route: string): void {
  if (!PAGE_ROUTES.includes(route)) return;
  headers.append(
    'Link',
    `<${SITE_URL}${routeToMarkdownPath(route)}>; rel="alternate"; type="text/markdown"`,
  );
}

function rewriteToMarkdown(request: NextRequest, route: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = markdownRewritePath(route);
  const response = NextResponse.rewrite(url);
  applyVary(response.headers);
  return response;
}

function negotiate(request: NextRequest): Response | undefined {
  if (request.method !== 'GET' && request.method !== 'HEAD') return undefined;

  const { pathname } = request.nextUrl;
  if (!isNegotiablePath(pathname) || isRouterRequest(request)) return undefined;

  // An explicit .md URL is Markdown regardless of Accept: it is what the
  // Link: rel="alternate" header points at, and crawlers that follow such a
  // link often send no Accept header at all.
  if (isMarkdownPath(pathname)) {
    return rewriteToMarkdown(request, markdownPathToRoute(pathname));
  }

  const accept = request.headers.get('accept');
  const chosen = negotiateType(accept);
  const route = normalizeRoute(pathname);

  if (chosen === MARKDOWN_TYPE) {
    return rewriteToMarkdown(request, route);
  }

  if (chosen === null) {
    return new Response(NOT_ACCEPTABLE_BODY, {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Vary: mergeVary(null),
      },
    });
  }

  const response = NextResponse.next();
  applyVary(response.headers);
  applyMarkdownAlternate(response.headers, route);
  return response;
}

export default withFootfall(negotiate);

// Capture pages AND static assets (asset ratio is a top classifier signal);
// skip only Next's image optimizer + favicon. Adjust to taste.
export const config = {
  matcher: ["/((?!_next/image|favicon.ico).*)"],
};
