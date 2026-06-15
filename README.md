# huntTMS — Carrier Landing

Marketing landing for the **carrier-side** of huntTMS (by LoadHunter). Companion to the dispatch product at https://tms.loadhunt.ai/.

## Stack
- **Next.js 16** (App Router, Turbopack) · **React 19** · **Tailwind CSS v4**
- Fonts: Manrope (display) + Inter (body) via `next/font`
- Icons: lucide-react
- Design system: **Mercury** — "Mountain Top Command Center" (dark neutrals + single Mercury Blue `#5266eb` accent, pill buttons, spacious grid). See `src/app/globals.css`.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
```

## Structure
- `src/app/layout.js` — fonts + metadata
- `src/app/globals.css` — Mercury tokens + base styles
- `src/components/*` — Header, Hero, Features, Showcase, Stats, Testimonial, Pricing, Faq, CtaBand, Footer
- `src/app/page.js` — assembles the page

## Deploy
Push to GitHub, then import into Vercel (auto-detects Next.js, zero config). No env vars required.

> Logo is a placeholder mark in `src/components/ui.jsx` (`Wordmark`) — swap for the real asset.
