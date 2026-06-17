# Changelog

Notable changes to the huntTMS landing. Newest first.

## 2026-06-17 — UI/UX audit fixes

Acted on a four-lens audit (UI quality, product/meaning, font & token
consistency, premium polish).

### Consistency & tokens
- **Unified the product name to `huntTMS`** everywhere visible (metadata, every
  mockup frame title, both dashboard sidebars, FAQ, Features). The
  `/hunterTMS.svg` footer wordmark **asset filename is unchanged** — only the
  visible text was already `huntTMS`.
- **`tabular-nums`** added to `CountUp`, `Delta` and the `ViewTotals` figures so
  animated numbers no longer jitter in width.
- **Status colours** consolidated to one value each (success `#10b981`,
  warning `#f59e0b`, danger `#f43f5e`) + new `--color-success/-warning/-danger`
  `@theme` tokens; `warn-pulse` keyframe matched to the new danger red.
- Hardcoded hex bypasses → tokens: footer greys → `text-faint`, dividers →
  `bg-border`, primary buttons / CTA submit / scroll-top → `bg-ink`, wordmark
  badge → `bg-border`, secondary-button hover → `bg-muted`.
- Heading scale normalised — Features `leading-1.06` and CtaBand `46px`
  outliers pulled to the shared `44px / 1.08`.
- Sidebar nav row padding + icon sizes unified (`h-[15px]`→`h-4`, `py-2`→`py-1.5`).

### A11y & UX
- **Focus-visible rings** on every interactive control (Button, CTA input +
  submit, Showcase steps, testimonial dots, scroll-to-top).
- **Floating navbar** width clamped to the viewport (`min(372, fullW)`) — no
  longer overflows on phones.
- **Hero secondary CTA** pointed at `#cta` (the `#demo` anchor didn't exist).
- **Testimonial** reserves enough height so the avatar/dots stop jumping on
  rotation; **Showcase** auto-advance pauses on hover/focus.
- Scroll-to-top dropped to `z-40` so the nav (`z-50`) wins the stack.

### Product / meaning
- **Dispatcher page narrative fixed**: rendered the already-built
  `Showcase variant="dispatcher"` (a "how it works" step block it never had) and
  moved the Testimonial **above** the FAQ. De-buzzworded the dispatcher hero,
  Features sub and CTA copy (removed the unverifiable "join hundreds" claim).
- Copy ↔ mockup alignment: softened the carrier map "tap" claim to "live ETA",
  genericised "RTS" to "your factor" (no integration shown + footer disclaims it).
- Mockup fixes: `ViewTotals` miles now reconcile with revenue ÷ RPM;
  `LoadInfo` deadhead "DH" stop relabelled to a real numbered pickup (removed the
  double-deadhead confusion); RC Scanner `53' TORD` typo → `Full / 53'`; the
  dispatcher dashboard avatar swapped from an external `randomuser.me` image to
  the local initials chip.
- Removed dead components `LoadsBoardMock` + `LoadFlowMock` (never imported).

## 2026-06-16

### Animations & UX
- **Scroll-to-top button** (`ScrollToTop.jsx`) — fixed bottom-right black pill,
  appears past 600px, glides to top via the shared Lenis instance.
- **Timeline animation fixed** (carrier + dispatcher): bars used a fire-on-mount
  CSS keyframe (`.bar-grow`) that played off-screen; converted to
  `motion.div` + `whileInView` scaleX so they grow as the block enters.
- **Viewport-gated motion overhaul**: shared `VIEW`/`IN_VIEW` configs
  (`once:false`, `-15%` margin) — entrance animations fire as a section starts
  entering, reverse on scroll-up, and never run while off-screen. `CountUp`
  resets on exit and re-counts on re-entry.
- **Route-change reset**: `SmoothScroll` scrolls to top on navigation so each
  page replays its reveals from the start.
- **Carrier page fully animated** — count-ups, drawing charts, cascading rows,
  HuntBot streaming chat with typing indicator; **Footer** reveals on scroll.
- **Dispatcher mockups animated** — ambient loops (auto-cycling totals, pulsing
  map, scanning RC fields, streaming history, expand/collapse reports).

### Mockups
- **Carrier hero `DashboardMock` rebuilt** to mirror the real hunterTMS Home
  screen: 5 KPI cards (adds Invoiced), full-width Meet HuntBot banner, Expenses
  trend card, icon-chip headers, flat sidebar with "D" avatar.
- **All 10 dispatcher feature mockups rebuilt as JSX** in the shared shadcn
  language (dropped imported SVG assets + `MockImage`); extracted shared
  `MapCanvas`. RC Scanner doc card flexes full height; beam sweeps whole doc.

### Earlier in the session
- Dispatchers page mirrors carriers (FAQ from prod, no Showcase).
- Single shared resizable navbar (active tab by pathname); Features/How-it-works
  links removed. Diagonal "scales" gutters added. Lenis smooth scroll.
