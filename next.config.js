/** @type {import('next').NextConfig} */

// Note on `Vary: Accept` for the HTML representation: it cannot be set from
// here. Vercel does apply routing-layer response headers (verified on static
// files such as /llms.txt), but it will not override a header the origin
// already sent, and Next always emits its own RSC `Vary` list on App Router
// responses. Middleware cannot win either - the render runs after it.
//
// The markdown representation, which is what a negotiating client actually
// receives, sets `Vary: Accept, Accept-Encoding` itself in
// app/api/markdown/[[...slug]]/route.ts. Cross-variant cache poisoning is
// prevented structurally rather than by the header: middleware rewrites
// markdown requests to /api/markdown/*, so the two representations never share
// a CDN cache key. scripts/verify-agent-endpoints.mjs asserts that invariant
// directly.

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
