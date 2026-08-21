import { buildProfilePayload } from '@/content/apiProfile.mjs';
import { SITE_URL } from '@/utils/site.mjs';

// Public, unauthenticated JSON view of everything the site says about Nitin.
// Documented at /agents and described by /openapi.json.

export const revalidate = 3600;

export async function GET() {
  return Response.json(buildProfilePayload(), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      Link: `<${SITE_URL}/openapi.json>; rel="service-desc"; type="application/json"`,
    },
  });
}
