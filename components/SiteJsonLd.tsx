import { buildHomeJsonLd } from '@/content/structuredData.mjs';

/** schema.org Person / WebSite / ProfilePage graph for the homepage. */
export default function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Serialised from a plain object we own; no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd()) }}
    />
  );
}
