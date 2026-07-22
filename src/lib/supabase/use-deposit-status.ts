"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type DepositStatus =
  | "waiting"
  | "confirming"
  | "confirmed"
  | "sending"
  | "partially_paid"
  | "finished"
  | "failed"
  | "refunded"
  | "expired";

export const useDepositStatus = (depositId: string | null) => {
  const [status, setStatus] = useState<DepositStatus>("waiting");

  useEffect(() => {
    if (!depositId) return;

    let cancelled = false;

    supabase
      .from("crypto_deposits")
      .select("status")
      .eq("id", depositId)
      .single()
      .then(({ data }) => {
        if (!cancelled && data) setStatus(data.status as DepositStatus);
      });

    const channel = supabase
      .channel(`deposit-${depositId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "crypto_deposits",
          filter: `id=eq.${depositId}`,
        },
        (payload) => setStatus(payload.new.status as DepositStatus),
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [depositId]);

  return status;
};
