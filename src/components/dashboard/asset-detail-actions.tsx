"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import InvestModal from "@/components/dashboard/invest-modal";
import type { AssetDetail } from "@/types/investment";

const AssetDetailActions = ({ asset }: { asset: AssetDetail }) => {
  const t = useTranslations("AssetDetail");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)} className="cursor-pointer">
        {t("investNow")}
      </Button>

      <InvestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        asset={asset}
      />
    </>
  );
};

export default AssetDetailActions;
