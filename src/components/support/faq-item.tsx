"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types/investment";

const FaqItemRow = ({ item }: { item: FaqItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-4 text-left cursor-pointer"
      >
        <span className="text-sm font-medium">{item.question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-foreground-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="px-6 pb-4 text-sm text-foreground-muted">{item.answer}</p>
      )}
    </div>
  );
};

export default FaqItemRow;
