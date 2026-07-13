"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeLabels: Record<string, string> = {
  en: "EN",
  fr: "FR",
};

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      value={locale}
      onChange={(event) => {
        router.replace(pathname, { locale: event.target.value });
      }}
      aria-label="Language"
      className="rounded-full border border-border-strong bg-transparent px-3 py-1.5 text-sm text-foreground-muted"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc} className="bg-surface text-foreground">
          {localeLabels[loc] ?? loc}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
