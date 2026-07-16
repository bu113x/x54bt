import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import Logo from "../ui/logo";

const Footer = () => {
  const t = useTranslations("Footer");

  const columns = [
    {
      key: "1",
      links: [
        { href: `${siteConfig.dest_url}/about`, label: t("aboutBullex") },
        {
          href: `https://affiliate.${siteConfig.dest_domain}/?ref_id=${siteConfig.dest_ref_id}`,
          label: t("affiliates"),
        },
        { href: `${siteConfig.dest_url}/legal/aml`, label: t("aml") },
      ],
    },
    {
      key: "2",
      links: [
        {
          href: `${siteConfig.dest_url}/legal/privacy-policy`,
          label: t("privacyPolicy"),
        },
        {
          href: `${siteConfig.dest_url}/legal/payment-policy`,
          label: t("paymentPolicy"),
        },
        {
          href: `${siteConfig.dest_url}/legal/order-execution`,
          label: t("orderExecution"),
        },
      ],
    },
    {
      key: "3",
      links: [
        {
          href: `${siteConfig.dest_url}/legal/terms`,
          label: t("termsOfService"),
        },
        {
          href: `${siteConfig.dest_url}/legal/general-fees`,
          label: t("generalFees"),
        },
        {
          href: `${siteConfig.dest_url}/legal/risk-disclosure`,
          label: t("riskDisclosure"),
        },
      ],
    },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              {t("copyright", {
                name: siteConfig.name,
                year: new Date().getFullYear(),
              })}
            </p>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              {t("email", { email: siteConfig.support_email })}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.key}>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-foreground-muted sm:justify-between">
          <p className="flex items-center gap-3 text-sm w-full">
            <span
              className="font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("riskWarningTitle")}
            </span>
            <span className="text-foreground-muted">
              {t("riskWarningText")}
            </span>
          </p>

          <p className="text-xxs text-foreground-muted">
            {t("addressDigitalSmartLLC")}
          </p>
          <p className="text-xxs text-foreground-muted">
            {t("addressDigitalSmartCY")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
