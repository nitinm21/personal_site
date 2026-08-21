import type { Metadata } from 'next';
import { OG_IMAGE, SITE_LOCALE, SITE_NAME, getPage } from './site.mjs';

const ogImage = {
  url: OG_IMAGE.path,
  width: OG_IMAGE.width,
  height: OG_IMAGE.height,
  type: OG_IMAGE.type,
  alt: OG_IMAGE.alt,
};

/**
 * Per-route metadata built from the shared route table, so every page ships the
 * four signals agents use for entity resolution and attribution: a canonical
 * URL, a language (set on <html>), an og:image, and an og:type.
 *
 * Next replaces `openGraph` and `twitter` wholesale rather than deep-merging
 * them, so each page spells out every field it wants instead of inheriting
 * half of one.
 */
export function pageMetadata(route: string): Metadata {
  const page = getPage(route);
  if (!page) {
    throw new Error(`pageMetadata: no page registered for route "${route}"`);
  }

  const isHome = route === '/';
  const socialTitle = isHome ? SITE_NAME : `${page.title} | ${SITE_NAME}`;

  return {
    // The root layout's title template appends "| Nitin Murali".
    ...(isHome ? {} : { title: page.title }),
    description: page.description,
    alternates: { canonical: route },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: socialTitle,
      description: page.description,
      url: route,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: page.description,
      images: [ogImage],
    },
  };
}
