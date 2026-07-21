"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TabGroup from "@/components/dashboard/tab-group";

type Tab = "active" | "closed";

interface PortfolioTabsProps {
  activeTab: Tab;
  activeCount: number;
  closedCount: number;
}

const PortfolioTabs = ({
  activeTab,
  activeCount,
  closedCount,
}: PortfolioTabsProps) => {
  const t = useTranslations("Portfolio");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: Tab) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "active") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <TabGroup<Tab>
      tabs={[
        { value: "active", label: t("active"), count: activeCount },
        { value: "closed", label: t("closed"), count: closedCount },
      ]}
      active={activeTab}
      onChange={handleChange}
    />
  );
};

export default PortfolioTabs;
