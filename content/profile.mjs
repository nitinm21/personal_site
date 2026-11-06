/**
 * Structured, machine-readable mirror of the site's content.
 *
 * This is the single source the JSON profile API, the OpenAPI description, the
 * JSON-LD graph, the per-page Markdown representations, and the server-rendered
 * homepage summary all read from, so an agent gets the same facts no matter
 * which surface it fetches. Keep it in sync with the corresponding page when
 * page copy changes.
 */

import { CONTACT_EMAIL, SITE_URL, SOCIAL_PROFILES } from '../utils/site.mjs';

export const PERSON = {
  name: 'Nitin Murali',
  jobTitle: 'AI Product Engineer',
  employer: 'GoodPower',
  location: 'Chicago, IL',
  locality: 'Chicago',
  region: 'IL',
  country: 'US',
  // Mirrors the homepage bio verbatim.
  shortBio: 'AI Product Manager at GoodPower. Started my career as a Software Engineer.',
  summary:
    'Nitin Murali builds AI products at GoodPower in Chicago, Illinois, working as both product manager and engineer. He started out as a software engineer, spent roughly three years in product management at SurveySparrow and Aeropay, and holds a Master of Science in Artificial Intelligence from the Illinois Institute of Technology.',
  email: CONTACT_EMAIL,
  url: `${SITE_URL}/`,
  sameAs: SOCIAL_PROFILES.map((profile) => profile.url),
};

/** Mirrors app/work/page.tsx. */
export const EXPERIENCE = [
  {
    title: 'AI Product Engineer',
    company: 'GoodPower',
    companyUrl: null,
    years: '2026 - Present',
    highlights: [
      'Building products and talking to customers. Playing the role of both a PM and Engineer.',
    ],
  },
  {
    title: 'Product Manager Intern (Summer)',
    company: 'Aeropay',
    companyUrl: null,
    years: '2024 - 2024',
    highlights: ['Built internal tools to resolve customer-reported issues in an automated way'],
  },
  {
    title: 'Product Manager',
    company: 'SurveySparrow',
    companyUrl: 'https://surveysparrow.com/',
    years: '2021 - 2023',
    highlights: [
      'Built an AI-powered survey generator leveraging LLMs to translate user goals into ready-to-send surveys, driving a 40% reduction in survey creation time and a 5% increase in free-to-paid conversion rate.',
      'Revamped the monetization model with Consumption-Based Pricing, resulting in a 16% increase in Net Retention Rate and 18% growth in Expansion Revenue within 4 months of implementation.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Institute of Product Leadership',
    companyUrl: 'https://www.productleadership.com/',
    years: '2020 - 2021',
    highlights: [
      'Successfully reduced web application load times by 40%, with asynchronous loading of non-critical resources, caching strategies, and image optimization.',
      'Designed and developed 40+ web pages with programmatic SEO using React and a custom CMS, resulting in a 45% increase in organic registrations.',
    ],
  },
];

/** Mirrors app/work/page.tsx. */
export const EDUCATION = [
  {
    degree: 'Master of Science in Artificial Intelligence',
    school: 'Illinois Institute of Technology',
    years: '2023 - 2025',
  },
];

/** Mirrors app/stuff/coding-explorations/page.tsx. */
export const PROJECTS = [
  {
    id: 'inbox-voice',
    title: "You don't need God-tier models to write your email",
    summary:
      'I post-trained an open model on my own emails so it drafts emails like me.',
    url: 'https://email-post-train.vercel.app',
    codeUrl: 'https://app.primeintellect.ai/dashboard/environments/nitinm21/inbox-voice',
  },
  {
    id: 'domino',
    title: 'What if coding agents could join your meetings!',
    summary:
      'Domino records meetings inside your coding agent, transcribes it, and writes a grounded implementation plan you can execute.',
    url: 'https://domino-meet.vercel.app/',
    codeUrl: null,
  },
  {
    id: 'lyrics-translator',
    title: 'Lyrics Translator',
    summary:
      'Simple product that translates song lyrics to English. Built this to understand Bad Bunny songs.',
    url: 'https://github.com/nitinm21/lyrics_translator',
    codeUrl: 'https://github.com/nitinm21/lyrics_translator',
  },
  {
    id: 'pm-archetype-finder',
    title: 'Find your Product Manager persona!',
    summary:
      'Want to know what kind of a product manager you are? Find out with just 10 scenario-based questions.',
    url: 'https://pm-archetype-finder.vercel.app/',
    codeUrl: 'https://github.com/nitinm21/pm_archetype_finder/',
  },
  {
    id: 'kalshi-wrapped',
    title: 'Kalshi Wrapped',
    summary:
      'A cinematic, mobile-first year-in-review experience for Kalshi traders, inspired by Spotify Wrapped.',
    url: 'https://nitinm21.github.io/kalshi-wrapped/',
    codeUrl: null,
  },
  {
    id: 'exa-serpapi',
    title: 'Exa v/s SerpAPI',
    summary:
      "Interactive playground to compare Exa's APIs and traditional search APIs for AI and RAG use cases.",
    url: 'https://exa-lime.vercel.app/',
    codeUrl: null,
  },
  {
    id: 'tv-setup-demo',
    title: 'TV Setup Demo',
    summary:
      "Every time you buy a TV, you set up picture preferences manually. What if it wasn't manual?",
    url: 'https://tv-demo-exa.vercel.app/',
    codeUrl: 'https://github.com/nitinm21/tv_demo',
  },
  {
    id: 'chime-savings-idea',
    title: 'Chime Savings Account Idea',
    summary:
      "Chime's savings account accrues interest daily, yet it is not highlighted to encourage more deposits. What if they leveraged it to boost engagement?",
    url: 'https://chime-savings-idea.vercel.app/',
    codeUrl: 'https://github.com/nitinm21/chime_savings_idea',
  },
  {
    id: 'langchain',
    title: 'Talk to the OGs with LangChain',
    summary: 'Talk to Steve Jobs, Kobe Bryant and Marcus Aurelius, at once.',
    url: 'https://github.com/nitinm21/langchain1',
    codeUrl: 'https://github.com/nitinm21/langchain1',
  },
];

/** Mirrors app/stuff/in-the-wild/page.tsx. */
export const APPEARANCES = [
  {
    id: 'hawkbot',
    title: 'HawkBot Presentation - Techqueria 2024',
    summary:
      'Demoed and presented the story of building the HawkBot for my university (Illinois Institute of Technology).',
    category: 'speaking',
    videoUrl: 'https://youtu.be/UWDaI6g_cp8',
    linkUrl: 'https://www.linkedin.com/posts/activity-7251626565594173444-kSYt',
  },
  {
    id: 'elastic',
    title: 'Phone call with Steve Jobs at the Elastic User Group',
    summary:
      'Demoed an AI-powered phone call with Steve Jobs using Elasticsearch at the Chicago Elastic User Group.',
    category: 'speaking',
    videoUrl: 'https://youtu.be/wmOfrbRLl-k',
    linkUrl: 'https://www.linkedin.com/posts/activity-7308580318423261186-cgaR',
  },
  {
    id: 'geet-kumar',
    title: 'ML and Software Engineering at Amazon',
    summary: 'Fireside chat with Geet Kumar, Senior Software Engineer, Amazon.',
    category: 'fireside',
    videoUrl: 'https://youtu.be/m_DfDVKAfbc',
    linkUrl: 'https://youtu.be/m_DfDVKAfbc',
  },
  {
    id: 'david-giard',
    title: 'AI Masterclass with David Giard',
    summary: 'Fireside chat with David Giard, Partner Solution Architect, Microsoft.',
    category: 'fireside',
    videoUrl: null,
    linkUrl: 'https://www.linkedin.com/posts/activity-7182502375469801472-4cW7',
  },
  {
    id: 'lance-fortnow',
    title: 'Future of AI and CS with Dr. Lance Fortnow',
    summary: 'Fireside chat with Dr. Lance Fortnow, Dean, Illinois Institute of Technology.',
    category: 'fireside',
    videoUrl: 'https://youtu.be/g5mt8R6-v4E',
    linkUrl: 'https://www.linkedin.com/posts/activity-7242289458736218112-bAZ5',
  },
  {
    id: 'avinash-ravi',
    title: 'WTF is Product Management with Avinash Ravi',
    summary: 'Fireside chat with Avinash Ravi, Lead Product Manager, AT&T.',
    category: 'fireside',
    videoUrl: 'https://youtu.be/3GvX8vYWGrM',
    linkUrl: 'https://www.linkedin.com/posts/activity-7244116588604391424-CLXp',
  },
  {
    id: 'grabackis',
    title: 'Fundamentals of Product Management with the Grabackis',
    summary: 'Fireside chat with Tim and Silvia Graback, ex-Directors, Motorola Solutions.',
    category: 'fireside',
    videoUrl: 'https://youtu.be/QEdhMC7K-Ak',
    linkUrl: 'https://www.linkedin.com/posts/activity-7295477709860655104-krFr',
  },
];

/** Mirrors app/behind-the-scenes/page.tsx. */
export const BTS_VIDEOS = [
  {
    id: 'building-blog-page',
    title: 'Building a /blog page for my site',
    summary:
      'A behind-the-scenes walkthrough of how I designed and shipped the new blog page.',
    url: 'https://www.youtube.com/watch?v=vRhAXLO_D0A',
  },
];

export const SUBSTACK_URL = 'https://nitinmurali.substack.com/';
