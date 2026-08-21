/** @type {import('next').NextConfig} */

// Vary: Accept must reach the CDN on the HTML variant too, or a cache that
// stored one representation can hand it to a client that asked for the other.
// Next owns the Vary header on rendered pages (it appends its own RSC values
// and overwrites what middleware sets), so the Accept value is declared here,
// at the routing layer, instead.
const VARY_ACCEPT = { key: 'Vary', value: 'Accept' };

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
      { source: '/', headers: [VARY_ACCEPT] },
      { source: '/:path((?!_next/|api/).*)', headers: [VARY_ACCEPT] },
    ]
  },
}

module.exports = nextConfig
