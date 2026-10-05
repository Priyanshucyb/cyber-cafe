import { readFile, writeFile } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import App from "../src/App";
import { business } from "../src/config/business";
import { contentPending, httpsUrl, isConfigured } from "../src/lib/business";
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const name = isConfigured(business.name) ? business.name : "[BUSINESS NAME]";
const location = isConfigured(business.locality)
  ? ` in ${business.locality}`
  : "";
const title = `${name} — Cyber Cafe${location}`;
const confirmed = business.services
  .filter((s) => isConfigured(s.name))
  .map((s) => s.name);
const description = `${name}, a cyber cafe${location}. ${confirmed.length ? `${confirmed.join(", ")}. ` : ""}View service details, opening hours, contact information and directions.`;
const url = httpsUrl(business.canonicalUrl);
let html = await readFile("dist/index.html", "utf8");
html = html
  .replace(
    "<!--app-html-->",
    renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  )
  .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
  .replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escape(description)}"/>`,
  )
  .replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="${contentPending ? "noindex, nofollow" : "index, follow"}"/>`,
  );
const meta = [
  `<meta property="og:type" content="website"/>`,
  `<meta property="og:title" content="${escape(title)}"/>`,
  `<meta property="og:description" content="${escape(description)}"/>`,
  `<meta property="og:site_name" content="${escape(name)}"/>`,
  `<meta name="twitter:card" content="summary"/>`,
];
if (url)
  meta.push(
    `<link rel="canonical" href="${escape(url)}"/>`,
    `<meta property="og:url" content="${escape(url)}"/>`,
  );
else
  meta.push(
    "<!-- Canonical URL pending: edit canonicalUrl in src/config/business.ts -->",
  );
if (!contentPending) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description,
    url,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.countryCode,
    },
    hasMap: httpsUrl(business.mapsUrl),
    sameAs: business.socialLinks.map((s) => httpsUrl(s.url)).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cyber cafe services",
      itemListElement: business.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
      })),
    },
  };
  meta.push(
    `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
  );
}
html = html.replace("<!--site-meta-->", meta.join("\n"));
await writeFile("dist/index.html", html);
await writeFile(
  "dist/robots.txt",
  contentPending
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n${url ? `Sitemap: ${new URL("./sitemap.xml", url.endsWith("/") ? url : url + "/").href}\n` : ""}`,
);
if (url && !contentPending)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(url)}</loc></url></urlset>`,
  );
console.log(
  `Pre-rendered page and SEO metadata. ${contentPending ? "Client details pending: indexing disabled until configured." : "Client content complete: indexing enabled."}`,
);
