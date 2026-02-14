import path from 'node:path';
import { readFile } from 'node:fs/promises';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'SITE_AGENT_CONTEXT.md');
    const markdown = await readFile(filePath, 'utf8');

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Failed to read SITE_AGENT_CONTEXT.md', error);
    return new Response('Failed to load SITE_AGENT_CONTEXT.md', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
