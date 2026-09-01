# Decision Log

Structural decisions, and documented rule-breaks (overrides), in
chronological order.

Current stack note (v2.0.0): the historical JavaScript-only decision below
is superseded by the TypeScript/Tailwind migration entry. Historical paths
remain as recorded; application files now use `.ts` / `.tsx`.

---

```
DECISION:
Global container/section system (<Container />, <Section />) as the
only source of page width and vertical rhythm.

REASON:
Prevents every section from inventing its own max-width/padding,
which is the #1 source of misaligned sections in ad-hoc-built sites.

SCOPE:
Global.

LEVEL:
Immutable (Level 1).

DATE:
2026-08-31
```

---

```
DECISION:
Hand-rolled minimal router (src/app/router.js, ~25 lines) instead of
react-router or another routing library.

REASON:
Two routes (Home, Laboratory) don't justify a routing dependency.
The Blueprint's stated priority order is native browser →  React →
internal reusable solution → external dependency, and the History
API + a small hook covers this case completely.

SCOPE:
Global (src/app/router.js, src/app/Link.jsx, App.jsx route table).

LEVEL:
Immutable (Level 1), but expected to be swapped for react-router (or
similar) once a project's route count/complexity genuinely justifies
it: that swap should be a new DECISIONS.md entry, not a silent
change.

DATE:
2026-08-31
```

---

```
DECISION:
ESLint (flat config, v9) instead of the oxlint that `npm create
vite@latest` now scaffolds by default.

REASON:
MASTER-PROMPT.md explicitly specifies ESLint as the intended tooling.
eslint-plugin-react / react-hooks / react-refresh give React-specific
rules (hooks rules, prop patterns) that the newer oxlint setup didn't
have configured out of the box.

SCOPE:
Global (eslint.config.js, package.json scripts/devDependencies).

LEVEL:
Immutable (Level 1).

DATE:
2026-08-31
```

---

```
DECISION:
`react/prop-types` disabled in eslint.config.js.

REASON:
The project deliberately excludes TypeScript (MASTER-PROMPT.md tech
stack rules) and does not install the separate `prop-types` package.
Adding it purely to satisfy this lint rule would itself violate the
"dependencies must earn their weight" rule. Runtime prop validation
without TS/prop-types isn't a real option here, so the rule can only
ever produce noise, not signal.

SCOPE:
Global lint config.

LEVEL:
Immutable (Level 1) unless the project later adopts TypeScript, at
which point prop validation comes from types instead and this stays
irrelevant.

DATE:
2026-08-31
```

---

```
OVERRIDE:
Root-level laboratory/ directory (present in MASTER-PROMPT.md §5's
example tree) was not created. The Laboratory is implemented purely
as src/pages/Laboratory.jsx behind the /laboratory route.

REASON:
MASTER-PROMPT.md §5 explicitly allows improving the example
architecture with clear technical justification. A directory outside
src/ has no role in a Vite build and would either sit unused or
require separate tooling to serve: pure duplication of a page that
already exists as a normal route, with no upside. §33 independently
describes the Laboratory as "uma rota/página," i.e. a page/route,
which is what's implemented.

SCOPE:
Directory structure only. No functional change: the Laboratory page
exists and behaves as specified.

IMPACT:
No other structural decision is affected. If a future need arises for
standalone (non-routed) QA fixtures, that's a separate, new decision.

DATE:
2026-08-31
```

---

```
DECISION:
v1.0.0 component set limited to Container, Section, Button, Input,
Card, Header, Footer: not the full list in MASTER-PROMPT.md §14.

REASON:
§14 and §36 both explicitly instruct against building "dezenas de
componentes" to pad the library, and prioritize defining the
architecture/contract correctly over exhaustive implementation.
Input and Card were added beyond the §36 minimum (Container, Section,
Button, Header, Footer) because the Laboratory page needs to
demonstrate form and card component states per §33, and both were
cheap to build correctly once Button's state pattern existed.

SCOPE:
src/components/**, docs/design-system.md.

LEVEL:
Level 3 (Component System): additive only. Adding Select, Modal,
Accordion, etc. later doesn't require revisiting this decision, only
recording their own.

DATE:
2026-08-31
```

---

```
DECISION:
Global structural centering: section openers (label + heading + lede),
feature grids, and button rows under a centered heading are centered
by default (.section-intro, .grid--center, .cluster--center, Card
`center`). Body prose, lists, and forms stay left-aligned regardless.

REASON:
Explicit project requirement. Reconciled against docs/anti-ai.md's
warning about an automatically centered Hero: that rule is about not
defaulting into a pattern without deciding it. This is the opposite
case, a deliberately chosen and documented default, applied only to
structural elements where centering doesn't hurt readability. Long-form
text stays left-aligned specifically because centering hurts readability
past a line or two.

SCOPE:
src/styles/tokens.css (--measure-intro, --measure-intro-wide),
src/styles/layout.css (.section-intro, .grid--center, .cluster--center),
src/styles/components.css (.card--center), src/components/ui/Card.jsx
(`center` prop), src/pages/Home.jsx (applied to the worked example).

LEVEL:
Immutable (Level 1) as a rule; the token values it depends on stay
Level 2.

DATE:
2026-08-31
```

---

```
DECISION:
Purged AI-tell writing patterns from all code, comments, docs, and
visible copy: em-dash used as a clause separator (140 occurrences,
replaced with periods/commas/colons depending on context), and the
"not X. It's Y" rhetorical construction in README.md.

REASON:
Explicit project requirement, aimed at output quality for client-facing
work. See docs/content-style.md for the full rule and the pattern list
to keep avoiding in new content.

SCOPE:
Every .md/.js/.jsx/.css/.html file in the repository except
node_modules and dist (build output, regenerated).

LEVEL:
Immutable (Level 1), documented in docs/content-style.md.

DATE:
2026-08-31
```

---

```
OVERRIDE:
Replaced create-vite's default favicon.svg (a purple/blue gradient
blob, the exact "generic AI-adjacent visual" docs/anti-ai.md warns
against) with a flat two-tone mark, and removed the unloaded "Inter"
font-family claim from tokens.css (declared but never actually loaded,
silently falling back to the system stack).

REASON:
Both were left over from create-vite's default scaffold and are
exactly the kind of unconsidered default this project's own rules
argue against. Fixing them is enforcing BLUEPRINT.md/anti-ai.md against
this repository itself, not a new rule.

SCOPE:
public/favicon.svg, src/styles/tokens.css (--font-display/--font-body).

IMPACT:
No component or token name changed. A project still swaps the favicon
and adds a real typeface (with its loading mechanism) as part of
Creative Direction, per MASTER-PROMPT.md.

DATE:
2026-08-31
```

---

```
DECISION:
Added `CookieConsent` (src/components/feedback/CookieConsent.jsx) as a new
Level 3 component: a consent banner plus a native `<dialog>` preferences
panel, with a two-tier model (`"necessary"` / `"all"`), not a granular
multi-category CMP.

REASON:
Cookie consent is close to mandatory for real client work and was a gap:
`docs/design-system.md`'s "Not yet implemented" list never mentioned it.
The two-tier model matches what most starter projects actually need; a
granular per-category CMP is real added complexity (more state, more
copy, more a11y surface) that should be built when a project's actual
integrations require distinguishing categories, not speculatively now.

`useCookieConsent` shares one module-level value across every call via
`useSyncExternalStore`, not a per-call `useState`.

SCOPE:
src/hooks/useCookieConsent.js (new), src/components/feedback/CookieConsent.jsx
(new), src/styles/components.css (new "COOKIE CONSENT" block), src/App.jsx
(renders it globally), docs/design-system.md, docs/accessibility.md,
docs/qa.md.

LEVEL:
Level 3 (Component System): additive only.

DATE:
2026-08-31
```

---

```
DECISION:
`useCookieConsent` reads/writes a single module-level value and notifies
subscribers via `useSyncExternalStore`, rather than each call owning its
own `useState`.

REASON:
Caught during manual QA, not anticipated up front: `CookieConsent` (the
banner) and the Laboratory's reset control both call `useCookieConsent()`.
With independent `useState`, clearing consent from the Laboratory updated
`localStorage` but left the banner's own state stale, so it didn't
reappear until a full reload. Any project embedding a "manage cookies"
control anywhere other than inside `CookieConsent` itself would hit the
same bug. `useSyncExternalStore` is the correct tool for "one source of
truth, multiple independent subscribers in the same render tree," which
is exactly this shape, rather than reaching for Context (adds a provider
for a single primitive value) or prop-drilling (there's no shared parent
between CookieConsent and an arbitrary future consumer).

SCOPE:
src/hooks/useCookieConsent.js.

LEVEL:
Level 3, internal implementation detail of an already-decided component:
doesn't change CookieConsent's or the hook's public contract.

DATE:
2026-08-31
```

---

```
DECISION:
CookieConsent's preferences dialog can be opened from anywhere (not just
its own banner button) via a `window` CustomEvent
(`blueprint:open-cookie-preferences`, exported as `OPEN_PREFERENCES_EVENT`
from `useCookieConsent.js`) instead of prop-drilling or a Context provider.
`navigation.js`'s `legalNav` entries gained an optional `action` field as
an alternative to `href` so a legal-nav item can trigger this instead of
navigating; `Footer.jsx` renders that one entry as a `<button>` dispatching
the event instead of an anchor.

REASON:
This is a rare, one-way signal (open the dialog) from a component
(Footer) that has no other relationship to CookieConsent's state. A
Context provider or prop-drilling through App.jsx would introduce a
dependency between two otherwise-independent components for a single
trigger. A native CustomEvent is zero-dependency, requires no provider
tree change, and keeps both components decoupled: Footer doesn't know
CookieConsent exists, it just dispatches a named event.

SCOPE:
src/hooks/useCookieConsent.js, src/data/navigation.js (`legalNav` shape),
src/components/layout/Footer.jsx.

LEVEL:
Level 3, additive convention (the `action` field is optional; existing
`href`-only entries are unaffected).

DATE:
2026-08-31
```

---

```
DECISION:
Added `BackToTop` (src/components/feedback/BackToTop.jsx) as a new Level 3
component, reusing the existing `useScrollState(threshold)` hook (the same
one `Header` uses for its own scroll-position detection) at a larger
threshold instead of a second, bespoke scroll listener. Coordinates with
`CookieConsent` and `Footer` through two shared, documented CSS hooks
(`body.has-cookie-banner`, `body.has-footer-visible`) rather than any
JS-level coupling between the components.

REASON:
`useScrollState` already does exactly the "past N px" tracking this needs;
writing a second scroll listener would duplicate existing, working code
(reuse before create). The bottom-fixed components (BackToTop,
CookieConsent's banner, Footer's own bottom-right content) need *some*
coordination to avoid overlapping, but making one aware of another's
internal state, or introducing shared state neither otherwise needs,
would violate the Rule of Permanence. A CSS class toggled by whichever
component owns the overlapping UI (the banner; the footer, via an
`IntersectionObserver` on itself) is the smallest coordination surface
that solves the actual problem. The footer case was caught during manual
QA, not anticipated up front: a fixed bottom-right control will always
end up covering part of the footer once the page is scrolled all the way
down, on any project that has both.

SCOPE:
src/components/feedback/BackToTop.jsx (new), src/components/feedback/CookieConsent.jsx
(toggles `has-cookie-banner`), src/components/layout/Footer.jsx (toggles
`has-footer-visible`), src/styles/components.css (new "BACK TO TOP"
block), src/App.jsx (renders it globally), docs/design-system.md, docs/qa.md.

LEVEL:
Level 3 (Component System): additive only.

DATE:
2026-08-31
```

---

```
DECISION:
Documented a "full-bleed split section" composition pattern in
docs/design-system.md (media running the full section height on one side,
copy in a nested Container on the other) instead of building a new
component for it.

REASON:
The pattern is genuinely just "put media outside the Container, put copy
inside one," a two-line deviation from the normal Section > Container
nesting. A component wrapping that would hide how simple the underlying
composition is and add an API (media position, aspect ratio, column
ratio, mobile stacking) for something that varies per project anyway.
Documenting the pattern with example markup keeps it visible and reusable
without adding to the component count for something that isn't a real
abstraction boundary.

SCOPE:
docs/design-system.md (new section), src/pages/Laboratory.jsx (demo,
nested inside the page's own Container for QA-page practicality rather
than breaking out of it).

LEVEL:
Level 4 (Creative Layer) guidance, not a Level 1/3 change: no component
API, no token, no required usage.

DATE:
2026-08-31
```

---

## v2.0.0: TypeScript and Tailwind migration (2026-08-31)

OVERRIDE:
The JavaScript-only baseline is replaced with strict TypeScript. Tailwind
CSS v4 is added through @tailwindcss/vite. Styles now use explicit cascade
layers: theme, base, components, utilities.

REASON:
Explicit user request to make TypeScript and Tailwind the default stack
for future websites. TypeScript protects shared component contracts;
typescript-eslint checks the migrated source; @types/node types the build
configuration. Tailwind provides token-backed composition utilities without
duplicating the design system or adding runtime UI dependencies.

SCOPE:
All application source extensions/types, Vite config, lint/build scripts,
dependency lockfile, CSS entry point, theme aliases and Laboratory blocks.
Component type-contract fixtures are checked with the application. Shared
responsive rules stay in responsive.css; local Tailwind variants are allowed.

IMPACT:
Existing component APIs, tokens, visual identity, routes, and interactions
are preserved. Cookie storage now rejects values outside the declared consent
union. Tailwind uses tw: to avoid existing class collisions and omits Preflight
to retain the Blueprint reset. Utilities intentionally outrank components;
existing styles retain their relative order. This source/cascade contract
change is a major release. No backend or deployment changes are included.

## Premium Ride — 31-08-2026

Project language: pt-PT, preserved from the existing Premium Ride website.
New project created by copying the requested blueprint, rather than replacing its React/Vite structure with a different scaffold. The original blueprint and Premium-ride project remain unchanged.
OVERRIDE: Editorial section headings are left-aligned, except the final contact section.
REASON: Asymmetrical text/photography layout is appropriate to this premium transport brand.
SCOPE: Premium Ride creative layer only. Container, Section, reset, strict TypeScript and CSS layer ordering preserved.
IMPACT: No change to blueprint source or reusable component contracts.

Dependencies: @openai/sites-vite-plugin packages Sites metadata; native APIs handle form preparation and clipboard. No form submission backend was inferred from an unconfirmed commercial workflow. No optional cookie banner because no optional tracking is installed.
Typography uses locally available serif/sans fonts, avoiding third-party font requests. Original logo retained in footer; header uses an accessible typographic wordmark for small-screen legibility.

## Horizontal experience — user requested arrows and menu
Desktop (1024px+) uses four horizontal chapters: introduction, experience, journey and contacts. Chapter navigation is explicit via menu, links and arrows; wheel input is not hijacked. Each chapter may scroll vertically when needed, including the complete form and legal information. Mobile/tablet retain the vertical document. Off-screen desktop chapters are inert, navigation updates URL history, form state remains mounted, and reduced motion removes the chapter transition. Footer stays within the contacts chapter. Container and Section remain the layout primitives.
