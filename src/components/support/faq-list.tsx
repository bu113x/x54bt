import { useTranslations } from "next-intl";
import FaqItemRow from "@/components/support/faq-item";
import type { FaqItem } from "@/types/investment";

const FaqList = ({ items }: { items: FaqItem[] }) => {
  const t = useTranslations("Support");

  return (
    <div className="rounded-card border border-border bg-surface">
      <div className="border-b border-border px-6 py-4">
        <h3 className="font-semibold">{t("faqHeading")}</h3>
      </div>
      <div>
        {items.map((item) => (
          <FaqItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FaqList;
