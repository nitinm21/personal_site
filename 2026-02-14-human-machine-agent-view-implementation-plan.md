# Human/Machine Agent View Implementation Plan

## Overview

Implement a **global Human/Machine mode system** across the site where:
- `Human` is the default and preserves the current page experience.
- `Machine` replaces page content with `SITE_AGENT_CONTEXT.md` content.
- A **fixed, always-visible bottom-center toggle** controls mode on every page, including mobile.
- On any full page refresh, mode resets to `Human`.

This plan follows the `create_plan_generic` workflow from `starter_pack/.claude/commands/create_plan_generic.md`, adapted to the user-requested output location (repo root).

---

## Current State Analysis

### Existing App Shell
- Root layout renders `CustomCursor`, `ViewModeProvider`, `Navigation`, and `PageTransition` around all pages in `app/layout.tsx:2`, `app/layout.tsx:5`, `app/layout.tsx:38`, `app/layout.tsx:40`, `app/layout.tsx:42`.
- There is no global audience mode (`human`/`machine`) concept yet.

### Existing Toggle Pattern
- A view toggle already exists in navigation, but only for coverflow-enabled routes (`/stuff/coding-explorations`, `/stuff/in-the-wild`) via `isCoverflowDefaultPath` in `components/Navigation.tsx:8`, `components/Navigation.tsx:26`, `components/Navigation.tsx:185`.
- Toggle UI currently sits inside nav and is hidden on mobile (`@media (max-width: 600px)`), in `components/Navigation.module.css:155`, `components/Navigation.module.css:235`.

### Existing Mode Context
- `ViewModeContext` currently supports only `'list' | 'coverflow'` in `contexts/ViewModeContext.tsx:7`, with route-driven defaults in `utils/viewMode.mjs:3`, `utils/viewMode.mjs:19`.
- Coverflow pages conditionally render based on this mode in `app/stuff/coding-explorations/page.tsx:19`, `app/stuff/coding-explorations/page.tsx:177`, `app/stuff/in-the-wild/page.tsx:20`, `app/stuff/in-the-wild/page.tsx:321`.

### Route Surface Area
- The route map to support is documented in `SITE_AGENT_CONTEXT.md:39`.
- `/stuff` is a redirect route to `/stuff/coding-explorations` in `app/stuff/page.tsx:4`.

### Constraints Relevant to This Feature
- `SITE_AGENT_CONTEXT.md` exists at repo root and is authoritative, with intent defined in `SITE_AGENT_CONTEXT.md:3`.
- Current dependency set does not include markdown render packages (`package.json:16`), so this should be implemented without heavy new dependencies unless truly needed.

---

## Desired End State

After implementation:
- Every page has a fixed, persistent Human/Machine toggle at the bottom center.
- Toggle remains visible during scroll and across route transitions.
- `Human` mode shows current site content exactly as-is.
- `Machine` mode shows only the `SITE_AGENT_CONTEXT.md` content in a readable markdown view.
- Toggle works on desktop and mobile.
- Existing coverflow/list behavior still works in Human mode.
- A full page refresh always resets mode to `Human`.

### Verification of End State
- Any route in the map (`SITE_AGENT_CONTEXT.md:39`) loads in Human mode by default.
- Switching to Machine mode hides normal page UI and shows markdown content.
- Switching back restores normal UI state without refresh.
- Performing a full browser refresh while in Machine mode resets to Human mode.
- On phone-sized viewports, toggle remains usable and readable.

### Key Discoveries
- Global shell composition in `app/layout.tsx:38` to `app/layout.tsx:44` gives a single integration point.
- Existing nav toggle UX can be visually reused but functionally separated from list/coverflow (`components/Navigation.tsx:183` to `components/Navigation.tsx:218`).
- Current in-the-wild page mutates `document.body.style.overflow` in coverflow mode (`app/stuff/in-the-wild/page.tsx:94` to `app/stuff/in-the-wild/page.tsx:104`), so machine-mode swaps must unmount safely.

---

## What We're NOT Doing

- Rewriting existing Human page content or layout structure.
- Replacing the current list/coverflow feature behavior.
- Building a full docs site or TOC parser for the markdown.
- Adding authentication/permissions around machine mode.
- Introducing major new UI libraries for markdown rendering.
- Converting `SITE_AGENT_CONTEXT.md` source ownership away from repo root.

---

## Implementation Approach

### Strategy Summary
Add a **new global audience mode layer** (Human/Machine) in the app shell, independent from the existing list/coverflow mode.

### Architectural Decisions
1. Keep existing `ViewModeContext` focused on list/coverflow only.
2. Add a separate `AudienceModeContext` for `human | machine`.
3. Render machine content through a dedicated shell gate in the root layout.
4. Expose `SITE_AGENT_CONTEXT.md` via a route that serves markdown from the root file to avoid duplication drift.
5. Keep toggle always mounted with high z-index and safe-area-aware bottom positioning.

### Default/State Behavior
- Default audience mode is always `human` on first load.
- Mode persists across client-side route navigation (single-page session behavior).
- Mode **must not** persist across full page refresh; refresh always returns to `human`.

### Accessibility Baseline
- Toggle implemented as two explicit buttons or segmented control with:
  - `aria-pressed` or `role="tablist"` pattern.
  - Visible focus styles.
  - Minimum 44px touch target on mobile.
- Machine view content rendered in semantic container with readable line-height and contrast.

---

## Phase 1: Add Audience Mode Foundation

### Overview
Introduce a global `AudienceModeContext` and shell-level gate primitives without changing current page behavior yet.

### Changes Required

#### 1. Add Audience Mode Types + Utilities
**File**: `utils/audienceMode.mjs`  
**Changes**:
- Add shared constants/types for `HUMAN` and `MACHINE`.
- Add helper for default mode (`human`) and optional guard helpers.

```js
/** @typedef {'human' | 'machine'} AudienceMode */
export const DEFAULT_AUDIENCE_MODE = 'human';
export function isAudienceMode(value) { ... }
```

#### 2. Add New Context Provider
**File**: `contexts/AudienceModeContext.tsx`  
**Changes**:
- Create client context with `{ audienceMode, setAudienceMode }`.
- Initialize to `human`.
- No localStorage/sessionStorage persistence in v1.

```tsx
type AudienceMode = 'human' | 'machine';
const [audienceMode, setAudienceMode] = useState<AudienceMode>('human');
```

#### 3. Compose Context in Root Layout
**File**: `app/layout.tsx`  
**Changes**:
- Nest `AudienceModeProvider` with existing `ViewModeProvider`.
- Keep current tree stable.

```tsx
<ViewModeProvider>
  <AudienceModeProvider>
    ...
  </AudienceModeProvider>
</ViewModeProvider>
```

### Success Criteria

#### Automated Verification
- [ ] App compiles after adding new context: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Existing tests still pass: `npm run test`

#### Manual Verification
- [ ] No visible regressions in human pages before machine UI is wired.
- [ ] Navigation and existing list/coverflow behavior still function.

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before moving to the next phase.

---

## Phase 2: Build Global Human/Machine Toggle UI

### Overview
Create a global fixed bottom-center toggle component that is always visible and mobile-safe.

### Changes Required

#### 1. Add Toggle Component
**File**: `components/AudienceToggle.tsx`  
**Changes**:
- Build segmented control with `Human` and `Machine` options.
- Read/write mode via `AudienceModeContext`.
- Add keyboard support (Enter/Space activation; optional ArrowLeft/ArrowRight switch).

```tsx
<div role="group" aria-label="View mode">
  <button aria-pressed={audienceMode === 'human'}>Human</button>
  <button aria-pressed={audienceMode === 'machine'}>Machine</button>
</div>
```

#### 2. Add Toggle Styles
**File**: `components/AudienceToggle.module.css`  
**Changes**:
- Fixed bottom center placement.
- High stacking context above nav/modal layers (target > current modal z-index 320 from `app/behind-the-scenes/page.module.css:209`).
- Mobile-safe spacing using `env(safe-area-inset-bottom)`.
- Clear active/hover/focus states.

```css
.root {
  position: fixed;
  left: 50%;
  bottom: max(14px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  z-index: 500;
}
```

#### 3. Mount Toggle in Root Layout
**File**: `app/layout.tsx`  
**Changes**:
- Render `AudienceToggle` once globally, outside route-specific pages.

### Success Criteria

#### Automated Verification
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Tests pass: `npm run test`

#### Manual Verification
- [ ] Toggle appears on `/`, `/work`, `/stuff/blog`, `/stuff/coding-explorations`, `/stuff/in-the-wild`, `/behind-the-scenes`.
- [ ] Toggle remains fixed while scrolling.
- [ ] Toggle remains visible and tappable on small phone viewport.
- [ ] Toggle does not overlap critical controls in a blocking way.

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before moving to the next phase.

---

## Phase 3: Serve and Render `SITE_AGENT_CONTEXT.md` in Machine Mode

### Overview
Create machine-mode content delivery and render path using the repo-root markdown as source of truth.

### Changes Required

#### 1. Add Route Handler for Markdown File
**File**: `app/SITE_AGENT_CONTEXT.md/route.ts`  
**Changes**:
- Read root file via Node `fs/promises`.
- Return text/markdown response.
- Handle read failures with 500 response and clear message.

```ts
const filePath = path.join(process.cwd(), 'SITE_AGENT_CONTEXT.md');
const markdown = await readFile(filePath, 'utf8');
return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
```

#### 2. Add Machine View Component
**File**: `components/MachineContextView.tsx`  
**Changes**:
- Client component that fetches `/SITE_AGENT_CONTEXT.md`.
- Displays loading, success, and error states.
- Renders markdown as readable raw text (`<pre>` / `<article>`) without adding markdown parser dependency in v1.

```tsx
useEffect(() => {
  fetch('/SITE_AGENT_CONTEXT.md').then(...)
}, []);
```

#### 3. Add Machine View Styles
**File**: `components/MachineContextView.module.css`  
**Changes**:
- Full-width readable container with top/bottom padding.
- Keep enough bottom spacing so fixed toggle never covers final lines.
- Use monospace or readable body font with controlled line length.

#### 4. Add Shell Gate Component
**File**: `components/AudienceModeShell.tsx`  
**Changes**:
- Render Human path (`Navigation` + `PageTransition` + route children) when mode is `human`.
- Render Machine path (`MachineContextView`) when mode is `machine`.

### Success Criteria

#### Automated Verification
- [ ] Route handler compiles and serves markdown path in production build: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Existing tests pass: `npm run test`

#### Manual Verification
- [ ] Clicking `Machine` hides normal page content and shows markdown content only.
- [ ] Markdown content corresponds to current `SITE_AGENT_CONTEXT.md`.
- [ ] Loading and error states are readable and non-blocking.
- [ ] Switching back to `Human` restores original content.
- [ ] While in `Machine`, performing a full browser refresh returns mode to `Human`.

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before moving to the next phase.

---

## Phase 4: Integrate Machine Mode with Existing Human Features

### Overview
Ensure machine-mode behavior does not regress existing interactions, animations, or scroll handling.

### Changes Required

#### 1. Refactor Root Composition to Use Shell
**File**: `app/layout.tsx`  
**Changes**:
- Replace direct `Navigation`/`main` rendering with `AudienceModeShell` composition.
- Keep `CustomCursor` behavior unchanged unless explicitly disabled later.

#### 2. Make Navigation Human-Only
**File**: `components/AudienceModeShell.tsx`  
**Changes**:
- Ensure nav is not shown in machine mode so “all they see is markdown file” is true.

#### 3. Preserve Existing Route Behavior in Human Mode
**Files**:
- `app/stuff/coding-explorations/page.tsx`
- `app/stuff/in-the-wild/page.tsx`
- `components/Navigation.tsx`

**Changes**:
- No behavioral changes expected; validate that list/coverflow continues to work.
- Confirm in-the-wild body overflow cleanup still happens when leaving human coverflow (`app/stuff/in-the-wild/page.tsx:94`).

### Success Criteria

#### Automated Verification
- [ ] Full app build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Tests pass: `npm run test`

#### Manual Verification
- [ ] Human mode still shows current nav and page experiences unchanged.
- [ ] Coverflow/list toggle still appears only where expected in human mode (`components/Navigation.tsx:26`).
- [ ] In machine mode, no route-specific UI elements are visible.
- [ ] Route redirect `/stuff -> /stuff/coding-explorations` still works.

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before moving to the next phase.

---

## Phase 5: Testing, Hardening, and Documentation

### Overview
Add focused tests and update project docs for maintainability.

### Changes Required

#### 1. Add Unit Tests for Audience Mode Utilities
**File**: `tests/audienceMode.test.mjs`  
**Changes**:
- Validate default mode and utility guards.
- Keep test style consistent with existing Node test usage in `tests/viewMode.test.mjs:1`.

#### 2. Add Optional Route Handler Test Coverage
**File**: `tests/siteAgentContextRoute.test.mjs` (if practical in current setup)  
**Changes**:
- Verify successful response shape and content-type.
- Verify graceful failure behavior for missing file (by mocking fs).

#### 3. Add Maintenance Notes
**File**: `README.md` (or existing project doc of choice)  
**Changes**:
- Describe Human/Machine toggle behavior.
- Document source-of-truth (`SITE_AGENT_CONTEXT.md`) and serving path (`/SITE_AGENT_CONTEXT.md`).

### Success Criteria

#### Automated Verification
- [ ] New tests pass alongside existing test suite: `npm run test`
- [ ] Linting remains clean: `npm run lint`
- [ ] Production build remains green: `npm run build`

#### Manual Verification
- [ ] QA matrix completed for all routes listed in `SITE_AGENT_CONTEXT.md:39`.
- [ ] Mobile QA completed on narrow viewport and touch interactions.
- [ ] BTS modal interactions in human mode are unaffected.
- [ ] Toggle remains visible over overlays due to z-index.

**Implementation Note**: After completing this phase and all automated verification passes, pause for manual confirmation before full rollout.

---

## Testing Strategy

### Unit Tests
- Audience mode utility defaults/guards.
- Existing view mode tests remain unchanged and passing.

### Integration/Behavioral Checks
- Human/machine switching at shell level.
- Markdown fetch lifecycle (loading/success/error).
- Route transitions while in each mode.
- Full refresh behavior: machine session always resets to human.

### Manual Testing Matrix
1. `/`  
2. `/work`  
3. `/stuff/blog`  
4. `/stuff/coding-explorations`  
5. `/stuff/in-the-wild`  
6. `/behind-the-scenes`  
7. `/stuff` redirect behavior

### Mobile Testing
- iPhone-size viewport.
- Android-size viewport.
- Verify fixed toggle with safe-area spacing.

---

## Performance Considerations

- Markdown file is text; payload should be lightweight.
- Fetch once per machine-mode entry, cache in component state for fast toggles.
- Avoid adding markdown parsing libraries initially to keep bundle size stable.
- Keep heavy page components unmounted in machine mode to reduce runtime overhead.

---

## Risks and Mitigations

1. Risk: Toggle gets hidden behind modal/overlays.  
Mitigation: Set explicit high z-index and verify against current modal layer (`app/behind-the-scenes/page.module.css:209`).

2. Risk: Human page side effects persist when switching modes.  
Mitigation: Use full subtree unmount for human route content and validate cleanup paths (notably body overflow).

3. Risk: Root markdown path serving fails in production environment.  
Mitigation: Add clear error fallback UI and route-level error handling in machine view.

4. Risk: Future edits to `SITE_AGENT_CONTEXT.md` become stale if duplicated.  
Mitigation: Serve directly from root file instead of maintaining a copied `public` duplicate.

---

## Rollout Notes

- This is safe for single-release rollout because it is additive and globally reversible by toggling to Human.
- If needed, a temporary env flag can gate machine mode visibility (`NEXT_PUBLIC_ENABLE_MACHINE_VIEW=true`) during staged validation.

---

## Migration Notes

- No data migration required.
- No API contract changes for existing pages.
- No dependency upgrades required for v1.

---

## References

- Feature source context: `SITE_AGENT_CONTEXT.md:1`
- Route coverage list: `SITE_AGENT_CONTEXT.md:39`
- Root app shell: `app/layout.tsx:30`
- Existing nav toggle behavior: `components/Navigation.tsx:183`
- Existing nav toggle mobile hide rule: `components/Navigation.module.css:235`
- Existing list/coverflow context: `contexts/ViewModeContext.tsx:7`
- Existing view mode defaults: `utils/viewMode.mjs:3`
- Existing coverflow page conditional rendering: `app/stuff/coding-explorations/page.tsx:177`
- Existing in-the-wild body overflow side effect: `app/stuff/in-the-wild/page.tsx:94`
- Existing redirect route: `app/stuff/page.tsx:4`
- Current scripts/dependency baseline: `package.json:8`
