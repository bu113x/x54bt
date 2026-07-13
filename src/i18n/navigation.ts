import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Drop-in replacements for next/link, next/navigation's useRouter/
 * usePathname, etc. — these automatically prepend the current locale to
 * hrefs, so components use these instead of importing directly from
 * "next/link" or "next/navigation".
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
