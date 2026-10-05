import test from "node:test";
import assert from "node:assert/strict";
import {
  phoneLink,
  whatsappLink,
  httpsUrl,
  contentIssues,
  isConfigured,
} from "../src/lib/business";
import { business } from "../src/config/business";
test("missing data never becomes a fake external contact link", () => {
  assert.equal(phoneLink("[PHONE NUMBER]"), undefined);
  assert.equal(whatsappLink("[WHATSAPP NUMBER]", "Hello"), undefined);
  assert.equal(httpsUrl("[GOOGLE MAPS LINK]"), undefined);
});
test("contact links normalize international phone numbers and encode messages", () => {
  assert.equal(phoneLink("+44 (20) 7946-0958"), "tel:+442079460958");
  assert.equal(
    whatsappLink("+44 20 7946 0958", "Hello & thanks?"),
    "https://wa.me/442079460958?text=Hello%20%26%20thanks%3F",
  );
  assert.equal(phoneLink("123"), undefined);
  assert.equal(phoneLink("+000000000"), undefined);
});
test("external URLs reject executable, insecure and credential-bearing URLs", () => {
  for (const url of [
    "javascript:alert(1)",
    "http://example.com",
    "https://user:pass@example.com",
    "invalid",
  ])
    assert.equal(httpsUrl(url), undefined);
  assert.equal(
    httpsUrl("https://maps.google.com/"),
    "https://maps.google.com/",
  );
});
test("public-launch check catches missing content and duplicated IDs", () => {
  assert.ok(contentIssues(business).length > 0);
  assert.equal(isConfigured(""), false);
  const fixture = structuredClone(business);
  fixture.services[1].id = fixture.services[0].id;
  assert.ok(contentIssues(fixture).includes("services[1].id (unique slug)"));
});
test("fully supplied client configuration is accepted; WhatsApp may be omitted", () => {
  const fixture = structuredClone(business);
  Object.assign(fixture, {
    name: "Test fixture only",
    locality: "Test area",
    phone: "+442079460958",
    whatsapp: "",
    about: "Test description",
    openingHours: "Test hours",
    mapsUrl: "https://maps.google.com/",
    canonicalUrl: "https://example.org/",
  });
  fixture.address = {
    street: "Test street",
    city: "Test city",
    region: "Test region",
    postalCode: "TEST",
    countryCode: "GB",
  };
  fixture.services = [
    {
      id: "confirmed-service",
      name: "Test service",
      description: "Test description",
      details: ["Test detail"],
      price: "",
    },
  ];
  assert.deepEqual(contentIssues(fixture), []);
});
