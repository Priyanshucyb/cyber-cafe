# Cyber cafe website

A complete portable React + TypeScript + Vite project, adapted from the supplied Diligence HTML. Cream, ink, brass, oversized Space Grotesk typography, monospaced labels, hard-shadow buttons, connected diagrams and light/dark themes preserve the original design direction. Original cafe artwork is SVG; fonts are served locally. No backend, CMS, API key or external asset request is required.

## Important: client content is not supplied

The attachment describes **Diligence, an automation / business-systems agency**, not a cyber cafe. Its four services are process automation, integrations, custom business systems and maintenance. Its footer mentions Shahdara, Delhi, but that is not a verified cafe location. Its email and social links are placeholders. There is no verified cafe name, service list, phone number, WhatsApp number, address or opening hours.

The source is preserved verbatim at `reference/original-sample.html`. No agency claims or location have been relabelled as cafe facts. Bracketed fields explicitly identify the missing client information. This project builds and deploys now, but **public client launch requires approved content and the outstanding browser QA**. It would be inaccurate to describe this handoff as a fully verified public-ready business website.

## Setup

Use Node.js 22.12+ (Node 22 LTS recommended) and npm. From this project directory:

```sh
npm install
npm run dev
```

Open the local URL Vite prints. To build and preview the actual pre-rendered production site:

```sh
npm run build
npm run preview
```

The production output is `dist/`. It is included in this delivery. Deploy its **contents**, not the parent folder. Do not open `index.html` via a `file://` URL; use an HTTP static host or `npm run preview`.

For reproducible CI installs, use `npm ci` with the included lockfile.

## Edit all client details in one file

Edit **`src/config/business.ts`**. That file contains the name, locality, phone, WhatsApp, message, structured address, hours, Google Maps link, canonical URL, about copy, service descriptions / details / optional prices, and social links.

- Replace each bracketed field with owner-approved information.
- Enter phone and WhatsApp numbers in international `+countrycode...` format. Spaces and standard separators are normalized.
- WhatsApp is optional: set it to an empty string if unavailable. It is never linked to a fabricated number.
- Maps and social URLs must be HTTPS. Paste the real place or directions link.
- Set `canonicalUrl` to the final HTTPS site URL. Include a trailing slash and any subdirectory, e.g. a GitHub project path. Do not use an example domain for the client.
- `countryCode` is the two-letter uppercase country code.
- Replace the service objects with the cafe's actual services. Add or remove rows freely. Every service needs a unique lowercase slug in `id`. Prices are optional; an empty `price` is hidden.
- Set `socialLinks` to `[]` if no profiles are supplied. No fake social buttons are shown.
- No CMS is needed. Rebuild after changing the configuration so visible content, metadata, and structured data stay synchronized.

`npm run check:content` reports fields still needing attention. It intentionally fails on the supplied placeholder configuration. Once those fields are ready, `npm run build:release` performs the content check and creates the public build. Ordinary `npm run build` always supports review builds with placeholders.

Until configuration passes, the page has a visible content-pending notice, `noindex, nofollow`, and a disallow-all robots file. Invalid contact details render as clearly labelled unavailable controls, never broken `tel:`, WhatsApp or map links. Once configured, real links work directly, the pending notice disappears, and the build emits local-business JSON-LD, an indexable robots file and sitemap. The build cannot verify the truth of owner-entered facts.

## Deployment

No environment variables or secrets are required. All assets use relative URLs, so the build works at a domain root or a subdirectory. There are no client-side routes and no rewrite rule is necessary.

| Host | Build command | Publish / output directory |
| --- | --- | --- |
| Netlify | `npm run build` | `dist` |
| Vercel | `npm run build` | `dist` |
| Cloudflare Pages | `npm run build` | `dist` |
| Other static hosting | Build locally, upload contents | `dist` contents |

Netlify and Vercel configuration files are included. Use Node 22 on the host. For public launch, change the hosting build command to `npm run build:release` to prevent accidental publication of unresolved placeholders. Netlify and Cloudflare Pages can apply the included `_headers`; configure equivalent headers on other servers if desired.

For GitHub Pages: commit this folder as the repository root, select **GitHub Actions** as the Pages source, configure the final canonical URL, then run the included **Deploy to GitHub Pages** workflow. Its manual trigger and release check prevent silently publishing an unconfigured business. No `base` change is required because Vite uses `./`.

Vite reference: https://vite.dev/guide/static-deploy.html

## Checks

```sh
npm run typecheck
npm test
npm run build
npm run check:content
```

`npm test` covers phone normalization, WhatsApp URL encoding, unsafe URL rejection, placeholder handling and configuration validation. Build-time HTML is pre-rendered, then hydrated by React. The page content and service disclosures also work without JavaScript; animated artwork, theme selection and the compact mobile menu require JavaScript.

Browser suite (run on a machine with a supported browser runtime):

```sh
npx playwright install chromium
npm run test:browser
```

The suite builds the production site and tests widths 320, 375, 390, 430, 768, 1024, 1280 and 1440, horizontal overflow, hydration / page errors, failed assets, native service disclosures, mobile menu / Escape behavior, theme persistence and reduced motion. Screenshots are saved under `test-results/`. It also checks pre-rendered content without JavaScript. Actual phone calls, WhatsApp delivery and the physical accuracy of a Maps destination require the owner's real details and a final device check.

See `QA.md` for the checks actually performed and the browser access limitation. The browser suite is included, not claimed as executed.

## Project layout

- `src/config/business.ts` — all business content
- `src/components/` — header, icon, artwork, reusable contact actions, footer
- `src/sections/` — hero, services, about, location, contact
- `src/styles/global.css` — tokens, responsive layouts, themes and reduced motion
- `src/lib/business.ts` — safe contact-link generation and content checks
- `scripts/prerender.tsx` — static page, metadata, sitemap and JSON-LD generation
- `scripts/check-content.ts` — public-launch check
- `tests/` — logic and browser checks
- `public/` — favicon and optional static-host headers
- `licenses/` — font licenses
- `reference/` — original attachment and design/content audit

The visual location graphic is explicitly labelled an illustration, not an actual map. No stock photos, invented reviews, fake statistics, trackers, contact form backend or animation libraries are included. Motion consists of short entrance reveals, title staggering, desktop pointer depth, intentional illustration connection states and button feedback. All motion respects reduced-motion settings. Theme persistence uses optional local storage and tolerates storage being blocked.
"# cyber-cafe" 
