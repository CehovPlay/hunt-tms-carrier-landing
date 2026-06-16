# Changelog

Notable changes to the huntTMS landing. Newest first.

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
