import Link from "next/link";
import { siteConfig } from "@/config/site";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M4 17V10M9 17V6M14 17V13M19 17V8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className="text-lg font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
};

export default Logo;
