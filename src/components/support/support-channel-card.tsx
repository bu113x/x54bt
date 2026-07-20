"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SupportChannel } from "@/types/investment";

const iconMap: Record<SupportChannel["type"], typeof MessageCircle> = {
  chat: MessageCircle,
  email: Mail,
  phone: Phone,
};

declare global {
  interface Window {
    smartsupp?: (...args: unknown[]) => void;
  }
}

const SupportChannelCard = ({ channel }: { channel: SupportChannel }) => {
  const t = useTranslations("Support");
  const Icon = iconMap[channel.type];

  const handleClick = () => {
    if (
      channel.type === "chat" &&
      typeof window !== "undefined" &&
      window.smartsupp
    ) {
      window.smartsupp("chat:open");
      return;
    }
    if (channel.type === "email") {
      window.location.href = `mailto:${channel.value}`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-4 rounded-card border border-border bg-surface p-5 text-left transition-colors hover:border-primary/40 cursor-pointer"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium">{channel.label}</p>
        <p className="text-sm text-foreground-muted">{channel.value}</p>
        <p className="mt-0.5 text-xs text-success">{channel.availability}</p>
      </div>
    </button>
  );
};

export default SupportChannelCard;
