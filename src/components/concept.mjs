// Shared, dependency-free contract. Only these values can affect the UI.
export const VIBES = ["premium", "playful", "bold"];
export const PALETTES = ["sage", "cocoa", "electric", "berry"];
export const LAYOUTS = ["editorial", "split", "cards"];
export const ICONS = ["coffee", "code", "spark", "shop", "leaf", "rocket"];
const string = (maxLength) => ({ type: "string", minLength: 1, maxLength });
const enumeration = (values) => ({ type: "string", enum: values });
const object = (properties) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });

export const CONCEPT_SCHEMA = object({
  brand: string(40),
  headline: string(85),
  description: string(180),
  cta: string(30),
  palette: enumeration(PALETTES),
  layout: enumeration(LAYOUTS),
  motif: enumeration(ICONS),
  sections: {
    type: "array", minItems: 3, maxItems: 3,
    items: object({ title: string(32), body: string(140), icon: enumeration(ICONS) }),
  },
  perspective: string(260),
  nextStep: string(180),
  joke: string(120),
});

// Validate again on the server and client, including mocked or broken responses.
export function matchesSchema(value, schema = CONCEPT_SCHEMA) {
  if (schema.enum) return schema.enum.includes(value);
  if (schema.type === "string") return typeof value === "string" && value.trim().length >= schema.minLength && value.length <= schema.maxLength;
  if (schema.type === "array") return Array.isArray(value) && value.length >= schema.minItems && value.length <= schema.maxItems && value.every((item) => matchesSchema(item, schema.items));
  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    return Object.keys(value).length === schema.required.length && schema.required.every((key) => Object.hasOwn(value, key) && matchesSchema(value[key], schema.properties[key]));
  }
  return false;
}

export const DEMO_IDEA = "A cosy café in Meerut with a menu and an easy way to plan a visit.";
export const DEMO = {
  brand: "THE LITTLE PAUSE",
  headline: "Good coffee. Better company.",
  description: "A warm little corner for slow mornings, catch-ups and one more cup. A fictional café concept, made for this demo.",
  cta: "Explore the menu",
  palette: "cocoa", layout: "split", motif: "coffee",
  sections: [
    { title: "On the menu", body: "Make the menu easy to scan on a phone. Add real items, prices and dietary information before launch.", icon: "coffee" },
    { title: "Find your corner", body: "Give visitors clear directions, opening hours and an accessible way to contact the café.", icon: "shop" },
    { title: "Meet the people", body: "Show the real team and space. A little local personality goes further than stock promises.", icon: "leaf" },
  ],
  perspective: "A café visitor often needs the menu, opening hours or directions. I’d put those within easy reach and keep the page fast on mobile.",
  nextStep: "Share your real menu, location and a few photos so we can scope a useful first version.",
  joke: "The coffee can be strong. The password should be stronger.",
};

export function enquiryUrl(result) {
  const c = result.concept;
  const message = `Hi Siddhant! I'd like to discuss a project.\n\nMy idea: ${result.idea}\nStyle: ${result.vibe}\nConcept: ${c.brand} — ${c.headline}\nSections: ${c.sections.map((s) => s.title).join(", ")}\nSuggested next step: ${c.nextStep}\n\nThis is ${result.source === "ai" ? "an AI-generated" : "a sample"} starting concept, not a confirmed scope or quote.`;
  return `https://wa.me/918218969834?text=${encodeURIComponent(message)}`;
}
