import { useTranslations } from "next-intl";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import FaqList from "@/components/support/faq-list";
import SupportChannelCard from "@/components/support/support-channel-card";
import { mockFaqItems, mockSupportChannels } from "@/lib/content/dashboard";

const SupportPage = () => {
  const t = useTranslations("Support");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("heading")}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">{t("subheading")}</p>
      </div>

      <RiskDisclosureBanner compact />

      <div className="grid gap-4 sm:grid-cols-2">
        {mockSupportChannels.map((channel) => (
          <SupportChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      <FaqList items={mockFaqItems} />
    </div>
  );
};

export default SupportPage;
