# huntTMS — Landing

Marketing landing for **huntTMS by LoadHunter**, a trucking TMS. The site has
two audience pages that share one shell:

| Page | Route | Audience |
|------|-------|----------|
| Carriers | `/` | U.S. fleets & owner-operators |
| Dispatchers | `/dispatchers` | dispatch services / dispatchers |

Companion to the dispatch product at <https://tms.loadhunt.ai/>.

## Stack

- **Next.js 16** (App Router) · **React 19** · **Tailwind CSS v4**
- **motion** (Framer Motion, `motion/react`) — scroll reveals, count-ups,
  drawing charts, ambient loops
- **lenis** — momentum smooth scroll (disabled under `prefers-reduced-motion`)
- **lucide-react** — icons · **Inter** via `next/font`
- Design: monochrome, **border-first** (shadcn / Refero) with a restrained
  brand-blue accent + emerald/amber/rose status tones. Tokens live in
  `src/app/globals.css` (`@theme`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

> If interactivity dies after installing a dependency mid-session, you hit a
> stale dev bundle. Fix: stop the dev server, `rm -rf .next`, restart.

## Structure

```
src/
├─ app/
│  ├─ layout.js            # <html>/<body> + SmoothScroll, Header, ScrollToTop
│  ├─ page.js              # Carriers (/)
│  ├─ dispatchers/page.js  # Dispatchers (/dispatchers)
│  └─ globals.css          # @theme tokens + keyframes
├─ components/
│  ├─ Header.jsx           # shared resizable floating navbar
│  ├─ SmoothScroll.jsx     # Lenis + scroll-to-top on route change
│  ├─ ScrollToTop.jsx      # floating bottom-right "back to top" button
│  ├─ Reveal.jsx           # scroll-reveal wrapper
│  ├─ Frame.jsx, ui.jsx    # border-frame grid (FrameColumn/FrameRule, Bay, Container)
│  ├─ Hero/Features/Showcase/Faq/Testimonial/CtaBand/Footer.jsx
│  └─ mockups.jsx          # all app mockups + animation primitives
└─ data/route.js           # real OSRM road geometry for the live map
```

### App mockups

Every "screenshot" of the app (hero dashboards + each feature block) is a
**hand-built JSX component** in `src/components/mockups.jsx` — never an imported
image. This keeps one consistent visual language and lets everything animate
(count-ups, drawing charts, cascading rows, streaming chat, scanning beam,
live map). Shared helpers: `Frame`, `Badge`, `MiniTable`, `AreaChart`,
`MapCanvas`, and the motion primitives (`Stagger`/`Item`/`CountUp`/`useInViewLoop`).

### Animation rules

- **Viewport-gated** — animations fire as a section *starts* entering
  (shared `VIEW` / `IN_VIEW`, `-15%` bottom margin), never while off-screen.
- **Reverse on scroll-up** (`once: false`) and replay on re-entry.
- **Each page starts from the top** — `SmoothScroll` resets Lenis on route change.
- Entrance animations use `motion` + `whileInView` (not fire-on-mount CSS).
- Honors `prefers-reduced-motion`.

## Deploy

Hosted on **Vercel** — pushing to `main` triggers a production deploy. No env
vars required.

## Docs

Detailed design/engineering notes live in the Obsidian vault at
`~/Documents/huntTMS-Landing/` (architecture, components, mockups, animation
system, content/copy, deployment, changelog). See also `CHANGELOG.md`.
