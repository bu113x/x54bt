"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CopyField = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-left text-xs cursor-pointer"
    >
      <span className="truncate font-mono">{value}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 text-foreground-muted" />
      )}
    </button>
  );
};

export default CopyField;
