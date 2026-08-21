import { buildOpenApiDocument } from '@/content/openapi.mjs';

// OpenAPI 3.1 description of the profile API, the Markdown endpoints, and the
// static agent files. Served at the conventional /openapi.json path.

export const revalidate = 3600;

export async function GET() {
  return Response.json(buildOpenApiDocument(), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
