/**
 * schema.org JSON-LD for the homepage. Gives agents and search engines a
 * single, unambiguous entity to attach this site to.
 */

import { SITE_LANGUAGE, SITE_NAME, SITE_URL, absoluteUrl } from '../utils/site.mjs';
import { EDUCATION, PERSON } from './profile.mjs';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

/** @returns {object} a schema.org @graph describing the person, site, and homepage */
export function buildHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: PERSON.name,
        url: absoluteUrl('/'),
        jobTitle: PERSON.jobTitle,
        description: PERSON.summary,
        email: `mailto:${PERSON.email}`,
        worksFor: { '@type': 'Organization', name: PERSON.employer },
        address: {
          '@type': 'PostalAddress',
          addressLocality: PERSON.locality,
          addressRegion: PERSON.region,
          addressCountry: PERSON.country,
        },
        alumniOf: EDUCATION.map((item) => ({
          '@type': 'CollegeOrUniversity',
          name: item.school,
        })),
        knowsAbout: [
          'AI product management',
          'Large language model applications',
          'Product strategy',
          'Software engineering',
        ],
        sameAs: PERSON.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: absoluteUrl('/'),
        name: SITE_NAME,
        inLanguage: SITE_LANGUAGE,
        about: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': WEBPAGE_ID,
        url: absoluteUrl('/'),
        name: SITE_NAME,
        inLanguage: SITE_LANGUAGE,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
      },
    ],
  };
}
