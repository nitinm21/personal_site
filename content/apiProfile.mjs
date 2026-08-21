/**
 * Payload for GET /api/profile - the structured, no-auth view of everything
 * this site says about Nitin Murali. Built from content/profile.mjs so it can
 * never disagree with the HTML or Markdown representations.
 */

import {
  AGENT_RESOURCES,
  CONTACT_EMAIL,
  PAGES,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from '../utils/site.mjs';
import { routeToMarkdownPath } from '../utils/agentPaths.mjs';
import {
  APPEARANCES,
  BTS_VIDEOS,
  EDUCATION,
  EXPERIENCE,
  PERSON,
  PROJECTS,
} from './profile.mjs';

export const PROFILE_API_VERSION = '1.0.0';

/** @returns {object} the full profile document */
export function buildProfilePayload() {
  return {
    version: PROFILE_API_VERSION,
    site: {
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      language: SITE_LANGUAGE,
    },
    person: {
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      employer: PERSON.employer,
      location: PERSON.location,
      shortBio: PERSON.shortBio,
      summary: PERSON.summary,
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/`,
      sameAs: PERSON.sameAs,
      socialProfiles: SOCIAL_PROFILES,
    },
    experience: EXPERIENCE.map((role) => ({
      title: role.title,
      company: role.company,
      companyUrl: role.companyUrl,
      years: role.years,
      highlights: role.highlights,
    })),
    education: EDUCATION,
    projects: PROJECTS,
    appearances: APPEARANCES,
    videos: BTS_VIDEOS,
    pages: PAGES.map((page) => ({
      route: page.route,
      title: page.title,
      description: page.description,
      htmlUrl: absoluteUrl(page.route),
      markdownUrl: `${SITE_URL}${routeToMarkdownPath(page.route)}`,
    })),
    resources: AGENT_RESOURCES.map((resource) => ({
      path: resource.path,
      title: resource.title,
      description: resource.description,
      contentType: resource.contentType,
      url: absoluteUrl(resource.path),
    })),
  };
}
