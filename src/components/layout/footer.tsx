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
        { href: `${siteConfig.dest_url}/about`, label: "About Bullex" },
        {
          href: `https://affiliate.${siteConfig.dest_domain}/?ref_id=${siteConfig.dest_ref_id}`,
          label: "Affiliates",
        },
        { href: `${siteConfig.dest_url}/legal/aml`, label: "AML" },
      ],
    },
    {
      key: "2",
      links: [
        {
          href: `${siteConfig.dest_url}/legal/privacy-policy`,
          label: "Privacy Policy",
        },
        {
          href: `${siteConfig.dest_url}/legal/payment-policy`,
          label: "Payment Policy",
        },
        {
          href: `${siteConfig.dest_url}/legal/order-execution`,
          label: "Order Execution Policy",
        },
      ],
    },
    {
      key: "3",
      links: [
        {
          href: `${siteConfig.dest_url}/legal/terms`,
          label: "Terms of Service",
        },
        {
          href: `${siteConfig.dest_url}/legal/general-fees`,
          label: "General Fees",
        },
        {
          href: `${siteConfig.dest_url}/legal/risk-disclosure`,
          label: "Risk Disclosure",
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
              {siteConfig.name} &copy; {new Date().getFullYear()}{" "}
              {siteConfig.name}. All rights reserved.
            </p>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              E-mail: {siteConfig.support_email}
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
              Risk Warning:
            </span>
            <span className="text-foreground-muted">
              The financial products offered by the company carry a high level
              of risk and can result in losses. You should never invest money
              that you cannot afford to lose.
            </span>
          </p>

          <p className="text-xxs text-foreground-muted">
            Digital Smart LLC Address: Lighthouse Trust Nevis Ltd, Suite 1, A.L.
            Evelyn Ltd Building, Main Street, Charlestown, Nevis, Registration
            Number L 22205
          </p>
          <p className="text-xxs text-foreground-muted">
            Payment transactions are managed by: DIGITAL SMART CY LIMITED
            Address: 6 Koutsoventi street, Agios Athanasios, 4101, Limassol,
            Cyprus Company business number: HE 410889
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
