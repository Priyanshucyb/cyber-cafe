import { business, type Business } from "../config/business";
export const isConfigured = (value: string) =>
  Boolean(value.trim()) && !/\[[^\]]*\]/.test(value);
export function httpsUrl(value: string): string | undefined {
  if (!isConfigured(value)) return;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : undefined;
  } catch {
    return;
  }
}
export function phoneLink(value: string): string | undefined {
  if (!isConfigured(value)) return;
  const normalized = value.replace(/[\s().-]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? `tel:${normalized}` : undefined;
}
export function whatsappLink(
  value: string,
  message: string,
): string | undefined {
  const phone = phoneLink(value);
  return phone
    ? `https://wa.me/${phone.slice(5)}?text=${encodeURIComponent(message)}`
    : undefined;
}
export const addressText = (b: Business = business) =>
  [
    b.address.street,
    b.address.city,
    b.address.region,
    b.address.postalCode,
  ].join(", ");
export function contentIssues(b: Business = business): string[] {
  const issues: string[] = [];
  for (const [key, value] of Object.entries({
    name: b.name,
    locality: b.locality,
    about: b.about,
    openingHours: b.openingHours,
    ...b.address,
  }))
    if (!isConfigured(value)) issues.push(key);
  if (!/^[A-Z]{2}$/.test(b.address.countryCode))
    issues.push("countryCode (two-letter code)");
  if (!phoneLink(b.phone)) issues.push("phone (international format)");
  if (b.whatsapp && !phoneLink(b.whatsapp))
    issues.push("whatsapp (international format)");
  if (!httpsUrl(b.mapsUrl)) issues.push("mapsUrl (HTTPS)");
  if (!httpsUrl(b.canonicalUrl)) issues.push("canonicalUrl (HTTPS)");
  if (!b.services.length) issues.push("at least one confirmed service");
  const ids = new Set<string>();
  b.services.forEach((s, i) => {
    if (!/^[a-z][a-z0-9-]*$/.test(s.id) || ids.has(s.id))
      issues.push(`services[${i}].id (unique slug)`);
    ids.add(s.id);
    if (
      ![s.name, s.description, ...s.details].every(isConfigured) ||
      (s.price && !isConfigured(s.price))
    )
      issues.push(`services[${i}]`);
  });
  b.socialLinks.forEach((s, i) => {
    if (!isConfigured(s.label) || !httpsUrl(s.url))
      issues.push(`socialLinks[${i}]`);
  });
  return issues;
}
export const contactLinks = {
  call: phoneLink(business.phone),
  whatsapp: whatsappLink(business.whatsapp, business.whatsappMessage),
  directions: httpsUrl(business.mapsUrl),
};
export const contentPending = contentIssues().length > 0;
