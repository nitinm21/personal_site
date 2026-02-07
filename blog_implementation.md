# Blog Implementation Plan

Last updated: February 7, 2026  
Repository: `/Users/nitin/personal_website_new`  
Objective: Add a `Blog` section under `Stuff`, sourced from Substack, with a list-only page and external post links.

## 1. Scope

Implement a new internal page at `/stuff/blog` that renders the 10 latest posts from:

- `https://nitinmurali.substack.com/archive`
- `https://nitinmurali.substack.com/feed` (used for snapshot data)

Each post card must include:

- Title
- Description (raw text)
- Published date in `MMM D, YYYY` format
- Open Graph image
- Link to original Substack post (opens in new tab)

## 2. Confirmed Behavior

1. `Stuff` dropdown order:
   - `Blog`
   - `Coding explorations`
   - `In the wild`
2. `/stuff` redirect remains unchanged and continues redirecting to `/stuff/coding-explorations`.
3. Clicking a blog item opens Substack in a new tab with `rel="noopener noreferrer"`.
4. Blog page is list-only (no coverflow mode).
5. UI styling and motion should match the existing glassmorphism + subtle motion style in `Stuff` pages.

## 3. Existing Codebase Constraints

1. Navigation dropdown is defined in `components/Navigation.tsx`.
2. View mode toggle is globally shown for all `/stuff/*` routes today.
3. Coverflow defaults are controlled by `utils/viewMode.mjs`.
4. Current `Stuff` sections use:
   - Framer Motion
   - Card/list layouts
   - CSS modules with glassmorphism tokens from `app/globals.css`.

## 4. Data Snapshot (Latest 10 Substack Posts)

Source snapshot timestamp: February 7, 2026  
Source endpoint: `https://nitinmurali.substack.com/feed`  
Total items in feed at snapshot: 16

Use this static seed in `app/stuff/blog/posts.ts`:

```ts
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  publishedLabel: string; // MMM D, YYYY
  postUrl: string;
  openGraphImage: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'what-if-anyone-at-your-company-could',
    title: 'What if Anyone at Your Company Could Create a Pull Request?',
    description: 'Thoughts on Replit',
    publishedAt: '2025-06-06',
    publishedLabel: 'Jun 6, 2025',
    postUrl: 'https://nitinmurali.substack.com/p/what-if-anyone-at-your-company-could',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/de9f7ffd-8f1f-4ee1-a0c1-cc8e335d28d3_1264x728.png',
  },
  {
    id: 'winning-companies-stay-closest-to-customers',
    title: 'Winning companies stay closest to customers',
    description: 'Not a piece on user research, just a few thoughts on the interface layer!',
    publishedAt: '2024-05-09',
    publishedLabel: 'May 9, 2024',
    postUrl: 'https://nitinmurali.substack.com/p/winning-companies-stay-closest-to-customers',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/c49604bd-510e-4a44-a985-04a755d68c97_1024x1024.webp',
  },
  {
    id: 'why-churn-is-not-always-bad-in-dating',
    title: 'Why churn is not always bad in dating apps?',
    description: 'What I learned after overhearing a couple on the subway.',
    publishedAt: '2024-02-11',
    publishedLabel: 'Feb 11, 2024',
    postUrl: 'https://nitinmurali.substack.com/p/why-churn-is-not-always-bad-in-dating',
    openGraphImage: 'https://substack-post-media.s3.amazonaws.com/public/images/28a9587a-5a8f-4ed4-8391-4e25059fb07a_3840x2160.png',
  },
  {
    id: 'what-b2b-physical-products-taught',
    title: 'What B2B physical products taught me about B2B SaaS products',
    description: 'Great insights usually come from the most disconnected of industries. This time, it was no different',
    publishedAt: '2023-06-20',
    publishedLabel: 'Jun 20, 2023',
    postUrl: 'https://nitinmurali.substack.com/p/what-b2b-physical-products-taught',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!hBtG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc2fe8be5-7fbe-469e-b108-7408a70eb528_4624x2080.jpeg',
  },
  {
    id: 'what-linear-and-figma-taught-me-about',
    title: 'What Linear and Figma taught me about product differentiation.',
    description: 'With a few learnings on competing in a red ocean market',
    publishedAt: '2022-12-04',
    publishedLabel: 'Dec 4, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/what-linear-and-figma-taught-me-about',
    openGraphImage: 'https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/52ebc565-70f7-4a22-a606-cc8ae2b9f784_1024x1024.png',
  },
  {
    id: 'jobs-theory-and-staying-close-to',
    title: 'Jobs Theory and staying close to your users',
    description: 'How a simple conversation about milkshakes rewired my brain',
    publishedAt: '2022-10-23',
    publishedLabel: 'Oct 23, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/jobs-theory-and-staying-close-to',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!CaZv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F2992a376-aab3-420a-acb9-4c0c6549a511_512x512.jpeg',
  },
  {
    id: 'changelog-2021-2022',
    title: 'Changelog: 2021-2022',
    description: 'A list of misses in the year gone by',
    publishedAt: '2022-04-24',
    publishedLabel: 'Apr 24, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/changelog-2021-2022',
    openGraphImage: 'https://substackcdn.com/image/fetch/$s_!aZ2v!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ff423a5-0f05-460c-8cb4-9e5d7b1cba40_768x768.png',
  },
  {
    id: 'continuous-improvisation',
    title: 'Continuous Improvisation',
    description: 'Why should you become a feedback magnet?',
    publishedAt: '2022-01-02',
    publishedLabel: 'Jan 2, 2022',
    postUrl: 'https://nitinmurali.substack.com/p/continuous-improvisation',
    openGraphImage: 'https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/e10274e2-9dbf-43fd-b6f2-8b6a58384db2_420x300.png',
  },
  {
    id: 'product-improvements-spotify-tv',
    title: 'Product Improvements: Spotify TV',
    description: 'Most of us will agree that Spotify is one of the most well-designed products in recent times.',
    publishedAt: '2021-10-17',
    publishedLabel: 'Oct 17, 2021',
    postUrl: 'https://nitinmurali.substack.com/p/product-improvements-spotify-tv',
    openGraphImage: 'https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/eaeea9cd-614a-409b-b339-2b2f4c19357e_420x300.png',
  },
  {
    id: 'no-one-cares-about-your-product',
    title: 'No one cares about your product',
    description: 'Building with a null hypothesis and the Chekhov\\'s Gun principle',
    publishedAt: '2021-07-27',
    publishedLabel: 'Jul 27, 2021',
    postUrl: 'https://nitinmurali.substack.com/p/no-one-cares-about-your-product',
    openGraphImage: 'https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/40356cbe-fa14-4b7b-91b6-5bca07ca6d59_420x300.png',
  },
];
```

## 5. File-by-File Implementation

1. Update `components/Navigation.tsx`
   - Add Blog as first `stuffSubItems` entry:
     - `{ href: '/stuff/blog', label: 'Blog' }`
   - Keep hover + click dropdown behavior unchanged.
   - Restrict view toggle visibility to coverflow routes only.
   - Replace:
     - `const isStuffPage = pathname.startsWith('/stuff/');`
   - With:
     - `const showViewToggle = isCoverflowDefaultPath(pathname ?? '');`
     - Use helper from `utils/viewMode.mjs`.

2. Create `app/stuff/blog/posts.ts`
   - Add `BlogPost` interface and `BLOG_POSTS` snapshot array above.

3. Create `app/stuff/blog/page.tsx`
   - Render a list page using existing `Stuff` aesthetic:
     - Container with top padding to clear fixed nav.
     - Intro heading/subheading.
     - Repeated list items with title, description, published date, image.
   - Link behavior:
     - Entire card clickable OR explicit open icon button.
     - `target="_blank" rel="noopener noreferrer"`.
   - Motion:
     - Light fade/translate on load and staggered list reveal.
   - Keep list-only mode.

4. Create `app/stuff/blog/page.module.css`
   - Reuse spacing rhythm and card style language from:
     - `app/stuff/coding-explorations/page.module.css`
     - `app/stuff/in-the-wild/page.module.css`
   - Text-first hierarchy:
     - Title > description > date > image.
   - Responsive behavior:
     - Desktop: horizontal split card (text dominant, image secondary).
     - Mobile: stacked card, tap-friendly spacing.
   - Interaction:
     - Soft hover lift, border glow, subtle image scale.

5. Add metadata with `app/stuff/blog/layout.tsx`
   - Export metadata:
     - Title: `Blog | Nitin Murali`
     - Description: `Latest writing from product stash on Substack.`

6. Update tests
   - `tests/viewMode.test.mjs`:
     - Add assertion that `/stuff/blog` defaults to `list`.

## 6. UI Spec (Execution-Level)

1. Page framing
   - `max-width`: ~900px to match existing Stuff pages.
   - Vertical rhythm: `48px`+ between cards on desktop, tighter on mobile.

2. Card content order
   - Published date badge
   - Title (`h2`)
   - Description (`p`)
   - External-link affordance
   - Image preview

3. Hover and focus behavior
   - Card border transitions to `var(--glass-border-hover)`.
   - Card shadow transitions to `var(--glass-shadow-hover)`.
   - Image scales to `1.02` to `1.05`.
   - Focus ring remains visible via global `:focus-visible`.

4. Mobile
   - Keep tap targets at least ~44px height.
   - Collapse split layout into single-column stack.
   - Preserve readable line length and spacing.

## 7. Accessibility and Quality Requirements

1. Semantic structure
   - Use `<section>` + list semantics (`<ul>/<li>`) or repeated `<article>` blocks.
   - Title links should be keyboard-accessible.

2. Images
   - Provide meaningful `alt` text:
     - `Cover image for <post title>`
   - If image fails or is absent, render text content without layout break.

3. External links
   - Always use `target="_blank"` + `rel="noopener noreferrer"`.
   - Add visually hidden cue if needed for screen readers.

## 8. Verification Checklist

1. Functional
   - `/stuff/blog` resolves and renders 10 posts.
   - Each post opens correct Substack URL in new tab.
   - `/stuff` still redirects to `/stuff/coding-explorations`.
   - Dropdown order under `Stuff` matches required order.

2. Visual
   - Desktop and mobile layout both look consistent with current aesthetic.
   - Card hover/focus states are clear and non-jarring.
   - Title/description visually dominate over image.

3. Regression
   - `Coding explorations` and `In the wild` still support list/coverflow.
   - View toggle does not appear on `/stuff/blog`.

4. Commands
   - `npm test`
   - `npm run build`

## 9. Optional Refresh Workflow (Manual Snapshot Update)

When you want fresh blog data later, run:

```bash
curl -L --max-time 30 -s https://nitinmurali.substack.com/feed > /tmp/nitin_substack_feed.xml
```

Then parse top 10 entries and update `app/stuff/blog/posts.ts`.

## 10. Out of Scope (This Iteration)

1. Live runtime fetch from Substack on every page load.
2. CMS integration.
3. Search/filter/pagination on blog page.
4. Paid/free badge logic for Substack posts.
5. Coverflow mode for blog.
