# BTS Page Feature Requirements

Last updated: February 8, 2026  
Repository: `/Users/nitin/personal_website_new`  
Target route: `/behind-the-scenes`

## 1. Goal

Redesign the BTS page into a clean, familiar video-browsing experience inspired by products users already know (YouTube/Netflix/Prime style cues), while staying visually consistent with the existing personal site.

The page should feel welcoming, polished, and animation-forward, with smooth behavior on both desktop and mobile.

## 2. Confirmed Scope

1. Keep BTS as a single page at `/behind-the-scenes`.
2. Replace the current single-embed layout with a scalable video list/grid UI.
3. Add title-based search.
4. Open videos in an offset fullscreen-style modal (not edge-to-edge).
5. Autoplay video when modal opens using YouTube autoplay parameters.
6. Keep motion style consistent with current site transitions and framer-motion usage.
7. Do not start implementation yet; this document is planning/spec only.

## 3. Data Scope (Current vs Future)

1. Current data count: 1 real video (existing one already on page).
2. Future design capacity: visually accommodate about 10 videos.
3. No fake seeding for 10 videos right now.
4. Current video must include:
   - `title` (existing title already available)
   - `description` (temporary placeholder text for now)
5. Data model should be designed so adding more videos later is straightforward.

## 4. Content Requirements

### 4.1 Video fields (minimum)

Each video item should be represented with:

- `id` (stable unique key)
- `title` (used for display and search)
- `description` (short teaser; placeholder allowed now)
- `youtubeUrl` or `youtubeVideoId` (source for playback)
- Optional future fields:
  - `thumbnail`
  - `duration`
  - `publishedAt`

### 4.2 Current video to preserve

- Title: `Building a /blog page for my site`
- Existing source link remains the current YouTube video already in the codebase.
- Description for now: placeholder copy (editable later).

## 5. UX and Interaction Requirements

## 5.1 Initial page load

1. Show all available videos (currently one).
2. Layout should still look intentional with one card and should visually scale to ~10 cards.
3. Card content must show:
   - Title
   - Short description

## 5.2 Search

1. Include a simple search input near the top of the video list.
2. Search filters videos by `title` only.
3. Filtering behavior default:
   - Real-time as user types
   - Case-insensitive
   - Partial/sub-string match
4. If no results, show a clear empty state message.

## 5.3 Modal playback

1. Clicking a video card opens a modal overlay.
2. Modal should feel “fullscreen-like” but offset from viewport edges (top/right/bottom/left gaps visible).
3. Video starts automatically on open via YouTube autoplay query params.
4. Browser autoplay/audio policy limitations are acceptable.
5. Provide a clear close control (`X` icon/button).
6. Clicking outside modal content (overlay area) closes modal.
7. Escape-key close behavior is acceptable default for simplicity.
8. Background page scroll should be locked while modal is open.

## 5.4 URL behavior

Keep URL handling simple.  
No deep-linking or query-param state is required in this phase unless implementation convenience makes it trivial.

## 6. Visual Design Direction

1. Familiar streaming/video-gallery feel (YouTube/Netflix/Prime influence).
2. Must still match current site aesthetic:
   - Existing glassmorphism tokens
   - Existing neutral palette
   - Existing spacing rhythm and typography
3. Avoid abrupt style mismatch with other pages.

## 7. Motion and Animation

1. Motion intensity should match current website behavior.
2. Use subtle transitions:
   - Soft card hover lift / glow / image scale
   - Smooth modal enter/exit
   - Non-jarring search/filter transitions
3. Reuse existing framer-motion style/easing patterns where practical.

## 8. Responsive Behavior

1. Must look good on mobile and desktop.
2. Desktop: multi-card grid/list appearance that can scale to more content.
3. Mobile: single-column, touch-friendly card layout.
4. Modal on mobile should still be offset, just with smaller margins.
5. Search input and close controls should remain easy to use on small screens.

## 9. Technical Constraints and Preferences

1. Keep implementation aligned with current stack:
   - Next.js App Router
   - React + TypeScript
   - CSS Modules
   - framer-motion
2. Keep architecture simple and maintainable.
3. Prefer local static data structure for videos in this phase.
4. Do not over-engineer for pagination, backend integration, or analytics yet.

## 10. Non-Goals (This Phase)

1. No need to optimize for accessibility audits right now.
2. No backend/CMS integration for video management.
3. No recommendation engine, categories, sorting, or tagging.
4. No advanced search beyond title filtering.
5. No URL-deep-linking requirements.

## 11. Suggested Acceptance Criteria

The BTS redesign is complete for this phase when:

1. `/behind-the-scenes` shows a polished searchable video gallery layout.
2. Current single video is displayed with title and placeholder description.
3. Search filters by title in real time.
4. Clicking card opens offset modal and autoplays video.
5. Modal closes via close icon and outside-click.
6. Motion feels consistent with existing site transitions.
7. Mobile presentation is visually clean and functionally complete.

## 12. Implementation Readiness Notes

1. This spec intentionally uses conservative defaults so we can start building immediately.
2. Any future content additions should only require appending video objects, not redesigning the page.
3. If desired, this document can be converted into a step-by-step implementation checklist before coding.
