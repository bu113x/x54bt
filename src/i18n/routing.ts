import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported locales. Add a new language by
 * adding its code here AND creating messages/<code>.json — nothing else
 * needs to change (middleware, navigation, and layout all read from this).
 */
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
});
