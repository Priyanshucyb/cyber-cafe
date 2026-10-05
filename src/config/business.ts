/** The only file to edit for client content. No cafe facts were supplied.
 * Bracketed values are intentional placeholders, not claims.
 * Confirm services with the owner; do not copy the agency's service list.
 * Phone/WhatsApp: international format, e.g. +<country code><number>.
 * canonicalUrl: final HTTPS page URL, including any hosting subdirectory.
 */
export interface Service {
  id: string;
  name: string;
  description: string;
  details: string[];
  price: string;
}
export interface Business {
  name: string;
  locality: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    countryCode: string;
  };
  openingHours: string;
  mapsUrl: string;
  canonicalUrl: string;
  about: string;
  services: Service[];
  socialLinks: { label: string; url: string }[];
}
export const business: Business = {
  name: "[BUSINESS NAME]",
  locality: "[AREA / CITY]",
  phone: "[PHONE NUMBER]",
  whatsapp: "[WHATSAPP NUMBER]",
  whatsappMessage: "Hello, I would like to ask about your cyber cafe services.",
  address: {
    street: "[STREET ADDRESS]",
    city: "[CITY]",
    region: "[STATE]",
    postalCode: "[POSTAL CODE]",
    countryCode: "[COUNTRY CODE]",
  },
  openingHours: "[OPENING HOURS]",
  mapsUrl: "[GOOGLE MAPS LINK]",
  canonicalUrl: "[CANONICAL URL]",
  about:
    "[Add a short, factual introduction approved by the owner: who the cafe serves and what customers can visit for.]",
  services: [
    {
      id: "service-01",
      name: "[SERVICE NAME 01]",
      description:
        "[Add a confirmed service and a clear one-line description.]",
      details: ["[What is included]", "[What customers should bring]"],
      price: "",
    },
    {
      id: "service-02",
      name: "[SERVICE NAME 02]",
      description:
        "[Add a confirmed service and a clear one-line description.]",
      details: ["[What is included]", "[What customers should bring]"],
      price: "",
    },
    {
      id: "service-03",
      name: "[SERVICE NAME 03]",
      description:
        "[Add a confirmed service and a clear one-line description.]",
      details: ["[What is included]", "[What customers should bring]"],
      price: "",
    },
  ],
  // Optional: leave empty when not supplied. Only HTTPS URLs are rendered.
  socialLinks: [],
};
