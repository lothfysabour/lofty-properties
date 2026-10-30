# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

LOFTY MIAMI — a single-page marketing/booking site for a Miami short-term-rental company. It's a static React SPA (no database); the only server code is two Vercel functions in `api/` that e-mail form submissions. Its job is to showcase apartment listings and drive visitors to Airbnb booking links or a lead-capture form.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no test runner, no lint script, and no type checker configured in this repo — don't assume `npm test` or `npm run lint` exist.

## Architecture

**Single-page "app" via state, not a router.** `src/App.jsx` holds a `page` state (`'home'` | `'list-property'`) and switches between the home sections and the `ListProperty` page manually — there is no `react-router`. `Navbar` receives `navigate` as a prop and calls it directly; internal home-page navigation (Home/About/Apartments/Contact) uses plain anchor hashes (`#hero`, `#about`, etc.) and `scrollIntoView`, with a special case in `Navbar.handleLink` to first navigate home before scrolling if the user is on a sub-page.

**Home page is a fixed stack of sections** rendered in `App.jsx`: `Hero` → `About` → `ApartmentGrid` → `Contact` → `Footer`. Each section is visually self-contained (own gradients/backgrounds) and animates in with `framer-motion` (`whileInView`/`useInView`), a pattern repeated across every component — follow it for new sections rather than introducing a different animation approach.

**Listings are static data, not fetched.** All apartment listings live in `src/data/apartments.js` as a hardcoded array (id, name, neighborhood, price, bed/bath/guests, rating, image URL, `airbnbUrl`, amenities, badge, description). `ApartmentGrid` filters/searches this array client-side with `useMemo`; there's no pagination or backend search. Images are hotlinked directly from Airbnb's CDN (`a0.muscache.com`) with a local fallback image on load error (see `ApartmentCard`'s `imgError` state). When adding/editing listings, edit this file directly — there is a comment reminding you to keep `price` in sync with real Airbnb nightly rates.

**Forms are e-mailed through Vercel functions.** `Contact.jsx` posts JSON to `api/contact.js` and `ListProperty.jsx` posts to `api/list-property.js` (helpers in `src/utils/forms.js`). Both functions send via Gmail SMTP with `nodemailer` (`api/_mailer.js`), using the `GMAIL_USER` / `GMAIL_APP_PASSWORD` env vars (Gmail app password, optional `MAIL_TO` override), with the visitor's address as Reply-To. Photos from `ListProperty` are resized and re-encoded as JPEG in the browser before upload, because Vercel rejects function request bodies over 4.5 MB; keep that compression if you touch the uploader. Both forms carry a hidden `website` honeypot field that the functions silently drop. `/api` routes only run under `vercel dev` or on Vercel, not under `npm run dev`.

**Styling system:** Tailwind CSS with a custom theme in `tailwind.config.js` — a `navy` shade scale (dark background palette) and `miami` accent colors (`cyan`, `pink`, `orange`, `gold`) used to build the brand gradient. Reusable visual patterns are defined as component classes in `src/index.css` rather than repeated utility strings: `.glass` / `.glass-dark` (glassmorphism panels), `.gradient-text` / `.gradient-miami` (brand gradient), `.btn-primary` / `.btn-outline`, `.section-label`. Use these existing classes for new UI instead of re-deriving the gradient/glass styles inline. Note the Tailwind `safelist` in `tailwind.config.js` — badge gradient classes in `ApartmentCard.jsx` (`BADGE_STYLES`) are built from dynamic strings, so any new badge color combo must be added to `safelist` or Tailwind will purge it in production builds.

## Deployment

Deploys to Vercel (`vercel.json`): build command `npm run build`, output dir `dist`, with a catch-all rewrite (`/((?!api/).*)` → `/`) since routing is client-side state, not URL-based; `/api/*` is excluded so the form functions stay reachable.

## Git workflow

Commit and push to `origin main` after each modification — don't batch unrelated changes into one commit, and don't wait to be asked. Each commit should have a clear, descriptive message summarizing the change. This repo's remote is `https://github.com/lothfysabour/lofty-miami.git`.
